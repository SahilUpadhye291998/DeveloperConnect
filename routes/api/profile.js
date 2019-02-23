const express = require('express');
const router = express.Router();

//@route    GET api/profile/test
//@desc     Test the api
//@access   PUBLIC

router.get("/test", (request, response) => {
    response.json({
        msg: "Profile Works"
    });
});

module.exports = router;