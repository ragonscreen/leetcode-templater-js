import { DEFAULTS } from './defaults.js';

const { INDENT_WIDTH } = DEFAULTS;
const GAP = `${' '.repeat(INDENT_WIDTH)}`;

const constructStrClassMain = (className) => {
        return `\n\n/**
 * Approach:
 */
class ${className} {`;
};

const constructStrClassMethod = (method) => {
        const { name, params, return: retval } = method;
        let str = `\n${GAP}/**
${GAP} * Time Complexity: O()
${GAP} * Space Complexity: O()`;

        if (params.length) {
                str += `\n${GAP} *${params.reduce((t, c) => `${t}\n${GAP} * @param {${c.type}} ${c.name}`, '')}`;
        }

        if (retval) {
                str += `${params.length ? '' : `\n${GAP} *`}\n${GAP} * @return {${retval.type}}`;
        }

        str += `\n${GAP} */\n${GAP}${name}(${params.map((e) => e.name).join(', ')}) {}\n`;

        return str;
};

const constructStrClassConstructor = (classConstructorParams) => {
        const method = {
                name: 'constructor',
                params: classConstructorParams,
        };

        const str = constructStrClassMethod(method);

        return str;
};

const constructStrClassMethods = (methods) => {
        let str = '';

        for (const method of methods) {
                str += constructStrClassMethod(method);
        }

        return str;
};

const constructStringSolutionClass = (metadata) => {
        const { classname, classConstructorParams, methods } = metadata;
        let str = constructStrClassMain(classname);
        str += constructStrClassConstructor(classConstructorParams);
        str += constructStrClassMethods(methods);
        str += '}';

        return str;
};

export { constructStringSolutionClass };
