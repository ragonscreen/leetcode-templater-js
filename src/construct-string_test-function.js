import { DEFAULTS } from './defaults.js';

const { INDENT_WIDTH } = DEFAULTS;
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

const constructStrTestFunctionTestcases = (metadata) => {
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

const constructStrTestFunctionExpect = (name, strParamNames) => {
        return `\n${GAP + GAP}expect(${name}(${strParamNames})).toStrictEqual(expected);\n${GAP}});\n});`;
};

const constructStrTestFunctionExpectInPlace = (name, strParamNames) => {
        return `\n${GAP + GAP}expect(${name}(${strParamNames})).toBeNil();

${GAP + GAP}for (let i = 0; i < expected.length; i++) {
${GAP + GAP + GAP}expect(${strParamNames.split(',')[0]}[i]).toStrictEqual(expected[i]);
${GAP + GAP}}
${GAP}});
});`;
};

const constructStrTestFunctionDescribe = (metadata) => {
        const { name, params } = metadata;
        const paramNames = params.map((e) => e.name);
        const strParamNames = paramNames.join(', ');

        let str = `\n\ndescribe('${name}', () => {
${GAP}test.each(testcases)('${name}($${paramNames.join(', $')}) -> $expected', ({ ${strParamNames}, expected }) => {`;

        if (metadata.return.type === 'void') {
                str += constructStrTestFunctionExpectInPlace(
                        name,
                        strParamNames,
                );
        } else {
                str += constructStrTestFunctionExpect(name, strParamNames);
        }

        return str;
};

const constructStringTestFunction = (metadata) => {
        let str = constructStrTestFunctionTestcases(metadata);
        str += constructStrTestFunctionDescribe(metadata);

        return str;
};

export { constructStringTestFunction };
