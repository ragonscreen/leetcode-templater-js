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
                        './__tests__/problems/1475_final-prices-with-a-special-discount-in-a-shop/1475_final-prices-with-a-special-discount-in-a-shop_response.txt',
                        'utf-8',
                ),
        );
});

describe('1475_final-prices-with-a-special-discount-in-a-shop', () => {
        test('solution template', () => {
                const problemDataParsed = parseProblemData(SOURCE);
                const filePaths = getFilePaths(problemDataParsed);
                const solution = constructSolution(problemDataParsed, filePaths);

                expect(solution).toMatchSnapshot('1475_final-prices-with-a-special-discount-in-a-shop');
        });
});
