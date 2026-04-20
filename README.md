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
```
bunx lct <problem_slug>
```

node
```
npx lct <problem_slug>
```

## Features

### Configuration

The templater is highly configurable. It is **strongly recommended** to use your own custom configuration before getting started. Refer to the [Configuration](#configuration-1) section for more information.

### Template Generation

Automatically generates a solution and a test file containing default tests, with all data sourced straight from leetcode.

```sh
bunx lct contains-duplicate
```

Running the above command will generate a solution file `0217_contains-duplicate.js` and a test file `0217_contains-duplicate.test.js` with the following contents:

File: `0217_contains-duplicate.js`

```javascript
/**
 * 0217. Contains Duplicate
 *
 * Link: https://leetcode.com/problems/contains-duplicate/
 * Category: Algorithms
 * Difficulty: Easy
 * Date: 2026-03-26
 * Author: ragonscreen (https://github.com/ragonscreen/)
 *
 * Topics:
 * - Array (topic_5)
 * - Hash Table (topic_6)
 * - Sorting (topic_61049)
 *
 * Stats:
 * - Total Accepted: 6,255,235
 * - Total Submissions: 9,747,756
 * - Acceptance Rate: 64.2%
 *
 * Similar Problems:
 * - contains-duplicate-ii (Easy)
 * - find-valid-pair-of-adjacent-digits-in-string (Easy)
 * - make-array-zero-by-subtracting-equal-amounts (Easy)
 * - contains-duplicate-iii (Hard)
 */

/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = (nums) => {};

export { containsDuplicate };
```

File: `0217_contains-duplicate.test.js`

```javascript
import { describe, expect, test } from 'bun:test';
import { containsDuplicate } from '0217_contains-duplicate.js';

const testcases = [
    { nums: [1,2,3,1], expected: true },
    { nums: [1,2,3,4], expected: false },
    { nums: [1,1,1,3,3,4,3,2,4,2], expected: true },
];

describe('containsDuplicate', () => {
    test.each(structuredClone(testcases))('containsDuplicate($nums) -> $expected', ({ nums, expected }) => {
        expect(containsDuplicate(nums)).toStrictEqual(expected);
    });
});
```

Adding your own testcases is easy. Simply add more lines to the `testcases` array, containing your custom testcases.

```javascript
const testcases = [
    { nums: [1,2,3,1], expected: true },
    { nums: [1,2,3,4], expected: false },
    { nums: [1,1,1,3,3,4,3,2,4,2], expected: true },
    { nums: [1,1,1,1], expected: true },
    { nums: [1,7,3,8], expected: false },
    { nums: [-90, -45, 0, 45, 90], expected: false },
];
```

If you would like to write multiple solutions, simply add more functions below your current one and modify the exports object:

```javascript
/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate = (nums) => {};

/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @param {number[]} nums
 * @return {boolean}
 */
const containsDuplicate1 = (nums) => {};

export { containsDuplicate, containsDuplicate1 };
```

Then, import them in the test file and copy the `describe` function for each new solution.

```javascript
import { describe, expect, test } from 'bun:test';
import { containsDuplicate, containsDuplicate1 } from '0217_contains-duplicate.js';

const testcases = [
    { nums: [1,2,3,1], expected: true },
    { nums: [1,2,3,4], expected: false },
    { nums: [1,1,1,3,3,4,3,2,4,2], expected: true },
];

describe('containsDuplicate', () => {
    test.each(structuredClone(testcases))('containsDuplicate($nums) -> $expected', ({ nums, expected }) => {
        expect(containsDuplicate(nums)).toStrictEqual(expected);
    });
});

describe('containsDuplicate1', () => {
    test.each(structuredClone(testcases))('containsDuplicate1($nums) -> $expected', ({ nums, expected }) => {
        expect(containsDuplicate1(nums)).toStrictEqual(expected);
    });
});
```

### Multiple Identifier Support

Supports the following forms of identifiers (with or without the trailing `description/`) as valid problem slugs:

```sh
two-sum

problems/two-sum/description/

leetcode.com/problems/two-sum/description/

https://leetcode.com/problems/two-sum/description/

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
 *
 * Link: https://leetcode.com/problems/rotate-array/
 * Category: Algorithms
 * Difficulty: Medium
 * Date: 2026-03-26
 * Author: ragonscreen (https://github.com/ragonscreen/)
 *
 * Topics:
 * - Array (topic_5)
 * - Math (topic_8)
 * - Two Pointers (topic_9)
 *
 * Stats:
 * - Total Accepted: 3,852,120
 * - Total Submissions: 8,629,883
 * - Acceptance Rate: 44.6%
 *
 * Similar Problems:
 * - make-k-subarray-sums-equal (Medium)
 * - maximum-number-of-matching-indices-after-right-shifts (Medium)
 * - reverse-words-in-a-string-ii (Medium)
 * - rotate-list (Medium)
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
    { nums: [1,2,3,4,5,6,7], k: 3, expected: [5,6,7,1,2,3,4] },
    { nums: [-1,-100,3,99], k: 2, expected: [3,99,-1,-100] },
];

describe('rotate', () => {
    test.each(structuredClone(testcases))('rotate($nums, $k) -> $expected', ({ nums, k, expected }) => {
        expect(rotate(nums, k)).toBeNil();
        expect(nums).toStrictEqual(expected);
    });
});
```

> Please note that LeetCode is arbitrary with the parameter that is supposed to be mutated in place. As such, it is **strongly recommended** to verify the assertion in the test file yourself before running tests.
>
> Also note that the nullish matcher changes based on the configured test framework. `toBeNil()` for `bun:test`, `toBeNullable()` for `vitest`, and `toBeUndefined()` for `jest`.

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
 *
 * Link: https://leetcode.com/problems/range-sum-query-2d-immutable/
 * Category: Algorithms
 * Difficulty: Medium
 * Date: 2026-03-26
 * Author: ragonscreen (https://github.com/ragonscreen/)
 *
 * Topics:
 * - Array (topic_5)
 * - Design (topic_25)
 * - Matrix (topic_61053)
 * - Prefix Sum (topic_61068)
 *
 * Stats:
 * - Total Accepted: 475,231
 * - Total Submissions: 818,775
 * - Acceptance Rate: 58.0%
 *
 * Similar Problems:
 * - range-sum-query-immutable (Easy)
 * - find-the-grid-of-region-average (Medium)
 * - range-sum-query-2d-mutable (Medium)
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
        const numMatrix = new NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]);

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

