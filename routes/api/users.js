const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys");
const passport = require("passport");

//vaidation input 
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

//Load User model
const User = require("../../models/User");

//@route    GET api/users/test
//@desc     Test the api
//@access   PUBLIC  
router.get("/test", (request, response) => {
    response.json({
        msg: "Users Works"
    });
});

//@route    POST api/users/resgister
//@desc     To register the user
//@access   PUBLIC 
router.post("/resgister", (request, response) => {

    const {
        errors,
        isValid
    } = validateRegisterInput(request.body);

    //check validation
    if (!isValid) {
        return response.status(400).json(errors);
    }

    User.findOne({
        email: request.body.email //<get the reqest body or like textbox etc 
    }).then((user) => {
        if (user) {
            errors.email = "Email already exists";
            return response.status(400).json(errors)
        } else {
            const avatar = gravatar.url(request.body.email, {
                s: '200', //size
                r: 'pg', //rating
                d: 'mm'
            })

            const newUser = new User({
                name: request.body.name,
                email: request.body.email,
                password: request.body.password,
                avatar: avatar
            });

            bycrpt.genSalt(10, (err, salt) => {
                bycrpt.hash(newUser.password, salt, (error, hash) => {
                    if (error) throw error;
                    newUser.password = hash;
                    newUser.save().then(user => response.json(user)).catch(error => console.log(error));
                });
            });
        }
    })
});

//@route    GET api/users/login
//@desc     LogIn User / Return JWT Token
//@access   PUBLIC
router.post("/login", (request, response) => {
    const email = request.body.email;
    const password = request.body.password;

    const {
        errors,
        isValid
    } = validateLoginInput(request.body);

    //check validation
    if (!isValid) {
        return response.status(400).json(errors);
    }


    User.findOne({
            email
        })
        .then((user) => {
            //check for users
            if (!user) {
                errors.email = "User not found";
                return response.status(404).json(errors);
            }

            //check password
            bycrpt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    //User Matched...create payload
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    };

                    //Sign Match
                    jwt.sign(payload, keys.secretOrKey, {
                        expiresIn: 3600
                    }, (error, token) => {
                        response.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    });
                } else {
                    errors.password = "Password incorrent";
                    return response.status(400).json(errors);
                }
            });
        });
})

//@route    GET api/users/current
//@desc     return current user 
//@access   PRIVATE
router.get("/current", passport.authenticate('jwt', {
    session: false
}), (request, responce) => {
    responce.json({
        id: request.user.id,
        name: request.user.name,
        avatar: request.user.avatar,
        email: request.user.email
    });
})

module.exports = router;