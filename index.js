const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // using for middleware
const cookieParser = require('cookie-parser'); // using for middleware

const { User } = require('./models/user');
const config = require('./config/key'); //for security of database URI(in development or production mode)
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

app.get('/', (req, res) => {
  res.json({ 'hello ~': 'hi~' });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/api/users/register', (req, res) => {
  const user = new User(req.bod); // information gained from client
  user.save((err, userData) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true
    }); // in case of no error
  });
}); // being saved in mongoDB and in case of an error dispalyin it

app.listen(5000);
