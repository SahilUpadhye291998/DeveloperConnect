const Validator = require('validator');
const isEmpty = require("./is-empty");
const User = require("../models/User");

module.exports = function validatorLoginInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
        errors.email = ":=< Email is not valid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field cant be empty";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field cant be empty";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}