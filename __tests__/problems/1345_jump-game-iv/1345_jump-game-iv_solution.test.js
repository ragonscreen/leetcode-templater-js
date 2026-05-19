import { beforeAll, describe, expect, mock, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

mock.module('../../../src/utils/get-current-date.js', () => {
        return {
                getCurrentDate: () => '2026-04-27',
        };
});

import { constructSolution } from '../../../src/construct-problem-files/construct-problem-files.js';
import { getFilePaths } from '../../../src/get-file-paths.js';
import { parseProblemData } from '../../../src/parse-problem-data/parse-problem-data.js';

let SOURCE;

beforeAll(async () => {
        SOURCE = JSON.parse(
                await readFile(
                        './__tests__/problems/1345_jump-game-iv/1345_jump-game-iv_response.txt',
                        'utf-8',
                ),
        );
});

describe('1345_jump-game-iv', () => {
        test('solution template', () => {
                const problemDataParsed = parseProblemData(SOURCE);
                const filePaths = getFilePaths(problemDataParsed);
                const solution = constructSolution(problemDataParsed, filePaths);

                expect(solution).toMatchSnapshot('1345_jump-game-iv');
        });
});
