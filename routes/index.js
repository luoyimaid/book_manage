var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '图书管理系统' });
});

// connect to mongodb
mongoose.connect('mongodb://localhost/todo_development', function(err) {
  if(!err) {
    console.log('connected to mongoDB');
  }else {
    throw err;
  }
});

var schema = mongoose.Schema;
var ObjectID = schema.ObjectID;
// 定义模型的模式
var Task = new schema({
  task: String
});
// 使用变量来创建新任务
var Task = mongoose.model('Task',Task);

router.get('/add', function(req, res) {
  res.render('add.jade', {
    title: 'add Task'
  })
});

router.post('/', function(req,res) {
  var task = new Task(req.body.task);
  task.save(function(err) {
    if(!err) {
      res.redirect('/');
    }
    else {
      res.redirect('/add');
    }
  })
});

router.get('/:id/edit', function(req,res) {
  Task.findById(req.params.id, function(err,doc) {
    res.render('/edit', {
      title: 'edit Task View',
      task: doc
    });
  });
});

router.put('/:id', function(req,res) {
  Task.findById(req.params.id, function(err,doc) {
    doc.task = req.body.task.task;
    doc.save(function(err) {
      if(!err) {
        res.redirect('/');
      }
      else {
        // error handing
      }
    });
  });
});

router.delete('/tasks/:id', function(req,res) {
  Task.findById(req.params.id, function(err,doc) {
    if(!doc) return next(new NotFound('document not found!'));
    doc.remove(function() {
      res.redirect('/tasks');
    });
  });
});

module.exports = router;
