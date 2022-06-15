const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Joi = require("@hapi/joi");

//Validation of User Inputs
const registerSchema = Joi.object({
  firstName: Joi.string().min(4).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(8).required(),
});

//SignUp User
router.post("/register", async (req, res) => {
  //Check If User Email Already Exists
  const emailExist = await User.findOne({ email: req.body.params });

  //If Email Exist Then Return
  if (emailExist) {
    res.status(400).send("Email already exists");
    return;
  }
  //HASHING PASSWORD
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Adding New User
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    //Validate User Input

    const { error } = await registerSchema.validateAsync(req.body);

    //We Can Just Get The Error With Object DeConstruction If Errror Exists Then Send Back The Error
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    } else {
      //New User Is Added
      const saveUser = user.save();
      res.status(200).send("A New User Created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//LOGIN SCHEMA
const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(8).required(),
});

//Login User

router.post("/login", async (req, res) => {
  //Checking if emil exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect Email-ID");
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  //Checking if the user password matchs

  try {
    //VALIDATION OF USER INPUTS

    const { error } = await loginSchema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      res.send("Success");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
  if (!validPassword) return res.status(400).send("Incorrect Password");
});
module.exports = router;
