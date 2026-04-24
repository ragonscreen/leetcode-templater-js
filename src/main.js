#!/usr/bin/env node

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { argv } from 'node:process';
import { fileURLToPath } from 'node:url';
import { CONFIG } from './config.js';
import { constructSolution, constructTest } from './construct-problem-files.js';
import { getFilePaths } from './get-file-paths.js';
import { parseProblemData } from './parse-problem-data/parse-problem-data.js';

const { ADD_TESTS } = CONFIG;

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

const getProblemData = async (query, titleSlug) => {
        const res = await fetch('https://leetcode.com/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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

const createFile = async (filePath, fileContents) => {
        const dir = filePath.split('/').slice(0, -1).join('/');
        await mkdir(dir, { recursive: true });

        try {
                await writeFile(filePath, fileContents, {
                        flag: 'wx',
                        encoding: 'utf-8',
                });

                console.info(`File '${filePath}' created.`);
        } catch (error) {
                if (error.code === 'EEXIST') {
                        console.warn(`File '${filePath}' already exists.`);
                } else {
                        throw error;
                }
        }
};

const main = async () => {
        const titleSlug = parseProvidedIdentifier();

        if (!titleSlug) {
                throwIdentifierError();
        }

        const query = await getQuery();

        const problemData = await getProblemData(query, titleSlug);

        // console.log(problemData);

        if (!problemData) {
                throwIdentifierError();
        }

        const problemDataParsed = parseProblemData(problemData);

        console.dir(problemDataParsed, { depth: null });

        const filePaths = getFilePaths(problemDataParsed);
        const solution = constructSolution(problemDataParsed);

        console.log(solution);
        console.log();

        // await createFile(filePaths.filePathSolution, solution);

        if (ADD_TESTS) {
                const test = constructTest(problemDataParsed, filePaths);
                console.log(test);
                // await createFile(filePaths.filePathTest, test);
        }
};

await main();
