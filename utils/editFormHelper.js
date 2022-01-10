import * as utils from '.';
/**
 * for the edit forms, we will be using a special type of form if the model has children tables. For example, productvariations will always be part of the product table. So when we will edit the product, we will need to show the product variations as list so user can add/edit in context of the product. 
 * 
 * In order to achieve this functionality, we will need to implement some helper functions which will push the item to array.
 * 
 */


export const save = (arrayToSearchIn, itemToSave, index) => {
    // if the id matches, then it is edit, for add, id will be undefined.

    const baseArray = JSON.parse(JSON.stringify(arrayToSearchIn));
    const _itemToSave = Object.assign({}, itemToSave);

    _itemToSave.modified = true; // let's hook it with a flag

    if (index > -1) {
        baseArray[index] = _itemToSave;
    }
    else {
        baseArray.push(_itemToSave);
    }

    return baseArray;
};


export const copy = (baseArray, indexes) => {
    let indexesToCopy = indexes;
    const clonnedArray = JSON.parse(JSON.stringify(baseArray));

    if (!Array.isArray(indexes)) {
        indexesToCopy = [index];
    }

    const itemsToCopy = clonnedArray.filter((_, index) => indexesToCopy.indexOf(index) > -1);

    if (itemsToCopy && itemsToCopy.length > 0) {
        clonnedArray.push(...itemsToCopy.map(item => {
            return {
                ...item,
                id: undefined,
                modified: true
            };
        }));
    }

    return clonnedArray;
};


export const deleteItems = (baseArray, indexes) => {
    // in delete, we may remove single or more id, let's get rid of ids collectively
    // let's try to fiidsToDelete

    let indexesToDelete = indexes;

    // let's make sure we don't have deleted items in array as it may create a problem for indexes coming from the list table

    const baseArrayClonned = baseArray.filter(item => !item.deleted);

    if (!Array.isArray(indexes)) {
        indexesToDelete = [indexes];
    }

    // Let's filter out the deleted items, and we will have the remaining array
    return baseArrayClonned.map((item, index) => {
        return {
            ...item,
            deleted: indexesToDelete.indexOf(index) > -1
        };
    });
};


/**
 * 
 * @param {*} baseObject 
 * @param {*} configs format of config will be an array
 * [{
 * name: propertyName ** should exactly match as the name of property in the base object
 * type: the data type ** valid values are string, integer, date
 * required: boolean, if true, we will not be sending the submitted unless the field is property filled
 * }]
 * 
 * this is very boring to check for the inputs at each form. The better option will be to create a config and check if the object to be submitted has valid values or not.
 */
export const validateInputs = (baseObject, configs) => {

    const errors = [];

    configs.forEach(config => {
        const value = baseObject[config.name];

        if (value !== 0 && !value && config.required === true) {
            // problem problem
            errors.push(`The field ${config.name} is not found in the data. Please enter this field and try again.`);
        }

        switch (config.type) {
            case 'string':
                // anything is fine, so let's assume it is correct;
                break;
            case 'number':
                if (!utils.validateNumber(value)) {
                    errors.push(`The field ${config.name} is supposed to be a number. We received ${value}. Please enter this field and try again.`);
                }
                break;
            case 'email':
                if (!utils.validateEmailFormat(value)) {
                    errors.push(`The field ${config.name} is supposed to be a email. We received ${value}. Please enter this field and try again.`);

                }
                break;
            case 'date':
                if (!utils.validateDate(value)) {
                    errors.push(`The field ${config.name} is supposed to be a date. We received ${value}. Please enter this field and try again.`);
                }
                break;
        }

    });

    if (errors.length > 0) {
        return 'Invalid input. Errors are given below: \n\n' + errors.join('\n');
    }

    return undefined;

};

export const validateInputsWithDisplayName = (baseObject, configs) => {

    const errors = [];

    configs.forEach(config => {
        const value = baseObject[config.name];

        if (value !== 0 && !value && config.required === true) {
            // problem problem
            errors.push(`The field ${config.displayname} is not found in the data. Please enter this field and try again.`);
        }

        switch (config.type) {
            case 'string':
                // anything is fine, so let's assume it is correct;
                break;
            case 'number':
                if (!utils.validateNumber(value)) {
                    errors.push(`The field ${config.displayname} is supposed to be a number. We received ${value}. Please enter this field and try again.`);
                }
                break;
            case 'date':
                if (!utils.validateDate(value)) {
                    errors.push(`The field ${config.displayname} is supposed to be a date. We received ${value}. Please enter this field and try again.`);
                }
                break;
            case 'email':
                if (!utils.validateEmailFormat(value)) {
                    errors.push(`The field ${config.displayname} is supposed to be a email. We received ${value}. Please enter this field and try again.`);

                }
                break;
        }

    });

    if (errors.length > 0) {
        return 'Invalid input. Errors are given below: \n\n' + errors.join('\n');
    }

    return undefined;

};


export const validateInputsWithDisplayName_New = (baseObject, configs) => {

    const errors = [];

    configs.forEach(config => {
        const value = baseObject[config.name];

        if (value !== 0 && !value && config.required === true) {
            // problem problem
            errors.push(`Please enter ${config.displayname} and try again.`);
        }

        switch (config.type) {
            case 'string':
                // anything is fine, so let's assume it is correct;
                break;
            case 'number':
                if (!utils.validateNumber(value)) {
                    errors.push(`The field ${config.displayname} is supposed to be a number. We received ${value}. Please enter this field and try again.`);
                }
                break;
            case 'date':
                if (!utils.validateDate(value)) {
                    errors.push(`The field ${config.displayname} is supposed to be a date. We received ${value}. Please enter this field and try again.`);
                }
                break;
            case 'email':
                if (!utils.validateEmailFormat(value)) {
                    errors.push(`The field ${config.displayname} is supposed to be a email. We received ${value}. Please enter this field and try again.`);

                }
                break;
        }

    });

    if (errors.length > 0) {
        return '' + errors.join('\n');
    }

    return undefined;

};


export const shouldStoreDataInStateByKey = (nextPropsData, previousPropsData, key) => {
    if (nextPropsData && Array.isArray(nextPropsData) && nextPropsData.length > 0) {
        // ok, we got the data

        // let's find if there are any values in past props
        if (!previousPropsData || previousPropsData.length === 0) {
            return true;
        }
        else {
            if (!previousPropsData.key) {
                previousPropsData.key = -100;
            }
            if (nextPropsData.key !== previousPropsData.key && nextPropsData.key > previousPropsData.key) {
                return true;
            }
        }
    }

    return false;
};