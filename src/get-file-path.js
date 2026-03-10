import { DEFAULTS } from './defaults.js';

const { DIR_SOLUTIONS, DIR_TESTS, DIR_PROBLEMS_SOLVED } = DEFAULTS;

const padNum = (num, len) => String(num).padStart(len, '0');

const getNumberBucket = (num, chunkSize = 200, startIndex = 1, padLen = 4) => {
        const start = Math.floor(num / chunkSize) * chunkSize + startIndex;
        const end = start + chunkSize - 1;
        const bucket = `${padNum(start, padLen)}-${padNum(end, padLen)}`;

        return bucket;
};

const getFilePathBase = (problemData) => {
        const { id, titleSlug } = problemData;
        const bucket = getNumberBucket(id);
        const fileName = `/${bucket}/${padNum(id, 4)}_${titleSlug}`;

        return fileName;
};

const getFilePathSolution = (filePathBase) => {
        return `${DIR_SOLUTIONS}${DIR_PROBLEMS_SOLVED}${filePathBase}.js`;
};

const getFilePathTest = (filePathBase) => {
        return `${DIR_TESTS}${DIR_PROBLEMS_SOLVED}${filePathBase}.test.js`;
};

const getFilePaths = (problemData) => {
        const filePathBase = getFilePathBase(problemData);
        const filePathSolution = getFilePathSolution(filePathBase);
        const filePathTest = getFilePathTest(filePathBase);

        return { filePathSolution, filePathTest };
};

export { getFilePaths };
