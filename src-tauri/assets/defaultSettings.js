export const defaultSettings = {
    appVersion: "",
    general: {
        startMainHidden: false,
        startMainMinimized: false,
        closeToSystemTray: true,
        useWinpcap: false,
        saveScreenshots: true,
        server: "steam",
        customLogPath: null,
    },
    shortcuts: {
        minimizeDamageMeter: {
            value: "CommandOrControl+Down",
            defaultValue: "CommandOrControl+Down",
        },
        resetSession: {
            value: "CommandOrControl+Up",
            defaultValue: "CommandOrControl+Up",
        },
        pauseDamageMeter: {
            value: "CommandOrControl+Right",
            defaultValue: "CommandOrControl+Right",
        },
    },
    uploads: {
        uploadLogs: false,
        uploadKey: "",
        api: {
            value: process.env.UPLOADS_API_URL,
            defaultValue: process.env.UPLOADS_API_URL,
        },
        endpoint: {
            value: process.env.UPLOADS_ENDPOINT,
            defaultValue: process.env.UPLOADS_ENDPOINT,
        },
        site: {
            value: process.env.UPLOADS_LOGIN_URL,
            defaultValue: process.env.UPLOADS_LOGIN_URL,
        },
        openOnUpload: false,
        uploadUnlisted: true,
        includeRegion: false,
    },
    damageMeter: {
        functionality: {
            dontResetOnZoneChange: false,
            removeOverkillDamage: true,
            pauseOnPhaseTransition: true,
            resetAfterPhaseTransition: true,
            autoMinimize: false,
            autoMinimizeTimer: 60,
            minimizeToTaskbar: false,
            nameDisplay: "name+class",
            nameDisplayV2: "name+gear+class",
        },
        design: {
            compactDesign: false,
            pinUserToTop: false,
            opacity: 0.9,
        },
        header: {
            damage: {
                name: "Damage",
                enabled: true,
            },
            dps: {
                name: "DPS",
                enabled: true,
            },
            tank: {
                name: "Tanked",
                enabled: false,
            },
        },
        tabs: {
            damage: {
                name: "Damage/Tanked",
                enabled: true,
            },
            deathTime: {
                name: "Death Time",
                enabled: false,
            },
            damagePercent: {
                name: "D% (Damage Percent)",
                enabled: true,
            },
            dps: {
                name: "DPS/TPS",
                enabled: true,
            },
            critRate: {
                name: "Crit Rate",
                enabled: true,
            },
            faRate: {
                name: "Front Attack Rate",
                enabled: true,
            },
            baRate: {
                name: "Back Attack Rate",
                enabled: true,
            },
            counterCount: {
                name: "Counter Count",
                enabled: true,
            },
            maxDmg: {
                name: "Skill View / Max Damage",
                enabled: true,
            },
            avgDmg: {
                name: "Skill View / Average Damage",
                enabled: true,
            },
            totalHits: {
                name: "Skill View / Total Hits",
                enabled: true,
            },
            hpm: {
                name: "Skill View / Hits per Minute",
                enabled: true,
            },
        },
        classes: {},
    },
    logs: {
        minimumSessionDurationInMinutes: 1,
        minimumEncounterDurationInMinutes: 0.5,
        minimumDurationInMinutes: 0.0,
        splitOnPhaseTransition: true,
    },
};