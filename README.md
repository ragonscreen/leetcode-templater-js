# Leetcode Templater JS

Automatically generate solution and test templates for a particular leetcode problem.

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

### 1. Configuarion

The templater is highly configurable. It is **strongly recommended** to use your own custom configuration before getting started.

### 2. Generation

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

Adding your own testcases is easy, simply add more lines to the `testcases` array, containing your custom testcases.

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

If you would like to write multiple solutions, simply add another function below your current one and modify the exports object:

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

Then, import it in the test file and copy the `describe` function for each new solution.

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

### 3. Multiple Identifier Support

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

### 4. Regular Algorithm Problems

Supports basic algorithm problems which involve returning a specific value and matching it with the expected value. These make up the vast majority of the problems available on LeetCode. Examples include `0020_valid-parentheses`, `0217_contains-duplicate`, `0735_asteroid-collision`, etc.

### 5. In-Place Algorithm Problems

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

### 6. System Design Algorithm Problems

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

### 1. Premium Problems

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

### 2. JavaScript Problems

Partially supports JavaScript problems. As JavaScript problems usually have requirements unique to each problem, there is no one catch-all matcher for every JavaScript problem. Therefore, you have to write their own assertions in the appropriate test file.

## Limitations

### Expected Return

Some problems on LeetCode involve returning values which are not always exactly equal to the expected return value given in the problem source. An example of this is the problem `0001_two-sum`. The expected return value is an array which may contain the required elements in any order. As such, you must manually edit the matcher in the test file to `toContainAllValues()` or similar, instead of the default `toStrictEqual()`. LeetCode does not provide a way to filter this out straight from source.

```javascript
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
