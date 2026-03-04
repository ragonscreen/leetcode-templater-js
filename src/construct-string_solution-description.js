import { DEFAULTS } from './defaults.js';

const { SOLUTION_AUTHOR_NAME, SOLUTION_AUTHOR_LINK } = DEFAULTS;

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

        let str = `/**
 * ${idPadded}. ${title}
 *
 * Link: https://leetcode.com/problems/${titleSlug}/
 * Category: ${category}
 * Difficulty: ${difficulty}
 * Date: ${date}`;

        if (!SOLUTION_AUTHOR_NAME) {
                return str;
        }

        str += `\n * Author: ${SOLUTION_AUTHOR_NAME}`;

        if (SOLUTION_AUTHOR_LINK) {
                str += ` (${SOLUTION_AUTHOR_LINK})`;
        }

        return str;
};

const constructStrTopics = (topics) => {
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

const constructStrStats = (stats) => {
        const formatter = new Intl.NumberFormat('en-US');
        const totalAccepted = formatter.format(stats.totalAcceptedRaw);
        const totalSubmissions = formatter.format(stats.totalSubmissionRaw);

        return `\n *
 * Stats:
 * - Total Accepted: ${totalAccepted}
 * - Total Submissions: ${totalSubmissions}
 * - Acceptance Rate: ${stats.acRate}`;
};

const constructStrSimilarProblems = (similarQuestions) => {
        if (!similarQuestions.length) {
                return '';
        }

        let str = '\n *\n * Similar Problems:';

        for (const question of similarQuestions) {
                str += `\n * - ${question.titleSlug} (${question.difficulty})`;
        }

        return str;
};

const constructStringSolutionDescription = (problemData) => {
        const { topics, similarQuestions, stats } = problemData;
        let str = constructStrBasicDetails(problemData);
        str += constructStrTopics(topics);
        str += constructStrStats(stats);
        str += constructStrSimilarProblems(similarQuestions);
        str += '\n */';

        return str;
};

export { constructStringSolutionDescription };
