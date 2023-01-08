const http = require("http");
const PORT = 3000;

const server = http.createServer((request, response) => {
  console.log(request.url, request.method);

  //   set header content type

  response.setHeader("Content-Type", "text/html");

  response.write("<h1>OGUBUIKE EMEJURU</h1>");

  response.end();
});

server.listen(PORT, "localhost", () => {
  console.log(`listening for request on port ${PORT}`);
});
