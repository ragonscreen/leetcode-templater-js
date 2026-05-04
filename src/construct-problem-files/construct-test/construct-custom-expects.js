import { gap } from '../../utils.js';

const constructExpectConvertAnArrayIntoA2dArrayWithConditions = (
        name,
        strParamNames,
) => {
        return `\n${gap(2)}const actual = ${name}(${strParamNames});

${gap(2)}for (let i = 0; i < expected.length; i++) {
${gap(3)}expect(actual[i]).toContainAllValues(expected[i]);
${gap(2)}}
${gap()}});
});`;
};

const CUSTOM_EXPECTS = {
        'convert-an-array-into-a-2d-array-with-conditions':
                constructExpectConvertAnArrayIntoA2dArrayWithConditions,
};

const constructCustomExpect = (name, strParamNames, titleSlug) => {
        const customExpect = CUSTOM_EXPECTS[titleSlug];

        if (customExpect) {
                return customExpect(name, strParamNames);
        }

        return null;
};

export { constructCustomExpect };
