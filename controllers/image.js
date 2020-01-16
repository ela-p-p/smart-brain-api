const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: "bc4cc6d2f16147b085e4dbed8991ba1f"
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("unable to call API"));
};

const addUpload = db => (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("upload", 1)
    .returning("upload")
    .then(upload => {
      res.json(upload[0]);
    })
    .catch(err => res.status(400).json("unable to get entries"));
};

module.exports = {
  addUpload,
  handleApiCall
};
