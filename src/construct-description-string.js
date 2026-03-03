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
        if (!topics.length) {
                return '';
        }

        let str = '\n *\n * Topics:';

        for (const t of topics) {
                const topicId = `topic_${atob(t.id).match(/\d+/)[0]}`;
                str += `\n * - ${t.name} (${topicId})`;
        }

        return str;
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

const constructStrSimilarProblems = (similarQuestions) => {
        if (!similarQuestions.length) {
                return '';
        }

        let str = '\n *\n * Similar Problems:';

        for (const q of similarQuestions) {
                str += `\n * - ${q.titleSlug} (${q.difficulty})`;
        }

        return str;
};

const constructDescriptionString = (problemData) => {
        const { topics, similarQuestions, stats } = problemData;

        let str = constructStrBasicDetails(problemData);
        str += constructStrTopics(topics);
        str += constructStrStats(stats);
        str += constructStrSimilarProblems(similarQuestions);
        str += '\n */';

        return str;
};

export { constructDescriptionString };
