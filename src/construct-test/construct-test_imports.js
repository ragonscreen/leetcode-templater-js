import { DEFAULTS } from '../defaults.js';

const { TEST_FRAMEWORK, USE_ESM_SYNTAX, USE_RELATIVE_IMPORTS } = DEFAULTS;

const constructTestImports = (fnName, filePaths) => {
        console.log(filePaths);

        const { filePathSolution, filePathTest } = filePaths;
        const strRelative = '../'
                .repeat(filePathTest.split('/').length - 2)
                .slice(0, -1);
        const _filePathSolution = USE_RELATIVE_IMPORTS
                ? strRelative + filePathSolution
                : filePathSolution;

        let str = '';

        if (TEST_FRAMEWORK !== 'jest') {
                if (USE_ESM_SYNTAX) {
                        str += `import { describe, expect, test } from '${TEST_FRAMEWORK}';\n`;
                } else {
                        str += `const { describe, expect, test } = require('${TEST_FRAMEWORK}');\n`;
                }
        }

        const isInvalidFnName = ['describe', 'test', 'expect'].includes(fnName);
        let _fnName = fnName;

        if (isInvalidFnName) {
                _fnName = `${fnName} as fn${fnName[0].toUpperCase() + fnName.slice(1)}`;
        }

        if (USE_ESM_SYNTAX) {
                str += `import { ${_fnName} } from '${_filePathSolution}';`;
        } else {
                str += `const { ${_fnName} } = require('${_filePathSolution}');`;
        }

        if (isInvalidFnName) {
                str += ' // imported with an alias to prevent name clash';
        }

        return str;
};

export { constructTestImports };
