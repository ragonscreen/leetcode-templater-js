import { DEFAULTS } from '../defaults.js';

const { SOLUTION_AUTHOR_NAME, SOLUTION_AUTHOR_URL } = DEFAULTS;

const getCurrentDate = () => {
        const date = new Date();
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');

        return `${y}-${m}-${d}`;
};

const constructStringBasicDetails = (problemData) => {
        const { id, title, titleSlug, category, difficulty } = problemData;
        const idPadded = String(id).trim().padStart(4, '0');
        const date = getCurrentDate();

        let str = `/**
 * ${idPadded}. ${title}
 *
 * Link: https://leetcode.com/problems/${titleSlug}/
 * Category: ${category}
 * Difficulty: ${difficulty}
 * Date: ${date}`;

        if (SOLUTION_AUTHOR_NAME) {
                str += `\n * Author: ${SOLUTION_AUTHOR_NAME}${SOLUTION_AUTHOR_URL ? ` (${SOLUTION_AUTHOR_URL})` : ''}`;
        }

        return str;
};

const constructStringTopics = (topics) => {
        if (!topics.length) {
                return '';
        }

        let str = '\n *\n * Topics:';

        for (const topic of topics) {
                const topicId = `topic_${atob(topic.id).match(/\d+/)[0]}`;
                str += `\n * - ${topic.name} (${topicId})`;
        }

        return str;
};

const constructStringStats = (stats) => {
        const formatter = new Intl.NumberFormat('en-US');
        const totalAccepted = formatter.format(stats.totalAcceptedRaw);
        const totalSubmissions = formatter.format(stats.totalSubmissionRaw);

        return `\n *
 * Stats:
 * - Total Accepted: ${totalAccepted}
 * - Total Submissions: ${totalSubmissions}
 * - Acceptance Rate: ${stats.acRate}`;
};

const constructStringSimilarProblems = (similarQuestions) => {
        if (!similarQuestions.length) {
                return '';
        }

        let str = '\n *\n * Similar Problems:';

        for (const question of similarQuestions) {
                str += `\n * - ${question.titleSlug} (${question.difficulty})`;
        }

        return str;
};

const constructSolutionDescription = (problemData) => {
        const { topics, similarQuestions, stats } = problemData;
        let str = constructStringBasicDetails(problemData);
        str += constructStringTopics(topics);
        str += constructStringStats(stats);
        str += constructStringSimilarProblems(similarQuestions);
        str += '\n */';

        return str;
};

export { constructSolutionDescription };
