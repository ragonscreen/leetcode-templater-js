import { DEFAULTS } from '../defaults.js';

const { INDENT_WIDTH, TEST_FRAMEWORK } = DEFAULTS;
const GAP = `${' '.repeat(INDENT_WIDTH)}`;

const pascalToCamelCase = (str) => str[0].toLowerCase() + str.slice(1);

const getMethodCalls = (metadata) => {
        const { inputs, outputs } = metadata;
        const [_inputs] = inputs;
        const [_outputs] = outputs;
        const [inputMethods, inputParams] = _inputs;
        const methodCalls = [];

        for (let i = 0; i < inputMethods.length; i++) {
                methodCalls.push({
                        method: inputMethods[i],
                        params: inputParams[i],
                        output: _outputs[i],
                });
        }

        return methodCalls;
};

const constructStringDescribe = (className) => {
        const fnName = pascalToCamelCase(className);

        return `\n\ndescribe('${className}', () => {
${GAP}test('default test 1', () => {
${GAP + GAP}const ${fnName} = new ${className}(`;
};

const constructStringMethodParams = (params) => {
        return `${params.map((e) => JSON.stringify(e)).join(', ')})`;
};

const constructStringExpects = (className, methodCalls) => {
        const voidMatcher =
                TEST_FRAMEWORK === 'bun:test'
                        ? 'toBeNil'
                        : TEST_FRAMEWORK === 'vitest'
                          ? 'toBeNullable'
                          : null;

        const fnName = pascalToCamelCase(className);
        let str = ';\n\n';

        for (let i = 1; i < methodCalls.length; i++) {
                const { method, params, output } = methodCalls[i];
                str += `${GAP + GAP}expect(${fnName}.${method}(`;
                str += constructStringMethodParams(params);
                let matcher;

                if (output === undefined) {
                        matcher = `${voidMatcher ?? 'toBeUndefined'}()`;
                } else if (output === null) {
                        matcher = `${voidMatcher ?? 'toBeNull'}()`;
                } else {
                        matcher = `toStrictEqual(${JSON.stringify(output)})`;
                }

                str += `).${matcher};\n`;
        }

        str += `${GAP}});\n});`;

        return str;
};

const constructTestMainSystemDesign = (metadata) => {
        const { classname } = metadata;
        let str = constructStringDescribe(classname);
        const methodCalls = getMethodCalls(metadata);
        const constructorParams = methodCalls[0].params;
        str += constructStringMethodParams(constructorParams);
        str += constructStringExpects(classname, methodCalls);

        return str;
};

export { constructTestMainSystemDesign };
