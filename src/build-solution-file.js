const getCurrentDate = () => {
        const date = new Date();
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');

        return `${y}-${m}-${d}`;
};

const constructStrBasicDetails = (problemData) => {
        const { id, title, titleSlug, category, difficulty } = problemData;
        const idPadded = String(id).trim().padStart(4, '0');
        const date = getCurrentDate();

        return `/**
 * ${idPadded}. ${title}
 *
 * Link: https://leetcode.com/problems/${titleSlug}/
 * Category: ${category}
 * Difficulty: ${difficulty}
 * Date: ${date}
 * Author: ragonscreen (https://github.com/ragonscreen/)`;
};

const constructStrTopics = (topics) => {
        const lines = [];

        if (topics.length) {
                lines.push('\n * ', ' * Topics:');
        }

        for (const t of topics) {
                const topicId = `topic_${atob(t.id).match(/\d+/)[0]}`;
                lines.push(` * - ${t.name} (${topicId})`);
        }

        return lines.join('\n');
};

const constructStrSimilarProblems = (similarQuestions) => {
        const lines = [];

        if (similarQuestions.length) {
                lines.push('\n * ', ' * Similar Problems:');
        }

        for (const q of similarQuestions) {
                lines.push(` * - ${q.titleSlug} (${q.difficulty})`);
        }

        return lines.join('\n');
};

const constructStrStats = (stats) => {
        const formatter = new Intl.NumberFormat('en-US');
        const totalAccepted = formatter.format(stats.totalAcceptedRaw);
        const totalSubmissions = formatter.format(stats.totalSubmissionRaw);

        return `
 *
 * Stats:
 * - Total Accepted: ${totalAccepted}
 * - Total Submissions: ${totalSubmissions}
 * - Acceptance Rate: ${stats.acRate}`;
};

const constructDescription = (problemData) => {
        const { topics, similarQuestions, stats } = problemData;

        let str = constructStrBasicDetails(problemData);
        str += constructStrTopics(topics);
        str += constructStrStats(stats);
        str += constructStrSimilarProblems(similarQuestions);
        str += '\n */';

        return str;
};

// /**
//  * Approach: <blank>
//  * Time Complexity: O()
//  * Space Complexity: O()
//  *
//  * @param {<metadata_param_type>} <metadata_param_name>
//  * @return {<metadata_return_type>} <metadata_return_name>
//  */
// const <metadata_name> = (<metadata_param_name>) => {};

// export { <metadata_name> };

const buildRegular = (problemData) => {
        console.dir(problemData, { depth: null });

        const str = constructDescription(problemData);

        console.log(str);
};

const buildSystemDesign = (problemData) => {};

const buildSolutionFile = (problemData) => {
        let solutionFile;

        if (problemData.metadata.systemDesign) {
                solutionFile = buildSystemDesign(problemData);
        } else {
                solutionFile = buildRegular(problemData);
        }

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
