const Clarifai = require("clarifai");

const app = new Clarifai.App({ apiKey: "7bd7abd38d8a4ef08ca669014f250ab3" });

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(response =>
      response.status(400).json("unable to work with the API")
    );
};

const handleImage = (req, res, db) => {
  const { id } = req.body;

  db("users")
    .returning("entries")
    .where("id", "=", id)
    .increment("entries", 1)
    .then(response => {
      res.json(response[0]);
    })
    .catch(err => res.status(400).json("Unable to get entries"));
};

module.exports = { handleImage, handleApiCall };
