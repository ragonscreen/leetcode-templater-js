import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { argv } from 'node:process';
import { fileURLToPath } from 'node:url';

import {
        constructSolution,
        constructTest,
} from './construct-problem-files/construct-problem-files.js';
import { getFilePaths } from './get-file-paths.js';
import { getProblemData } from './get-problem-data.js';
import { parseProblemData } from './parse-problem-data/parse-problem-data.js';

const parseProvidedIdentifier = () => {
        return argv[2]
                ?.replace(
                        /https:\/\/|problems\/|leetcode\.com\/|neetcode\.io\//gi,
                        '',
                )
                ?.split('/')?.[0];
};

const getQuery = async () => {
        const queryPath = resolve(
                dirname(fileURLToPath(import.meta.url)),
                './graphql/get-problem-detail.gql',
        );

        return await readFile(queryPath, 'utf-8');
};

const throwIdentifierError = () => {
        throw new Error(`
Invalid identifier. Identifier must be a valid problem slug of one of the following forms:

https://leetcode.com/problems/two-sum
leetcode.com/problems/two-sum
problems/two-sum
two-sum`);
};

const run = async () => {
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
        const filePaths = getFilePaths(problemDataParsed);
        const solution = constructSolution(problemDataParsed);
        const test = constructTest(problemDataParsed, filePaths);

        return { problemData, problemDataParsed, filePaths, solution, test };
};

export { run };
