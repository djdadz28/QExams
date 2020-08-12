var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('exams/index', { title: 'Critical Exam' });
});

router.get('/print', function(req, res, next) {
  res.render('exams/print', { title: 'Audio Skills Test' });
});

module.exports = router;
