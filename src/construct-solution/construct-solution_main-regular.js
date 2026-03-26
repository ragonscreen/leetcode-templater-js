import { CONFIG } from '../config.js';

const { USE_ARROW_FUNCTIONS } = CONFIG;

const constructSolutionMainRegular = (metadata) => {
        const { name, params, return: returnValue } = metadata;

        let str = `\n\n/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 * ${params.reduce((t, c) => `${t}\n * @param {${c.type}} ${c.name}`, '')}
 * @return {${returnValue.type}}
 */\n`;

        const strParams = `(${params.map((e) => e.name).join(', ')})`;

        if (USE_ARROW_FUNCTIONS) {
                str += `const ${name} = ${strParams} => {};`;
        } else {
                str += `function ${name}${strParams} {}`;
        }

        return str;
};

export { constructSolutionMainRegular };
