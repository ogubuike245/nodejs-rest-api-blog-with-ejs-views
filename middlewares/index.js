export const middleWares = (app, express, morgan) => {
  app.use(express.static("./dist"));
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
};
