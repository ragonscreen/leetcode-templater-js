# Leetcode Templater JS

Highly confgurable test and solution file template generator for LeetCode problems.

## Installation

bun

```sh
bun add -D leetcode-templater-js
```

node

```sh
npm install -D leetcode-templater-js
```

pnpm

```sh
pnpm add -D leetcode-templater-js
```

## Usage

bun

```sh
bunx lct <problem_slug>
```

node

```sh
npx lct <problem_slug>
```

## Features

### Configuration

The templater is highly configurable. It is **strongly recommended** to use your own custom configuration before getting started. Refer to the [Configuration Options](#configuration-options) section for more information.

### Template Generation

Automatically generates a solution and a test file containing default tests, with all data sourced straight from leetcode.

```sh
bunx lct house-robber-iv
```

Running the above command will generate a solution file `2560_house-robber-iv.js` and a test file `2560_house-robber-iv.test.js` with the following contents:

File: `2560_house-robber-iv.js`

```javascript
/**
 * 2560. House Robber IV
 *
 * Link: https://leetcode.com/problems/house-robber-iv/
 * Category: Algorithms
 * Difficulty: Medium
 * Date: <CURRENT_DATE>
 * Author: <SOLUTION_AUTHOR_NAME> (<SOLUTION_AUTHOR_URL>)
 *
 * Topics:
 * - Array (topic_5)
 * - Binary Search (topic_11)
 * - Dynamic Programming (topic_13)
 * - Greedy (topic_17)
 * - Staff (position_staff)
 * - Weekly Contest 331 (contest_weekly-contest-331)
 *
 * Stats:
 * - Total Accepted: 140,228
 * - Total Submissions: 216,657
 * - Acceptance Rate: 64.7%
 *
 * Similar Problems:
 * - container-with-most-water (Medium)
 * - house-robber (Medium)
 *
 * Hints:
 * 1. Can we use binary search to find the minimum value of a non-contiguous
 * subsequence of a given size k?
 *
 * 2. Initialize the search range with the minimum and maximum elements of the
 * input array.
 *
 * 3. Use a check function to determine if it is possible to select k
 * non-consecutive elements that are less than or equal to the current
 * "guess" value.
 *
 * 4. Adjust the search range based on the outcome of the check function, until
 * the range converges and the minimum value is found.
 */

/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minCapability = (nums, k) => {};

export { minCapability };
```

File: `2560_house-robber-iv.test.js`

```javascript
import { describe, expect, test } from 'bun:test';
import { minCapability } from '2560_house-robber-iv.js';

const testcases = [
        { nums: [2, 3, 5, 9], k: 2, expected: 5 },
        { nums: [2, 7, 9, 3, 1], k: 2, expected: 2 },
];

describe('minCapability', () => {
        test.each(structuredClone(testcases))(
                'minCapability($nums, $k) -> $expected',
                ({ nums, k, expected }) => {
                        expect(minCapability(nums, k)).toStrictEqual(expected);
                },
        );
});
```

Adding your own testcases is easy. Simply add more lines to the `testcases` array, containing your custom testcases.

```javascript
const testcases = [
        // default testcases
        { nums: [2, 3, 5, 9], k: 2, expected: 5 },
        { nums: [2, 7, 9, 3, 1], k: 2, expected: 2 },

        // custom testcases
        { nums: [2, 3, 5, 9, 4], k: 3, expected: 5 },
        { nums: [2, 1, 5, 1, 4, 2], k: 3, expected: 2 },
];
```

If you would like to write multiple solutions, simply add more functions below your current one and modify the exports object:

```javascript
/**
 * Approach: Binary Search + Greedy
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minCapability = (nums, k) => {
        // code
};

/**
 * Approach: Dynamic Programming
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minCapability1 = (nums, k) => {
        // code
};

export { minCapability, minCapability1 };
```

Then, import them in the test file and copy the `describe` function for each new solution.

```javascript
import { describe, expect, test } from 'bun:test';
import { minCapability, minCapability1 } from '2560_house-robber-iv.js';

const testcases = [
        { nums: [2, 3, 5, 9], k: 2, expected: 5 },
        { nums: [2, 7, 9, 3, 1], k: 2, expected: 2 },
];

describe('minCapability', () => {
        test.each(structuredClone(testcases))(
                'minCapability($nums, $k) -> $expected',
                ({ nums, k, expected }) => {
                        expect(minCapability(nums, k)).toStrictEqual(expected);
                },
        );
});

describe('minCapability1', () => {
        test.each(structuredClone(testcases))(
                'minCapability1($nums, $k) -> $expected',
                ({ nums, k, expected }) => {
                        expect(minCapability1(nums, k)).toStrictEqual(expected);
                },
        );
});
```

> Note that for every following template example, the description has been trimmed to only include the highlighted sections.

### Multiple Identifier Support

Supports the following forms of identifiers (including sublinks such as `description/`, `submissions/`, `solutions/`, etc.) as valid problem slugs:

```sh
two-sum

problems/two-sum/

leetcode.com/problems/two-sum/

https://leetcode.com/problems/two-sum/

https://neetcode.io/problems/two-sum/
# NOTE: neetcode.io occasionally uses different problem slugs for their problems
# than their leetcode counterpart. As such, it is recommended to always use
# identifiers from leetcode.com
```

### Regular Algorithm Problems

Supports basic algorithm problems which involve returning a specific value and matching it with the expected value. These make up the vast majority of the problems available on LeetCode. Examples include `0020_valid-parentheses`, `0217_contains-duplicate`, `0735_asteroid-collision`, etc.

### In-Place Algorithm Problems

Supports algorithm problems which involve modifying the inputs in some way, which is then checked against the expected value. Examples include `0026_remove-duplicates-from-sorted-array`, `0189_rotate-array`, `0344_reverse-string`, etc.

```sh
bunx lct rotate-array
```

Running the above command will generate the following files:

File: `0189_rotate-array.js`

```javascript
/**
 * 0189. Rotate Array
 */

/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {void}
 */
const rotate = (nums, k) => {};

export { rotate };
```

File: `0189_rotate-array.test.js`

```javascript
import { describe, expect, test } from 'bun:test';
import { rotate } from '0189_rotate-array.js';

const testcases = [
        { nums: [1, 2, 3, 4, 5, 6, 7], k: 3, expected: [5, 6, 7, 1, 2, 3, 4] },
        { nums: [-1, -100, 3, 99], k: 2, expected: [3, 99, -1, -100] },
];

describe('rotate', () => {
        test.each(structuredClone(testcases))(
                'rotate($nums, $k) -> $expected',
                ({ nums, k, expected }) => {
                        expect(rotate(nums, k)).toBeNil();
                        expect(nums).toStrictEqual(expected);
                },
        );
});
```

> Please note that LeetCode is arbitrary with the parameter that is supposed to be mutated in place. As such, it is **strongly recommended** to verify the assertion in the test file yourself before running tests.
>
> Additionally, the nullish matcher changes based on the configured test framework. `toBeNil()` for `bun:test`, `toBeNullable()` for `vitest`, and `toBeUndefined()` for `jest`. For more information, refer to [Tests](#tests).

### System Design Algorithm Problems

Supports algorithm problems involving the creation of a custom class with a constructor and methods. Examples include `0155_min-stack`, `0304_range-sum-query-2d-immutable`, `0901_online-stock-span`, etc.

```sh
bunx lct range-sum-query-2d-immutable
```

Running the above command will generate the following files:

File: `0304_range-sum-query-2d-immutable.js`

```javascript
/**
 * 0304. Range Sum Query 2D - Immutable
 */

/**
 * Approach:
 */
class NumMatrix {
        /**
         * Time Complexity: O()
         * Space Complexity: O()
         *
         * @param {number[][]} matrix
         */
        constructor(matrix) {}

        /**
         * Time Complexity: O()
         * Space Complexity: O()
         *
         * @param {number} row1
         * @param {number} col1
         * @param {number} row2
         * @param {number} col2
         * @return {number}
         */
        sumRegion(row1, col1, row2, col2) {}
}

export { NumMatrix };
```

File: `0304_range-sum-query-2d-immutable.test.js`

```javascript
import { describe, expect, test } from 'bun:test';
import { NumMatrix } from '0304_range-sum-query-2d-immutable.js';

describe('NumMatrix', () => {
        test('default test 1', () => {
                const numMatrix = new NumMatrix([
                        [3, 0, 1, 4, 2],
                        [5, 6, 3, 2, 1],
                        [1, 2, 0, 1, 5],
                        [4, 1, 0, 1, 7],
                        [1, 0, 3, 0, 5],
                ]);

                expect(numMatrix.sumRegion(2, 1, 4, 3)).toStrictEqual(8);
                expect(numMatrix.sumRegion(1, 1, 2, 2)).toStrictEqual(11);
                expect(numMatrix.sumRegion(1, 2, 2, 4)).toStrictEqual(12);
        });
});
```

## Partial / Experimental Support

### Premium Problems

Partially supports premium regular and system design algorithm problems. Since LeetCode does not provide the HTML content of premium problems, outputs are not able to be parsed, and as such are unavailable in the test file. You must write your own outputs or copy them manually from LeetCode if you have access to a premium account. Examples include `0249_group-shifted-strings`, `0271_encode-and-decode-strings`, `0360_sort-transformed-array`, etc.

```sh
bunx lct sort-transformed-array
```

Running the above command will generate the following files:

File: `0360_sort-transformed-array.js`

```javascript
/**
 * 0360. Sort Transformed Array
 */

/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number[]} nums
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @return {number[]}
 */
const sortTransformedArray = (nums, a, b, c) => {};

export { sortTransformedArray };
```

File: `0360_sort-transformed-array.test.js`

```javascript
import { describe, expect, test } from 'bun:test';
import { sortTransformedArray } from '0360_sort-transformed-array.js';

const testcases = [
        { nums: [-4, -2, 2, 4], a: 1, b: 3, c: 5, expected: undefined },
        { nums: [-4, -2, 2, 4], a: -1, b: 3, c: 5, expected: undefined },
];

describe('sortTransformedArray', () => {
        test.each(structuredClone(testcases))(
                'sortTransformedArray($nums, $a, $b, $c) -> $expected',
                ({ nums, a, b, c, expected }) => {
                        expect(
                                sortTransformedArray(nums, a, b, c),
                        ).toStrictEqual(expected);
                },
        );
});
```

> Notice that `expected` is set to `undefined` for each testcase, as outputs are unavailable for premium problems. This is not the expected return value, and as such, you must add the output yourself or copy it from some other source.

### JavaScript Problems

Partially supports JavaScript problems. As JavaScript problems usually have requirements unique to each problem, there is no one catch-all matcher for every JavaScript problem. Therefore, you must write your own assertions in the appropriate test file. Examples include `2620_counter`, `2623_memoize`, `2667_create-hello-world-function`, etc.

```sh
bunx lct create-hello-world-function
```

Running the above command will generate the following files:

File: `2667_create-hello-world-function.js`

```javascript
/**
 * 2667. Create Hello World Function
 */

/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @return {Function}
 */
const createHelloWorld = () => {
        return function (...args) {};
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */

export { createHelloWorld };
```

File: `2667_create-hello-world-function.test.js`

```javascript
import { describe, expect, test } from 'bun:test';
import { createHelloWorld } from '2667_create-hello-world-function.js';

const testcases = [
        { args: [], expected: 'Hello World' },
        { args: [{}, null, 42], expected: 'Hello World' },
];

describe('createHelloWorld', () => {
        test.each(structuredClone(testcases))(
                'createHelloWorld($args) -> $expected',
                ({ args, expected }) => {
                        expect();
                },
        );
});
```

> Sometimes the outputs are objects, and may not reflect the actual output correctly. It is **strongly recommended** to verify the outputs in the test file yourself before running tests.

### Premium JavaScript Problems

Support for premium JavaScript problems is experimental. Just like regular premium problems and javascript problems, outputs and assertions are unavailable. The solution template might also contain errors. You must write your own outputs and assertions, and verify the solution template. Examples include `2632_curry`, `2676_throttle`, `2775_undefined-to-null`, etc.

```sh
bunx lct throttle
```

Running the above command will generate the following files:

File: `2676_throttle.js`

```javascript
/**
 * 2676. Throttle
 */

/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number} t
 * @param {string} fn
 * @return {number}
 */
const throttle = (t, fn) => {};

export { throttle };
```

File: `2676_throttle.test.js`

```javascript
import { describe, expect, test } from 'bun:test';
import { throttle } from '../../../src/problems/2601-2700/2676_throttle.js';

const testcases = [
        { t: 100, fn: [{ t: 20, inputs: [1] }], expected: undefined },
        {
                t: 50,
                fn: [
                        { t: 50, inputs: [1] },
                        { t: 75, inputs: [2] },
                ],
                expected: undefined,
        },
        {
                t: 70,
                fn: [
                        { t: 50, inputs: [1] },
                        { t: 75, inputs: [2] },
                        { t: 90, inputs: [8] },
                        { t: 140, inputs: [5, 7] },
                        { t: 300, inputs: [9, 4] },
                ],
                expected: undefined,
        },
];

describe('throttle', () => {
        test.each(structuredClone(testcases))(
                'throttle($t, $fn) -> $expected',
                ({ t, fn, expected }) => {
                        expect();
                },
        );
});
```

### Interactive Problems

Support for interactive problems is experimental. Interactive problems involve calling an internal API, and said API is unavailable to the client. As a result, the solution template is not able to account for the API and might contain errors. You must write your own API that is then passed to the solution function in the tests, and edit the solution and test files appropriately. Examples include `0278_first-bad-version`, `0843_guess-the-word`, `1095_find-in-mountain-array`, etc.

```sh
bunx lct first-bad-version
```

Running the above command will generate the following files:

File: `0278_first-bad-version.js`

```javascript
/**
 * 0278. First Bad Version
 */

/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number} n
 * @param {number} bad
 * @return {number}
 */
const firstBadVersion = (n, bad) => {};

export { firstBadVersion };
```

File: `0278_first-bad-version.test.js`

```javascript
import { describe, expect, test } from 'bun:test';
import { firstBadVersion } from '../../../src/problems/0201-0300/0278_first-bad-version.js';

const testcases = [
        { n: 5, bad: 4, expected: 4 },
        { n: 1, bad: 1, expected: 1 },
];

describe('firstBadVersion', () => {
        test.each(structuredClone(testcases))(
                'firstBadVersion($n, $bad) -> $expected',
                ({ n, bad, expected }) => {
                        expect(firstBadVersion(n, bad)).toStrictEqual(expected);
                },
        );
});
```

> Notice that in the above example, the inputs and the solution function are completely inaccurate. The solution function should instead be getting the API with the appropriate methods passed in as a parameter, and returning a function instead.

## Configuration Options

This templater is highly configurable, and it is **strongly recommended** to get it configured before getting started. Create an object with the key `lct` in your `package.json` file. This object will contain all the options you wish to configure.

File: `package.json`

```json
{
        "lct": {}
}
```

Example configuration:

```json
{
        "name": "leetcode-solutions",
        "author": "ragonscreen",
        "version": "1.0.0",
        "type": "module",
        "scripts": {
                "dev": "bun --watch run main.js"
        },
        "lct": {
                "SOLUTION_AUTHOR_NAME": "ragonscreen",
                "SOLUTION_AUTHOR_URL": "https://github.com/ragonscreen/",
                "MAX_SIMILAR_PROBLEMS": 5,
                "ADD_HINTS": false
        }
}
```

The following configuration options are available, with their default values set in the examples.

### Solution Author

Set your own personal information. This shows up in the description of each solution.

```javascript
/**
 * @prop {string} SOLUTION_AUTHOR_NAME - name of the solution author
 * @prop {string} SOLUTION_AUTHOR_URL - URL of the solution author
 */
{
        SOLUTION_AUTHOR_NAME: '<SOLUTION_AUTHOR_NAME>',
        SOLUTION_AUTHOR_URL: '<SOLUTION_AUTHOR_URL>',
}
```

`SOLUTION_AUTHOR_NAME`=`Lorem Ipsum` and `SOLUTION_AUTHOR_URL`=`https://leetcode.com/`

```javascript
/**
 * 0001. Two Sum
 *
 * Author: Lorem Ipsum (https://leetcode.com/)
 */
```

### Indentation

Change the character used for indentation, and the width per indent, across all solution and test files.

```javascript
/**
 * @prop {string} INDENT_STYLE - indent style - `tabs` or `spaces`
 * @prop {number} INDENT_WIDTH - indent width (minimum: 1)
 */
{
        INDENT_STYLE: 'spaces',
        INDENT_WIDTH: 4,
}
```

### Tests

Enable or disable the creation of tests. With `ADD_TESTS` set to `false`, only solution files will be created.

```javascript
/**
 * @prop {boolean} ADD_TESTS - create test files
 */
{
        ADD_TESTS: false,
}
```

Select the test framework used for the test file template. This affects how test functions are imported.

```javascript
/**
 * @prop {string} TEST_FRAMEWORK - framework used for testing solutions (one of 'bun:test', 'vitest', or 'jest')
 */
{
        TEST_FRAMEWORK: 'bun:test',
}
```

`bun` and `bun:test` are both accepted values for testing with `bun`.

`TEST_FRAMEWORK`=`bun:test` (or `bun`)

```javascript
import { describe, expect, test } from 'bun:test';
import { twoSum } from '0001_two-sum.js';
```

`TEST_FRAMEWORK`=`vitest`

```javascript
import { describe, expect, test } from 'vitest';
import { twoSum } from '0001_two-sum.js';
```

`TEST_FRAMEWORK`=`jest`

```javascript
import { twoSum } from '0001_two-sum.js';
```

> Notice that the test function imports are missing in the jest version. This is because jest automatically makes these functions available in the global scope within each test file.

Additionally, it also affects the nullish matcher.

`TEST_FRAMEWORK`=`bun:test`

```javascript
describe('MinStack', () => {
        test('default test 1', () => {
                const minStack = new MinStack();
                expect(minStack.push(-2)).toBeNil();
        });
});
```

`TEST_FRAMEWORK`=`vitest`

```javascript
describe('MinStack', () => {
        test('default test 1', () => {
                const minStack = new MinStack();
                expect(minStack.push(-2)).toBeNullable();
        });
});
```

`TEST_FRAMEWORK`=`jest`

```javascript
describe('MinStack', () => {
        test('default test 1', () => {
                const minStack = new MinStack();
                expect(minStack.push(-2)).toBeUndefined();
        });
});
```

### Solution and Test Directories

Change the base directory where solution and test files are saved.

```javascript
/**
 * @prop {string[]} DIR_SOLUTIONS - base directory for solution files
 * @prop {string[]} DIR_TESTS - base directory for test files
 */
{
        DIR_SOLUTIONS: ['src'],
        DIR_TESTS: ['__tests__'],
}
```

### Bucket Directories

Use a bucket directory to sort solution and test files. `BUCKET_CHUNK_SIZE` sets the number of problems within each bucket directory.

```javascript
/**
 * @prop {boolean} USE_DIR_BUCKET - use a bucket directory for sorting problems
 * @prop {number} BUCKET_CHUNK_SIZE - size of the bucket used (minimum: 1)
 * irrelevant if `USE_DIR_BUCKET` is `false`
 */
{
        USE_DIR_BUCKET: true,
        BUCKET_CHUNK_SIZE: 100,
}
```

Consider the files for the problem `0735_asteroid-collision`. With `USE_DIR_BUCKET`=`true` and `BUCKET_CHUNK_SIZE`=`100`, they will be saved within:

```
.
├── src
│   └── 0701-0800
│      └── 0735_asteroid-collision.js
│
└── __tests__
    └── 0701-0800
       └── 0735_asteroid-collision.test.js
```

However, with `BUCKET_CHUNK_SIZE`=`200`, they will be saved within:

```
.
├── src
│   └── 0601-0800
│      └── 0735_asteroid-collision.js
│
└── __tests__
    └── 0601-0800
       └── 0735_asteroid-collision.test.js
```

If `USE_DIR_BUCKET` is `false`, the value of `BUCKET_CHUNK_SIZE` is ignored, and no bucket directories will be created. As such, the files are saved within:

```
.
├── src
│   └── 0735_asteroid-collision.js
│
└── __tests__
    └── 0735_asteroid-collision.test.js
```

### Function Type

Use arrow functions instead of function declarations for solutions.

```javascript
/**
 * @prop {boolean} USE_ARROW_FUNCTIONS - use arrow functions for solution functions
 * class methods always use non-arrow syntax
 */
{
        USE_ARROW_FUNCTIONS: true,
}
```

`USE_ARROW_FUNCTIONS`=`true`

```javascript
const twoSum = (nums, target) => {};
```

`USE_ARROW_FUNCTIONS`=`false`

```javascript
function twoSum(nums, target) {}
```

Class methods will always use non-arrow syntax.

`USE_ARROW_FUNCTIONS`=`true` or `USE_ARROW_FUNCTIONS`=`false`

```javascript
class MinStack {
        constructor() {}

        push(val) {}

        pop() {}

        top() {}

        getMin() {}
}
```

### ESM vs CJS syntax

Use ESM syntax for imports and exports, as opposed to CJS. (recommended: `true`)

```javascript
/**
 * @prop {boolean} USE_ESM_SYNTAX - use ESM syntax over CJS
 * affects how modules are imported and exported
 */
{
        USE_ESM_SYNTAX: true,
}
```

`USE_ESM_SYNTAX`=`true`

```javascript
export { twoSum };

import { describe, expect, test } from 'bun:test';
import { twoSum } from '0001_two-sum.js';
```

`USE_ESM_SYNTAX`=`false`

```javascript
module.exports = { twoSum };

const { describe, expect, test } = require('bun:test');
const { twoSum } = require('0001_two-sum.js');
```

### Import Structure

Use relative imports when importing solutions into test files. (recommended: `true`)

```javascript
/**
 * @prop {boolean} USE_RELATIVE_IMPORTS - use relative import paths when importing solutions into test files
 */
{
        USE_RELATIVE_IMPORTS: true,
}
```

`USE_RELATIVE_IMPORTS`=`true`

```javascript
import { twoSum } from '../../src/0001-0100/0001_two-sum.js';
```

`USE_RELATIVE_IMPORTS`=`false`

```javascript
import { twoSum } from '/src/0001-0100/0001_two-sum.js';
```

### Add Comments

Enable or disable comments in solution files.

```javascript
/**
 * @prop {boolean} ADD_COMMENTS - add comments in the solution file
 */
{
        ADD_COMMENTS: true,
}
```

`ADD_COMMENTS`=`true`

```javascript
/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = (nums, target) => {};

export { twoSum };
```

`ADD_COMMENTS`=`false`

```javascript
const twoSum = (nums, target) => {};

export { twoSum };
```

This also affects code comments that are sometimes included in the solution template by default.

`ADD_COMMENTS`=`true`

```javascript
/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @return {Function}
 */
const createHelloWorld = () => {
        return function (...args) {};
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */

export { createHelloWorld };
```

`ADD_COMMENTS`=`false`

```javascript
const createHelloWorld = () => {
        return function (...args) {};
};

export { createHelloWorld };
```

### Solution Description

Enable or disable the solution description.

```javascript
/**
 * @prop {boolean} ADD_DESCRIPTION - add a description in the solution file
 */
{
        ADD_DESCRIPTION: true,
}
```

`ADD_DESCRIPTION`=`true`

```javascript
/**
 * 0735. Asteroid Collision
 *
 * Link: https://leetcode.com/problems/asteroid-collision/
 * Category: Algorithms
 * Difficulty: Medium
 * Date: <CURRENT_DATE>
 * Author: <SOLUTION_AUTHOR_NAME> (<SOLUTION_AUTHOR_URL>)
 *
 * Topics:
 * - Array (topic_5)
 * - Stack (topic_15)
 * - Simulation (topic_61055)
 * - Staff (position_staff)
 * - Weekly Contest 60 (contest_weekly-contest-60)
 *
 * Stats:
 * - Total Accepted: 1,014,527
 * - Total Submissions: 2,128,259
 * - Acceptance Rate: 47.7%
 *
 * Similar Problems:
 * - can-place-flowers (Easy)
 * - count-collisions-on-a-road (Medium)
 * - destroying-asteroids (Medium)
 * - robot-collisions (Hard)
 *
 * Hints:
 * 1. Say a row of asteroids is stable.  What happens when a new asteroid is
 * added on the right?
 */

/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number[]} asteroids
 * @return {number[]}
 */
const asteroidCollision = (asteroids) => {};

export { asteroidCollision };
```

`ADD_DESCRIPTION`=`false`

```javascript
/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number[]} asteroids
 * @return {number[]}
 */
const asteroidCollision = (asteroids) => {};

export { asteroidCollision };
```

Furthermore, there are many options to enable or disable only parts of the solution description, without disabling the whole thing.

```javascript
/**
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
{
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
        MAX_SIMILAR_PROBLEMS: 10,
        SORT_SIMILAR_PROBLEMS: true,
        ADD_HINTS: false,
}
```

`ADD_PROBLEM_URL`=`true`, `ADD_PROBLEM_CATEGORY`=`true`, `ADD_PROBLEM_DIFFICULTY`=`true`, `ADD_DATE`=`true`, `ADD_AUTHOR`=`true`, and all other boolean options set to `false`

```javascript
/**
 * 0735. Asteroid Collision
 *
 * Link: https://leetcode.com/problems/asteroid-collision/
 * Category: Algorithms
 * Difficulty: Medium
 * Date: <CURRENT_DATE>
 * Author: <SOLUTION_AUTHOR_NAME> (<SOLUTION_AUTHOR_URL>)
 */
```

`ADD_PROBLEM_TOPICS`=`true`

```javascript
/**
 * 0735. Asteroid Collision
 *
 * Topics:
 * - Array (topic_5)
 * - Stack (topic_15)
 * - Simulation (topic_61055)
 */
```

For newer problems, position and contest tags might be available. They are added under the topics section if they are available and enabled. All topic, position, and contest tags are prefixed with their respective type for easy search across your project.

`ADD_PROBLEM_TOPICS`=`true`, `ADD_PROBLEM_POSITIONS`=`true`, and `ADD_PROBLEM_CONTESTS`=`true`

```javascript
/**
 * 3858. Minimum Bitwise OR From Grid
 *
 * Topics:
 * - Array (topic_5)
 * - Greedy (topic_17)
 * - Bit Manipulation (topic_19)
 * - Matrix (topic_61053)
 * - Staff (position_staff)
 * - Weekly Contest 491 (contest_weekly-contest-491)
 */
```

Similar problems are added with their respective slugs so you can easily get started with them. Additionally, their difficulty and premium status is also added.

`MAX_SIMILAR_PROBLEMS`=`0` (adds all available similar problems) and `SORT_SIMILAR_PROBLEMS`=`true`

```javascript
/**
 * 0001. Two Sum
 *
 * Similar Problems:
 * - check-distances-between-same-letters (Easy)
 * - count-number-of-pairs-with-absolute-difference-k (Easy)
 * - count-pairs-whose-sum-is-less-than-target (Easy)
 * - find-all-k-distant-indices-in-an-array (Easy)
 * - find-subarrays-with-equal-sum (Easy)
 * - first-letter-to-appear-twice (Easy)
 * - largest-positive-integer-that-exists-with-its-negative (Easy)
 * - number-of-arithmetic-triplets (Easy)
 * - number-of-distinct-averages (Easy)
 * - two-sum-iii-data-structure-design (Easy) (Premium)
 * - two-sum-iv-input-is-a-bst (Easy)
 * - two-sum-less-than-k (Easy) (Premium)
 * - 3sum (Medium)
 * - 4sum (Medium)
 * - count-good-meals (Medium)
 * - max-number-of-k-sum-pairs (Medium)
 * - node-with-highest-edge-score (Medium)
 * - number-of-pairs-of-strings-with-concatenation-equal-to-target (Medium)
 * - subarray-sum-equals-k (Medium)
 * - two-sum-ii-input-array-is-sorted (Medium)
 * - number-of-excellent-pairs (Hard)
 */
```

`MAX_SIMILAR_PROBLEMS`=`3` and `SORT_SIMILAR_PROBLEMS`=`false` (preserves original order and gets the first three)

```javascript
/**
 * 0001. Two Sum
 *
 * Similar Problems:
 * - 3sum (Medium)
 * - 4sum (Medium)
 * - two-sum-ii-input-array-is-sorted (Medium)
 */
```

`ADD_HINTS`=`true` (each line of a hint is 80 characters long at maximum)

```javascript
/**
 * 0001. Two Sum
 *
 * Hints:
 * 1. A really brute force way would be to search for all possible pairs of
 * numbers but that would be too slow. Again, it's best to try out brute
 * force solutions just for completeness. It is from these brute force
 * solutions that you can come up with optimizations.
 *
 * 2. So, if we fix one of the numbers, say `x`, we have to scan the entire
 * array to find the next number `y` which is `value - x` where value is the
 * input parameter. Can we change our array somehow so that this search
 * becomes faster?
 *
 * 3. The second train of thought is, without changing the array, can we use
 * additional space somehow? Like maybe a hash map to speed up the search?
 */
```

> Topics and/or similar problems might be unavailable for certain problems. if that is the case, their respective configuration options are ignored.

## Limitations

### Inappropriate Matcher

> Note that some problems with the limitations listed below have been manually patched by me to include the proper testcases and matchers, however most of them are as of yet undiscovered. As I encounter more such problems, I will continue to manually patch them. In the meantime, you must follow the steps listed below to patch them yourself.
>
> For a complete list of these problems, refer to [Manually Patched Problems](#manually-patched-problems).

#### `toContainAllValues`

A few problems on LeetCode involve returning values which are not always exactly equal to the expected return value given in the problem source. An example of this is the problem `0001_two-sum`. The expected return value is an array which may contain the required elements in any order. As such, you must manually edit the matcher in the test file to `toContainAllValues()` or similar, instead of the default `toStrictEqual()`. LeetCode does not provide a way to filter this out straight from source.

File: `0001_two-sum.test.js`

```javascript
const testcases = [
        { nums: [2, 7, 11, 15], target: 9, expected: [0, 1] },
        { nums: [3, 2, 4], target: 6, expected: [1, 2] },
        { nums: [3, 3], target: 6, expected: [0, 1] },
];
```

```javascript
// INCORRECT - generated
describe('twoSum', () => {
        test.each(structuredClone(testcases))(
                'twoSum($nums, $target) -> $expected',
                ({ nums, target, expected }) => {
                        expect(twoSum(nums, target)).toStrictEqual(expected);
                },
        );
});
```

```javascript
// CORRECT - manually edited
describe('twoSum', () => {
        test.each(structuredClone(testcases))(
                'twoSum($nums, $target) -> $expected',
                ({ nums, target, expected }) => {
                        expect(twoSum(nums, target)).toContainAllValues(
                                expected,
                        );
                },
        );
});
```

#### `toBeOneOf`

A few problems instead involve returning one of several possible correct values. An example of this is the problem `1980_find-unique-binary-string`. The expected return value is one of several strings, not just the singular given return value. As such, in the test file, you must manually set the `expected` key of each testcase object to an array containing all possible correct return values, and edit the matcher to `toBeOneOf()` or similar, instead of the default `toStrictEqual()`. LeetCode does not provide a way to filter this out straight from source.

File: `1980_find-unique-binary-string.test.js`

```javascript
// INCORRECT - generated
const testcases = [
        { nums: ['01', '10'], expected: '11' },
        { nums: ['00', '01'], expected: '11' },
        { nums: ['111', '011', '001'], expected: '101' },
];

describe('findDifferentBinaryString', () => {
        test.each(structuredClone(testcases))(
                'findDifferentBinaryString($nums) -> $expected',
                ({ nums, expected }) => {
                        expect(findDifferentBinaryString(nums)).toStrictEqual(
                                expected,
                        );
                },
        );
});
```

```javascript
// CORRECT - manually edited
const testcases = [
        { nums: ['01', '10'], expected: ['00', '11'] },
        { nums: ['00', '01'], expected: ['10', '11'] },
        {
                nums: ['111', '011', '001'],
                expected: ['000', '010', '100', '101', '110'],
        },
];

describe('findDifferentBinaryString', () => {
        test.each(structuredClone(testcases))(
                'findDifferentBinaryString($nums) -> $expected',
                ({ nums, expected }) => {
                        expect(findDifferentBinaryString(nums)).toBeOneOf(
                                expected,
                        );
                },
        );
});
```

#### `toBeCloseTo`

Very few problems, e.g. `1701_average-waiting-time`, involve returning a `float` or `double`. Since all number types are initially parsed to be just "`number`" for simplicity's sake, these problems require you to manually edit the matcher to `toBeCloseTo`, instead of `toStrictEqual`.

File: `1701_average-waiting-time.test.js`

```javascript
// INCORRECT - generated
describe('averageWaitingTime', () => {
        test.each(structuredClone(testcases))(
                'averageWaitingTime($customers) -> $expected',
                ({ customers, expected }) => {
                        expect(averageWaitingTime(customers)).toStrictEqual(
                                expected,
                        );
                },
        );
});
```

```javascript
// CORRECT - manually edited
describe('averageWaitingTime', () => {
        test.each(structuredClone(testcases))(
                'averageWaitingTime($customers) -> $expected',
                ({ customers, expected }) => {
                        expect(averageWaitingTime(customers)).toBeCloseTo(
                                expected,
                        );
                },
        );
});
```

### Problems Involving Linked Lists, Trees, etc

As inputs are always given in the form of an array, you must manually convert them into the respective data structure with your custom util functions. Additionally, these problems often involve special properties on the data structure (such as cycles in a linked list) that are impossible to be automatically accounted for purely based on the data sourced from LeetCode. These properties must be manually added to your input.

Consider the following custom utility functions that are required to solve `0141_linked-list-cycle`.

File: `utils/linked-list.js`

```javascript
class ListNode {
        constructor(val = 0, next = null) {
                this.val = val;
                this.next = next;
        }
}

const arrayToList = (array) => {
        return array.reduceRight((acc, cur) => new ListNode(cur, acc), null);
};

const createCycle = (list, pos) => {
        if (pos === -1) {
                return list;
        }

        let curr = list;
        let anchor = null;
        let p = 0;

        while (curr.next) {
                if (p === pos) {
                        anchor = curr;
                }

                curr = curr.next;
                p++;
        }

        curr.next = anchor;

        return list;
};

export { arrayToList, createCycle };
```

These functions then must then be imported and executed appropriately in the respective test file.

File: `0141_linked-list-cycle.test.js`

```javascript
import { describe, expect, test } from 'bun:test';
import { hasCycle } from '0141_linked-list-cycle.js';
import { arrayToList, createCycle } from 'utils/linked-list.js';

const testcases = [
        { head: [3, 2, 0, -4], pos: 1, expected: true },
        { head: [1, 2], pos: 0, expected: true },
        { head: [1], pos: -1, expected: false },
];

describe('hasCycle', () => {
        test.each(structuredClone(testcases))(
                'hasCycle($head, $pos) -> $expected',
                ({ head, pos, expected }) => {
                        expect(
                                hasCycle(createCycle(arrayToList(head), pos)),
                        ).toStrictEqual(expected);
                },
        );
});
```

For most other Linked List based problems, the complementary `listToArray` function is required alongside `arrayToList` for the assertion.

File: `utils/linked-list.js`

```javascript
const listToArray = (list) => {
        const array = [];
        let node = list;

        while (node?.val !== null && typeof node?.val !== 'undefined') {
                array.push(node.val);
                node = node.next;
        }

        return array;
};

export { listToArray };
```

File: `0002_add-two-numbers.test.js`

```javascript
import { describe, expect, test } from 'bun:test';
import { addTwoNumbers } from '0002_add-two-numbers.js';
import { arrayToList, listToArray } from 'utils/linked-list.js';

const testcases = [
        { l1: [2, 4, 3], l2: [5, 6, 4], expected: [7, 0, 8] },
        { l1: [0], l2: [0], expected: [0] },
        {
                l1: [9, 9, 9, 9, 9, 9, 9],
                l2: [9, 9, 9, 9],
                expected: [8, 9, 9, 9, 0, 0, 0, 1],
        },
];

describe('addTwoNumbers', () => {
        test.each(structuredClone(testcases))(
                'addTwoNumbers($l1, $l2) -> $expected',
                ({ l1, l2, expected }) => {
                        expect(
                                listToArray(
                                        addTwoNumbers(
                                                arrayToList(l1),
                                                arrayToList(l2),
                                        ),
                                ),
                        ).toStrictEqual(expected);
                },
        );
});
```

> Note that the examples provided above are my custom implementations of these utility functions. They are not provided by default.

### Incorrect Return Type

#### Numbers as Booleans

LeetCode supports returning a `number` instead of a `boolean`, as automatic type coercion is performed for most problems that require returning a `boolean`. However, your function will throw an error if you return a `number`. As such, you must either return a `boolean` in your solution, or wrap the received value in a `Boolean()` constructor.

To better illustrate this, consider the following solution to the problem `0292_nim-game`.

File: `0292_nim-game.js`

```javascript
/**
 * Approach: Math
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 *
 * @param {number} n
 * @return {boolean}
 */
const canWinNim = (n) => n % 4;
```

LeetCode will support this solution, as the returned value is automatically coerced into a `boolean`. However, your function will throw an error and you must manually convert the value to a `boolean`.

```javascript
// CORRECT - option A
/**
 * Approach: Math
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 *
 * @param {number} n
 * @return {boolean}
 */
const canWinNim = (n) => n % 4 !== 0;
```

```javascript
// CORRECT - option B
describe('canWinNim', () => {
        test.each(structuredClone(testcases))(
                'canWinNim($n) -> $expected',
                ({ n, expected }) => {
                        expect(Boolean(canWinNim(n))).toStrictEqual(expected);
                },
        );
});
```

#### Typed Arrays

Even though LeetCode supports returning a `TypedArray` when the expected return type is an `Array`, your function will throw an error if you return a `TypedArray`, as they are not strictly equal to an `Array` even if they contain the same values in the same indices. As such, you must wrap the received value in an `Array.from()` to convert it into an array before your assertion is performed.

To better illustrate this, consider the following solution to the problem `3255_find-the-power-of-k-size-subarrays-ii`.

File: `3255_find-the-power-of-k-size-subarrays-ii.js`

```javascript
/**
 * Approach: Sliding Window
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const resultsArray = (nums, k) => {
        const n = nums.length;
        const res = new Int32Array(n - k + 1);
        let lastInvalidIdx = -1;

        for (let l = 0, r = 0; r < n; r++) {
                if (r > 0 && nums[r] !== nums[r - 1] + 1) {
                        lastInvalidIdx = r;
                }

                if (r - l + 1 < k) {
                        continue;
                }

                res[r - k + 1] = lastInvalidIdx <= l++ ? nums[r] : -1;
        }

        return res;
};
```

As is clearly apparent, the return type is an `Array` of numbers. However, the above code which returns an `Int32Array`, (which is a `TypedArray`) is valid and accepted on LeetCode. However, the generated testcases will not pass. The received value must be converted into an `Array` before performing the assertion.

File: `3255_find-the-power-of-k-size-subarrays-ii.test.js`

```javascript
// ASSERTION FAILS - generated
describe('resultsArray', () => {
        test.each(structuredClone(testcases))(
                'resultsArray($nums, $k) -> $expected',
                ({ nums, k, expected }) => {
                        expect(resultsArray(nums, k)).toStrictEqual(expected);
                },
        );
});
```

```javascript
// ASSERTION PASSES - manually edited
describe('resultsArray', () => {
        test.each(structuredClone(testcases))(
                'resultsArray($nums, $k) -> $expected',
                ({ nums, k, expected }) => {
                        expect(Array.from(resultsArray(nums, k))).toStrictEqual(
                                expected,
                        );
                },
        );
});
```

### Internally Used Parameteres

Consider the problem `0141_linked-list-cycle`. It uses an internal parameter `pos` which dictates where the cycle in the list is created. However, this parameter is also passed through to the client.

File: `0141_linked-list-cycle.js`

```javascript
const hasCycle = (head, pos) => {};

export { hasCycle };
```

File: `0141_linked-list-cycle.test.js`

```javascript
import { describe, expect, test } from 'bun:test';
import { hasCycle } from '0141_linked-list-cycle.js';

const testcases = [
        { head: [3, 2, 0, -4], pos: 1, expected: true },
        { head: [1, 2], pos: 0, expected: true },
        { head: [1], pos: -1, expected: false },
];
```

Obviously this is not of any use in the solution, as even though you can "cheat" the solution here by just checking for `pos !== -1`, on LeetCode this solution does not work as `pos` is not passed to the client. In these cases you must manually remove the internal parameter, or simply ignore it.

> In this case you need to use this internal parameter to create a valid cycle in the linked list yourself, as detailed in [Problems Involving Linked Lists, Trees, etc.](#problems-involving-linked-lists-trees-etc).

### Manually Patched Problems

The following problems have been manually patched to provide the correct matcher and appropriate outputs:

`toContainAllValues`

- `0001_two-sum`
- `0017_letter-combinations-of-a-phone-number`
- `0026_remove-duplicates-from-sorted-array`
- `0347_top-k-frequent-elements`
- `3289_the-two-sneaky-numbers-of-digitville`

`toBeOneOf`

- `0162_find-peak-element`
- `0451_sort-characters-by-frequency`
- `0791_custom-sort-string`
- `1980_find-unique-binary-string`

`toBeCloseTo`

- `0004_median-of-two-sorted-arrays`
- `1701_average-waiting-time`

miscellaneous

- `2610_convert-an-array-into-a-2d-array-with-conditions`

There are certain problems with errors in their HTML description, or other issues that require custom parsing. The following problems have as such been manually patched.

- `0038_count-and-say` - The two examples provided and the two default testcases are in the opposite order.
- `0778_swim-in-rising-water` - The "Explanation" title of the first testcase is not wrapped inside `<strong>` tags.
- `2610_convert-an-array-into-a-2d-array-with-conditions` - The second example in the description of this problem and the second default testcase are different from each other.

> The above lists are by no means exhaustive. As more issues are discovered, problems will continue to get manually patched.

### Unsupported Problem Types

`Database`, `Shell`, and `Concurrency` based problems are obviously not supported.

---
