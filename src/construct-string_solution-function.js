const constructStrFuncComment = (metadata) => {
        const { params, return: returnValue } = metadata;

        let str = `\n\n/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *`;

        for (const param of params) {
                str += `\n * @param {${param.type}} ${param.name}`;
        }

        str += `\n * @return {${returnValue.type}}\n */`;

        return str;
};

const constructStrFuncMain = (metadata) => {
        const { name, params } = metadata;
        let str = `\nconst ${name} = (`;

        for (let i = 0; i < params.length; i++) {
                str += params[i].name;

                if (i !== params.length - 1) {
                        str += ', ';
                }
        }

        str += `) => {};\n\nexport { ${name} };`;

        return str;
};

const constructStringSolutionFunction = (metadata) => {
        let str = constructStrFuncComment(metadata);
        str += constructStrFuncMain(metadata);

        return str;
};

export { constructStringSolutionFunction };
