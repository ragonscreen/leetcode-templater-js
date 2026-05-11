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
                        matcher: 'toContainAllValues',
                        problems: [
                                'two-sum',
                                'letter-combinations-of-a-phone-number',
                                'remove-duplicates-from-sorted-array',
                                'top-k-frequent-elements',
                                'the-two-sneaky-numbers-of-digitville',
                                'subdomain-visit-count',
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

        return testStr;
};

export { adjustCustomMatchers };
