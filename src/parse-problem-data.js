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
        };

        const re = {
                testcases: /<pre>.+?<\/pre>|<div class="example-block">.+?<\/div>/gis,
                tags: /<strong>|<\/strong>|<pre>|<\/pre>|<span class="example-io">|<\/span>/gi,
                escape: /&amp;|&lt;|&gt;|&quot;|&#39;/gi,
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

                        outputs.push(JSON.parse(content));
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
                        input.push(JSON.parse(str));
                }

                inputs.push(input);
        }

        return inputs;
};

const parseMetadata = (metaData) => {
        return JSON.parse(
                metaData
                        .replace(/integer|float|double/g, 'number')
                        .replace(/list<(.+)>/g, '$1[]'),
        );
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

        if (isPaidOnly) {
                console.warn(
                        `Premium problem encountered. Outputs will be unavailable.`,
                );
        }

        const id = Number(questionFrontendId);
        const statsParsed = JSON.parse(stats);
        const similarQuestionsParsed = parseSimilarQuestions(similarQuestions);
        const metadataParsed = parseMetadata(metaData);
        const outputs = parseOutputs(content);
        const inputs = parseInputs(exampleTestcaseList);
        const classConstructorParams = parseClassConstructor(codeSnippets);

        return {
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
                },
        };
};

export { parseProblemData };
