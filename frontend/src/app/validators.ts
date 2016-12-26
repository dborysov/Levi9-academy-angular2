import { FormGroup, FormControl } from '@angular/forms';

export function areEqual(group: FormGroup) {
    const groupKeys = Object.keys(group.controls);
    const groupValues = groupKeys.reduce((prev, curr) => Object.assign({}, prev, { [group.controls[curr].value]: true }), {});

    return Object.keys(groupValues).length === 1
        ? null
        : { areEqual: true };
};

export function isEmail(control: FormControl) {
    return /^[0-9a-zA-Z\.]+@[0-9a-zA-Z\.]+\.\w{2,3}$/.test(control.value)
        ? null
        : {
            validateEmail: {
                valid: false
            }
        };
}

export function isValidPrice(control: FormControl) {
    return parseInt(control.value, 10) >= 0 && parseInt(control.value, 10) <= 100000
        ? null
        : {
            validatePrice: {
                valid: false
            }
        };
}
