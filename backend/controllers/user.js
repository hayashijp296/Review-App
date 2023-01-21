const User = require('../models/user');
const EmailVerificationToken = require('../models/emailVerificationToken');
const { isValidObjectId } = require('mongoose');
const { generateOTP, generateMailTransporter } = require('../utils/mail');
const { sendError } = require('../utils/helper');

/* Creating a new user. */
exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  /* Checking if the email is already in use. */
  const oldUser = await User.findOne({ email });
  if (oldUser) return sendError(res, 'This email is already in use');

  /* Creating a new user and saving it to the database. */
  const newUser = new User({ name, email, password });
  await newUser.save();

  /* Generating a random 6 digit number. */
  let OTP = generateOTP();

  /* Creating a new email verification token and saving it to the database. */
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: newUser._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  var transport = generateMailTransporter();
  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: newUser.email,
    subject: 'Email Verification',
    html: `
    <p>Your verification OTP </p>
    <h1>${OTP}</h1>
    `,
  });

  res.status(201).json({
    message: 'Please verify your email. OTP has been sent to your email!',
  });
};

exports.verifyEmail = async (req, res) => {
  const { userId, OTP } = req.body;

  if (!isValidObjectId(userId)) return res.json({ error: 'Invalid user!' });
  const user = await User.findById(userId);
  if (!user) return sendError(res, 'user not found!', 404);
  if (user.isVerified) return sendError(res, 'user is already verified!');

  const token = await EmailVerificationToken.findOne({ owner: userId });
  if (!token) return sendError(res, 'token not found!');
  const isMatched = await token.compareToken(OTP);
  if (!isMatched) return sendError(res, 'Please submit a valid OTP');

  user.isVerified = true;
  await user.save();
  await EmailVerificationToken.findByIdAndDelete(token._id);

  var transport = generateMailTransporter();
  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: user.email,
    subject: 'Welcome Email',
    html: '<h1>Thank you for choosing us!</h1>',
  });
  res.json({ message: 'Your email is verified' });
};

exports.resendEmailVerificationToken = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(userId);
  if (!user) return sendError(res, 'User not found', 404);
  if (user.isVerified)
    return sendError(res, 'This email id is already verified');
  const alreadyHasToken = await EmailVerificationToken.findOne({
    owner: userId,
  });
  if (alreadyHasToken)
    return sendError(
      res,
      'Only after one hour you can request for another token!'
    );
  /* Generating a random 6 digit number. */
  let OTP = generateOTP();

  /* Creating a new email verification token and saving it to the database. */
  const newEmailVerificationToken = new EmailVerificationToken({
    owner: user._id,
    token: OTP,
  });

  await newEmailVerificationToken.save();

  var transport = generateMailTransporter();
  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: user.email,
    subject: 'Email Verification',
    html: `
     <p>Your verification OTP </p>
     <h1>${OTP}</h1>
     `,
  });
  res.status(201).json({
    message: 'Please verify your email. OTP has been sent to your email!',
  });
};
