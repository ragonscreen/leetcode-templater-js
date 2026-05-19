import { CONFIG } from '../../config.js';
import { gap } from '../../utils/gap.js';

const { ADD_COMMENTS } = CONFIG;

const constructStringMain = (className) => {
        let str = '';

        if (ADD_COMMENTS) {
                str += `/**
 * Approach:
 */\n`;
        }

        str += `class ${className} {`;

        return str;
};

const constructStringMethod = (method) => {
        const { name, params, return: retval } = method;

        let str = `\n${gap()}/**
${gap()} * Time Complexity: O()
${gap()} * Space Complexity: O()`;

        if (params.length) {
                str += `\n${gap()} *${params.reduce((t, c) => `${t}\n${gap()} * @param {${c.type}} ${c.name}`, '')}`;
        }

        if (retval) {
                str += `${params.length ? '' : `\n${gap()} *`}\n${gap()} * @return {${retval.type}}`;
        }

        str += `\n${gap()} */`;

        if (!ADD_COMMENTS) {
                str = '';
        }

        str += `\n${gap()}${name}(${params.map((e) => e.name).join(', ')}) {}\n`;

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
