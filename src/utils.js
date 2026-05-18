import { mkdir, writeFile } from 'node:fs/promises';

import { CONFIG } from './config.js';

const { INDENT_WIDTH, INDENT_STYLE } = CONFIG;

const gap = (count = 1) => {
        const _indentWidth = Math.max(INDENT_WIDTH, 1);
        let gapStr;

        if (INDENT_STYLE === 'tabs') {
                gapStr = '\t'.repeat(count);
        } else {
                gapStr = ' '.repeat(_indentWidth * count);
        }

        return gapStr;
};

const padNum = (num, len = 4) => String(num).padStart(len, '0');

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

export { gap, padNum, createFile };
