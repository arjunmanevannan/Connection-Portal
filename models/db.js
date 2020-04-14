const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TechMasters', {useNewUrlParser: true}, (err) => {
  if(!err){
    console.log('Connected to the database TechMasters');
  }
  else{
    console.log('Error in db connection : '+err);
  }
});
