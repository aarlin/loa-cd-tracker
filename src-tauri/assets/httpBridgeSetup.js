const defaultSettings = require('./defaultSettings');
const { setupBridge, httpServerEventEmitter } = require('./http-bridge');
import { LogParser } from "loa-details-log-parser";

setupBridge(defaultSettings);

httpServerEventEmitter.on("packet", (value) => {
    // logParser.parseLogLine(value);
    console.log("Packet received: ", value);
});

httpServerEventEmitter.on("debug", (data) => {
    log.info("debug:", data);
});