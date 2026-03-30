import { CONFIG } from '../config.js';

const {
        ADD_DESCRIPTION,
        SOLUTION_AUTHOR_NAME,
        SOLUTION_AUTHOR_URL,
        ADD_PROBLEM_URL,
        ADD_PROBLEM_CATEGORY,
        ADD_PROBLEM_DIFFICULTY,
        ADD_DATE,
        ADD_AUTHOR,
        ADD_PROBLEM_TOPICS,
        ADD_PROBLEM_STATS,
        ADD_SIMILAR_PROBLEMS,
        MAX_SIMILAR_PROBLEMS,
        SORT_SIMILAR_PROBLEMS,
} = CONFIG;

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
 * ${idPadded}. ${title}`;

        const addAuthor = ADD_AUTHOR && SOLUTION_AUTHOR_NAME;

        if (
                ADD_PROBLEM_URL ||
                ADD_PROBLEM_CATEGORY ||
                ADD_PROBLEM_DIFFICULTY ||
                ADD_DATE ||
                addAuthor
        ) {
                str += '\n *';
        }

        if (ADD_PROBLEM_URL) {
                str += `\n * Link: https://leetcode.com/problems/${titleSlug}/`;
        }

        if (ADD_PROBLEM_CATEGORY) {
                str += `\n * Category: ${category}`;
        }

        if (ADD_PROBLEM_DIFFICULTY) {
                str += `\n * Difficulty: ${difficulty}`;
        }

        if (ADD_DATE) {
                str += `\n * Date: ${date}`;
        }

        if (addAuthor) {
                str += `\n * Author: ${SOLUTION_AUTHOR_NAME}${SOLUTION_AUTHOR_URL ? ` (${SOLUTION_AUTHOR_URL})` : ''}`;
        }

        return str;
};

const constructStringTopics = (topics) => {
        if (!(topics.length && ADD_PROBLEM_TOPICS)) {
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
        if (!ADD_PROBLEM_STATS) {
                return '';
        }

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
        const problemsSortFn = (a, b) => {
                const scores = {
                        easy: 1,
                        medium: 2,
                        hard: 3,
                };

                return (
                        scores[a.difficulty.toLowerCase()] -
                                scores[b.difficulty.toLowerCase()] ||
                        a.titleSlug.localeCompare(b.titleSlug)
                );
        };

        if (!(similarQuestions.length && ADD_SIMILAR_PROBLEMS)) {
                return '';
        }

        const similarProblems = similarQuestions.slice(
                0,
                Math.max(MAX_SIMILAR_PROBLEMS, 0) || undefined,
        );

        if (SORT_SIMILAR_PROBLEMS) {
                similarProblems.sort(problemsSortFn);
        }

        let str = '\n *\n * Similar Problems:';

        for (const problem of similarProblems) {
                str += `\n * - ${problem.titleSlug} (${problem.difficulty})`;
        }

        return str;
};

const constructSolutionDescription = (problemData) => {
        if (!ADD_DESCRIPTION) {
                return '';
        }

        const { topics, similarQuestions, stats } = problemData;
        let str = constructStringBasicDetails(problemData);
        str += constructStringTopics(topics);
        str += constructStringStats(stats);
        str += constructStringSimilarProblems(similarQuestions);
        str += '\n */\n\n';

        return str;
};

export { constructSolutionDescription };
