const constructStrClassMain = (className) => {
        return `

/**
 * Approach:
 */
class ${className} {
        /**
         * Time Complexity: O()
         * Space Complexity: O()
         */
        constructor() {}`;
};

const constructStrClassMethodComment = (method) => {
        let str = `

        /**
         * Time Complexity: O()
         * Space Complexity: O()
         *`;

        for (const p of method.params) {
                str += `\n         * @param {${p.type}} ${p.name}`;
        }

        str += `\n         * @return {${method.return.type}}\n         */`;

        return str;
};

const constructStrClassMethodFunc = (method) => {
        let str = `\n        ${method.name}(`;
        const { params } = method;

        for (let i = 0; i < params.length; i++) {
                const param = params[i].name;

                str += param;

                if (i !== params.length - 1) {
                        str += ', ';
                }
        }

        str += `) {};`;

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
        return `
}

export { ${className} };`;
};

const constructClassString = (metadata) => {
        let str = constructStrClassMain(metadata.classname);
        str += constructStrClassMethods(metadata);
        str += constructStrClassExport(metadata.classname);

        return str;
};

export { constructClassString };
