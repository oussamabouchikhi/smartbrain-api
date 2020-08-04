const signinHandler = (db, bcrypt) => (req, res) => {
    const { email, password } = req.body;

    if ( !email || !password ) {
        return res.status(400).json('incorrect form submission');
    }

    db.select('email', 'hash')
    .where('email', '=', email)
      .from('login')
      .then(data => {
        const isValid = bcrypt.compareSync(password ,data[0].hash);
        console.log(isValid + '-' + data);
        if (isValid) {
            return db.select('*')
                    .from('users')
                    .where('email', '=', email)
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