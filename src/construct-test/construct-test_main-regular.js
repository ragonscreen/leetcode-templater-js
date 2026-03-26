import { CONFIG } from '../config.js';
import { gap } from '../utils.js';

const { TEST_FRAMEWORK } = CONFIG;

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
                str += `${gap()}{ `;

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
${gap()}test.each(structuredClone(testcases))('${name}($${paramNames.join(', $')}) -> $expected', ({ ${strParamNames}, expected }) => {
${gap(2)}expect();
${gap()}});
});`;

        return str;
};

const constructStringExpect = (name, strParamNames) => {
        return `\n${gap(2)}expect(${name}(${strParamNames})).toStrictEqual(expected);
${gap()}});
});`;
};

const constructStringExpectInPlace = (name, strParamNames, inPlaceParam) => {
        const voidMatcher =
                TEST_FRAMEWORK === 'bun:test'
                        ? 'toBeNil'
                        : TEST_FRAMEWORK === 'vitest'
                          ? 'toBeNullable'
                          : 'toBeUndefined';

        return `\n${gap(2)}expect(${name}(${strParamNames})).${voidMatcher}();
${gap(2)}expect(${inPlaceParam ?? strParamNames.split(', ')[0]}).toStrictEqual(expected);
${gap()}});
});`;
};

const constructStringDescribe = (metadata) => {
        const { name, params, inPlaceParam } = metadata;
        const paramNames = params.map((e) => e.name);
        const strParamNames = paramNames.join(', ');

        let str = `\n\ndescribe('${name}', () => {
${gap()}test.each(structuredClone(testcases))('${name}($${paramNames.join(', $')}) -> $expected', ({ ${strParamNames}, expected }) => {`;

        if (metadata.return.type === 'void') {
                str += constructStringExpectInPlace(
                        name,
                        strParamNames,
                        inPlaceParam,
                );
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
