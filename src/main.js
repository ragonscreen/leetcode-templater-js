#!/usr/bin/env node

import { CONFIG } from './config.js';
import { run } from './run.js';
import { createFile } from './utils/create-file.js';

const { ADD_TESTS } = CONFIG;

const main = async () => {
        const { filePaths, solution, test } = await run();

        await createFile(filePaths.filePathSolution, solution);

        if (ADD_TESTS) {
                await createFile(filePaths.filePathTest, test);
        }
};

await main();
