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
                        './__tests__/problems/1456_maximum-number-of-vowels-in-a-substring-of-given-length/1456_maximum-number-of-vowels-in-a-substring-of-given-length_response.txt',
                        'utf-8',
                ),
        );
});

describe('1456_maximum-number-of-vowels-in-a-substring-of-given-length', () => {
        test('solution template', () => {
                const problemDataParsed = parseProblemData(SOURCE);
                const filePaths = getFilePaths(problemDataParsed);
                const solution = constructSolution(problemDataParsed, filePaths);

                expect(solution).toMatchSnapshot('1456_maximum-number-of-vowels-in-a-substring-of-given-length');
        });
});
