const express = require('express');
const router = express.Router();

const User = require('../../models/User');

// @desc  get all user
// @route GET /api/user
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

// @desc get user by id
// @route POST /api/user/id
router.get('/:id', async (req, res) => {
  try {
    const userExists = await User.findById(req.params.id);

    if (userExists) {
      return res.status(200).json(userExists);
    } else {
      return res.status(400).json('User does not exist');
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('User does not exist');
  }
});

// @desc  add user
// @route POST /api/user
router.post('/', async (req, res) => {
  const { email, name, phoneNumber, address } = req.body;
  console.log(req.body);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User Already exists' });
    }
    const user = await User.create({
      email,
      name,
      phoneNumber,
      address,
    });
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

// @desc update user
// @route PUT /api/user
router.put('/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.phoneNumber = req.body.phoneNumber;
      user.address = req.body.address;

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ msg: 'user not found' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send('server error');
  }
});

// @desc delete user by id
// @route DELETE /api/user/id
router.delete('/:id', async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.params.id });
    res.status(200).json('User Deleted Succesfully');
  } catch (err) {
    console.log(err.message);
    res.status(500).send('server error');
  }
});

module.exports = router;
