const express = require('express');
const router = express.Router();

//@route    GET api/users/test
//@desc     Test the api
//@access   PUBLIC  
router.get("/test", (request, response) => {
    response.json({
        msg: "Users Works"
    });
});

module.exports = router;