const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
//Add mongoose
const PORT =5000;
const app = express();
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/workout', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
  );

app.use(require('./routes/apiRoutes.js'))
app.use(require('./routes/htmlRoutes.js'));

app.listen(PORT, () =>{
    console.log(`App running in http://localhost:${PORT}`);
});