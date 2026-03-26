/** biome-ignore-all lint/nursery/noExcessiveLinesPerFile: <explanation> */
const handleFatalErrors = (problemData) => {
        const { categoryTitle } = problemData;
        const isConcurrency = categoryTitle === 'Concurrency';
        const isShell = categoryTitle === 'Shell';
        const isDatabase = categoryTitle === 'Database';

        if (isConcurrency || isShell || isDatabase) {
                throw new Error(
                        `${categoryTitle} based problems are not supported.`,
                );
        }
};

const parseSimilarQuestions = (similarQuestions) => {
        const questionsSortFn = (a, b) => {
                const scores = {
                        easy: 1,
                        medium: 2,
                        hard: 3,
                };

                return (
                        scores[a.difficulty.toLowerCase()] -
                                scores[b.difficulty.toLowerCase()] ||
                        a.titleSlug.localeCompare(b.titleSlug)
                );
        };

        return JSON.parse(similarQuestions)
                .map(({ titleSlug, difficulty }) => ({ titleSlug, difficulty }))
                .sort(questionsSortFn);
};

const parseOutputs = (htmlContent) => {
        if (!htmlContent) {
                return [];
        }

        const replaceEscape = (e) => charMap[e];

        const charMap = {
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>',
                '&quot;': `"`,
                '&#39;': `'`,
                '&nbsp;': ' ',
        };

        const re = {
                testcases: /<pre>.+?<\/pre>|<div class="example-block">.+?<\/div>/gis,
                tags: /<strong>|<\/strong>|<pre>|<\/pre>|<span class="example-io">|<\/span>|<p>|<\/p>/gi,
                escape: /&amp;|&lt;|&gt;|&quot;|&#39;|&nbsp;/gi,
                title: /<strong>.+?<\/strong>/gis,
                content: /<\/strong>.+?(<strong>|<\/pre>)|<span class="example-io">.+?<\/span>/gis,
        };

        const testcases = htmlContent.match(re.testcases);
        const outputs = [];

        for (const testcase of testcases) {
                const sectionTitle = testcase.match(re.title);
                const sectionContent = testcase.match(re.content);

                for (let i = 0; i < sectionTitle?.length; i++) {
                        const title = sectionTitle?.[i]
                                ?.replace(re.tags, '')
                                ?.replace(re.escape, replaceEscape)
                                ?.replace(/Output:*/i, 'output')
                                ?.trim();

                        if (title !== 'output') {
                                continue;
                        }

                        const content = sectionContent?.[i]
                                ?.replace(re.tags, '')
                                ?.replace(re.escape, replaceEscape)
                                ?.trim();

                        try {
                                outputs.push(JSON.parse(content));
                        } catch {
                                outputs.push(content);
                        }

                        break;
                }
        }

        return outputs;
};

const parseInputs = (exampleTestcaseList) => {
        const inputs = [];

        for (const testcase of exampleTestcaseList) {
                const inputStrs = testcase.split('\n');
                const input = [];

                for (const str of inputStrs) {
                        try {
                                input.push(JSON.parse(str));
                        } catch {
                                input.push(str);
                        }
                }

                inputs.push(input);
        }

        return inputs;
};

const parseMetadata = (metaData) => {
        let metaDataParsed = metaData;

        while (metaDataParsed.includes('list<')) {
                metaDataParsed = metaDataParsed.replace(/list<(.+)>/g, '$1[]');
        }

        metaDataParsed = metaDataParsed.replace(
                /"type": "(integer|float|double|long)/g,
                '"type": "number',
        );

        return JSON.parse(metaDataParsed);
};

const parseClassConstructor = (codeSnippets) => {
        if (!codeSnippets) {
                return [];
        }

        const snippet = codeSnippets.find((e) => e.lang === 'TypeScript').code;
        const match = snippet.match(/constructor\((?<params>.+)\)/i);

        if (!match) {
                return [];
        }

        return match.groups.params.split(', ').map((e) => {
                const [name, type] = e.split(': ');

                return { name, type };
        });
};

const parseInPlaceParam = (metadata, codeSnippets) => {
        const { systemdesign, return: retval } = metadata;

        if (systemdesign) {
                return null;
        }

        if (retval.type !== 'void') {
                return null;
        }

        const snippet = codeSnippets.find((e) => e.lang === 'JavaScript').code;
        const match = snippet.match(/modify (?<paramName>.+) in-place/);

        if (!match) {
                return null;
        }

        return match.groups.paramName;
};

const displayWarnings = (problemData) => {
        const { isPaidOnly, metadata } = problemData;
        const { languages, systemdesign, return: retval } = metadata;
        const isJavaScript =
                languages?.length === 2 && languages?.includes('javascript');

        if (isPaidOnly && isJavaScript) {
                console.warn(
                        'JavaScript based premium problems are not fully supported. Solution template most likely contains errors. Outputs will be unavailable. User discretion advised.\n',
                );
        } else if (isPaidOnly) {
                console.warn(
                        'Premium problem detected. Outputs will be unavailable.\n',
                );
        } else if (isJavaScript) {
                console.warn(
                        'JavaScript based problem detected. Assertions will be unavailable. Please write your own in the appropriate test file.\n',
                );
        }

        if (!systemdesign && retval.type === 'void') {
                console.warn(
                        'In-place problem detected. Please verify assertions in the appropriate test file.\n',
                );
        }
};

const parseProblemData = (problemData) => {
        const {
                questionFrontendId,
                questionTitle: title,
                questionTitleSlug: titleSlug,
                questionType: type,
                categoryTitle: category,
                topicTags: topics,
                difficulty,
                stats,
                similarQuestions,
                metaData,
                content,
                exampleTestcaseList,
                codeSnippets,
                isPaidOnly,
        } = problemData;

        handleFatalErrors(problemData);
        const id = Number(questionFrontendId);
        const statsParsed = JSON.parse(stats);
        const similarQuestionsParsed = parseSimilarQuestions(similarQuestions);
        const metadataParsed = parseMetadata(metaData);
        const outputs = parseOutputs(content);
        const inputs = parseInputs(exampleTestcaseList);
        const classConstructorParams = parseClassConstructor(codeSnippets);
        const inPlaceParam = parseInPlaceParam(metadataParsed, codeSnippets);

        const problemDataParsed = {
                id,
                title,
                titleSlug,
                type,
                difficulty,
                category,
                stats: statsParsed,
                topics,
                similarQuestions: similarQuestionsParsed,
                metadata: {
                        ...metadataParsed,
                        classConstructorParams,
                        inputs,
                        outputs,
                        inPlaceParam,
                },
                codeSnippets,
                isPaidOnly,
        };

        displayWarnings(problemDataParsed);

        return problemDataParsed;
};

export { parseProblemData };
