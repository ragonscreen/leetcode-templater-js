import { constructClassString } from './construct-class-string.js';
import { constructDescriptionString } from './construct-description-string.js';
import { constructFunctionString } from './construct-function-string.js';

const buildSolutionFile = (problemData) => {
        console.dir(problemData, { depth: null });
        console.log('');

        let solutionFile = constructDescriptionString(problemData);

        if (problemData.metadata.systemdesign) {
                solutionFile += constructClassString(problemData.metadata);
        } else {
                solutionFile += constructFunctionString(problemData.metadata);
        }

        console.log(solutionFile);

        return solutionFile;
};

export { buildSolutionFile };

// const getTransformedDetails = ({
//         problemId,
//         problemTitle,
//         difficulty,
//         functionName,
// }) => {
//         const problemIdPadded = String(problemId).trim().padStart(4, '0');
//         const problemTitleSanitized = String(problemTitle)
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-z0-9]+/g, '-');
//         const filenameBase = `${problemIdPadded}_${problemTitleSanitized}`;
//         const filenameSolution = `${filenameBase}.js`;
//         const filenameTests = `${filenameBase}.test.js`;

//         return {
//                 id: problemIdPadded,
//                 titleFull: String(problemTitle).trim(),
//                 title: problemTitleSanitized,
//                 difficulty: getDifficulty(difficulty),
//                 date: getCurrentDate(),
//                 fn: functionName,
//                 filenameSolution,
//                 filenameTests,
//         };
// };
