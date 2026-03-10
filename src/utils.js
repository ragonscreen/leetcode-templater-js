import { DEFAULTS } from './defaults.js';

const { INDENT_WIDTH, INDENT_STYLE } = DEFAULTS;

const gap = (count = 1) => {
        let gapStr = '';

        if (INDENT_STYLE === 'tabs') {
                gapStr = '\t'.repeat(count);
        } else {
                gapStr = ' '.repeat(INDENT_WIDTH * count);
        }

        return gapStr;
};

export { gap };
