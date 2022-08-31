const defaultSettings = require('./defaultSettings');
const { setupBridge, httpServerEventEmitter } = require('./http-bridge');
const { LogParser } = require('./dist/parser');

setupBridge(defaultSettings);

setupListeners();

function setupListeners() {
    const logParser = new LogParser((isLive = true));
    logParser.debugLines = true;

    logParser.dontResetOnZoneChange =
        defaultSettings?.damageMeter?.functionality?.dontResetOnZoneChange;

    logParser.resetAfterPhaseTransition =
        defaultSettings?.damageMeter?.functionality?.resetAfterPhaseTransition;

    logParser.removeOverkillDamage =
        defaultSettings?.damageMeter?.functionality?.removeOverkillDamage;

    logParser.on("log", (val) => {
        console.log(JSON.stringify(val))
    });

    httpServerEventEmitter.on("packet", (value) => {
        logParser.parseLogLine(value);
    });

    httpServerEventEmitter.on("debug", (data) => {
        // log.info("debug:", data);
    });
}

