var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// connect to mongodb
mongoose.connect('mongodb://localhost/book_manage', function(err) {
  if(!err) {
    console.log('connected to mongoDB');
  }else {
    throw err;
  }
});

var schema = mongoose.Schema;
var ObjectID = schema.ObjectID;
// 定义模型的模式
var Book = new schema({
  // book: String
  title: {
    unique: true,
    type: 'String',
  },
  descript: 'String',
  price: 'Number',
  meta: {
      createAt: {
          type: Date,
          default: Date.now()
      }
  }
});
// 使用变量来创建新任务
var Book = mongoose.model('Book',Book);

/* GET home page. */
router.get('/', function(req, res) {
  Book.find({}, function(err,docs) {
    res.render('index', { title: '图书管理系统', docs: docs});
  })
});

router.get('/add', function(req, res) {
  res.render('add.jade', {
    title: '新增书籍'
  })
});

router.post('/', function(req,res) {
  var book = new Book(req.body);
  book.save(function(err) {
    if(!err) {
      res.redirect('/');
    }
    else {
      res.redirect('/add');
    }
  })
});

router.get('/:id/edit', function(req,res) {
  // var book = new Book(req.body);
  Book.findById(req.params.id, function(err,doc) {
    res.render('edit.jade', {
      // title: 'edit Task View',
      book: doc,
      id: req.params.id
    });
  });
});

router.put('/:id/edit', function(req,res) {
  var book = new Book(req.body);
  Book.findByIdAndUpdate(req.params.id, function(err,doc) {
    doc.books = req.body.book;
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

// router.delete('/:id', function(req,res) {
//   Book.findById(req.params.id, function(err,doc) {
//     if(!doc) return next(new NotFound('document not found!'));
//     doc.remove(function() {
//       res.redirect('/');
//     });
//   });
// });

module.exports = router;
