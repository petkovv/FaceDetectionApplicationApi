const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(response => {
      const isValid = bcrypt.compareSync(password, response[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => res.json(user[0]));
      } else {
        res.status(400).json("Wrong email or password");
      }
    })
    .catch(err => res.status(400).json("Wrong email or password"));
};

module.exports = {
  handleSignin
};
