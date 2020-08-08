var express = require('express');
var router = express.Router();

router.get('/criticalExamSKT', function(req, res, next) {
  res.render('exams/criticalExamSKT', { title: 'Critical Exam' });
});

router.get('/audioExam', function(req, res, next) {
  res.render('exams/audioExam', { title: 'Audio Skills Test' });
});

module.exports = router;
