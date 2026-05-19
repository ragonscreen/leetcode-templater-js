import { mkdir, writeFile } from 'node:fs/promises';

const createFile = async (filePath, fileContents) => {
        const dir = filePath.split('/').slice(0, -1).join('/');
        await mkdir(dir, { recursive: true });

        try {
                await writeFile(filePath, fileContents, {
                        flag: 'wx',
                        encoding: 'utf-8',
                });

                console.info(`File '${filePath}' created.`);
        } catch (error) {
                if (error.code === 'EEXIST') {
                        console.warn(`File '${filePath}' already exists.`);
                } else {
                        throw error;
                }
        }
};

export { createFile };
