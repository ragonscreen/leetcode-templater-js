import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

/**
 * Default configuration
 *
 * @prop {string} SOLUTION_AUTHOR_NAME - name of the solution author
 * @prop {string} SOLUTION_AUTHOR_URL - URL of the solution author
 *
 * @prop {string} INDENT_STYLE - indent style - `tabs` or `spaces`
 * @prop {number} INDENT_WIDTH - indent width (minimum: 1)
 *
 * @prop {boolean} ADD_TESTS - create test files
 * @prop {string} TEST_FRAMEWORK - framework used for testing solutions
 * (one of 'bun:test', 'vitest', or 'jest')
 *
 * @prop {string[]} DIR_SOLUTIONS - base directory for solution files
 * @prop {string[]} DIR_TESTS - base directory for test files
 *
 * @prop {boolean} USE_DIR_BUCKET - use a bucket directory for sorting problems
 * @prop {number} BUCKET_CHUNK_SIZE - size of the bucket used (minimum: 1)
 *
 * @prop {boolean} USE_ARROW_FUNCTIONS - use arrow functions for solutions
 * class methods always use non-arrow syntax
 *
 * @prop {boolean} USE_ESM_SYNTAX - use ESM syntax over CJS
 * affects how modules are imported and exported
 *
 * @prop {boolean} USE_RELATIVE_IMPORTS - use relative import paths when
 * importing solutions into test files
 *
 * @prop {boolean} ADD_COMMENTS - add comments in the solution file
 *
 * @prop {boolean} ADD_DESCRIPTION - add a description in the solution file
 * @prop {boolean} ADD_PROBLEM_URL - add the problem url to the solution description
 * @prop {boolean} ADD_PROBLEM_CATEGORY - add the problem category to the solution description
 * @prop {boolean} ADD_PROBLEM_DIFFICULTY - add the problem difficulty to the solution description
 * @prop {boolean} ADD_DATE - add the current date to the solution description
 * @prop {boolean} ADD_AUTHOR - add author information to the solution description
 * @prop {boolean} ADD_PROBLEM_TOPICS - add the problem topics to the solution description
 * @prop {boolean} ADD_PROBLEM_POSITIONS - add the problem position tags to the solution description
 * @prop {boolean} ADD_PROBLEM_CONTESTS - add the problem contest tags to the solution description
 * @prop {boolean} ADD_PROBLEM_STATS - add the problem stats to the solution description
 * @prop {boolean} ADD_SIMILAR_PROBLEMS - add similar problems to the solution description
 * @prop {number} MAX_SIMILAR_PROBLEMS - maximum number of similar problems to add to the solution description (minimum: 1)
 * setting it to 0 will add all available similar problems
 * @prop {boolean} SORT_SIMILAR_PROBLEMS - sort the similar problems added to the solution description
 * problems are sorted by difficulty - easiest first, then by title
 * @prop {boolean} ADD_HINTS - add the problem hints to the solution description
 */
const DEFAULTS = {
        SOLUTION_AUTHOR_NAME: '<SOLUTION_AUTHOR_NAME>',
        SOLUTION_AUTHOR_URL: '<SOLUTION_AUTHOR_URL>',

        INDENT_STYLE: 'spaces',
        INDENT_WIDTH: 4,

        ADD_TESTS: true,
        TEST_FRAMEWORK: 'bun:test',

        DIR_SOLUTIONS: ['src'],
        DIR_TESTS: ['__tests__'],

        USE_DIR_BUCKET: true,
        BUCKET_CHUNK_SIZE: 100,

        USE_ARROW_FUNCTIONS: true,

        USE_ESM_SYNTAX: true,

        USE_RELATIVE_IMPORTS: true,

        ADD_COMMENTS: true,

        ADD_DESCRIPTION: true,
        ADD_PROBLEM_URL: true,
        ADD_PROBLEM_CATEGORY: true,
        ADD_PROBLEM_DIFFICULTY: true,
        ADD_DATE: true,
        ADD_AUTHOR: true,
        ADD_PROBLEM_TOPICS: true,
        ADD_PROBLEM_POSITIONS: true,
        ADD_PROBLEM_CONTESTS: true,
        ADD_PROBLEM_STATS: true,
        ADD_SIMILAR_PROBLEMS: true,
        MAX_SIMILAR_PROBLEMS: 0,
        SORT_SIMILAR_PROBLEMS: true,
        ADD_HINTS: true,
};

const loadUserConfig = async () => {
        try {
                const pkgPath = resolve(cwd(), 'package.json');
                const pkg = JSON.parse(await readFile(pkgPath, 'utf-8'));

                return pkg.lct ?? {};
        } catch {
                return {};
        }
};

const getConfig = async () => {
        const userConfig = await loadUserConfig();

        return { ...DEFAULTS, ...userConfig };
};

const CONFIG = await getConfig();

export { CONFIG };
