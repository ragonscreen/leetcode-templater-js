import { beforeAll, describe, expect, mock, test } from 'bun:test';
import { readFile } from 'node:fs/promises';

mock.module('../../../src/utils/get-current-date.js', () => {
        return {
                getCurrentDate: () => '2026-04-27',
        };
});

import { constructTest } from '../../../src/construct-problem-files/construct-problem-files.js';
import { getFilePaths } from '../../../src/get-file-paths.js';
import { parseProblemData } from '../../../src/parse-problem-data/parse-problem-data.js';

let SOURCE;

beforeAll(async () => {
        SOURCE = JSON.parse(
                await readFile(
                        './__tests__/problems/3913_sort-vowels-by-frequency/3913_sort-vowels-by-frequency_response.txt',
                        'utf-8',
                ),
        );
});

describe('3913_sort-vowels-by-frequency', () => {
        test('test template', () => {
                const problemDataParsed = parseProblemData(SOURCE);
                const filePaths = getFilePaths(problemDataParsed);
                const test = constructTest(problemDataParsed, filePaths);

                expect(test).toMatchSnapshot('3913_sort-vowels-by-frequency');
        });
});
