const User = require('../models/userModel');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select('name email role');

  return res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassowrd.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be update
  const filterBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updateUser = await User.findByIdAndUpdate(req.user.id, filterBody, {
    new: true,
    runValidators: true
  });

  return res
    .status(200)
    .json({ status: 'success', data: { user: updateUser } });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  return res.status(201).json({ status: 'success', data: null });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    msg: 'This route is not yet defined'
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    msg: 'This route is not yet defined'
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    msg: 'This route is not yet defined'
  });
};
