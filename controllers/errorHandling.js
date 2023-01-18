export const handleErrors = (errorInfo) => {
  // console.log(errorInfo.message, errorInfo.code);
  let errors = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    nickname: "",
  };

  // INCORRECT EMAIL HANDLER
  if (errorInfo.message === "incorrect email") {
    errors.email =
      "That email is not registered or has a wrong format".toUpperCase();
  }

  // WRONG PASSWORD FORMAT HANDLER
  if (errorInfo.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // DUPLICATE ERROR HANDLERS
  if (errorInfo.code === 11000) {
    if (errorInfo.keyPattern.email) {
      errors.email = "That Email is already registered";
    }
    if (errorInfo.keyPattern.nickname) {
      errors.nickname = "That Nickname is already Taken";
    }

    return errors;
  }

  // MONGOOSE VALIDATION ERRORS OBJECT
  if (errorInfo.message.includes("user validation failed")) {
    Object.values(errorInfo.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
