import { constructStringSolutionClass } from './construct-string_solution-class.js';
import { constructStringSolutionDescription } from './construct-string_solution-description.js';
import { constructStringSolutionExports } from './construct-string_solution-exports.js';
import { constructStringSolutionFunction } from './construct-string_solution-function.js';
import { constructStringSolutionJavaScript } from './construct-string_solution-javascript.js';
import { constructStringTestClass } from './construct-string_test-class.js';
import { constructStringTestFunction } from './construct-string_test-function.js';
import { constructStringTestImports } from './construct-string_test-imports.js';

const buildFileSolution = (problemData) => {
        const { metadata, codeSnippets, isPaidOnly } = problemData;
        const { systemdesign, languages, classname, name } = metadata;
        const isJavaScript =
                languages?.length && languages?.includes('javascript');
        let solutionFile = constructStringSolutionDescription(problemData);
        let fnName;

        if (systemdesign) {
                solutionFile += constructStringSolutionClass(metadata);
                fnName = classname;
        } else if (!isPaidOnly && isJavaScript) {
                solutionFile += constructStringSolutionJavaScript(codeSnippets);
                fnName = name;
        } else {
                solutionFile += constructStringSolutionFunction(metadata);
                fnName = name;
        }

        solutionFile += constructStringSolutionExports(fnName);

        return solutionFile;
};

const buildFileTest = (problemData, filePathSolution) => {
        const { metadata } = problemData;
        const { systemdesign, classname, name } = metadata;
        let testFile;

        if (systemdesign) {
                testFile = constructStringTestImports(
                        classname,
                        filePathSolution,
                );
                testFile += constructStringTestClass(metadata);
        } else {
                testFile = constructStringTestImports(name, filePathSolution);
                testFile += constructStringTestFunction(metadata);
        }

        return testFile;
};

export { buildFileSolution, buildFileTest };
