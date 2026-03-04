import { DEFAULTS } from './defaults.js';

const { INDENT_WIDTH } = DEFAULTS;

const constructStrTestImports = (fnName, filePathSolution) => {
        return `import { describe, expect, test } from 'bun:test';\nimport { ${fnName} } from '${filePathSolution}';`;
};

const constructStrTestTests = (problemData, indentWidth) => {
        const { metadata, inputs, outputs } = problemData;
        const { name } = metadata;
        const gap = `${' '.repeat(indentWidth)}`;
        let str = `\n\ndescribe('${name}', () => {\n`;

        for (let i = 0; i < inputs.length; i++) {
                const input = inputs[i];
                str += `${gap}test('default test ${i + 1}', () => {\n${gap + gap}expect(${name}(`;

                for (let j = 0; j < input.length; j++) {
                        const param = input[j];
                        str += JSON.stringify(param);

                        if (j !== input.length - 1) {
                                str += ', ';
                        }
                }

                str += `)).toStrictEqual(${JSON.stringify(outputs[i])});\n${gap}});\n`;

                if (i !== inputs.length - 1) {
                        str += '\n';
                }
        }

        str += '});';

        return str;
};

const constructStringTestFunction = (problemData, filePathSolution) => {
        let str = constructStrTestImports(
                problemData.metadata.name,
                filePathSolution,
        );

        str += constructStrTestTests(problemData, INDENT_WIDTH);

        return str;
};

export { constructStringTestFunction };
