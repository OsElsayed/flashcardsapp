var express = require('express');
var router = express.Router();
let User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const EYNC_KEY = config.EYNC_KEY;

router.post('/', async (req, res, next) => {
    if (!req.body.email | !req.body.password)
        res.status(200).send({ message: 'There is no email and password' });

    try {
        const user = await User.findOne({ email: req.body.email, password: req.body.password });
        if (!user) res.status(200).send({ message: 'User not found' });
        if (user && user.status === false) {
            res.send({ message: 'User not active' });
            return
        }
        const token = jwt.sign({ name: user.firstName, email: user.email, _id: user._id, role: user.role }, EYNC_KEY);
        res.status(200).send({ token });
    } catch (error) {
        return next(error);
    }
});
module.exports = router;