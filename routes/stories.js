const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth.js');
const Story = require('../models/Story.js');

// @desc         Show add page
// @route       Get /stories/add
// Middleware ensures that only signed in User can access this route
router.get('/add', ensureAuth, (req, res) => {
    res.render('stories/add');
});

// @desc         Process Add Story Fam
// @route       POST /stories
// Middleware ensures that only signed in User can access this route
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Story.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

module.exports = router;