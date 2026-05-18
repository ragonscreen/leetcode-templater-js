const getProblemData = async (query, titleSlug) => {
        const res = await fetch('https://leetcode.com/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                        query,
                        variables: { titleSlug },
                }),
        });

        const data = await res.json();

        return data?.data?.question;
};

export { getProblemData };
