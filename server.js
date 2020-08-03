const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');


const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'admin',
        database : 'smart-brain'
    }
});
db.select('*').from('users')
  .then(data => {
      console.log(data);
  });

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
    
});

app.post('/signin', (req, res) => {

    db.select('email', 'hash')
    .where('email', '=', req.body.email)
      .from('login')
      .then(data => {
        const isValid = bcrypt.compareSync(req.body.password ,data[0].hash);
        console.log(isValid + '-' + data);
        if (isValid) {
            return db.select('*')
                    .from('users')
                    .where('email', '=', req.body.email)
                    .then(user => res.json(user[0]))  
                    .catch(err => res.status(400).json('Error getting user'));
        } else {
            res.status(400).json('Wrong credentials');
        }
      })
      .catch(err => {
          res.status(404).json('Wrong credentials!: ');
          console.log(err);
       });
});

app.post('/signup', (req, res) => {
    const { email, name, password } = req.body;
    const hash = bcrypt.hashSync(password);

    /**
     * Insert registered user into login table then into users using transaction
     */
    db.transaction(trx => {
        trx.insert({
            hash,
            email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
              .returning('*')
              .insert({
                  email: loginEmail[0],
                  name: name,
                  joined: new Date()
              })
              .then(user => res.json(user[0]))  
        })
        .then(trx.commit)
        .catch(trx.rollback);
    })
    .catch(err => res.status(400).json('Error signing up'));
});

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        db.select('*')
          .from('users')
          .where({ id })
          .then(user => {
            user.length 
            ? res.json(user[0])
            : res.status(400).json('There is no users')
          })
          .catch(err => res.status(400).json('No such user'));
    });

});

app.put('/image', (req, res) => {
    const {id} = req.body;
    
    db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
        res.json(entries[0]);
      })
      .catch(err => res.status(404).json('Unable to get entries'));
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server up & running at localhost:${PORT}`);
});