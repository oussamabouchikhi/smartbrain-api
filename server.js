const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');


const postgres = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '',
        database : 'smart-brain'
    }
});
console.log(postgres.select('*').from('users'));

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: 123,
            name: 'Zaddour',
            email: 'Zaddour@gmail.com',
            password: 123456,
            entries: 17,
            joined: new Date()
        },
        {
            id: 124,
            name: 'Baddour',
            email: 'Baddour@gmail.com',
            password: 123456,
            entries: 35,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users);
    
});

app.post('/signin', (req, res) => {
    // Load hash from your password DB.
    bcrypt.compare("B4c0/\/", hash, function(err, res) {
        console.log('First guess: ', res);
    });
    bcrypt.compare("not_bacon", hash, function(err, res) {
        console.log('Second guess: ', res);
    });
    
    // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
    // bcrypt.compare("B4c0/\/", hash).then((res) => {
    //    // res === true
    // });
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.status(200).json({message: 'Signed in successfully'});
    }
    res.status(404).json({message: 'Error signing in'});
});

app.post('/signup', (req, res) => {
    const {email, name, password} = req.body;
    bcrypt.hash(password, 8, function(err, hash) {

    });
    
    database.push({
        id: '125',
        name,
        email,
        password,
        entries: 0,
        joined: new Date()
    })
    
    res.status(201).json(database.users.length-1);
});

app.get('/profile/:id', (req, res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }   
        console.log(user.id + '---' + id + '---' + found);
    });
    
    if(!found) res.status(404).json('No such user');
});

app.put('/image', (req, res) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.status(200).json(user.entries);
        }   
    });
    if(!found) {res.status(404).json('No such user')}
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server up & running at localhost:${PORT}`);
});