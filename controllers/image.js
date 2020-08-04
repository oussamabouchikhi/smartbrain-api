const clarifai = require('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: 'a9ab926a9c634cb78682123e4c710a03'
 });

const handleApiCall = (req, res) => {
  app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      req.body.input
    )
    .then(data => {
      res.json(data)
    })
    .catch(err => res.status(400).json('Unable to call api'));
}

const imageHandler = (req, res, db) => {
    const {id} = req.body;
    
    db('users')
      .where('id', '=', id)
      .increment('entries', 1)
      .returning('entries')
      .then(entries => {
        res.json(entries[0]);
      })
      .catch(err => res.status(404).json('Unable to get entries'));
}

module.exports = {imageHandler, handleApiCall};