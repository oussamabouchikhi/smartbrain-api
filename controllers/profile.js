const getProfileHandler = (req, res, db) => {
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

}

module.exports = {getProfileHandler};