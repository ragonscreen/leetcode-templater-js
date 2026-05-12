import { CONFIG } from '../../config.js';

const { TEST_FRAMEWORK } = CONFIG;

const MATCHERS = [
        {
                matcher: 'toBeOneOf',
                problems: [
                        'find-peak-element',
                        'sort-characters-by-frequency',
                        'custom-sort-string',
                        'find-unique-binary-string',
                ],
        },
        {
                matcher: 'toBeCloseTo',
                problems: [
                        'median-of-two-sorted-arrays',
                        'average-waiting-time',
                ],
        },
        {
                matcher: 'toContainAllValues',
                problems: [
                        'two-sum',
                        'letter-combinations-of-a-phone-number',
                        'top-k-frequent-elements',
                        'the-two-sneaky-numbers-of-digitville',
                        'subdomain-visit-count',
                ],
        },
];

const adjustCustomMatchersBun = (problemData, testStr) => {
        const { titleSlug } = problemData;

        for (const { matcher, problems } of MATCHERS) {
                if (problems.includes(titleSlug)) {
                        return testStr.replace('toStrictEqual', matcher);
                }
        }

        return testStr;
};

const adjustCustomMatchersVitest = (problemData, testStr) => {
        const { titleSlug, metadata } = problemData;
        const { name, params } = metadata;
        const strParamNames = params.map((e) => e.name).join(', ');

        // vitest does not have native `toContainAllValues`
        for (const { matcher, problems } of MATCHERS) {
                if (!problems.includes(titleSlug)) {
                        continue;
                }

                if (matcher === 'toContainAllValues') {
                        const line = `expect(${name}(${strParamNames})).toStrictEqual(expected)`;
                        const lineAdjusted = `expect([...${name}(${strParamNames})].sort()).toStrictEqual([...expected].sort())`;

                        return testStr.replace(line, lineAdjusted);
                }

                return testStr.replace('toStrictEqual', matcher);
        }

        return testStr;
};

const adjustCustomMatchersJest = (problemData, testStr) => {
        const { titleSlug, metadata } = problemData;
        const { name, params } = metadata;
        const strParamNames = params.map((e) => e.name).join(', ');

        // jest does not have native `toContainAllValues` and `toBeOneOf`
        for (const { matcher, problems } of MATCHERS) {
                if (!problems.includes(titleSlug)) {
                        continue;
                }

                if (matcher === 'toContainAllValues') {
                        const line = `expect(${name}(${strParamNames})).toStrictEqual(expected)`;
                        const lineAdjusted = `expect([...${name}(${strParamNames})].sort()).toStrictEqual([...expected].sort())`;

                        return testStr.replace(line, lineAdjusted);
                }

                if (matcher === 'toBeOneOf') {
                        const line = `expect(${name}(${strParamNames})).toStrictEqual(expected)`;
                        const lineAdjusted = `expect(expected.includes(${name}(${strParamNames}))).toStrictEqual(true)`;

                        return testStr.replace(line, lineAdjusted);
                }

                return testStr.replace('toStrictEqual', matcher);
        }

        return testStr;
};

const adjustCustomMatchers = (problemData, testStr) => {
        if (TEST_FRAMEWORK === 'vitest') {
                return adjustCustomMatchersVitest(problemData, testStr);
        }

        if (TEST_FRAMEWORK === 'jest') {
                return adjustCustomMatchersJest(problemData, testStr);
        }

        return adjustCustomMatchersBun(problemData, testStr);
};

export { adjustCustomMatchers };
