const signupHandler = (req, res, db, bcrypt) => {
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
}

module.exports = {signupHandler};