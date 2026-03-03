const constructStrFuncComment = (metadata) => {
        let str = `

/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *`;

        for (const p of metadata.params) {
                str += `\n * @param {${p.type}} ${p.name}`;
        }

        str += `\n * @return {${metadata.return.type}}\n */`;

        return str;
};

const constructStrFuncMain = (metadata) => {
        let str = `\nconst ${metadata.name} = (`;
        const { params } = metadata;

        for (let i = 0; i < params.length; i++) {
                const param = params[i].name;

                str += param;

                if (i !== params.length - 1) {
                        str += ', ';
                }
        }

        str += `) => {};

export { ${metadata.name} };`;

        return str;
};

const constructFunctionString = (metadata) => {
        let str = constructStrFuncComment(metadata);
        str += constructStrFuncMain(metadata);

        return str;
};

export { constructFunctionString };
