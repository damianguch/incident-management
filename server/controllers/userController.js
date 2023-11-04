const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { getUser, createUser } = require('../models/user');
require('dotenv').config();

class UserController {
  static async register(req, res) {
    //Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    try {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      //create a new user
      const msg = await createUser(name, email, hashedPassword);

      //respond with success
      res.status(201).json({ message: msg });
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  static async login(req, res) {
    //Input validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      //fetch the user from the database
      const user = await getUser(email);
      console.log(user);
      if (!user) {
        return res.status(401).json({ error: 'User not found!' });
      }

      //check if the password matches
      const hashedPassword = user.password;

      const isPasswordValid = await bcrypt.compare(password, hashedPassword);
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      //Generate access token
      const accessToken = jwt.sign(
        { userId: user.Id },
        process.env.ACCESS_SECRET_KEY,
        {
          expiresIn: '15m'
        }
      );

      //Generate refresh token
      // const refreshToken = jwt.sign(
      //   { userId: user.Id },
      //   process.env.ACCESS_SECRET_KEY,
      //   {
      //     expiresIn: '7d'
      //   }
      // );

      res.status(200).json({ accessToken });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  }
}

module.exports = UserController;
