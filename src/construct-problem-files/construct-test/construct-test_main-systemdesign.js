import { CONFIG } from '../../config.js';
import { gap } from '../../utils.js';

const { TEST_FRAMEWORK } = CONFIG;

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
${gap()}test('default test 1', () => {
${gap(2)}const ${fnName} = new ${className}(`;
};

const constructStringMethodParams = (params) => {
        return `${params.map((e) => JSON.stringify(e)).join(', ')})`;
};

const constructStringExpects = (className, methodCalls) => {
        const voidMatcher =
                TEST_FRAMEWORK === 'bun:test' || TEST_FRAMEWORK === 'bun'
                        ? 'toBeNil'
                        : TEST_FRAMEWORK === 'vitest'
                          ? 'toBeNullable'
                          : 'toBeUndefined';

        const fnName = pascalToCamelCase(className);
        let str = ';\n\n';

        for (let i = 1; i < methodCalls.length; i++) {
                const { method, params, output } = methodCalls[i];
                str += `${gap(2)}expect(${fnName}.${method}(`;
                str += constructStringMethodParams(params);
                let matcher;

                if (output === undefined || output === null) {
                        matcher = `${voidMatcher}()`;
                } else {
                        matcher = `toStrictEqual(${JSON.stringify(output)})`;
                }

                str += `).${matcher};\n`;
        }

        str += `${gap()}});\n});`;

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
