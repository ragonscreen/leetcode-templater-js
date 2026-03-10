import { DEFAULTS } from '../defaults.js';

const { INDENT_WIDTH, TEST_FRAMEWORK } = DEFAULTS;
const GAP = `${' '.repeat(INDENT_WIDTH)}`;

const getTestcases = (metadata) => {
        const { inputs, outputs } = metadata;
        const testcases = [];

        for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                const testcase = new Map([['expected', outputs[i]]]);

                for (let j = 0; j < input.length; j++) {
                        const paramValue = input[j];
                        const paramName = metadata.params[j].name;
                        testcase.set(paramName, paramValue);
                }

                testcases.push(testcase);
        }

        return testcases;
};

const constructStringTestcases = (metadata) => {
        const testcases = getTestcases(metadata);
        let str = '\n\nconst testcases = [\n';

        for (const testcase of testcases) {
                str += `${GAP}{ `;

                for (const [key, val] of testcase) {
                        if (key === 'expected') {
                                continue;
                        }

                        str += `${key}: ${JSON.stringify(val)}, `;
                }

                str += `expected: ${JSON.stringify(testcase.get('expected'))} },\n`;
        }

        str += '];';

        return str;
};

const constructStringDescribeJavaScript = (metadata) => {
        const { name, params } = metadata;
        const paramNames = params.map((e) => e.name);
        const strParamNames = paramNames.join(', ');

        const str = `\n\ndescribe('${name}', () => {
${GAP}test.each(testcases)('${name}($${paramNames.join(', $')}) -> $expected', ({ ${strParamNames}, expected }) => {
${GAP + GAP}expect();
${GAP}});
});`;

        return str;
};

const constructStringExpect = (name, strParamNames) => {
        return `\n${GAP + GAP}expect(${name}(${strParamNames})).toStrictEqual(expected);
${GAP}});
});`;
};

const constructStringExpectInPlace = (name, strParamNames) => {
        const voidMatcher =
                TEST_FRAMEWORK === 'bun:test'
                        ? 'toBeNil'
                        : TEST_FRAMEWORK === 'vitest'
                          ? 'toBeNullable'
                          : 'toBeUndefined';

        return `\n${GAP + GAP}expect(${name}(${strParamNames})).${voidMatcher}();

${GAP + GAP}for (let i = 0; i < expected.length; i++) {
${GAP + GAP + GAP}expect(${strParamNames.split(',')[0]}[i]).toStrictEqual(expected[i]);
${GAP + GAP}}
${GAP}});
});`;
};

const constructStringDescribe = (metadata) => {
        const { name, params } = metadata;
        const paramNames = params.map((e) => e.name);
        const strParamNames = paramNames.join(', ');

        let str = `\n\ndescribe('${name}', () => {
${GAP}test.each(testcases)('${name}($${paramNames.join(', $')}) -> $expected', ({ ${strParamNames}, expected }) => {`;

        if (metadata.return.type === 'void') {
                str += constructStringExpectInPlace(name, strParamNames);
        } else {
                str += constructStringExpect(name, strParamNames);
        }

        return str;
};

const constructTestMainRegular = (metadata) => {
        const { languages } = metadata;
        let str = constructStringTestcases(metadata);

        if (languages?.length === 2 && languages?.includes('javascript')) {
                str += constructStringDescribeJavaScript(metadata);
        } else {
                str += constructStringDescribe(metadata);
        }

        return str;
};

export { constructTestMainRegular };
