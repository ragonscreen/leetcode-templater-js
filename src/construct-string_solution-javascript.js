import { DEFAULTS } from './defaults.js';

const { USE_ARROW_FUNCTIONS, INDENT_WIDTH } = DEFAULTS;
const GAP = ' '.repeat(INDENT_WIDTH);

const constructStringSolutionJavaScript = (codeSnippets) => {
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
                .replace(/^\s{4}(.+)/gm, `${GAP}$1`);

        if (USE_ARROW_FUNCTIONS) {
                str = str
                        .replace(
                                /var (.+) = function\((.*)\)/i,
                                'const $1 = ($2) =>',
                        )
                        .replace(/function (.+)\((.*)\)/, 'const $1 = ($2) =>')
                        .replace(/^};*$/m, '};');
        } else {
                str = str
                        .replace(/var (.+) = /i, 'function $1')
                        .replace(/^};$/m, '}');
        }

        str = str.replace(/\t/, ' '.repeat(2)).replace(/\{\s+\}/g, '{}');

        return str;
};

export { constructStringSolutionJavaScript };
