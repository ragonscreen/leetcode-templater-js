import { join } from 'node:path';

import { CONFIG } from './config.js';

const padNum = (num, len) => String(num).padStart(len, '0');

const sanitiseDirName = (dirName) => {
        return dirName.replace(/\/|\\/g, '').replace(/^(\.|\s)+$/g, '');
};

const isValidDir = (dir) => dir.length && dir?.every((e) => e);

const getNumberBucket = (num, chunkSize = 200, startIndex = 1, padLen = 4) => {
        const _chunkSize = Math.max(chunkSize, 1);
        const start = Math.floor(num / _chunkSize) * _chunkSize + startIndex;
        const end = start + _chunkSize - 1;
        const bucket = `${padNum(start, padLen)}-${padNum(end, padLen)}`;

        return bucket;
};

const getFilePathBase = (problemData) => {
        const { id, titleSlug } = problemData;
        const { USE_DIR_BUCKET, BUCKET_CHUNK_SIZE } = CONFIG;
        const filePath = [];

        if (USE_DIR_BUCKET) {
                filePath.push(getNumberBucket(id, BUCKET_CHUNK_SIZE));
        }

        filePath.push(`${padNum(id, 4)}_${titleSlug}`);

        return filePath;
};

const getFilePath = (filePathBase, isTestDir = false) => {
        const { DIR_TESTS, DIR_SOLUTIONS } = CONFIG;
        const defaultDir = isTestDir ? '__tests__' : 'src';
        const userDir = isTestDir ? DIR_TESTS : DIR_SOLUTIONS;
        let dir = Array.isArray(userDir) ? userDir : [String(userDir)];
        dir = dir.map((e) => sanitiseDirName(e));

        if (!isValidDir(dir)) {
                console.warn(
                        `Invalid ${isTestDir ? 'test' : 'solution'} directory found. Using '${defaultDir}'.`,
                );
                dir = [defaultDir];
        }

        return `${join(...dir, ...filePathBase)}${isTestDir ? '.test' : ''}.js`;
};

const getFilePaths = (problemData) => {
        const filePathBase = getFilePathBase(problemData);
        const filePathSolution = getFilePath(filePathBase);
        const filePathTest = getFilePath(filePathBase, true);

        return { filePathSolution, filePathTest };
};

export { getFilePaths };
