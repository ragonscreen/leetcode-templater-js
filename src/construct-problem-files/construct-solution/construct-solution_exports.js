import { CONFIG } from '../../config.js';

const { USE_ESM_SYNTAX } = CONFIG;

const constructSolutionExports = (fnName) => {
        let str = '\n\n';

        if (USE_ESM_SYNTAX) {
                str += 'export ';
        } else {
                str += 'module.exports = ';
        }

        str += `{ ${fnName} };`;

        return str;
};

export { constructSolutionExports };
