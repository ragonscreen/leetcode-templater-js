const constructStrTestImports = (fnName, filePathSolution) => {
        return `import { describe, expect, test } from 'bun:test';\nimport { ${fnName} } from '${filePathSolution}';`;
};

export { constructStrTestImports };
