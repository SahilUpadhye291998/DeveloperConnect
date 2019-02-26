const Validator = require('validator');
const isEmpty = require("./is-empty");
const Profile = require("../models/Profile");

module.exports = function validatorProfileInput(data) {
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.status = !isEmpty(data.status) ? data.status : "";
    data.skills = !isEmpty(data.skills) ? data.skills : "";

    if (!Validator.isLength(data.handle, {
            min: 2,
            max: 30
        })) {
        errors.handle = "Handle must be between 2 and 30 character";
    }

    if (Validator.isEmpty(data.handle)) {
        errors.handle = "Profile Handle field cant be empty";
    }

    if (Validator.isEmpty(data.status)) {
        errors.status = "status field cant be empty";
    }

    if (Validator.isEmpty(data.skills)) {
        errors.skills = "skills field cant be empty";
    }

    if (!isEmpty(data.website)) {
        if (!Validator.isURL(data.website)) {
            errors.website = "Not a valid URL";
        }
    }

    if (!isEmpty(data.youtube)) {
        if (!Validator.isURL(data.youtube)) {
            errors.youtube = "Not a valid URL";
        }
    }

    if (!isEmpty(data.twitter)) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = "Not a valid URL";
        }
    }

    if (!isEmpty(data.facebook)) {
        if (!Validator.isURL(data.facebook)) {
            errors.facebook = "Not a valid URL";
        }
    }

    if (!isEmpty(data.linkedin)) {
        if (!Validator.isURL(data.linkedin)) {
            errors.linkedin = "Not a valid URL";
        }
    }

    if (!isEmpty(data.instagram)) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = "Not a valid URL";
        }
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}