import { DEFAULTS } from './defaults.js';

const { INDENT_WIDTH } = DEFAULTS;
const GAP = `${' '.repeat(INDENT_WIDTH)}`;

const pascalToCamelCase = (str) => str[0].toLowerCase() + str.slice(1);

const getClassMethodCalls = (metadata) => {
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

const constructStrTestClassDescribe = (className) => {
        const fnName = pascalToCamelCase(className);

        return `\n\ndescribe('${className}', () => {
${GAP}test('default test 1', () => {
${GAP + GAP}const ${fnName} = new ${className}(`;
};

const constructStrTestMethodParams = (params) => {
        return `${params.map((e) => JSON.stringify(e)).join(', ')})`;
};

const constructStrTestClassExpects = (className, methodCalls) => {
        const fnName = pascalToCamelCase(className);
        let str = ';\n\n';

        for (let i = 1; i < methodCalls.length; i++) {
                const { method, params, output } = methodCalls[i];
                str += `${GAP + GAP}expect(${fnName}.${method}(`;
                str += constructStrTestMethodParams(params);
                const matcher =
                        output === undefined || output === null
                                ? 'toBeNil()'
                                : `toStrictEqual(${JSON.stringify(output)})`;
                str += `).${matcher};\n`;
        }

        str += `${GAP}});\n});`;

        return str;
};

const constructStringTestClass = (metadata) => {
        const { classname } = metadata;
        let str = constructStrTestClassDescribe(classname);
        const methodCalls = getClassMethodCalls(metadata);
        const constructorParams = methodCalls[0].params;
        str += constructStrTestMethodParams(constructorParams);
        str += constructStrTestClassExpects(classname, methodCalls);

        return str;
};

export { constructStringTestClass };
