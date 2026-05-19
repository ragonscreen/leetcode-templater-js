import { CONFIG } from '../config.js';

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

export { gap };