```js
/**
 * 0360. Sort Transformed Array
 *
 * Link: https://leetcode.com/problems/sort-transformed-array/
 * Category: Algorithms
 * Difficulty: Medium
 * Date: 2026-03-26
 * Author: ragonscreen (https://github.com/ragonscreen/)
 *
 * Topics:
 * - Array (topic_5)
 * - Math (topic_8)
 * - Two Pointers (topic_9)
 * - Sorting (topic_61049)
 *
 * Stats:
 * - Total Accepted: 76,505
 * - Total Submissions: 131,850
 * - Acceptance Rate: 58.0%
 *
 * Similar Problems:
 * - squares-of-a-sorted-array (Easy)
 * - minimum-time-to-repair-cars (Medium)
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

```js
import { describe, expect, test } from 'bun:test';
import { sortTransformedArray } from '0360_sort-transformed-array.js';

const testcases = [
    { nums: [-4,-2,2,4], a: 1, b: 3, c: 5, expected: undefined },
    { nums: [-4,-2,2,4], a: -1, b: 3, c: 5, expected: undefined },
];

describe('sortTransformedArray', () => {
    test.each(structuredClone(testcases))('sortTransformedArray($nums, $a, $b, $c) -> $expected', ({ nums, a, b, c, expected }) => {
        expect(sortTransformedArray(nums, a, b, c)).toStrictEqual(expected);
    });
});
```

> Note that `expected` is set to `undefined`, as outputs are unavailable for premium problems. This is not the expected return value, and as such, you must add the output yourself or copy it from some other source.

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
 *
 * Link: https://leetcode.com/problems/create-hello-world-function/
 * Category: JavaScript
 * Difficulty: Easy
 * Date: 2026-04-09
 * Author: ragonscreen (https://github.com/ragonscreen/)
 *
 * Stats:
 * - Total Accepted: 836,513
 * - Total Submissions: 1,020,990
 * - Acceptance Rate: 81.9%
 */

/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @return {Function}
 */
const createHelloWorld = () => {

    return function(...args) {}
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
    { args: [], expected: "Hello World" },
    { args: [{},null,42], expected: "Hello World" },
];

describe('createHelloWorld', () => {
    test.each(structuredClone(testcases))('createHelloWorld($args) -> $expected', ({ args, expected }) => {
        expect();
    });
});
```

