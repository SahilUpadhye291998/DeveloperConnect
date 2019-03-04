const Validator = require('validator');
const isEmpty = require("./is-empty");

module.exports = function validatorRegisterInput(data) {
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.password2 = !isEmpty(data.password2) ? data.password2 : "";


    if (!Validator.isLength(data.name, {
            min: 2,
            max: 30
        })) {
        errors.name = "Name must be between 2 and 30 character";
    }

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field cant be empty";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field cant be empty";
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is not valid";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field cant be empty";
    }

    if (!Validator.isLength(data.password, {
            min: 6,
            max: 30
        })) {
        errors.password = "Password must be between 6 and 30 character";
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Conform password field cant be empty";
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password2 = "Passwords must be equal";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}