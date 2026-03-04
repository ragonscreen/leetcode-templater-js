import { readFile } from 'node:fs/promises';
import { argv } from 'node:process';
import { buildFileSolution, buildFileTest } from './build-problem-files.js';
import { getFilePathSolution, getFilePathTest } from './get-file-path.js';
import { parseProblemData } from './parse-problem-data.js';

const parseProvidedIdentifier = () => {
        return argv[2]
                ?.replace(/https:\/\/|problems\/|leetcode\.com\//gi, '')
                ?.split('/')?.[0];
};

const getQuery = async () => {
        return await readFile('src/graphql/get-problem-detail.gql', 'utf-8');
};

const getProblemData = async (query, titleSlug) => {
        const res = await fetch('https://leetcode.com/graphql', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        // Cookie: 'LEETCODE_SESSION=x; csrftoken=x',
                        // 'Referer': 'https://leetcode.com/problems/asteroid-collision/description/'
                },
                body: JSON.stringify({
                        query,
                        variables: { titleSlug },
                }),
        });

        const data = await res.json();

        return data?.data?.question;
};

const throwIdentifierError = () => {
        throw new Error(`
Invalid identifier. Identifier must be a valid problem slug of one of the following forms:

https://leetcode.com/problems/two-sum
leetcode.com/problems/two-sum
problems/two-sum
two-sum`);
};

const main = async () => {
        const titleSlug = parseProvidedIdentifier();

        if (!titleSlug) {
                throwIdentifierError();
        }

        const query = await getQuery();
        const problemData = await getProblemData(query, titleSlug);

        if (!problemData) {
                throwIdentifierError();
        }

        const problemDataParsed = parseProblemData(problemData);
        const filePathSolution = getFilePathSolution(problemDataParsed);
        const filePathTest = getFilePathTest(problemDataParsed);
        const solution = buildFileSolution(problemDataParsed);
        const test = buildFileTest(problemDataParsed, filePathSolution);

        console.log(filePathSolution);
        console.log('');
        console.log(solution);
        console.log('');
        console.log(filePathTest);
        console.log('');
        console.log(test);

        console.dir(problemDataParsed, { depth: null });
};

await main();

// TODO: construct-string_test-class
// FIXME: construct-string_test-function -- undefined vs null vs void when checking return values in output[i], use appropriate matcher (.toBeNull, .toBeUndefined)
// TODO: no inputs/outputs for premium problems
// TODO: consider adding explanations given for testcases under each testcase?
