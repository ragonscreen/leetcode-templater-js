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
                        './__tests__/problems/0852_peak-index-in-a-mountain-array/0852_peak-index-in-a-mountain-array_response.txt',
                        'utf-8',
                ),
        );
});

describe('0852_peak-index-in-a-mountain-array', () => {
        test('solution template', () => {
                const problemDataParsed = parseProblemData(SOURCE);
                const filePaths = getFilePaths(problemDataParsed);
                const solution = constructSolution(problemDataParsed, filePaths);

                expect(solution).toMatchSnapshot('0852_peak-index-in-a-mountain-array');
        });
});
