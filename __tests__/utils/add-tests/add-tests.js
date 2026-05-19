import { run } from '../../../src/run.js';
import { createFile } from '../../../src/utils/create-file.js';
import { padNum } from '../../../src/utils/pad-num.js';

const constructTestStr = (problemTitle, fileNameBase, type = 'solution') => {
        const typeNormalised = `${type[0].toUpperCase()}${type.slice(1)}`;

        return `import { beforeAll, describe, expect, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

mock.module('../../../src/utils/get-current-date.js', () => {
        return {
                getCurrentDate: () => '2026-04-27',
        };
});

import { construct${typeNormalised} } from '../../../src/construct-problem-files/construct-problem-files.js';
import { getFilePaths } from '../../../src/get-file-paths.js';
import { parseProblemData } from '../../../src/parse-problem-data/parse-problem-data.js';

let SOURCE;

beforeAll(async () => {
        SOURCE = JSON.parse(
                await readFile(
                        '${fileNameBase}_response.txt',
                        'utf-8',
                ),
        );
});

describe('${problemTitle}', () => {
        test('${type} file', () => {
                const problemDataParsed = parseProblemData(SOURCE);
                const filePaths = getFilePaths(problemDataParsed);
                const ${type} = construct${typeNormalised}(problemDataParsed, filePaths);

                expect(${type}).toMatchSnapshot('${problemTitle}');
        });
});
`;
};

const addTests = async () => {
        const { problemData, problemDataParsed } = await run();
        const { id, titleSlug } = problemDataParsed;
        const problemId = `${padNum(id)}_${titleSlug}`;
        const fileNameBase = `./__tests__/problems/${problemId}/${problemId}`;

        const filePathResponse = `${fileNameBase}_response.txt`;
        await createFile(filePathResponse, JSON.stringify(problemData));

        const strSol = constructTestStr(problemId, fileNameBase, 'solution');
        const filePathSolution = `${fileNameBase}_solution-file.test.js`;
        await createFile(filePathSolution, strSol);

        const strTest = constructTestStr(problemId, fileNameBase, 'test');
        const filePathTest = `${fileNameBase}_test-file.test.js`;
        await createFile(filePathTest, strTest);
};

await addTests();