> Note that sometimes, the outputs are objects, and may not reflect the actual output correctly. It is **strongly recommended** to verify the outputs in the test file yourself before running tests.

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
 *
 * Link: https://leetcode.com/problems/throttle/
 * Category: JavaScript
 * Difficulty: Medium
 * Date: 2026-04-09
 * Author: ragonscreen (https://github.com/ragonscreen/)
 *
 * Stats:
 * - Total Accepted: 11,589
 * - Total Submissions: 13,897
 * - Acceptance Rate: 83.4%
 *
 * Similar Problems:
 * - debounce (Medium)
 * - promise-pool (Medium)
 * - promise-time-limit (Medium)
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
    { t: 100, fn: [{"t":20,"inputs":[1]}], expected: undefined },
    { t: 50, fn: [{"t":50,"inputs":[1]},{"t":75,"inputs":[2]}], expected: undefined },
    { t: 70, fn: [{"t":50,"inputs":[1]},{"t":75,"inputs":[2]},{"t":90,"inputs":[8]},{"t":140,"inputs":[5,7]},{"t":300,"inputs":[9,4]}], expected: undefined },
];

describe('throttle', () => {
    test.each(structuredClone(testcases))('throttle($t, $fn) -> $expected', ({ t, fn, expected }) => {
        expect();
    });
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
 *
 * Link: https://leetcode.com/problems/first-bad-version/
 * Category: Algorithms
 * Difficulty: Easy
 * Date: 2026-04-09
 * Author: ragonscreen (https://github.com/ragonscreen/)
 *
 * Topics:
 * - Binary Search (topic_11)
 * - Interactive (topic_61059)
 *
 * Stats:
 * - Total Accepted: 2,146,995
 * - Total Submissions: 4,567,570
 * - Acceptance Rate: 47.0%
 *
 * Similar Problems:
 * - guess-number-higher-or-lower (Easy)
 * - search-insert-position (Easy)
 * - find-first-and-last-position-of-element-in-sorted-array (Medium)
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
    test.each(structuredClone(testcases))('firstBadVersion($n, $bad) -> $expected', ({ n, bad, expected }) => {
        expect(firstBadVersion(n, bad)).toStrictEqual(expected);
    });
});
```

> Note that in the above example, the inputs and the solution function are completely inaccurate. The solution function should instead be getting the callable API passed in as a parameter, and returning a function instead.

## Configuration

This templater is highly configurable, and it is **strongly recommended** to get it configured before getting started. Create an object with the key `lct` in your `package.json` file. This object will contain all the options you wish to configure.

```json
{
        "lct": {}
}
```

The following configuration options are available.

### Solution Author

Set your own personal information. This shows up in the description of each solution.

```javascript
/**
 * @prop {string} SOLUTION_AUTHOR_NAME - name of the solution author
 * @prop {string} SOLUTION_AUTHOR_URL - URL of the solution author
 */
{
        SOLUTION_AUTHOR_NAME: 'ragonscreen',
        SOLUTION_AUTHOR_URL: 'https://github.com/ragonscreen/',
}
```

```javascript
// with SOLUTION_AUTHOR_NAME='Lorem Ipsum' and SOLUTION_AUTHOR_URL='https://leetcode.com/'
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

```js
// with INDENT_STYLE='tabs'
const testcases = [
	{ nums: [2,7,11,15], target: 9, expected: [0,1] },
];

// with INDENT_STYLE='spaces'
const testcases = [
    { nums: [2,7,11,15], target: 9, expected: [0,1] },
];

// with INDENT_WIDTH=8 (and INDENT_STYLE='spaces')
const testcases = [
        { nums: [2,7,11,15], target: 9, expected: [0,1] },
];
```

### Tests

Enable or disable the creation of tests. With `ADD_TESTS` set to `false`, only solution files will be created.

```js
/**
 * @prop {boolean} ADD_TESTS - whether or not to create test files
 */
{
        ADD_TESTS: false,
}
```

Select the test framework used for the test file template. This affects how test functions are imported.

```js
/**
 * @prop {string} TEST_FRAMEWORK - framework used for testing solutions (one of 'bun:test', 'vitest', or 'jest')
 */
{
        TEST_FRAMEWORK: 'bun:test',
}
```

> Note that `bun` and `bun:test` are both accepted values for testing with `bun`.

```js
// with TEST_FRAMEWORK='bun:test'
import { describe, expect, test } from 'bun:test';
import { twoSum } from '0001_two-sum.js';

// with TEST_FRAMEWORK='vitest'
import { describe, expect, test } from 'vitest';
import { twoSum } from '0001_two-sum.js';

// with TEST_FRAMEWORK='jest'
import { twoSum } from '0001_two-sum.js';
```

> Notice that the test function imports are missing in the jest version. This is because jest automatically makes available these functions in the global scope within each test file.

Additionally, it also affects the nullish matcher.

```js
// with TEST_FRAMEWORK='bun:test'
describe('MinStack', () => {
    test('default test 1', () => {
        const minStack = new MinStack();
        expect(minStack.push(-2)).toBeNil();
    });
});

// with TEST_FRAMEWORK='vitest'
describe('MinStack', () => {
    test('default test 1', () => {
        const minStack = new MinStack();
        expect(minStack.push(-2)).toBeNullable();
    });
});

// with TEST_FRAMEWORK='jest'
describe('MinStack', () => {
    test('default test 1', () => {
        const minStack = new MinStack();
        expect(minStack.push(-2)).toBeUndefined();
    });
});
```

### Solution and Test Directories

Change the base directory where solution and test files are saved.

```js
/**
 * @prop {string[]} DIR_TESTS=['__tests__'] - base directory for test files
 * @prop {string[]} DIR_SOLUTIONS=['src'] - base directory for solution files
 */
{
        DIR_SOLUTIONS: ['src'],
        DIR_TESTS: ['__tests__'],
}
```

### Bucket Directories

Use a bucket directory to sort solution and test files. `BUCKET_CHUNK_SIZE` sets the number of problems within each bucket directory.

```js
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

Consider the files for the problem `0001_two-sum`. With `USE_DIR_BUCKET` set to `true` and `BUCKET_CHUNK_SIZE` set to `100`, they will be saved within:

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

However, with `BUCKET_CHUNK_SIZE` set to `200`, they will be saved within:

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

Alternatively, with `USE_DIR_BUCKET` set to `false`, they will be saved within:

```
.
├── src
│   └── 0735_asteroid-collision.js
│
└── __tests__
    └── 0735_asteroid-collision.test.js
```

> Note that if `USE_DIR_BUCKET` is set to `false`, the value of `BUCKET_CHUNK_SIZE` is ignored, and no bucket directories will be created.

### Function Type

Use arrow functions instead of function declarations for solutions.

```js
/**
 * @prop {boolean} USE_ARROW_FUNCTIONS - use arrow functions for solution functions
 * class methods always use non-arrow syntax
 */
{
        USE_ARROW_FUNCTIONS: true,
}
```

```js
// with USE_ARROW_FUNCTIONS=true
const twoSum = (nums, target) => {};

// with USE_ARROW_FUNCTIONS=false
function twoSum(nums, target) {}
```

> Note that class methods will always use non-arrow syntax.

```js
// with both USE_ARROW_FUNCTIONS=true and USE_ARROW_FUNCTIONS=false
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

```js
{
        USE_ESM_SYNTAX: true,
}
```

```js
// with USE_ESM_SYNTAX=true
export { twoSum };

import { describe, expect, test } from 'bun:test';
import { twoSum } from '0001_two-sum.js';

// with USE_ESM_SYNTAX=false
module.exports = { twoSum };

const { describe, expect, test } = require('bun:test');
const { twoSum } = require('0001_two-sum.js');
```

### Import Structure

Use relative imports when importing solutions into test files. (recommended: `true`)

```js
/**
 * @prop {boolean} USE_RELATIVE_IMPORTS - use relative import paths when importing solutions into test files
 */
{
        USE_RELATIVE_IMPORTS: true,
}
```

```js
// with USE_RELATIVE_IMPORTS=true
import { twoSum } from '../../src/0001-0100/0001_two-sum.js';

// with USE_RELATIVE_IMPORTS=false
import { twoSum } from '/src/0001-0100/0001_two-sum.js';
```

### Add Comments

Enable or disable comments in solution files.

```js
/**
 * @prop {boolean} ADD_COMMENTS - add comments in the solution file
 */
{
        ADD_COMMENTS: true,
}
```

```js
// with ADD_COMMENTS=true
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

// with ADD_COMMENTS=false
const twoSum = (nums, target) => {};

export { twoSum };
```

Note that this also affects code comments that are sometimes included in the solution template by default.

```js
// with ADD_COMMENTS=true
/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *
 * @return {Function}
 */
const createHelloWorld = () => {

    return function(...args) {}
};

/**
 * const f = createHelloWorld();
 * f(); // "Hello World"
 */

export { createHelloWorld };

// with ADD_COMMENTS=false
const createHelloWorld = () => {

    return function(...args) {}
};

export { createHelloWorld };
```

### Solution Description

Enable or disable the solution description.

```js
/**
 * @prop {boolean} ADD_DESCRIPTION - add a description in the solution file
 */
{
        ADD_DESCRIPTION: true,
}
```

```js
// with ADD_DESCRIPTION=true
/**
 * 0735. Asteroid Collision
 *
 * Link: https://leetcode.com/problems/asteroid-collision/
 * Category: Algorithms
 * Difficulty: Medium
 * Date: 2026-04-20
 * Author: ragonscreen (https://github.com/ragonscreen/)
 *
 * Topics:
 * - Array (topic_5)
 * - Stack (topic_15)
 * - Simulation (topic_61055)
 *
 * Stats:
 * - Total Accepted: 1,013,312
 * - Total Submissions: 2,126,431
 * - Acceptance Rate: 47.7%
 *
 * Similar Problems:
 * - can-place-flowers (Easy)
 * - count-collisions-on-a-road (Medium)
 * - destroying-asteroids (Medium)
 * - robot-collisions (Hard)
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

// with ADD_DESCRIPTION=false
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

```js
/**
 * @prop {boolean} ADD_PROBLEM_URL - add the problem url to the solution description
 * @prop {boolean} ADD_PROBLEM_CATEGORY - add the problem category to the solution description
 * @prop {boolean} ADD_PROBLEM_DIFFICULTY - add the problem difficulty to the solution description
 * @prop {boolean} ADD_DATE - add the current date to the solution description
 * @prop {boolean} ADD_AUTHOR - add author information to the solution description
 * @prop {boolean} ADD_PROBLEM_TOPICS - add the problem topics to the solution description
 * @prop {boolean} ADD_PROBLEM_STATS - add the problem stats to the solution description
 * @prop {boolean} ADD_SIMILAR_PROBLEMS - add similar problems to the solution description
 * @prop {number} MAX_SIMILAR_PROBLEMS - maximum number of similar problems to add to the solution description (minimum: 1)
 * setting it to 0 will add all available similar problems
 * @prop {boolean} SORT_SIMILAR_PROBLEMS - sort the similar problems added to the solution description
 * problems are sorted by difficulty - easiest first, then by title
 */
{
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
}
```

```js
// with ADD_PROBLEM_URL=false, ADD_PROBLEM_CATEGORY=false, ADD_PROBLEM_DIFFICULTY=false,
// ADD_DATE=false, ADD_AUTHOR=false, ADD_PROBLEM_STATS=false, ADD_SIMILAR_PROBLEMS=false, and
// ADD_PROBLEM_TOPICS=true
/**
 * 0735. Asteroid Collision
 *
 * Topics:
 * - Array (topic_5)
 * - Stack (topic_15)
 * - Simulation (topic_61055)
 */
```

```js
// with MAX_SIMILAR_PROBLEMS=0
/**
 * 0001. Two Sum
 *
 * Link: https://leetcode.com/problems/two-sum/
 * Category: Algorithms
 * Difficulty: Easy
 * Date: 2026-04-20
 * Author: ragonscreen (https://github.com/ragonscreen/)
 *
 * Topics:
 * - Array (topic_5)
 * - Hash Table (topic_6)
 *
 * Stats:
 * - Total Accepted: 21,458,267
 * - Total Submissions: 37,407,629
 * - Acceptance Rate: 57.4%
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
 * - two-sum-iii-data-structure-design (Easy)
 * - two-sum-iv-input-is-a-bst (Easy)
 * - two-sum-less-than-k (Easy)
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

// with MAX_SIMILAR_PROBLEMS=3
/**
 * 0001. Two Sum
 *
 * Link: https://leetcode.com/problems/two-sum/
 * Category: Algorithms
 * Difficulty: Easy
 * Date: 2026-04-20
 * Author: ragonscreen (https://github.com/ragonscreen/)
 *
 * Topics:
 * - Array (topic_5)
 * - Hash Table (topic_6)
 *
 * Stats:
 * - Total Accepted: 21,458,267
 * - Total Submissions: 37,407,629
 * - Acceptance Rate: 57.4%
 *
 * Similar Problems:
 * - 3sum (Medium)
 * - 4sum (Medium)
 * - two-sum-ii-input-array-is-sorted (Medium)
 */
```

## Limitations

### Incorrect Expected Return

A few problems on LeetCode involve returning values which are not always exactly equal to the expected return value given in the problem source. An example of this is the problem `0001_two-sum`. The expected return value is an array which may contain the required elements in any order. As such, you must manually edit the matcher in the test file to `toContainAllValues()` or similar, instead of the default `toStrictEqual()`. LeetCode does not provide a way to filter this out straight from source.

```javascript
const testcases = [
    { nums: [2,7,11,15], target: 9, expected: [0,1] },
    { nums: [3,2,4], target: 6, expected: [1,2] },
    { nums: [3,3], target: 6, expected: [0,1] },
];

// INCORRECT - generated
describe('twoSum', () => {
    test.each(structuredClone(testcases))('twoSum($nums, $target) -> $expected', ({ nums, target, expected }) => {
        expect(twoSum(nums, target)).toStrictEqual(expected);
    });
});

// CORRECT - manually edited
describe('twoSum', () => {
    test.each(structuredClone(testcases))('twoSum($nums, $target) -> $expected', ({ nums, target, expected }) => {
        expect(twoSum(nums, target)).toContainAllValues(expected);
    });
});
```

A few problems instead involve returning one of several possible correct values. An example of this is the problem `1980_find-unique-binary-string`. The expected return value is one of several strings, not just the singular given return value. As such, in the test file, you must manually set the `expected` key of each testcase object to an array containing all possible correct return values, and edit the matcher to `toBeOneOf()` or similar, instead of the default `toStrictEqual()`. LeetCode does not provide a way to filter this out straight from source.

```javascript
// INCORRECT - generated
const testcases = [
    { nums: ["01","10"], expected: "11" },
    { nums: ["00","01"], expected: "11" },
    { nums: ["111","011","001"], expected: "101" },
];

describe('findDifferentBinaryString', () => {
    test.each(structuredClone(testcases))('findDifferentBinaryString($nums) -> $expected', ({ nums, expected }) => {
        expect(findDifferentBinaryString(nums)).toStrictEqual(expected);
    });
});

// CORRECT - manually edited
const testcases = [
    { nums: ["01","10"], expected: ["00","11"] },
    { nums: ["00","01"], expected: ["10","11"] },
    { nums: ["111","011","001"], expected: ["000","010","100","101","110"] },
];

describe('findDifferentBinaryString', () => {
    test.each(structuredClone(testcases))('findDifferentBinaryString($nums) -> $expected', ({ nums, expected }) => {
        expect(findDifferentBinaryString(nums)).toBeOneOf(expected);
    });
});
```
