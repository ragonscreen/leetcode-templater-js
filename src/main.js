import { readFile } from 'node:fs/promises';

const variables = { titleSlug: 'asteroid-collision' };

const get = async () => {
        const query = await readFile('src/query.gql', 'utf-8');
        const res = await fetch('https://leetcode.com/graphql', {
                method: 'POST',
                headers: {
                        'Content-Type': 'application/json',
                        // Cookie: 'LEETCODE_SESSION=x; csrftoken=x',
                        // 'Referer': 'https://leetcode.com/problems/asteroid-collision/description/'
                },
                body: JSON.stringify({ query, variables }),
        });

        const data = await res.json();
        console.dir(data, { depth: null });

        const { exampleTestcaseList, metaData } = data.data.question;

        console.log(JSON.parse(exampleTestcaseList[0]));
        console.log(JSON.parse(metaData));
};

await get();

// console.log('hello');
