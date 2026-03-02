import { readFile } from 'node:fs/promises';
import { argv } from 'node:process';
import { buildSolutionFile } from './build-solution-file.js';
import { parseProblemData } from './parse-problem-data.js';

const parseProvidedIdentifier = () => {
        return argv[2]
                ?.replace(/https:\/\/|problems\/|leetcode\.com\//gi, '')
                ?.split('/')?.[0];
};

const getQuery = async () => {
        return await readFile('src/graphql/get-problem-detail.gql', 'utf-8');
};

const getProblemData = async (query, titleSlug) => {
        const res = await fetch('https://leetcode.com/graphql', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        // Cookie: 'LEETCODE_SESSION=x; csrftoken=x',
                        // 'Referer': 'https://leetcode.com/problems/asteroid-collision/description/'
                },
                body: JSON.stringify({
                        query,
                        variables: { titleSlug },
                }),
        });

        const data = await res.json();

        return data?.data?.question;
};

const throwIdentifierError = () => {
        throw new Error(`
Invalid identifier. Identifier must be a valid problem slug of one of the following forms:

https://leetcode.com/problems/two-sum
leetcode.com/problems/two-sum
problems/two-sum
two-sum`);
};

const main = async () => {
        const titleSlug = parseProvidedIdentifier();

        if (!titleSlug) {
                throwIdentifierError();
        }

        const query = await getQuery();
        const problemData = await getProblemData(query, titleSlug);

        if (!problemData) {
                throwIdentifierError();
        }

        const problemDataParsed = parseProblemData(problemData);
        const solution = buildSolutionFile(problemDataParsed);

        // console.dir(problemDataParsed, { depth: null });
};

await main();
