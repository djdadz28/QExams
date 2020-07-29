# QExams
Q Examinations

Steps to install:

1. clone from git
2. run `npm install`
3. run `npm start`


Creating new route (ex: localhost:3000/people)

1. create new file `/routes/people.js`
2. create new files `/views/people/index.jade`
3. write this inside `people.js`
```
var express = require('express');
var router = express.Router();

/* GET people listing. */
router.get('/', function(req, res, next) {
  res.render('people/index', { title: 'People' });
});

module.exports = router;
```
4. In `app.js` add this lines
```
var peopleRouter = require('./routes/people');
var app.use('/people', adminRouter);
```
5. restart the app. Now you can access `localhost:3000/people`


Adding actions to `People` (ex: localhost:3000/people/new)

1. Create this file `/views/people/new.jade`
2. in `/routes/people.js`, add this line
```
/* Add new people listing. */
router.get('/new', function(req, res, next) {
  res.render('people/new', { title: 'People Add' });
});
```
3. Now you can access or link this url `localhost:3000/people/new`
