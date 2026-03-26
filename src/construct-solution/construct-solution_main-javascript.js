import { CONFIG } from '../config.js';
import { gap } from '../utils.js';

const { USE_ARROW_FUNCTIONS } = CONFIG;

const constructSolutionMainJavaScript = (codeSnippets) => {
        let str = codeSnippets.find((e) => e.lang === 'JavaScript').code;

        str = str
                .replace(
                        /\/\*\*/,
                        `\n\n/**
 * Approach:
 * Time Complexity: O()
 * Space Complexity: O()
 *`,
                )
                .replace(/^\s{4}(.+)/gm, `${gap()}$1`);

        if (USE_ARROW_FUNCTIONS) {
                str = str
                        .replace(
                                /var (.+) = (async )?function\((.*)\)/,
                                'const $1 = $2($3) =>',
                        )
                        .replace(
                                /(async )?function (.+)\((.*)\)/,
                                'const $2 = $1($3) =>',
                        )
                        .replace(/^};*$/m, '};');
        } else {
                str = str
                        .replace(
                                /var (.+) = (async )?function/,
                                '$2function $1',
                        )
                        .replace(/^};$/m, '}');
        }

        str = str.replace(/\t/, ' '.repeat(2)).replace(/\{\s+\}/g, '{}');

        return str;
};

export { constructSolutionMainJavaScript };
