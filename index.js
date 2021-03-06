const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const config = require('./config/key');
const { User } = require('./models/User');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoose = require('mongoose');
const { json } = require('express/lib/response');
mongoose
    .connect(config.mongoURI)
    .then(() => console.log('MongoDB Connected..'))
    .catch((err) => console.log(err));

app.get('/', (req, res) => res.send('Hello World'));

app.post('/register', (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true,
        });
    });
});

app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, userInfo) => {
        if (!userInfo) {
            return res.json({
                loginSuccess: false,
                msg: 'DOES_NOT_EXIST_USER_EMAIL',
            });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, msg: 'PASSWORD_ERROR' });

            user.generateToken((err, user) => {});
        });
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
