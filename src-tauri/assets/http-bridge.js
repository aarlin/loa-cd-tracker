const http = require('http');
const EventEmitter = require('events');
const { spawn } = require('child_process');
const fs = require('fs');
// import log from "electron-log";
const path = require('path');

const httpServerEventEmitter = new EventEmitter();

let httpServer;
let packetCapturerProcess;

const validHosts = [];
function checkHost(requestHost) {
  if (!requestHost) return false;
  return validHosts.includes(requestHost);
}

function setupBridge(appSettings) {
  httpServer = http.createServer((req, res) => {
    const isHostValid = checkHost(req.headers.host);
    if (!isHostValid) {
      console.info("Request from invalid host: " + req.headers.host);
      res.writeHead(403, { "Content-Type": "text/html" });
      return res.end("Forbidden");
    }

    if (req.method === "POST") {
      // Handle data
      let body = [];

      req.on("data", (chunk) => {
        body.push(chunk);
      });

      req.on("end", function () {
        const parsedBody = Buffer.concat(body).toString();
        httpServerEventEmitter.emit("packet", parsedBody);

        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("Ok!");
      });
    }
  });

  httpServer.listen(0, "localhost", () => {
    console.info(`Server listening on port ${httpServer.address().port}`);
    validHosts.push(
      `localhost:${httpServer.address().port}`,
      `127.0.0.1:${httpServer.address().port}`
    );
    httpServerEventEmitter.emit("listen");
    spawnPacketCapturer(appSettings, httpServer.address().port);
  });
}

function spawnPacketCapturer(appSettings, serverPort) {
  const args = ["--Port", serverPort];

  if (appSettings?.general?.customLogPath !== null)
    args.push("--CustomLogPath", appSettings?.general?.customLogPath);

  if (appSettings?.general?.useWinpcap) args.push("--UseNpcap");

  if (appSettings?.general?.server === "russia")
    args.push("--Region", "Russia");
  else if (appSettings?.general?.server === "korea")
    args.push("--Region", "Korea");

  try {
    let binaryFolder;
    if (process.env.DEBUGGING) {
      binaryFolder = path.resolve(__dirname, "../../assets");
    } else {
      binaryFolder = path.resolve("./assets");
    }

    const binaryFiles = fs.readdirSync(binaryFolder);
    for (const binaryFile of binaryFiles) {
      if (binaryFile.endsWith("dps.exe")) {
        packetCapturerProcess = spawn(path.resolve(binaryFolder, binaryFile), args);
        break;
      }
    }

    console.info("Started Logger!");
  } catch (e) {
    console.error("Error while trying to open packet capturer: " + e);

    console.info("Exiting app...");
  }

  packetCapturerProcess.on("exit", function (code, signal) {
    if (code === 10) return;

    console.error(
      `The connection to the Lost Ark Packet Capture was lost for some reason:\n
      Code: ${code} and Signal: ${signal}`
    );

    console.info("Exiting app...");
  });

  // packetCapturerProcess.stdout.on('data', function (data) {
  //   console.log("IM HERE stdout on data");
  //   console.log('data' + data);
  // });
  // packetCapturerProcess.stderr.on('data', function (data) {
  //   console.log("IM HERE stderr on data");
  //   console.log('test: ' + data);
  //   console.error(data);
  // });
  // packetCapturerProcess.on('close', function (code) {
  //   console.log("IM HERE on close");
  //   console.log("close");
  // });
  // packetCapturerProcess.on('error', function (err) {
  //   console.log("IM HERE on error");
  //   console.log(err);
  // });
  // packetCapturerProcess.stderr.on('error', function (err) {
  //   console.log("IM HERE");
  //   console.log("my Erorr");
  //   process.stderr.emit('error', err);
  // });

  // packetCapturerProcess.stdout.on('data', function (buf) {
  //   console.log("IM HERE");
  //   console.log('buf receive');
  //   console.log(buf.toString());
  // });
}

module.exports = {
  httpServerEventEmitter,
  setupBridge
}