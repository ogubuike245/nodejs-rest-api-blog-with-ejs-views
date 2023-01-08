const http = require("http");
const fs = require("fs");
const _ = require("lodash");
const PORT = 3000;
const SUCCESS_CODE = 200;
const NOT_FOUND = 400;

const server = http.createServer((request, response) => {
  // console.log(request.url, request.method);

  const number = _.random(0, 30);
  console.log(number);
  //   set header content type
  response.setHeader("Content-Type", "text/html");
  //   response.write("<h1>OGUBUIKE EMEJURU</h1>");
  //   response.end();

  let path = "./views/";

  switch (request.url) {
    case "/":
      path += "index.html";
      response.statusCode = SUCCESS_CODE;
      break;
    case "/about":
      path += "about.html";
      response.statusCode = SUCCESS_CODE;
      break;
    case "/about-me":
      path += "about.html";
      response.statusCode = 301;
      response.setHeader("Location", "/about");
      response.end();
      break;
    default:
      path += "404.html";
      response.statusCode = NOT_FOUND;
      break;
  }

  //   send an HTML FILE
  fs.readFile(path, (error, data) => {
    if (error) {
      console.log(error);
      response.end();
    } else {
      // you can use response.write() when doing multiple readings
      //   response.write(data);

      response.end(data);
    }
  });
});

server.listen(PORT, "localhost", () => {
  console.log(`listening for request on port ${PORT}`);
});
