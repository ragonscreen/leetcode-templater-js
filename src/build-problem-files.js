import { constructStringSolutionClass } from './construct-string_solution-class.js';
import { constructStringSolutionDescription } from './construct-string_solution-description.js';
import { constructStringSolutionFunction } from './construct-string_solution-function.js';
import { constructStringTestClass } from './construct-string_test-class.js';
import { constructStringTestFunction } from './construct-string_test-function.js';
import { constructStringTestImports } from './construct-string_test-imports.js';

const buildFileSolution = (problemData) => {
        const { metadata } = problemData;
        let solutionFile = constructStringSolutionDescription(problemData);

        solutionFile += metadata.systemdesign
                ? constructStringSolutionClass(metadata)
                : constructStringSolutionFunction(metadata);

        return solutionFile;
};

const buildFileTest = (problemData, pathSolution) => {
        const { metadata } = problemData;
        let testFile;

        if (metadata.systemdesign) {
                testFile = constructStringTestImports(
                        metadata.classname,
                        pathSolution,
                );
                testFile += constructStringTestClass(metadata);
        } else {
                testFile = constructStringTestImports(
                        metadata.name,
                        pathSolution,
                );
                testFile += constructStringTestFunction(metadata);
        }

        return testFile;
};

export { buildFileSolution, buildFileTest };
