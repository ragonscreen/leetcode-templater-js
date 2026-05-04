import { constructSolutionDescription } from './construct-solution/construct-solution_description.js';
import { constructSolutionExports } from './construct-solution/construct-solution_exports.js';
import { constructSolutionMainJavaScript } from './construct-solution/construct-solution_main-javascript.js';
import { constructSolutionMainRegular } from './construct-solution/construct-solution_main-regular.js';
import { constructSolutionMainSystemDesign } from './construct-solution/construct-solution_main-systemdesign.js';
import { constructTestImports } from './construct-test/construct-test_imports.js';
import { constructTestMainRegular } from './construct-test/construct-test_main-regular.js';
import { constructTestMainSystemDesign } from './construct-test/construct-test_main-systemdesign.js';

const constructSolution = (problemData) => {
        const { metadata, codeSnippets, isPaidOnly } = problemData;
        const { systemdesign, languages, classname, name } = metadata;
        const isJavaScript =
                languages?.length <= 2 && languages?.includes('javascript');
        let str = constructSolutionDescription(problemData);
        let fnName;

        if (systemdesign) {
                str += constructSolutionMainSystemDesign(metadata);
                fnName = classname;
        } else if (!isPaidOnly && isJavaScript) {
                str += constructSolutionMainJavaScript(codeSnippets);
                fnName = name;
        } else {
                str += constructSolutionMainRegular(metadata);
                fnName = name;
        }

        str += constructSolutionExports(fnName);

        return str;
};

const constructTest = (problemData, filePaths) => {
        const { metadata } = problemData;
        const { systemdesign, classname, name } = metadata;
        let testFile;

        if (systemdesign) {
                testFile = constructTestImports(classname, filePaths);
                testFile += constructTestMainSystemDesign(metadata);
        } else {
                testFile = constructTestImports(name, filePaths);
                testFile += constructTestMainRegular(problemData);
        }

        return testFile;
};

export { constructSolution, constructTest };
