export const handleErrors = (errorInfo) => {
  console.log(errorInfo.message, errorInfo.code);
  let errors = {
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    nickname: "",
  };

  // incorrect email
  if (errorInfo.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (errorInfo.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate  error
  if (errorInfo.code === 11000) {
    errors.email = "That Email is already registered";
    errors.nickname = "That Nickname is already Taken";
    return errors;
    // return errors.toString().toUpperCase();
  }

  // validation errors
  if (errorInfo.message.includes("user validation failed")) {
    Object.values(errorInfo.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
