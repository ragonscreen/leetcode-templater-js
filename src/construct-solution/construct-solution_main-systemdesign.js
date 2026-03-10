import { DEFAULTS } from '../defaults.js';

const { INDENT_WIDTH } = DEFAULTS;
const GAP = `${' '.repeat(INDENT_WIDTH)}`;

const constructStringMain = (className) => {
        return `\n\n/**
 * Approach:
 */
class ${className} {`;
};

const constructStringMethod = (method) => {
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

const constructStringConstructor = (classConstructorParams) => {
        const method = {
                name: 'constructor',
                params: classConstructorParams,
        };

        const str = constructStringMethod(method);

        return str;
};

const constructStringMethods = (methods) => {
        let str = '';

        for (const method of methods) {
                str += constructStringMethod(method);
        }

        return str;
};

const constructSolutionMainSystemDesign = (metadata) => {
        const { classname, classConstructorParams, methods } = metadata;
        let str = constructStringMain(classname);
        str += constructStringConstructor(classConstructorParams);
        str += constructStringMethods(methods);
        str += '}';

        return str;
};

export { constructSolutionMainSystemDesign };
