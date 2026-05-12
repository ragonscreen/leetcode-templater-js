import { CONFIG } from '../../config.js';

const { TEST_FRAMEWORK } = CONFIG;

const adjustCustomMatchersBun = (problemData, testStr) => {
        const { titleSlug } = problemData;

        const matcherToContainAllValues = [
                'two-sum',
                'letter-combinations-of-a-phone-number',
                'top-k-frequent-elements',
                'the-two-sneaky-numbers-of-digitville',
                'subdomain-visit-count',
        ];

        if (matcherToContainAllValues.includes(titleSlug)) {
                return testStr.replace('toStrictEqual', 'toContainAllValues');
        }

        return testStr;
};

const adjustCustomMatchersVitest = (problemData, testStr) => {
        const { titleSlug, metadata } = problemData;
        const { name, params } = metadata;
        const paramNames = params.map((e) => e.name);
        const strParamNames = paramNames.join(', ');

        const matcherToContainAllValues = [
                'two-sum',
                'letter-combinations-of-a-phone-number',
                'top-k-frequent-elements',
                'the-two-sneaky-numbers-of-digitville',
                'subdomain-visit-count',
        ];

        // vitest does not have native `toContainAllValues`
        if (matcherToContainAllValues.includes(titleSlug)) {
                const line = `expect(${name}(${strParamNames})).toStrictEqual(expected)`;
                const lineAdjusted = `expect([...${name}(${strParamNames})].sort()).toStrictEqual([...expected].sort())`;

                return testStr.replace(line, lineAdjusted);
        }

        return testStr;
};

const adjustCustomMatchers = (problemData, testStr) => {
        const { titleSlug } = problemData;

        const matchers = [
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
        ];

        for (const { matcher, problems } of matchers) {
                if (problems.includes(titleSlug)) {
                        return testStr.replace('toStrictEqual', matcher);
                }
        }

        if (TEST_FRAMEWORK === 'bun' || TEST_FRAMEWORK === 'bun:test') {
                return adjustCustomMatchersBun(problemData, testStr);
        }

        if (TEST_FRAMEWORK === 'vitest') {
                return adjustCustomMatchersVitest(problemData, testStr);
        }
};

export { adjustCustomMatchers };
