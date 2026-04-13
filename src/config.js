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
 * @prop {boolean} ADD_TESTS - whether or not to create test files
 * @prop {string} TEST_FRAMEWORK - framework used for testing solutions
 * (one of 'bun:test', 'vitest', or 'jest')
 *
 * @prop {string[]} DIR_SOLUTIONS=['src'] - base directory for solution files
 * @prop {string[]} DIR_TESTS=['__tests__'] - base directory for test files
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
 * @prop {boolean} ADD_TOPICS - whether to add problem topics to the solution description
 * @prop {boolean} ADD_STATS - whether to add problem stats to the solution description
 * @prop {boolean} ADD_SIMILAR_PROBLEMS - whether to add similar problems to the solution description
 */
const DEFAULTS = {
        SOLUTION_AUTHOR_NAME: 'ragonscreen',
        SOLUTION_AUTHOR_URL: 'https://github.com/ragonscreen/',

        INDENT_STYLE: 'spaces',
        INDENT_WIDTH: 4,

        ADD_TESTS: true,
        TEST_FRAMEWORK: 'bun:test',

        DIR_TESTS: ['__tests__'],
        DIR_SOLUTIONS: ['src'],

        USE_DIR_BUCKET: true,
        BUCKET_CHUNK_SIZE: 100,

        USE_ARROW_FUNCTIONS: true,

        USE_ESM_SYNTAX: true,

        USE_RELATIVE_IMPORTS: false,

        ADD_COMMENTS: true,
        ADD_DESCRIPTION: true,
        ADD_PROBLEM_URL: true,
        ADD_PROBLEM_CATEGORY: true,
        ADD_PROBLEM_DIFFICULTY: true,
        ADD_DATE: true,
        ADD_AUTHOR: true,
        ADD_PROBLEM_TOPICS: true,
        ADD_PROBLEM_STATS: true,
        ADD_SIMILAR_PROBLEMS: true,
        MAX_SIMILAR_PROBLEMS: 10,
        SORT_SIMILAR_PROBLEMS: true,
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
