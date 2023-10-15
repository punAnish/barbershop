const { app } = require("./server");
const http = require("http");
const config = require("./config");

const server = http.createServer(app);

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
