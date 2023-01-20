const User = require('../models/user');

/* Creating a new user. */
exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  /* Checking if the email is already in use. */
  const oldUser = await User.findOne({ email });
  if (oldUser)
    return res.status(401).json({ error: 'This email is already in use' });

  /* Creating a new user and saving it to the database. */
  const newUser = new User({ name, email, password });
  await newUser.save();

  res.status(201).json({ user: newUser });
};
