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
        const testcases = htmlContent.match(/<pre>.+?<\/pre>/gis);
        const charMap = {
                '&amp;': '&',
                '&lt;': '<',
                '&gt;': '>',
                '&quot;': `"`,
                '&#39;': `'`,
        };

        const reTags = /<strong>|<\/strong>|<pre>|<\/pre>/gi;
        const reEscp = /&amp;|&lt;|&gt;|&quot;|&#39/g;
        const replaceEscp = (e) => charMap[e];
        const outputs = [];

        for (const testcase of testcases) {
                const sectionTitle = testcase.match(/<strong>.+?<\/strong>/gis);
                const sectionContent = testcase.match(
                        /<\/strong>.+?(<strong>|<\/pre>)/gis,
                );

                for (let i = 0; i < sectionTitle?.length; i++) {
                        const title = sectionTitle?.[i]
                                ?.replace(reTags, '')
                                ?.replace(reEscp, replaceEscp)
                                ?.replace('Output:', 'output')
                                ?.trim();

                        if (title !== 'output') {
                                continue;
                        }

                        const content = sectionContent?.[i]
                                ?.replace(reTags, '')
                                ?.replace(reEscp, replaceEscp)
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
                const input = [];
                const inputStr = testcase.split('\n');

                for (const str of inputStr) {
                        input.push(JSON.parse(str));
                }

                inputs.push(input);
        }

        return inputs;
};

const parseMetadata = (metaData) => {
        const metadataNormalised = metaData
                .replace(/integer|float|double/g, 'number')
                .replace(/list<(.+)>/, '$1[]');

        const metadataParsed = JSON.parse(metadataNormalised);

        return metadataParsed;
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
        } = problemData;

        const id = Number(questionFrontendId);
        const statsParsed = JSON.parse(stats);
        const similarQuestionsParsed = parseSimilarQuestions(similarQuestions);
        const metaDataParsed = parseMetadata(metaData);
        const outputs = parseOutputs(content);
        const inputs = parseInputs(exampleTestcaseList);

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
                metadata: metaDataParsed,
                inputs,
                outputs,
        };
};

export { parseProblemData };
