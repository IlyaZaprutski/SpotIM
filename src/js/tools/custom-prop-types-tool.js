import PropTypes from 'prop-types';
import { Map } from 'immutable';

const makeIsRequired = (propTypeChecker) => {
    const extendedPropTypeChecker = propTypeChecker;

    extendedPropTypeChecker.isRequired = (props, propName, componentName) => {
        if (!props[propName]) {
            return new Error(`Required prop \'${propName}\' was not specified in \'${componentName}\'.`);
        }

        return propTypeChecker(props, propName, componentName);
    };

    return propTypeChecker;
};

const immutableCollectionItemsAndKeysOfChecker = (
    itemPropTypeChecker,
    keyPropTypeChecker,
    props,
    propName,
    componentName,
) => {
    let itemError = null;
    let keyError = null;

    props[propName].forEach((item, key) => {
        if (itemPropTypeChecker) {
            itemError = PropTypes.checkPropTypes(
                {
                    item: itemPropTypeChecker,
                },
                {
                    item,
                },
                'prop',
                componentName,
            );
        }

        if (keyPropTypeChecker) {
            keyError = PropTypes.checkPropTypes(
                {
                    key: keyPropTypeChecker,
                },
                {
                    key,
                },
                'prop',
                componentName,
            );
        }

        if (itemError instanceof Error || keyError instanceof Error) {
            return false;
        }

        return true;
    });

    if (itemError) {
        return new Error(`Invalid prop \'${propName}\' supplied to \'${componentName}\'. Validation failed. Wrong item type: ${
            itemError.message
        }`);
    }

    if (keyError) {
        return new Error(`Invalid prop \'${propName}\' supplied to \'${componentName}\'. Validation failed. Wrong key type: ${
            keyError.message
        }`);
    }

    return null;
};

const immutableMapOfChecker = (
    itemPropTypeChecker,
    keyPropTypeChecker,
    props,
    propName,
    componentName,
) => {
    if (!props[propName]) {
        return null;
    }

    if (!(props[propName] instanceof Map)) {
        return new Error(`Invalid prop \'${propName}\' supplied to \'${componentName}\'. Validation failed. Expected: Immutable.Map, type: ${typeof props[
            propName
        ]}`);
    }

    return immutableCollectionItemsAndKeysOfChecker(
        itemPropTypeChecker,
        keyPropTypeChecker,
        props,
        propName,
        componentName,
    );
};

const customPropTypes = {
    immutableMapOf: (itemPropTypeChecker, keyPropTypeChecker) =>
        makeIsRequired((...args) =>
            immutableMapOfChecker(itemPropTypeChecker, keyPropTypeChecker, ...args)),
};

export default customPropTypes;
