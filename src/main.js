import { readFile } from 'node:fs/promises';
import { argv } from 'node:process';
import { constructSolution, constructTest } from './construct-problem-files.js';
import { getFilePaths } from './get-file-path.js';
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
        const filePaths = getFilePaths(problemDataParsed);
        const solution = constructSolution(problemDataParsed);
        const test = constructTest(problemDataParsed, filePaths);

        // console.log(filePathSolution);
        console.log('');
        console.log(solution);
        // console.log('');
        // console.log(filePathTest);
        console.log('');
        console.log(test);

        // console.dir(problemDataParsed, { depth: null });
};

await main();

// Response (146 bytes) {
//   ok: false,
//   url: "https://leetcode.com/graphql",
//   status: 404,
//   statusText: "Not Found",
//   headers: Headers {
//     "date": "Tue, 10 Mar 2026 16:12:21 GMT",
//     "content-type": "text/html",
//     "transfer-encoding": "chunked",
//     "connection": "keep-alive",
//     "x-content-type-options": "nosniff",
//     "strict-transport-security": "max-age=15552000; includeSubDomains; preload",
//     "content-encoding": "br",
//     "cf-cache-status": "DYNAMIC",
//     "server": "cloudflare",
//     "cf-ray": "9da3996c0b2c7e9e-MAA",
//   },
//   redirected: false,
//   bodyUsed: false,
//   Blob (146 bytes)
// }

// Response (6.41 KB) {
//   ok: false,
//   url: "https://leetcode.com/graphql",
//   status: 504,
//   statusText: "Gateway Timeout",
//   headers: Headers {
//     "date": "Tue, 10 Mar 2026 16:14:09 GMT",
//     "content-type": "text/html; charset=UTF-8",
//     "content-length": "6407",
//     "connection": "keep-alive",
//     "cache-control": "private, max-age=0, no-store, no-cache, must-revalidate, post-check=0, pre-check=0",
//     "expires": "Thu, 01 Jan 1970 00:00:01 GMT",
//     "referrer-policy": "same-origin",
//     "x-frame-options": "SAMEORIGIN",
//     "server": "cloudflare",
//     "cf-ray": "9da39c3978e6dcf0-MAA",
//   },
//   redirected: false,
//   bodyUsed: false
// }
