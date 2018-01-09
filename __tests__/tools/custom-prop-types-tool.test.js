import PropTypes from 'prop-types';
import { Map, List } from 'immutable';

import customPropTypesTool from '../../src/js/tools/custom-prop-types-tool';

const checkFailResult = (validator, value) => {
    const props = { testProp: value };
    const result = validator(props, 'testProp', 'testComponent', 'prop');

    expect(result instanceof Error).toBeTruthy();
};

const checkPassResult = (validator, value) => {
    const props = { testProp: value };
    const result = validator(props, 'testProp', 'testComponent', 'prop');

    expect(result instanceof Error).toBeFalsy();
};

describe('Custom prop types tool', () => {
    it('should pass immutableMapOf validation', () => {
        checkPassResult(
            customPropTypesTool.immutableMapOf(PropTypes.number),
            Map({ 1: 1, 2: 2, 3: 3 }),
        );
        checkPassResult(
            customPropTypesTool.immutableMapOf(PropTypes.string),
            Map({ 1: 'a', 2: 'b', 3: 'c' }),
        );
        checkPassResult(
            customPropTypesTool.immutableMapOf(customPropTypesTool.immutableMapOf(PropTypes.string)),
            Map({
                1: Map({ 1: 'a', 2: 'b', 3: 'c' }),
                2: Map({ 1: 'a', 2: 'b', 3: 'c' }),
            }),
        );
    });

    it('should fail immutableMapOf validation', () => {
        checkFailResult(
            customPropTypesTool.immutableMapOf(PropTypes.number),
            List([{ 1: 1, 2: 2, 3: 3 }]),
        );
        checkFailResult(customPropTypesTool.immutableMapOf(PropTypes.string), {
            1: 'a',
            2: 'b',
            3: 'c',
        });
    });
});
