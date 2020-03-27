const handleRegister = (req, res, db, bcrypt) => {
  const { email, password, name } = req.body;
  const hash = bcrypt.hashSync(password);

  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }

  db.transaction(trx => {
    trx
      .insert({
        hash,
        email
      })
      .into("login")
      .returning("email")
      .then(loginEmail => {
        return trx("users")
          .returning("*")
          .insert({ email: loginEmail[0], name, joined: new Date() })
          .then(response => res.json(response[0]));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch(err =>
    res.status(400).json("Something went wrong. Please try again. :)")
  );
};

module.exports = {
  handleRegister
};
