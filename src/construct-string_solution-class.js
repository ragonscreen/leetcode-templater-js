import { DEFAULTS } from './defaults.js';

const { INDENT_WIDTH } = DEFAULTS;

const constructStrClassMain = (className) => {
        return `\n\n/**
 * Approach:
 */
class ${className} {`;
};

const constructStrClassMethodComment = (method) => {
        const { params, return: returnValue } = method;
        const gap = `${' '.repeat(INDENT_WIDTH)}`;

        let str = `\n${gap}/**
${gap} * Time Complexity: O()
${gap} * Space Complexity: O()`;

        if (params.length) {
                str += `\n${gap} *`;
        }

        for (const param of params) {
                str += `\n${gap} * @param {${param.type}} ${param.name}`;
        }

        if (returnValue) {
                if (!params.length) {
                        str += `\n${gap} *`;
                }

                str += `\n${gap} * @return {${returnValue.type}}`;
        }

        str += `\n${gap} */`;

        return str;
};

const constructStrClassMethodFunc = (method) => {
        const { name, params } = method;
        const gap = `${' '.repeat(INDENT_WIDTH)}`;
        let str = `\n${gap}${name}(`;

        for (let i = 0; i < params.length; i++) {
                str += params[i].name;

                if (i !== params.length - 1) {
                        str += ', ';
                }
        }

        str += `) {};\n`;

        return str;
};

const constructStrClassConstructor = (classConstructorParams) => {
        const method = {
                name: 'constructor',
                params: classConstructorParams,
        };

        let str = constructStrClassMethodComment(method);
        str += constructStrClassMethodFunc(method);

        return str;
};

const constructStrClassMethods = (metadata) => {
        let str = '';

        for (const m of metadata.methods) {
                str += constructStrClassMethodComment(m);
                str += constructStrClassMethodFunc(m);
        }

        return str;
};

const constructStrClassExport = (className) => {
        return `}\n\nexport { ${className} };`;
};

const constructStringSolutionClass = (metadata) => {
        let str = constructStrClassMain(metadata.classname);
        str += constructStrClassConstructor(metadata.classConstructorParams);
        str += constructStrClassMethods(metadata);
        str += constructStrClassExport(metadata.classname);

        return str;
};

export { constructStringSolutionClass };
