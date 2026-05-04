import { join, sep } from 'node:path';
import { CONFIG } from '../../config.js';

const { TEST_FRAMEWORK, USE_ESM_SYNTAX, USE_RELATIVE_IMPORTS } = CONFIG;

const constructTestImports = (fnName, filePaths) => {
        const { filePathSolution, filePathTest } = filePaths;
        const filePathSolutionRelative = [];
        const levels = USE_RELATIVE_IMPORTS
                ? filePathTest.split(sep).length - 1
                : 0;

        for (let i = 0; i < levels; i++) {
                filePathSolutionRelative.push('..');
        }

        filePathSolutionRelative.push(sep, filePathSolution);
        const _filePathSolution = join(...filePathSolutionRelative);

        let str = '';
        let testFramework = TEST_FRAMEWORK;

        if (testFramework === 'bun') {
                testFramework = 'bun:test';
        }

        if (testFramework !== 'jest') {
                str += USE_ESM_SYNTAX
                        ? `import { describe, expect, test } from '${testFramework}';\n`
                        : `const { describe, expect, test } = require('${testFramework}');\n`;
        }

        const isInvalidFnName = ['describe', 'test', 'expect'].includes(fnName);
        let _fnName = fnName;

        if (isInvalidFnName) {
                _fnName = `${fnName} as fn${fnName[0].toUpperCase() + fnName.slice(1)}`;
        }

        str += USE_ESM_SYNTAX
                ? `import { ${_fnName} } from '${_filePathSolution}';`
                : `const { ${_fnName} } = require('${_filePathSolution}');`;

        if (isInvalidFnName) {
                str += ' // imported with an alias to prevent name clash';
        }

        return str;
};

export { constructTestImports };
