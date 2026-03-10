import { constructStringSolutionClass } from './construct-string_solution-class.js';
import { constructStringSolutionDescription } from './construct-string_solution-description.js';
import { constructStringSolutionFunction } from './construct-string_solution-function.js';
import { constructStringSolutionJavaScript } from './construct-string_solution-javascript.js';
import { constructStringTestClass } from './construct-string_test-class.js';
import { constructStringTestFunction } from './construct-string_test-function.js';
import { constructStringTestImports } from './construct-string_test-imports.js';

const buildFileSolution = (problemData) => {
        const { metadata, codeSnippets } = problemData;
        const { systemdesign, languages } = metadata;
        let solutionFile = constructStringSolutionDescription(problemData);

        if (systemdesign) {
                solutionFile += constructStringSolutionClass(metadata);
        } else if (languages?.length && languages?.includes('javascript')) {
                solutionFile += constructStringSolutionJavaScript(codeSnippets);
        } else {
                solutionFile += constructStringSolutionFunction(metadata);
        }

        return solutionFile;
};

const buildFileTest = (problemData, filePathSolution) => {
        const { metadata } = problemData;
        const { systemdesign, languages } = metadata;
        let testFile;

        if (systemdesign) {
                testFile = constructStringTestImports(
                        metadata.classname,
                        filePathSolution,
                );
                testFile += constructStringTestClass(metadata);
        } else if (languages?.length && languages?.includes('javascript')) {
                testFile = constructStringTestImports(
                        metadata.name,
                        filePathSolution,
                );
                testFile += constructStringTestFunction(metadata);
        } else {
                testFile = constructStringTestImports(
                        metadata.name,
                        filePathSolution,
                );
                testFile += constructStringTestFunction(metadata);
        }

        return testFile;
};

export { buildFileSolution, buildFileTest };
