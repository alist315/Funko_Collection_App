const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const PORT = process.env.PORT || 3000;
const Funko = require('./models/funko_pop.js');
const funkoSeed = require('./models/funko.js');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ 'funkoCollection';

mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});

db.on('open' , () => {});
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  Funko.find({}, (error, allFunkos) => {
    res.render('index.ejs', {
      funkos: allFunkos
    });
  })
});
app.get('/funko/', (req, res) => {
  Funko.find({}, (error, allFunkos) => {
    res.render('index2.ejs', {
      funkos: allFunkos
    });
  })
});

app.get('/funko/sortByName', (req, res) => {
  Funko.find({}, (error, allFunkos) => {
    res.render('index2.ejs', {
      funkos: allFunkos
    });
  }).sort({name:1});
});
app.get('/funko/sortByNumber', (req, res) => {
  Funko.find({}, (error, allFunkos) => {
    res.render('index2.ejs', {
      funkos: allFunkos
    });
  }).sort({numberInCollection:1});
});
app.get('/funko/sortByName2', (req, res) => {
  Funko.find({}, (error, allFunkos) => {
    res.render('index2.ejs', {
      funkos: allFunkos
    });
  }).sort({name:-1});
});

app.post('/funko', (req, res) => {
  Funko.create(req.body, (error, data) => {
    res.redirect('/funko');
  });
});

app.get('/funko/new', (req, res) => {
  res.render('new.ejs');
});
app.get('/funko/:id/edit', (req, res) => {
  Funko.findById(req.params.id, (err, foundFunko) =>{
    res.render(
      'edit.ejs',
      {
        funko: foundFunko
      }
    );
  });
});
app.put('/funko/:id', (req, res) => {
  Funko.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedProduct) => {
    res.redirect('/funko');
  });
});

// Funko.create(funkoSeed, (err, data) => {
//   if (err) console.log(err.message)
// console.log('added provided funko pop data')
// });
app.get('/funko/:id', (req, res) => {
  Funko.findById(req.params.id, (error, foundFunkos) => {
    res.render('show.ejs', {
      funko: foundFunkos
    });
  });
});

app.delete('/funko/:id', (req, res) => {
  Funko.findByIdAndRemove(req.params.id, (err, logs) => {
  res.redirect('/funko');
  });
});


app.get('/funko/seed', (req, res) =>{
  Funko.create([
    {
      name:'Captain America The First Avenger',
      numberInCollection:219,
      popType: 'Emerald City Comic Con exclusive',
      img:'https://cf1.s3.souqcdn.com/item/2018/06/13/35/87/27/63/item_XL_35872763_139507376.jpg',
      value:50,
      collection_:'Marvel',
      qty:1,
    },
    {
      name:'Wolverine',
      numberInCollection:05,
      popType: 'common',
      img:'https://images-na.ssl-images-amazon.com/images/I/61EicsqfXTL._SX425_.jpg',
      value:20,
      collection_:'Marvel',
      qty:2,
    },
    {
      name:'Loki',
      numberInCollection:16,
      popType: 'San Diego Comic Con Exclusive',
      img:'https://images-na.ssl-images-amazon.com/images/I/51n1EgM%2BtvL._SX425_.jpg',
      value:800,
      collection_:'Marvel',
      qty:1,
    },
    {
      name:'Dr. Doom',
      numberInCollection:17,
      popType: 'Common Valted',
      img:'https://images-na.ssl-images-amazon.com/images/I/71kYF1EPZFL._SX425_.jpg',
      value:150,
      collection_:'Marvel',
      qty:1,
    },

  ], (err, data) => {
    res.redirect('/funko')
  })
});



// Error
db.on('error', (err) => {
console.log(err.message + ' is Mongod not running?')
});
db.on('connected', () =>{
  console.log('mongo connected: ', MONGODB_URI)
});
db.on('disconnected', () => {
  console.log('mongo disconnected')
});




app.listen(PORT, () => {
console.log( 'Listening on port:', PORT)
});
