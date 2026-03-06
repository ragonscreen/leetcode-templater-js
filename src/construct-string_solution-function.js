const constructStringSolutionFunction = (metadata) => {
        const { name, params, return: returnValue } = metadata;

        return `\n\n/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 * ${params.reduce((t, c) => `${t}\n * @param {${c.type}} ${c.name}`, '')}
 * @return {${returnValue.type}}
 */
const ${name} = (${params.map((e) => e.name).join(', ')}) => {};

export { ${name} };`;
};

export { constructStringSolutionFunction };
