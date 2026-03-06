import { DEFAULTS } from './defaults.js';

const { TEST_FRAMEWORK } = DEFAULTS;

const constructStringTestImports = (fnName, filePathSolution) => {
        return `import { describe, expect, test } from '${TEST_FRAMEWORK}';\nimport { ${fnName} } from '${filePathSolution}';`;
};

export { constructStringTestImports };
