var mongoose = require('mongoose');

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

exports.Book = mongoose.model('Book', Book)