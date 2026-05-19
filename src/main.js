#!/usr/bin/env node

import { CONFIG } from './config.js';
import { run } from './run.js';
import { createFile } from './utils/create-file.js';

const { ADD_TESTS } = CONFIG;

const main = async () => {
        const { solution, test } = await run();

        console.log(solution);
        console.log();
        console.log(test);

        // await createFile(filePaths.filePathSolution, solution);

        if (ADD_TESTS) {
                // await createFile(filePaths.filePathTest, test);
        }
};

await main();
