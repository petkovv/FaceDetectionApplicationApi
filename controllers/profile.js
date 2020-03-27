const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then(response => {
      if (response.length > 0) {
        res.json(response[0]);
      } else {
        res.json("User not found");
      }
    })

    .catch(err => res.status(400).json("Error occured"));
};

module.exports = { handleProfileGet };
