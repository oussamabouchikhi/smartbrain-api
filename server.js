const express    = require('express');
const bodyParser = require('body-parser');
const bcrypt     = require('bcryptjs');
const cors       = require('cors');
const knex       = require('knex');

const {signinHandler}  = require('./controllers/signin');
const {signupHandler}  = require('./controllers/signup');
const {getProfileHandler} = require('./controllers/profile');
const image   = require('./controllers/image');

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

app.get('/', (req, res) => { res.send(database.users)});
app.post('/signin', signinHandler(db, bcrypt) );
app.post('/signup', (req, res) => { signupHandler(req, res, db, bcrypt) });
app.get('/profile/:id', (req, res) => { getProfileHandler(req, res, db) });
app.put('/image', (req, res) => { image.imageHandler(req, res, db) });
app.post('/imageUrl', (req, res) => { image.handleApiCall(req, res) });


const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server up & running at localhost:${PORT}`);
});