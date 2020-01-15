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
  }

  module.exports = {
      addUpload
  }