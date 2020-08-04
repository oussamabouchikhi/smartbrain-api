const signinHandler = (db, bcrypt) => (req, res) => {

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
}

module.exports = {signinHandler}