import { body, validationResult } from "express-validator";


export const userRegistrationRules = () => {
  return [
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password should not be empty"),
    body("password").isLength({ min: 8, max:16 }).withMessage("Password must be greater than 8 and less than 16"),
    body("confirmpassword").isLength({ min: 8, max:16 }).withMessage("Confirm Password must be greater than 8 and less than 16"),
    body("confirmpassword").notEmpty().withMessage("Confirm Password should not be empty")
      .custom((value,{req}) =>{
          if(value !== req.body.password){
              throw new Error('Password confirmation does not match with password')
          }
          return true;
    }),
    body("username").notEmpty().withMessage("Username should not be empty"),
    body("dob").notEmpty().withMessage("DOB should not be empty"),
  ];
};


export const userVerficationRules = () => {
  return [
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("verificationCode").notEmpty().withMessage("Password should not be empty"),
  ];
};

export const userSigninRules = () => {
  return [
    body("email").notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password should not be empty"),
    body("password").isLength({ min: 8, max:16 }).withMessage("Password must be greater than 8 and less than 16"),

  ];
};


export const userPlayModeRules = () => {
  return [
    body("mode").notEmpty().withMessage("Play mode is required")
  ];
};

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

