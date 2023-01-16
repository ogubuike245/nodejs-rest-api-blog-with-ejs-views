import moment from "moment";
import User from "../models/userModel.js";

// GET ROUTES CONTROLLERS

//FIXME: FETCH DETAILS OF ALL BLOG DOCUMENTS FROM THE MONGODB DATABASE

export const getAllUsers = (request, response) => {
  response.json("HELLO USER");
  //   User.find()
  //     .sort({ createdAt: -1 })
  //     .then((result) => {
  //       response.render("index", {
  //         blogs: result,
  //         title: "All Users",
  //         moment: moment,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
};
