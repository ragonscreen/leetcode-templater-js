import { CONFIG } from '../../config.js';
import { getCurrentDate } from '../../utils/get-current-date.js';

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
        ADD_PROBLEM_POSITIONS,
        ADD_PROBLEM_CONTESTS,
        ADD_PROBLEM_STATS,
        ADD_SIMILAR_PROBLEMS,
        MAX_SIMILAR_PROBLEMS,
        SORT_SIMILAR_PROBLEMS,
        ADD_HINTS,
} = CONFIG;

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

const constructStringTopics = ({ topics, positions, contests }) => {
        const addTopics = topics.length && ADD_PROBLEM_TOPICS;
        const addPositions = positions.length && ADD_PROBLEM_POSITIONS;
        const addContests = contests.length && ADD_PROBLEM_CONTESTS;

        if (!(addTopics || addPositions || addContests)) {
                return '';
        }

        let str = '\n *\n * Topics:';

        if (addTopics) {
                for (const topic of topics) {
                        const topicId = `topic_${atob(topic.id).match(/\d+/)[0]}`;
                        str += `\n * - ${topic.name} (${topicId})`;
                }
        }

        if (addPositions) {
                for (const position of positions) {
                        str += `\n * - ${position.name} (position_${position.slug})`;
                }
        }

        if (addContests) {
                for (const contest of contests) {
                        str += `\n * - ${contest.title} (contest_${contest.titleSlug})`;
                }
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

        for (const { titleSlug, difficulty, isPaidOnly } of similarProblems) {
                str += `\n * - ${titleSlug} (${difficulty})${isPaidOnly ? ' (Premium)' : ''}`;
        }

        return str;
};

const constructStringHints = (hints) => {
        if (!(hints.length && ADD_HINTS)) {
                return '';
        }

        let str = '\n *\n * Hints:';

        for (let i = 0; i < hints.length; i++) {
                const hint = hints[i].replace(/\r\n|\n/g, '');
                const m = hint.length;
                const hintStrs = [];
                let lastBreakIdx = 0;

                for (let l = 0, r = 0; r < m; r++) {
                        if (hint[r] === ' ') {
                                if (r - l + 1 > 74) {
                                        hintStrs.push(
                                                hint.slice(l, lastBreakIdx),
                                        );
                                        l = lastBreakIdx + 1;
                                }

                                lastBreakIdx = r;
                        }

                        if (r === m - 1) {
                                hintStrs.push(hint.slice(l, r + 1));
                        }
                }

                str += `${i ? '\n *' : ''}\n * ${i + 1}.`;

                for (let j = 0; j < hintStrs.length; j++) {
                        str += `${j ? '\n *' : ''} ${hintStrs[j]}`;
                }
        }

        return str;
};

const constructSolutionDescription = (problemData) => {
        if (!ADD_DESCRIPTION) {
                return '';
        }

        const { topics, positions, contests, similarQuestions, stats, hints } =
                problemData;

        let str = constructStringBasicDetails(problemData);
        str += constructStringTopics({ topics, positions, contests });
        str += constructStringStats(stats);
        str += constructStringSimilarProblems(similarQuestions);
        str += constructStringHints(hints);
        str += '\n */\n\n';

        return str;
};

export { constructSolutionDescription };
