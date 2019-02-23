const express = require('express');
const router = express.Router();

//@route    GET api/posts/test
//@desc     Test the api
//@access   PUBLIC
router.get("/test", (request, response) => {
    response.json({
        msg: "Posts Works"
    });
});

module.exports = router;