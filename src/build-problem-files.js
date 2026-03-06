import { constructStringSolutionClass } from './construct-string_solution-class.js';
import { constructStringSolutionDescription } from './construct-string_solution-description.js';
import { constructStringSolutionFunction } from './construct-string_solution-function.js';
import { constructStringTestClass } from './construct-string_test-class.js';
import { constructStringTestFunction } from './construct-string_test-function.js';

const buildFileSolution = (problemData) => {
        let solutionFile = constructStringSolutionDescription(problemData);

        solutionFile += problemData.metadata.systemdesign
                ? constructStringSolutionClass(problemData.metadata)
                : constructStringSolutionFunction(problemData.metadata);

        return solutionFile;
};

const buildFileTest = (problemData, filePathSolution) => {
        const testFile = problemData.metadata.systemdesign
                ? constructStringTestClass(problemData, filePathSolution)
                : constructStringTestFunction(problemData, filePathSolution);

        return testFile;
};

export { buildFileSolution, buildFileTest };
