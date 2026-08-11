/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 914:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.issue = exports.issueCommand = void 0;
const os = __importStar(__nccwpck_require__(857));
const utils_1 = __nccwpck_require__(302);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return (0, utils_1.toCommandValue)(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return (0, utils_1.toCommandValue)(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 484:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.platform = exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = exports.markdownSummary = exports.summary = exports.getIDToken = exports.getState = exports.saveState = exports.group = exports.endGroup = exports.startGroup = exports.info = exports.notice = exports.warning = exports.error = exports.debug = exports.isDebug = exports.setFailed = exports.setCommandEcho = exports.setOutput = exports.getBooleanInput = exports.getMultilineInput = exports.getInput = exports.addPath = exports.setSecret = exports.exportVariable = exports.ExitCode = void 0;
const command_1 = __nccwpck_require__(914);
const file_command_1 = __nccwpck_require__(753);
const utils_1 = __nccwpck_require__(302);
const os = __importStar(__nccwpck_require__(857));
const path = __importStar(__nccwpck_require__(928));
const oidc_utils_1 = __nccwpck_require__(306);
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode || (exports.ExitCode = ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = (0, utils_1.toCommandValue)(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        return (0, file_command_1.issueFileCommand)('ENV', (0, file_command_1.prepareKeyValueMessage)(name, val));
    }
    (0, command_1.issueCommand)('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    (0, command_1.issueCommand)('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        (0, file_command_1.issueFileCommand)('PATH', inputPath);
    }
    else {
        (0, command_1.issueCommand)('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.
 * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
 * Returns an empty string if the value is not defined.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    if (options && options.trimWhitespace === false) {
        return val;
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Gets the values of an multiline input.  Each value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string[]
 *
 */
function getMultilineInput(name, options) {
    const inputs = getInput(name, options)
        .split('\n')
        .filter(x => x !== '');
    if (options && options.trimWhitespace === false) {
        return inputs;
    }
    return inputs.map(input => input.trim());
}
exports.getMultilineInput = getMultilineInput;
/**
 * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
 * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
 * The return value is also in boolean type.
 * ref: https://yaml.org/spec/1.2/spec.html#id2804923
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   boolean
 */
function getBooleanInput(name, options) {
    const trueValue = ['true', 'True', 'TRUE'];
    const falseValue = ['false', 'False', 'FALSE'];
    const val = getInput(name, options);
    if (trueValue.includes(val))
        return true;
    if (falseValue.includes(val))
        return false;
    throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
        `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``);
}
exports.getBooleanInput = getBooleanInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    const filePath = process.env['GITHUB_OUTPUT'] || '';
    if (filePath) {
        return (0, file_command_1.issueFileCommand)('OUTPUT', (0, file_command_1.prepareKeyValueMessage)(name, value));
    }
    process.stdout.write(os.EOL);
    (0, command_1.issueCommand)('set-output', { name }, (0, utils_1.toCommandValue)(value));
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    (0, command_1.issue)('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    (0, command_1.issueCommand)('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function error(message, properties = {}) {
    (0, command_1.issueCommand)('error', (0, utils_1.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds a warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function warning(message, properties = {}) {
    (0, command_1.issueCommand)('warning', (0, utils_1.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Adds a notice issue
 * @param message notice issue message. Errors will be converted to string via toString()
 * @param properties optional properties to add to the annotation.
 */
function notice(message, properties = {}) {
    (0, command_1.issueCommand)('notice', (0, utils_1.toCommandProperties)(properties), message instanceof Error ? message.toString() : message);
}
exports.notice = notice;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    (0, command_1.issue)('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    (0, command_1.issue)('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    const filePath = process.env['GITHUB_STATE'] || '';
    if (filePath) {
        return (0, file_command_1.issueFileCommand)('STATE', (0, file_command_1.prepareKeyValueMessage)(name, value));
    }
    (0, command_1.issueCommand)('save-state', { name }, (0, utils_1.toCommandValue)(value));
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
function getIDToken(aud) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield oidc_utils_1.OidcClient.getIDToken(aud);
    });
}
exports.getIDToken = getIDToken;
/**
 * Summary exports
 */
var summary_1 = __nccwpck_require__(847);
Object.defineProperty(exports, "summary", ({ enumerable: true, get: function () { return summary_1.summary; } }));
/**
 * @deprecated use core.summary
 */
var summary_2 = __nccwpck_require__(847);
Object.defineProperty(exports, "markdownSummary", ({ enumerable: true, get: function () { return summary_2.markdownSummary; } }));
/**
 * Path exports
 */
var path_utils_1 = __nccwpck_require__(976);
Object.defineProperty(exports, "toPosixPath", ({ enumerable: true, get: function () { return path_utils_1.toPosixPath; } }));
Object.defineProperty(exports, "toWin32Path", ({ enumerable: true, get: function () { return path_utils_1.toWin32Path; } }));
Object.defineProperty(exports, "toPlatformPath", ({ enumerable: true, get: function () { return path_utils_1.toPlatformPath; } }));
/**
 * Platform utilities exports
 */
exports.platform = __importStar(__nccwpck_require__(968));
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 753:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

// For internal use, subject to change.
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.prepareKeyValueMessage = exports.issueFileCommand = void 0;
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const crypto = __importStar(__nccwpck_require__(982));
const fs = __importStar(__nccwpck_require__(896));
const os = __importStar(__nccwpck_require__(857));
const utils_1 = __nccwpck_require__(302);
function issueFileCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${(0, utils_1.toCommandValue)(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueFileCommand = issueFileCommand;
function prepareKeyValueMessage(key, value) {
    const delimiter = `ghadelimiter_${crypto.randomUUID()}`;
    const convertedValue = (0, utils_1.toCommandValue)(value);
    // These should realistically never happen, but just in case someone finds a
    // way to exploit uuid generation let's not allow keys or values that contain
    // the delimiter.
    if (key.includes(delimiter)) {
        throw new Error(`Unexpected input: name should not contain the delimiter "${delimiter}"`);
    }
    if (convertedValue.includes(delimiter)) {
        throw new Error(`Unexpected input: value should not contain the delimiter "${delimiter}"`);
    }
    return `${key}<<${delimiter}${os.EOL}${convertedValue}${os.EOL}${delimiter}`;
}
exports.prepareKeyValueMessage = prepareKeyValueMessage;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 306:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OidcClient = void 0;
const http_client_1 = __nccwpck_require__(844);
const auth_1 = __nccwpck_require__(552);
const core_1 = __nccwpck_require__(484);
class OidcClient {
    static createHttpClient(allowRetry = true, maxRetry = 10) {
        const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry
        };
        return new http_client_1.HttpClient('actions/oidc-client', [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())], requestOptions);
    }
    static getRequestToken() {
        const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
        if (!token) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable');
        }
        return token;
    }
    static getIDTokenUrl() {
        const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
        if (!runtimeUrl) {
            throw new Error('Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable');
        }
        return runtimeUrl;
    }
    static getCall(id_token_url) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
                .getJson(id_token_url)
                .catch(error => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.message}`);
            });
            const id_token = (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
                throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
        });
    }
    static getIDToken(audience) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // New ID Token is requested from action service
                let id_token_url = OidcClient.getIDTokenUrl();
                if (audience) {
                    const encodedAudience = encodeURIComponent(audience);
                    id_token_url = `${id_token_url}&audience=${encodedAudience}`;
                }
                (0, core_1.debug)(`ID token url is ${id_token_url}`);
                const id_token = yield OidcClient.getCall(id_token_url);
                (0, core_1.setSecret)(id_token);
                return id_token;
            }
            catch (error) {
                throw new Error(`Error message: ${error.message}`);
            }
        });
    }
}
exports.OidcClient = OidcClient;
//# sourceMappingURL=oidc-utils.js.map

/***/ }),

/***/ 976:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toPlatformPath = exports.toWin32Path = exports.toPosixPath = void 0;
const path = __importStar(__nccwpck_require__(928));
/**
 * toPosixPath converts the given path to the posix form. On Windows, \\ will be
 * replaced with /.
 *
 * @param pth. Path to transform.
 * @return string Posix path.
 */
function toPosixPath(pth) {
    return pth.replace(/[\\]/g, '/');
}
exports.toPosixPath = toPosixPath;
/**
 * toWin32Path converts the given path to the win32 form. On Linux, / will be
 * replaced with \\.
 *
 * @param pth. Path to transform.
 * @return string Win32 path.
 */
function toWin32Path(pth) {
    return pth.replace(/[/]/g, '\\');
}
exports.toWin32Path = toWin32Path;
/**
 * toPlatformPath converts the given path to a platform-specific path. It does
 * this by replacing instances of / and \ with the platform-specific path
 * separator.
 *
 * @param pth The path to platformize.
 * @return string The platform-specific path.
 */
function toPlatformPath(pth) {
    return pth.replace(/[/\\]/g, path.sep);
}
exports.toPlatformPath = toPlatformPath;
//# sourceMappingURL=path-utils.js.map

/***/ }),

/***/ 968:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getDetails = exports.isLinux = exports.isMacOS = exports.isWindows = exports.arch = exports.platform = void 0;
const os_1 = __importDefault(__nccwpck_require__(857));
const exec = __importStar(__nccwpck_require__(236));
const getWindowsInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const { stdout: version } = yield exec.getExecOutput('powershell -command "(Get-CimInstance -ClassName Win32_OperatingSystem).Version"', undefined, {
        silent: true
    });
    const { stdout: name } = yield exec.getExecOutput('powershell -command "(Get-CimInstance -ClassName Win32_OperatingSystem).Caption"', undefined, {
        silent: true
    });
    return {
        name: name.trim(),
        version: version.trim()
    };
});
const getMacOsInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const { stdout } = yield exec.getExecOutput('sw_vers', undefined, {
        silent: true
    });
    const version = (_b = (_a = stdout.match(/ProductVersion:\s*(.+)/)) === null || _a === void 0 ? void 0 : _a[1]) !== null && _b !== void 0 ? _b : '';
    const name = (_d = (_c = stdout.match(/ProductName:\s*(.+)/)) === null || _c === void 0 ? void 0 : _c[1]) !== null && _d !== void 0 ? _d : '';
    return {
        name,
        version
    };
});
const getLinuxInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    const { stdout } = yield exec.getExecOutput('lsb_release', ['-i', '-r', '-s'], {
        silent: true
    });
    const [name, version] = stdout.trim().split('\n');
    return {
        name,
        version
    };
});
exports.platform = os_1.default.platform();
exports.arch = os_1.default.arch();
exports.isWindows = exports.platform === 'win32';
exports.isMacOS = exports.platform === 'darwin';
exports.isLinux = exports.platform === 'linux';
function getDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        return Object.assign(Object.assign({}, (yield (exports.isWindows
            ? getWindowsInfo()
            : exports.isMacOS
                ? getMacOsInfo()
                : getLinuxInfo()))), { platform: exports.platform,
            arch: exports.arch,
            isWindows: exports.isWindows,
            isMacOS: exports.isMacOS,
            isLinux: exports.isLinux });
    });
}
exports.getDetails = getDetails;
//# sourceMappingURL=platform.js.map

/***/ }),

/***/ 847:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.summary = exports.markdownSummary = exports.SUMMARY_DOCS_URL = exports.SUMMARY_ENV_VAR = void 0;
const os_1 = __nccwpck_require__(857);
const fs_1 = __nccwpck_require__(896);
const { access, appendFile, writeFile } = fs_1.promises;
exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
exports.SUMMARY_DOCS_URL = 'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
class Summary {
    constructor() {
        this._buffer = '';
    }
    /**
     * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
     * Also checks r/w permissions.
     *
     * @returns step summary file path
     */
    filePath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
                return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
                throw new Error(`Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`);
            }
            try {
                yield access(pathFromEnv, fs_1.constants.R_OK | fs_1.constants.W_OK);
            }
            catch (_a) {
                throw new Error(`Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`);
            }
            this._filePath = pathFromEnv;
            return this._filePath;
        });
    }
    /**
     * Wraps content in an HTML tag, adding any HTML attributes
     *
     * @param {string} tag HTML tag to wrap
     * @param {string | null} content content within the tag
     * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
     *
     * @returns {string} content wrapped in HTML element
     */
    wrap(tag, content, attrs = {}) {
        const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
        if (!content) {
            return `<${tag}${htmlAttrs}>`;
        }
        return `<${tag}${htmlAttrs}>${content}</${tag}>`;
    }
    /**
     * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
     *
     * @param {SummaryWriteOptions} [options] (optional) options for write operation
     *
     * @returns {Promise<Summary>} summary instance
     */
    write(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0 ? void 0 : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, { encoding: 'utf8' });
            return this.emptyBuffer();
        });
    }
    /**
     * Clears the summary buffer and wipes the summary file
     *
     * @returns {Summary} summary instance
     */
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({ overwrite: true });
        });
    }
    /**
     * Returns the current summary buffer as a string
     *
     * @returns {string} string of summary buffer
     */
    stringify() {
        return this._buffer;
    }
    /**
     * If the summary buffer is empty
     *
     * @returns {boolen} true if the buffer is empty
     */
    isEmptyBuffer() {
        return this._buffer.length === 0;
    }
    /**
     * Resets the summary buffer without writing to summary file
     *
     * @returns {Summary} summary instance
     */
    emptyBuffer() {
        this._buffer = '';
        return this;
    }
    /**
     * Adds raw text to the summary buffer
     *
     * @param {string} text content to add
     * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
     *
     * @returns {Summary} summary instance
     */
    addRaw(text, addEOL = false) {
        this._buffer += text;
        return addEOL ? this.addEOL() : this;
    }
    /**
     * Adds the operating system-specific end-of-line marker to the buffer
     *
     * @returns {Summary} summary instance
     */
    addEOL() {
        return this.addRaw(os_1.EOL);
    }
    /**
     * Adds an HTML codeblock to the summary buffer
     *
     * @param {string} code content to render within fenced code block
     * @param {string} lang (optional) language to syntax highlight code
     *
     * @returns {Summary} summary instance
     */
    addCodeBlock(code, lang) {
        const attrs = Object.assign({}, (lang && { lang }));
        const element = this.wrap('pre', this.wrap('code', code), attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML list to the summary buffer
     *
     * @param {string[]} items list of items to render
     * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
     *
     * @returns {Summary} summary instance
     */
    addList(items, ordered = false) {
        const tag = ordered ? 'ol' : 'ul';
        const listItems = items.map(item => this.wrap('li', item)).join('');
        const element = this.wrap(tag, listItems);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML table to the summary buffer
     *
     * @param {SummaryTableCell[]} rows table rows
     *
     * @returns {Summary} summary instance
     */
    addTable(rows) {
        const tableBody = rows
            .map(row => {
            const cells = row
                .map(cell => {
                if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                }
                const { header, data, colspan, rowspan } = cell;
                const tag = header ? 'th' : 'td';
                const attrs = Object.assign(Object.assign({}, (colspan && { colspan })), (rowspan && { rowspan }));
                return this.wrap(tag, data, attrs);
            })
                .join('');
            return this.wrap('tr', cells);
        })
            .join('');
        const element = this.wrap('table', tableBody);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds a collapsable HTML details element to the summary buffer
     *
     * @param {string} label text for the closed state
     * @param {string} content collapsable content
     *
     * @returns {Summary} summary instance
     */
    addDetails(label, content) {
        const element = this.wrap('details', this.wrap('summary', label) + content);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML image tag to the summary buffer
     *
     * @param {string} src path to the image you to embed
     * @param {string} alt text description of the image
     * @param {SummaryImageOptions} options (optional) addition image attributes
     *
     * @returns {Summary} summary instance
     */
    addImage(src, alt, options) {
        const { width, height } = options || {};
        const attrs = Object.assign(Object.assign({}, (width && { width })), (height && { height }));
        const element = this.wrap('img', null, Object.assign({ src, alt }, attrs));
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML section heading element
     *
     * @param {string} text heading text
     * @param {number | string} [level=1] (optional) the heading level, default: 1
     *
     * @returns {Summary} summary instance
     */
    addHeading(text, level) {
        const tag = `h${level}`;
        const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
        const element = this.wrap(allowedTag, text);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML thematic break (<hr>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addSeparator() {
        const element = this.wrap('hr', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML line break (<br>) to the summary buffer
     *
     * @returns {Summary} summary instance
     */
    addBreak() {
        const element = this.wrap('br', null);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML blockquote to the summary buffer
     *
     * @param {string} text quote text
     * @param {string} cite (optional) citation url
     *
     * @returns {Summary} summary instance
     */
    addQuote(text, cite) {
        const attrs = Object.assign({}, (cite && { cite }));
        const element = this.wrap('blockquote', text, attrs);
        return this.addRaw(element).addEOL();
    }
    /**
     * Adds an HTML anchor tag to the summary buffer
     *
     * @param {string} text link text/content
     * @param {string} href hyperlink
     *
     * @returns {Summary} summary instance
     */
    addLink(text, href) {
        const element = this.wrap('a', text, { href });
        return this.addRaw(element).addEOL();
    }
}
const _summary = new Summary();
/**
 * @deprecated use `core.summary`
 */
exports.markdownSummary = _summary;
exports.summary = _summary;
//# sourceMappingURL=summary.js.map

/***/ }),

/***/ 302:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toCommandProperties = exports.toCommandValue = void 0;
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
/**
 *
 * @param annotationProperties
 * @returns The command properties to send with the actual annotation command
 * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
 */
function toCommandProperties(annotationProperties) {
    if (!Object.keys(annotationProperties).length) {
        return {};
    }
    return {
        title: annotationProperties.title,
        file: annotationProperties.file,
        line: annotationProperties.startLine,
        endLine: annotationProperties.endLine,
        col: annotationProperties.startColumn,
        endColumn: annotationProperties.endColumn
    };
}
exports.toCommandProperties = toCommandProperties;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 236:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getExecOutput = exports.exec = void 0;
const string_decoder_1 = __nccwpck_require__(193);
const tr = __importStar(__nccwpck_require__(665));
/**
 * Exec a command.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
 * @param     args               optional arguments for tool. Escaping is handled by the lib.
 * @param     options            optional exec options.  See ExecOptions
 * @returns   Promise<number>    exit code
 */
function exec(commandLine, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const commandArgs = tr.argStringToArray(commandLine);
        if (commandArgs.length === 0) {
            throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
        }
        // Path to tool to execute should be first arg
        const toolPath = commandArgs[0];
        args = commandArgs.slice(1).concat(args || []);
        const runner = new tr.ToolRunner(toolPath, args, options);
        return runner.exec();
    });
}
exports.exec = exec;
/**
 * Exec a command and get the output.
 * Output will be streamed to the live console.
 * Returns promise with the exit code and collected stdout and stderr
 *
 * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
 * @param     args                  optional arguments for tool. Escaping is handled by the lib.
 * @param     options               optional exec options.  See ExecOptions
 * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
 */
function getExecOutput(commandLine, args, options) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        let stdout = '';
        let stderr = '';
        //Using string decoder covers the case where a mult-byte character is split
        const stdoutDecoder = new string_decoder_1.StringDecoder('utf8');
        const stderrDecoder = new string_decoder_1.StringDecoder('utf8');
        const originalStdoutListener = (_a = options === null || options === void 0 ? void 0 : options.listeners) === null || _a === void 0 ? void 0 : _a.stdout;
        const originalStdErrListener = (_b = options === null || options === void 0 ? void 0 : options.listeners) === null || _b === void 0 ? void 0 : _b.stderr;
        const stdErrListener = (data) => {
            stderr += stderrDecoder.write(data);
            if (originalStdErrListener) {
                originalStdErrListener(data);
            }
        };
        const stdOutListener = (data) => {
            stdout += stdoutDecoder.write(data);
            if (originalStdoutListener) {
                originalStdoutListener(data);
            }
        };
        const listeners = Object.assign(Object.assign({}, options === null || options === void 0 ? void 0 : options.listeners), { stdout: stdOutListener, stderr: stdErrListener });
        const exitCode = yield exec(commandLine, args, Object.assign(Object.assign({}, options), { listeners }));
        //flush any remaining characters
        stdout += stdoutDecoder.end();
        stderr += stderrDecoder.end();
        return {
            exitCode,
            stdout,
            stderr
        };
    });
}
exports.getExecOutput = getExecOutput;
//# sourceMappingURL=exec.js.map

/***/ }),

/***/ 665:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.argStringToArray = exports.ToolRunner = void 0;
const os = __importStar(__nccwpck_require__(857));
const events = __importStar(__nccwpck_require__(434));
const child = __importStar(__nccwpck_require__(317));
const path = __importStar(__nccwpck_require__(928));
const io = __importStar(__nccwpck_require__(994));
const ioUtil = __importStar(__nccwpck_require__(207));
const timers_1 = __nccwpck_require__(557);
/* eslint-disable @typescript-eslint/unbound-method */
const IS_WINDOWS = process.platform === 'win32';
/*
 * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
 */
class ToolRunner extends events.EventEmitter {
    constructor(toolPath, args, options) {
        super();
        if (!toolPath) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
        }
        this.toolPath = toolPath;
        this.args = args || [];
        this.options = options || {};
    }
    _debug(message) {
        if (this.options.listeners && this.options.listeners.debug) {
            this.options.listeners.debug(message);
        }
    }
    _getCommandString(options, noPrefix) {
        const toolPath = this._getSpawnFileName();
        const args = this._getSpawnArgs(options);
        let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
        if (IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
                cmd += toolPath;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows + verbatim
            else if (options.windowsVerbatimArguments) {
                cmd += `"${toolPath}"`;
                for (const a of args) {
                    cmd += ` ${a}`;
                }
            }
            // Windows (regular)
            else {
                cmd += this._windowsQuoteCmdArg(toolPath);
                for (const a of args) {
                    cmd += ` ${this._windowsQuoteCmdArg(a)}`;
                }
            }
        }
        else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args) {
                cmd += ` ${a}`;
            }
        }
        return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
        try {
            let s = strBuffer + data.toString();
            let n = s.indexOf(os.EOL);
            while (n > -1) {
                const line = s.substring(0, n);
                onLine(line);
                // the rest of the string ...
                s = s.substring(n + os.EOL.length);
                n = s.indexOf(os.EOL);
            }
            return s;
        }
        catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
            return '';
        }
    }
    _getSpawnFileName() {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                return process.env['COMSPEC'] || 'cmd.exe';
            }
        }
        return this.toolPath;
    }
    _getSpawnArgs(options) {
        if (IS_WINDOWS) {
            if (this._isCmdFile()) {
                let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
                for (const a of this.args) {
                    argline += ' ';
                    argline += options.windowsVerbatimArguments
                        ? a
                        : this._windowsQuoteCmdArg(a);
                }
                argline += '"';
                return [argline];
            }
        }
        return this.args;
    }
    _endsWith(str, end) {
        return str.endsWith(end);
    }
    _isCmdFile() {
        const upperToolPath = this.toolPath.toUpperCase();
        return (this._endsWith(upperToolPath, '.CMD') ||
            this._endsWith(upperToolPath, '.BAT'));
    }
    _windowsQuoteCmdArg(arg) {
        // for .exe, apply the normal quoting rules that libuv applies
        if (!this._isCmdFile()) {
            return this._uvQuoteCmdArg(arg);
        }
        // otherwise apply quoting rules specific to the cmd.exe command line parser.
        // the libuv rules are generic and are not designed specifically for cmd.exe
        // command line parser.
        //
        // for a detailed description of the cmd.exe command line parser, refer to
        // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
        // need quotes for empty arg
        if (!arg) {
            return '""';
        }
        // determine whether the arg needs to be quoted
        const cmdSpecialChars = [
            ' ',
            '\t',
            '&',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '^',
            '=',
            ';',
            '!',
            "'",
            '+',
            ',',
            '`',
            '~',
            '|',
            '<',
            '>',
            '"'
        ];
        let needsQuotes = false;
        for (const char of arg) {
            if (cmdSpecialChars.some(x => x === char)) {
                needsQuotes = true;
                break;
            }
        }
        // short-circuit if quotes not needed
        if (!needsQuotes) {
            return arg;
        }
        // the following quoting rules are very similar to the rules that by libuv applies.
        //
        // 1) wrap the string in quotes
        //
        // 2) double-up quotes - i.e. " => ""
        //
        //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
        //    doesn't work well with a cmd.exe command line.
        //
        //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
        //    for example, the command line:
        //          foo.exe "myarg:""my val"""
        //    is parsed by a .NET console app into an arg array:
        //          [ "myarg:\"my val\"" ]
        //    which is the same end result when applying libuv quoting rules. although the actual
        //    command line from libuv quoting rules would look like:
        //          foo.exe "myarg:\"my val\""
        //
        // 3) double-up slashes that precede a quote,
        //    e.g.  hello \world    => "hello \world"
        //          hello\"world    => "hello\\""world"
        //          hello\\"world   => "hello\\\\""world"
        //          hello world\    => "hello world\\"
        //
        //    technically this is not required for a cmd.exe command line, or the batch argument parser.
        //    the reasons for including this as a .cmd quoting rule are:
        //
        //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
        //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
        //
        //    b) it's what we've been doing previously (by deferring to node default behavior) and we
        //       haven't heard any complaints about that aspect.
        //
        // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
        // escaped when used on the command line directly - even though within a .cmd file % can be escaped
        // by using %%.
        //
        // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
        // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
        //
        // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
        // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
        // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
        // to an external program.
        //
        // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
        // % can be escaped within a .cmd file.
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\'; // double the slash
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '"'; // double the quote
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _uvQuoteCmdArg(arg) {
        // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
        // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
        // is used.
        //
        // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
        // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
        // pasting copyright notice from Node within this function:
        //
        //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
        //
        //      Permission is hereby granted, free of charge, to any person obtaining a copy
        //      of this software and associated documentation files (the "Software"), to
        //      deal in the Software without restriction, including without limitation the
        //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
        //      sell copies of the Software, and to permit persons to whom the Software is
        //      furnished to do so, subject to the following conditions:
        //
        //      The above copyright notice and this permission notice shall be included in
        //      all copies or substantial portions of the Software.
        //
        //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
        //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
        //      IN THE SOFTWARE.
        if (!arg) {
            // Need double quotation for empty argument
            return '""';
        }
        if (!arg.includes(' ') && !arg.includes('\t') && !arg.includes('"')) {
            // No quotation needed
            return arg;
        }
        if (!arg.includes('"') && !arg.includes('\\')) {
            // No embedded double quotes or backslashes, so I can just wrap
            // quote marks around the whole thing.
            return `"${arg}"`;
        }
        // Expected input/output:
        //   input : hello"world
        //   output: "hello\"world"
        //   input : hello""world
        //   output: "hello\"\"world"
        //   input : hello\world
        //   output: hello\world
        //   input : hello\\world
        //   output: hello\\world
        //   input : hello\"world
        //   output: "hello\\\"world"
        //   input : hello\\"world
        //   output: "hello\\\\\"world"
        //   input : hello world\
        //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
        //                             but it appears the comment is wrong, it should be "hello world\\"
        let reverse = '"';
        let quoteHit = true;
        for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
                reverse += '\\';
            }
            else if (arg[i - 1] === '"') {
                quoteHit = true;
                reverse += '\\';
            }
            else {
                quoteHit = false;
            }
        }
        reverse += '"';
        return reverse
            .split('')
            .reverse()
            .join('');
    }
    _cloneExecOptions(options) {
        options = options || {};
        const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000
        };
        result.outStream = options.outStream || process.stdout;
        result.errStream = options.errStream || process.stderr;
        return result;
    }
    _getSpawnOptions(options, toolPath) {
        options = options || {};
        const result = {};
        result.cwd = options.cwd;
        result.env = options.env;
        result['windowsVerbatimArguments'] =
            options.windowsVerbatimArguments || this._isCmdFile();
        if (options.windowsVerbatimArguments) {
            result.argv0 = `"${toolPath}"`;
        }
        return result;
    }
    /**
     * Exec a tool.
     * Output will be streamed to the live console.
     * Returns promise with return code
     *
     * @param     tool     path to tool to exec
     * @param     options  optional exec options.  See ExecOptions
     * @returns   number
     */
    exec() {
        return __awaiter(this, void 0, void 0, function* () {
            // root the tool path if it is unrooted and contains relative pathing
            if (!ioUtil.isRooted(this.toolPath) &&
                (this.toolPath.includes('/') ||
                    (IS_WINDOWS && this.toolPath.includes('\\')))) {
                // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
                this.toolPath = path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
            }
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield io.which(this.toolPath, true);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug('arguments:');
                for (const arg of this.args) {
                    this._debug(`   ${arg}`);
                }
                const optionsNonNull = this._cloneExecOptions(this.options);
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                    optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
                }
                const state = new ExecState(optionsNonNull, this.toolPath);
                state.on('debug', (message) => {
                    this._debug(message);
                });
                if (this.options.cwd && !(yield ioUtil.exists(this.options.cwd))) {
                    return reject(new Error(`The cwd: ${this.options.cwd} does not exist!`));
                }
                const fileName = this._getSpawnFileName();
                const cp = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
                let stdbuffer = '';
                if (cp.stdout) {
                    cp.stdout.on('data', (data) => {
                        if (this.options.listeners && this.options.listeners.stdout) {
                            this.options.listeners.stdout(data);
                        }
                        if (!optionsNonNull.silent && optionsNonNull.outStream) {
                            optionsNonNull.outStream.write(data);
                        }
                        stdbuffer = this._processLineBuffer(data, stdbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.stdline) {
                                this.options.listeners.stdline(line);
                            }
                        });
                    });
                }
                let errbuffer = '';
                if (cp.stderr) {
                    cp.stderr.on('data', (data) => {
                        state.processStderr = true;
                        if (this.options.listeners && this.options.listeners.stderr) {
                            this.options.listeners.stderr(data);
                        }
                        if (!optionsNonNull.silent &&
                            optionsNonNull.errStream &&
                            optionsNonNull.outStream) {
                            const s = optionsNonNull.failOnStdErr
                                ? optionsNonNull.errStream
                                : optionsNonNull.outStream;
                            s.write(data);
                        }
                        errbuffer = this._processLineBuffer(data, errbuffer, (line) => {
                            if (this.options.listeners && this.options.listeners.errline) {
                                this.options.listeners.errline(line);
                            }
                        });
                    });
                }
                cp.on('error', (err) => {
                    state.processError = err.message;
                    state.processExited = true;
                    state.processClosed = true;
                    state.CheckComplete();
                });
                cp.on('exit', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                cp.on('close', (code) => {
                    state.processExitCode = code;
                    state.processExited = true;
                    state.processClosed = true;
                    this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
                    state.CheckComplete();
                });
                state.on('done', (error, exitCode) => {
                    if (stdbuffer.length > 0) {
                        this.emit('stdline', stdbuffer);
                    }
                    if (errbuffer.length > 0) {
                        this.emit('errline', errbuffer);
                    }
                    cp.removeAllListeners();
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(exitCode);
                    }
                });
                if (this.options.input) {
                    if (!cp.stdin) {
                        throw new Error('child process missing stdin');
                    }
                    cp.stdin.end(this.options.input);
                }
            }));
        });
    }
}
exports.ToolRunner = ToolRunner;
/**
 * Convert an arg string to an array of args. Handles escaping
 *
 * @param    argString   string of arguments
 * @returns  string[]    array of arguments
 */
function argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = '';
    function append(c) {
        // we only escape double quotes.
        if (escaped && c !== '"') {
            arg += '\\';
        }
        arg += c;
        escaped = false;
    }
    for (let i = 0; i < argString.length; i++) {
        const c = argString.charAt(i);
        if (c === '"') {
            if (!escaped) {
                inQuotes = !inQuotes;
            }
            else {
                append(c);
            }
            continue;
        }
        if (c === '\\' && escaped) {
            append(c);
            continue;
        }
        if (c === '\\' && inQuotes) {
            escaped = true;
            continue;
        }
        if (c === ' ' && !inQuotes) {
            if (arg.length > 0) {
                args.push(arg);
                arg = '';
            }
            continue;
        }
        append(c);
    }
    if (arg.length > 0) {
        args.push(arg.trim());
    }
    return args;
}
exports.argStringToArray = argStringToArray;
class ExecState extends events.EventEmitter {
    constructor(options, toolPath) {
        super();
        this.processClosed = false; // tracks whether the process has exited and stdio is closed
        this.processError = '';
        this.processExitCode = 0;
        this.processExited = false; // tracks whether the process has exited
        this.processStderr = false; // tracks whether stderr was written to
        this.delay = 10000; // 10 seconds
        this.done = false;
        this.timeout = null;
        if (!toolPath) {
            throw new Error('toolPath must not be empty');
        }
        this.options = options;
        this.toolPath = toolPath;
        if (options.delay) {
            this.delay = options.delay;
        }
    }
    CheckComplete() {
        if (this.done) {
            return;
        }
        if (this.processClosed) {
            this._setResult();
        }
        else if (this.processExited) {
            this.timeout = timers_1.setTimeout(ExecState.HandleTimeout, this.delay, this);
        }
    }
    _debug(message) {
        this.emit('debug', message);
    }
    _setResult() {
        // determine whether there is an error
        let error;
        if (this.processExited) {
            if (this.processError) {
                error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
            }
            else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
                error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
            }
            else if (this.processStderr && this.options.failOnStdErr) {
                error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
            }
        }
        // clear the timeout
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
        this.done = true;
        this.emit('done', error, this.processExitCode);
    }
    static HandleTimeout(state) {
        if (state.done) {
            return;
        }
        if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${state.delay /
                1000} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
        }
        state._setResult();
    }
}
//# sourceMappingURL=toolrunner.js.map

/***/ }),

/***/ 552:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PersonalAccessTokenCredentialHandler = exports.BearerCredentialHandler = exports.BasicCredentialHandler = void 0;
class BasicCredentialHandler {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`${this.username}:${this.password}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BasicCredentialHandler = BasicCredentialHandler;
class BearerCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Bearer ${this.token}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.BearerCredentialHandler = BearerCredentialHandler;
class PersonalAccessTokenCredentialHandler {
    constructor(token) {
        this.token = token;
    }
    // currently implements pre-authorization
    // TODO: support preAuth = false where it hooks on 401
    prepareRequest(options) {
        if (!options.headers) {
            throw Error('The request has no headers');
        }
        options.headers['Authorization'] = `Basic ${Buffer.from(`PAT:${this.token}`).toString('base64')}`;
    }
    // This handler cannot handle 401
    canHandleAuthentication() {
        return false;
    }
    handleAuthentication() {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
        });
    }
}
exports.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 844:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = exports.isHttps = exports.HttpClientResponse = exports.HttpClientError = exports.getProxyUrl = exports.MediaTypes = exports.Headers = exports.HttpCodes = void 0;
const http = __importStar(__nccwpck_require__(611));
const https = __importStar(__nccwpck_require__(692));
const pm = __importStar(__nccwpck_require__(988));
const tunnel = __importStar(__nccwpck_require__(770));
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes[HttpCodes["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes[HttpCodes["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes[HttpCodes["SeeOther"] = 303] = "SeeOther";
    HttpCodes[HttpCodes["NotModified"] = 304] = "NotModified";
    HttpCodes[HttpCodes["UseProxy"] = 305] = "UseProxy";
    HttpCodes[HttpCodes["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes[HttpCodes["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes[HttpCodes["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes[HttpCodes["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes[HttpCodes["Forbidden"] = 403] = "Forbidden";
    HttpCodes[HttpCodes["NotFound"] = 404] = "NotFound";
    HttpCodes[HttpCodes["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes[HttpCodes["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes[HttpCodes["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes[HttpCodes["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes[HttpCodes["Conflict"] = 409] = "Conflict";
    HttpCodes[HttpCodes["Gone"] = 410] = "Gone";
    HttpCodes[HttpCodes["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes[HttpCodes["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes[HttpCodes["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes[HttpCodes["BadGateway"] = 502] = "BadGateway";
    HttpCodes[HttpCodes["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes[HttpCodes["GatewayTimeout"] = 504] = "GatewayTimeout";
})(HttpCodes = exports.HttpCodes || (exports.HttpCodes = {}));
var Headers;
(function (Headers) {
    Headers["Accept"] = "accept";
    Headers["ContentType"] = "content-type";
})(Headers = exports.Headers || (exports.Headers = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes["ApplicationJson"] = "application/json";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
/**
 * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
 * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
 */
function getProxyUrl(serverUrl) {
    const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : '';
}
exports.getProxyUrl = getProxyUrl;
const HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
];
const HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
];
const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
const ExponentialBackoffCeiling = 10;
const ExponentialBackoffTimeSlice = 5;
class HttpClientError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'HttpClientError';
        this.statusCode = statusCode;
        Object.setPrototypeOf(this, HttpClientError.prototype);
    }
}
exports.HttpClientError = HttpClientError;
class HttpClientResponse {
    constructor(message) {
        this.message = message;
    }
    readBody() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                    output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                    resolve(output.toString());
                });
            }));
        });
    }
}
exports.HttpClientResponse = HttpClientResponse;
function isHttps(requestUrl) {
    const parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === 'https:';
}
exports.isHttps = isHttps;
class HttpClient {
    constructor(userAgent, handlers, requestOptions) {
        this._ignoreSslError = false;
        this._allowRedirects = true;
        this._allowRedirectDowngrade = false;
        this._maxRedirects = 50;
        this._allowRetries = false;
        this._maxRetries = 1;
        this._keepAlive = false;
        this._disposed = false;
        this.userAgent = userAgent;
        this.handlers = handlers || [];
        this.requestOptions = requestOptions;
        if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
                this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
                this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
                this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
                this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
                this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
                this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
                this._maxRetries = requestOptions.maxRetries;
            }
        }
    }
    options(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('OPTIONS', requestUrl, null, additionalHeaders || {});
        });
    }
    get(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', requestUrl, null, additionalHeaders || {});
        });
    }
    del(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('DELETE', requestUrl, null, additionalHeaders || {});
        });
    }
    post(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', requestUrl, data, additionalHeaders || {});
        });
    }
    patch(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PATCH', requestUrl, data, additionalHeaders || {});
        });
    }
    put(requestUrl, data, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', requestUrl, data, additionalHeaders || {});
        });
    }
    head(requestUrl, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('HEAD', requestUrl, null, additionalHeaders || {});
        });
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
        });
    }
    /**
     * Gets a typed object from an endpoint
     * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
     */
    getJson(requestUrl, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    postJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    putJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    patchJson(requestUrl, obj, additionalHeaders = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
            additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
        });
    }
    /**
     * Makes a raw http request.
     * All other methods such as get, post, patch, and request ultimately call this.
     * Prefer get, del, post and patch
     */
    request(verb, requestUrl, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
                throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries = this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
                response = yield this.requestRaw(info, data);
                // Check if it's an authentication challenge
                if (response &&
                    response.message &&
                    response.message.statusCode === HttpCodes.Unauthorized) {
                    let authenticationHandler;
                    for (const handler of this.handlers) {
                        if (handler.canHandleAuthentication(response)) {
                            authenticationHandler = handler;
                            break;
                        }
                    }
                    if (authenticationHandler) {
                        return authenticationHandler.handleAuthentication(this, info, data);
                    }
                    else {
                        // We have received an unauthorized response but have no handlers to handle it.
                        // Let the response return to the caller.
                        return response;
                    }
                }
                let redirectsRemaining = this._maxRedirects;
                while (response.message.statusCode &&
                    HttpRedirectCodes.includes(response.message.statusCode) &&
                    this._allowRedirects &&
                    redirectsRemaining > 0) {
                    const redirectUrl = response.message.headers['location'];
                    if (!redirectUrl) {
                        // if there's no location to redirect to, we won't
                        break;
                    }
                    const parsedRedirectUrl = new URL(redirectUrl);
                    if (parsedUrl.protocol === 'https:' &&
                        parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                        !this._allowRedirectDowngrade) {
                        throw new Error('Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.');
                    }
                    // we need to finish reading the response before reassigning response
                    // which will leak the open socket.
                    yield response.readBody();
                    // strip authorization header if redirected to a different hostname
                    if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                        for (const header in headers) {
                            // header names are case insensitive
                            if (header.toLowerCase() === 'authorization') {
                                delete headers[header];
                            }
                        }
                    }
                    // let's make the request with the new redirectUrl
                    info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                    response = yield this.requestRaw(info, data);
                    redirectsRemaining--;
                }
                if (!response.message.statusCode ||
                    !HttpResponseRetryCodes.includes(response.message.statusCode)) {
                    // If not a retry code, return immediately instead of retrying
                    return response;
                }
                numTries += 1;
                if (numTries < maxTries) {
                    yield response.readBody();
                    yield this._performExponentialBackoff(numTries);
                }
            } while (numTries < maxTries);
            return response;
        });
    }
    /**
     * Needs to be called if keepAlive is set to true in request options.
     */
    dispose() {
        if (this._agent) {
            this._agent.destroy();
        }
        this._disposed = true;
    }
    /**
     * Raw request.
     * @param info
     * @param data
     */
    requestRaw(info, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                function callbackForResult(err, res) {
                    if (err) {
                        reject(err);
                    }
                    else if (!res) {
                        // If `err` is not passed, then `res` must be passed.
                        reject(new Error('Unknown error'));
                    }
                    else {
                        resolve(res);
                    }
                }
                this.requestRawWithCallback(info, data, callbackForResult);
            });
        });
    }
    /**
     * Raw request with callback.
     * @param info
     * @param data
     * @param onResult
     */
    requestRawWithCallback(info, data, onResult) {
        if (typeof data === 'string') {
            if (!info.options.headers) {
                info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(data, 'utf8');
        }
        let callbackCalled = false;
        function handleResult(err, res) {
            if (!callbackCalled) {
                callbackCalled = true;
                onResult(err, res);
            }
        }
        const req = info.httpModule.request(info.options, (msg) => {
            const res = new HttpClientResponse(msg);
            handleResult(undefined, res);
        });
        let socket;
        req.on('socket', sock => {
            socket = sock;
        });
        // If we ever get disconnected, we want the socket to timeout eventually
        req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
                socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
        });
        req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
        });
        if (data && typeof data === 'string') {
            req.write(data, 'utf8');
        }
        if (data && typeof data !== 'string') {
            data.on('close', function () {
                req.end();
            });
            data.pipe(req);
        }
        else {
            req.end();
        }
    }
    /**
     * Gets an http agent. This function is useful when you need an http agent that handles
     * routing through a proxy server - depending upon the url and proxy environment variables.
     * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
     */
    getAgent(serverUrl) {
        const parsedUrl = new URL(serverUrl);
        return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
        const info = {};
        info.parsedUrl = requestUrl;
        const usingSsl = info.parsedUrl.protocol === 'https:';
        info.httpModule = usingSsl ? https : http;
        const defaultPort = usingSsl ? 443 : 80;
        info.options = {};
        info.options.host = info.parsedUrl.hostname;
        info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
        info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
        info.options.method = method;
        info.options.headers = this._mergeHeaders(headers);
        if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
        }
        info.options.agent = this._getAgent(info.parsedUrl);
        // gives handlers an opportunity to participate
        if (this.handlers) {
            for (const handler of this.handlers) {
                handler.prepareRequest(info.options);
            }
        }
        return info;
    }
    _mergeHeaders(headers) {
        if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers || {}));
        }
        return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
        let clientHeader;
        if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
        }
        return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
        let agent;
        const proxyUrl = pm.getProxyUrl(parsedUrl);
        const useProxy = proxyUrl && proxyUrl.hostname;
        if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
        }
        if (this._keepAlive && !useProxy) {
            agent = this._agent;
        }
        // if agent is already assigned use that agent.
        if (agent) {
            return agent;
        }
        const usingSsl = parsedUrl.protocol === 'https:';
        let maxSockets = 100;
        if (this.requestOptions) {
            maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
        }
        // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
        if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
                maxSockets,
                keepAlive: this._keepAlive,
                proxy: Object.assign(Object.assign({}, ((proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`
                })), { host: proxyUrl.hostname, port: proxyUrl.port })
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
                tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
            }
            else {
                tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
        }
        // if reusing agent across request and tunneling agent isn't assigned create a new agent
        if (this._keepAlive && !agent) {
            const options = { keepAlive: this._keepAlive, maxSockets };
            agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
            this._agent = agent;
        }
        // if not using private agent and tunnel agent isn't setup then use global agent
        if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
        }
        if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
                rejectUnauthorized: false
            });
        }
        return agent;
    }
    _performExponentialBackoff(retryNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise(resolve => setTimeout(() => resolve(), ms));
        });
    }
    _processResponse(res, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode || 0;
                const response = {
                    statusCode,
                    result: null,
                    headers: {}
                };
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                    resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                    if (typeof value === 'string') {
                        const a = new Date(value);
                        if (!isNaN(a.valueOf())) {
                            return a;
                        }
                    }
                    return value;
                }
                let obj;
                let contents;
                try {
                    contents = yield res.readBody();
                    if (contents && contents.length > 0) {
                        if (options && options.deserializeDates) {
                            obj = JSON.parse(contents, dateTimeDeserializer);
                        }
                        else {
                            obj = JSON.parse(contents);
                        }
                        response.result = obj;
                    }
                    response.headers = res.message.headers;
                }
                catch (err) {
                    // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                    let msg;
                    // if exception/error in body, attempt to get better error
                    if (obj && obj.message) {
                        msg = obj.message;
                    }
                    else if (contents && contents.length > 0) {
                        // it may be the case that the exception is in the body message as string
                        msg = contents;
                    }
                    else {
                        msg = `Failed request: (${statusCode})`;
                    }
                    const err = new HttpClientError(msg, statusCode);
                    err.result = response.result;
                    reject(err);
                }
                else {
                    resolve(response);
                }
            }));
        });
    }
}
exports.HttpClient = HttpClient;
const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => ((c[k.toLowerCase()] = obj[k]), c), {});
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 988:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkBypass = exports.getProxyUrl = void 0;
function getProxyUrl(reqUrl) {
    const usingSsl = reqUrl.protocol === 'https:';
    if (checkBypass(reqUrl)) {
        return undefined;
    }
    const proxyVar = (() => {
        if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
        }
        else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
        }
    })();
    if (proxyVar) {
        return new URL(proxyVar);
    }
    else {
        return undefined;
    }
}
exports.getProxyUrl = getProxyUrl;
function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
        return false;
    }
    const noProxy = process.env['no_proxy'] || process.env['NO_PROXY'] || '';
    if (!noProxy) {
        return false;
    }
    // Determine the request port
    let reqPort;
    if (reqUrl.port) {
        reqPort = Number(reqUrl.port);
    }
    else if (reqUrl.protocol === 'http:') {
        reqPort = 80;
    }
    else if (reqUrl.protocol === 'https:') {
        reqPort = 443;
    }
    // Format the request hostname and hostname with port
    const upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === 'number') {
        upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    // Compare request host against noproxy
    for (const upperNoProxyItem of noProxy
        .split(',')
        .map(x => x.trim().toUpperCase())
        .filter(x => x)) {
        if (upperReqHosts.some(x => x === upperNoProxyItem)) {
            return true;
        }
    }
    return false;
}
exports.checkBypass = checkBypass;
//# sourceMappingURL=proxy.js.map

/***/ }),

/***/ 207:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getCmdPath = exports.tryGetExecutablePath = exports.isRooted = exports.isDirectory = exports.exists = exports.READONLY = exports.UV_FS_O_EXLOCK = exports.IS_WINDOWS = exports.unlink = exports.symlink = exports.stat = exports.rmdir = exports.rm = exports.rename = exports.readlink = exports.readdir = exports.open = exports.mkdir = exports.lstat = exports.copyFile = exports.chmod = void 0;
const fs = __importStar(__nccwpck_require__(896));
const path = __importStar(__nccwpck_require__(928));
_a = fs.promises
// export const {open} = 'fs'
, exports.chmod = _a.chmod, exports.copyFile = _a.copyFile, exports.lstat = _a.lstat, exports.mkdir = _a.mkdir, exports.open = _a.open, exports.readdir = _a.readdir, exports.readlink = _a.readlink, exports.rename = _a.rename, exports.rm = _a.rm, exports.rmdir = _a.rmdir, exports.stat = _a.stat, exports.symlink = _a.symlink, exports.unlink = _a.unlink;
// export const {open} = 'fs'
exports.IS_WINDOWS = process.platform === 'win32';
// See https://github.com/nodejs/node/blob/d0153aee367422d0858105abec186da4dff0a0c5/deps/uv/include/uv/win.h#L691
exports.UV_FS_O_EXLOCK = 0x10000000;
exports.READONLY = fs.constants.O_RDONLY;
function exists(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.stat(fsPath);
        }
        catch (err) {
            if (err.code === 'ENOENT') {
                return false;
            }
            throw err;
        }
        return true;
    });
}
exports.exists = exists;
function isDirectory(fsPath, useStat = false) {
    return __awaiter(this, void 0, void 0, function* () {
        const stats = useStat ? yield exports.stat(fsPath) : yield exports.lstat(fsPath);
        return stats.isDirectory();
    });
}
exports.isDirectory = isDirectory;
/**
 * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
 * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
 */
function isRooted(p) {
    p = normalizeSeparators(p);
    if (!p) {
        throw new Error('isRooted() parameter "p" cannot be empty');
    }
    if (exports.IS_WINDOWS) {
        return (p.startsWith('\\') || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
        ); // e.g. C: or C:\hello
    }
    return p.startsWith('/');
}
exports.isRooted = isRooted;
/**
 * Best effort attempt to determine whether a file exists and is executable.
 * @param filePath    file path to check
 * @param extensions  additional file extensions to try
 * @return if file exists and is executable, returns the file path. otherwise empty string.
 */
function tryGetExecutablePath(filePath, extensions) {
    return __awaiter(this, void 0, void 0, function* () {
        let stats = undefined;
        try {
            // test file exists
            stats = yield exports.stat(filePath);
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                // eslint-disable-next-line no-console
                console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
            }
        }
        if (stats && stats.isFile()) {
            if (exports.IS_WINDOWS) {
                // on Windows, test for valid extension
                const upperExt = path.extname(filePath).toUpperCase();
                if (extensions.some(validExt => validExt.toUpperCase() === upperExt)) {
                    return filePath;
                }
            }
            else {
                if (isUnixExecutable(stats)) {
                    return filePath;
                }
            }
        }
        // try each extension
        const originalFilePath = filePath;
        for (const extension of extensions) {
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
                stats = yield exports.stat(filePath);
            }
            catch (err) {
                if (err.code !== 'ENOENT') {
                    // eslint-disable-next-line no-console
                    console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
                }
            }
            if (stats && stats.isFile()) {
                if (exports.IS_WINDOWS) {
                    // preserve the case of the actual file (since an extension was appended)
                    try {
                        const directory = path.dirname(filePath);
                        const upperName = path.basename(filePath).toUpperCase();
                        for (const actualName of yield exports.readdir(directory)) {
                            if (upperName === actualName.toUpperCase()) {
                                filePath = path.join(directory, actualName);
                                break;
                            }
                        }
                    }
                    catch (err) {
                        // eslint-disable-next-line no-console
                        console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
                    }
                    return filePath;
                }
                else {
                    if (isUnixExecutable(stats)) {
                        return filePath;
                    }
                }
            }
        }
        return '';
    });
}
exports.tryGetExecutablePath = tryGetExecutablePath;
function normalizeSeparators(p) {
    p = p || '';
    if (exports.IS_WINDOWS) {
        // convert slashes on Windows
        p = p.replace(/\//g, '\\');
        // remove redundant slashes
        return p.replace(/\\\\+/g, '\\');
    }
    // remove redundant slashes
    return p.replace(/\/\/+/g, '/');
}
// on Mac/Linux, test the execute bit
//     R   W  X  R  W X R W X
//   256 128 64 32 16 8 4 2 1
function isUnixExecutable(stats) {
    return ((stats.mode & 1) > 0 ||
        ((stats.mode & 8) > 0 && stats.gid === process.getgid()) ||
        ((stats.mode & 64) > 0 && stats.uid === process.getuid()));
}
// Get the path of cmd.exe in windows
function getCmdPath() {
    var _a;
    return (_a = process.env['COMSPEC']) !== null && _a !== void 0 ? _a : `cmd.exe`;
}
exports.getCmdPath = getCmdPath;
//# sourceMappingURL=io-util.js.map

/***/ }),

/***/ 994:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.findInPath = exports.which = exports.mkdirP = exports.rmRF = exports.mv = exports.cp = void 0;
const assert_1 = __nccwpck_require__(613);
const path = __importStar(__nccwpck_require__(928));
const ioUtil = __importStar(__nccwpck_require__(207));
/**
 * Copies a file or folder.
 * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See CopyOptions.
 */
function cp(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const { force, recursive, copySourceDirectory } = readCopyOptions(options);
        const destStat = (yield ioUtil.exists(dest)) ? yield ioUtil.stat(dest) : null;
        // Dest is an existing file, but not forcing
        if (destStat && destStat.isFile() && !force) {
            return;
        }
        // If dest is an existing directory, should copy inside.
        const newDest = destStat && destStat.isDirectory() && copySourceDirectory
            ? path.join(dest, path.basename(source))
            : dest;
        if (!(yield ioUtil.exists(source))) {
            throw new Error(`no such file or directory: ${source}`);
        }
        const sourceStat = yield ioUtil.stat(source);
        if (sourceStat.isDirectory()) {
            if (!recursive) {
                throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
            }
            else {
                yield cpDirRecursive(source, newDest, 0, force);
            }
        }
        else {
            if (path.relative(source, newDest) === '') {
                // a file cannot be copied to itself
                throw new Error(`'${newDest}' and '${source}' are the same file`);
            }
            yield copyFile(source, newDest, force);
        }
    });
}
exports.cp = cp;
/**
 * Moves a path.
 *
 * @param     source    source path
 * @param     dest      destination path
 * @param     options   optional. See MoveOptions.
 */
function mv(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        if (yield ioUtil.exists(dest)) {
            let destExists = true;
            if (yield ioUtil.isDirectory(dest)) {
                // If dest is directory copy src into dest
                dest = path.join(dest, path.basename(source));
                destExists = yield ioUtil.exists(dest);
            }
            if (destExists) {
                if (options.force == null || options.force) {
                    yield rmRF(dest);
                }
                else {
                    throw new Error('Destination already exists');
                }
            }
        }
        yield mkdirP(path.dirname(dest));
        yield ioUtil.rename(source, dest);
    });
}
exports.mv = mv;
/**
 * Remove a path recursively with force
 *
 * @param inputPath path to remove
 */
function rmRF(inputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ioUtil.IS_WINDOWS) {
            // Check for invalid characters
            // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
            if (/[*"<>|]/.test(inputPath)) {
                throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows');
            }
        }
        try {
            // note if path does not exist, error is silent
            yield ioUtil.rm(inputPath, {
                force: true,
                maxRetries: 3,
                recursive: true,
                retryDelay: 300
            });
        }
        catch (err) {
            throw new Error(`File was unable to be removed ${err}`);
        }
    });
}
exports.rmRF = rmRF;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param   fsPath        path to create
 * @returns Promise<void>
 */
function mkdirP(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
        assert_1.ok(fsPath, 'a path argument must be provided');
        yield ioUtil.mkdir(fsPath, { recursive: true });
    });
}
exports.mkdirP = mkdirP;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool              name of the tool
 * @param     check             whether to check if tool exists
 * @returns   Promise<string>   path to tool
 */
function which(tool, check) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // recursive when check=true
        if (check) {
            const result = yield which(tool, false);
            if (!result) {
                if (ioUtil.IS_WINDOWS) {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
                }
                else {
                    throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
                }
            }
            return result;
        }
        const matches = yield findInPath(tool);
        if (matches && matches.length > 0) {
            return matches[0];
        }
        return '';
    });
}
exports.which = which;
/**
 * Returns a list of all occurrences of the given tool on the system path.
 *
 * @returns   Promise<string[]>  the paths of the tool
 */
function findInPath(tool) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!tool) {
            throw new Error("parameter 'tool' is required");
        }
        // build the list of extensions to try
        const extensions = [];
        if (ioUtil.IS_WINDOWS && process.env['PATHEXT']) {
            for (const extension of process.env['PATHEXT'].split(path.delimiter)) {
                if (extension) {
                    extensions.push(extension);
                }
            }
        }
        // if it's rooted, return it if exists. otherwise return empty.
        if (ioUtil.isRooted(tool)) {
            const filePath = yield ioUtil.tryGetExecutablePath(tool, extensions);
            if (filePath) {
                return [filePath];
            }
            return [];
        }
        // if any path separators, return empty
        if (tool.includes(path.sep)) {
            return [];
        }
        // build the list of directories
        //
        // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
        // it feels like we should not do this. Checking the current directory seems like more of a use
        // case of a shell, and the which() function exposed by the toolkit should strive for consistency
        // across platforms.
        const directories = [];
        if (process.env.PATH) {
            for (const p of process.env.PATH.split(path.delimiter)) {
                if (p) {
                    directories.push(p);
                }
            }
        }
        // find all matches
        const matches = [];
        for (const directory of directories) {
            const filePath = yield ioUtil.tryGetExecutablePath(path.join(directory, tool), extensions);
            if (filePath) {
                matches.push(filePath);
            }
        }
        return matches;
    });
}
exports.findInPath = findInPath;
function readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    const copySourceDirectory = options.copySourceDirectory == null
        ? true
        : Boolean(options.copySourceDirectory);
    return { force, recursive, copySourceDirectory };
}
function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return __awaiter(this, void 0, void 0, function* () {
        // Ensure there is not a run away recursive copy
        if (currentDepth >= 255)
            return;
        currentDepth++;
        yield mkdirP(destDir);
        const files = yield ioUtil.readdir(sourceDir);
        for (const fileName of files) {
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) {
                // Recurse
                yield cpDirRecursive(srcFile, destFile, currentDepth, force);
            }
            else {
                yield copyFile(srcFile, destFile, force);
            }
        }
        // Change the mode for the newly created directory
        yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
    });
}
// Buffered file copy
function copyFile(srcFile, destFile, force) {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
                yield ioUtil.lstat(destFile);
                yield ioUtil.unlink(destFile);
            }
            catch (e) {
                // Try to override file permission
                if (e.code === 'EPERM') {
                    yield ioUtil.chmod(destFile, '0666');
                    yield ioUtil.unlink(destFile);
                }
                // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield ioUtil.readlink(srcFile);
            yield ioUtil.symlink(symlinkFull, destFile, ioUtil.IS_WINDOWS ? 'junction' : null);
        }
        else if (!(yield ioUtil.exists(destFile)) || force) {
            yield ioUtil.copyFile(srcFile, destFile);
        }
    });
}
//# sourceMappingURL=io.js.map

/***/ }),

/***/ 770:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(218);


/***/ }),

/***/ 218:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

"use strict";


var net = __nccwpck_require__(278);
var tls = __nccwpck_require__(756);
var http = __nccwpck_require__(611);
var https = __nccwpck_require__(692);
var events = __nccwpck_require__(434);
var assert = __nccwpck_require__(613);
var util = __nccwpck_require__(23);


exports.httpOverHttp = httpOverHttp;
exports.httpsOverHttp = httpsOverHttp;
exports.httpOverHttps = httpOverHttps;
exports.httpsOverHttps = httpsOverHttps;


function httpOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  return agent;
}

function httpsOverHttp(options) {
  var agent = new TunnelingAgent(options);
  agent.request = http.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}

function httpOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  return agent;
}

function httpsOverHttps(options) {
  var agent = new TunnelingAgent(options);
  agent.request = https.request;
  agent.createSocket = createSecureSocket;
  agent.defaultPort = 443;
  return agent;
}


function TunnelingAgent(options) {
  var self = this;
  self.options = options || {};
  self.proxyOptions = self.options.proxy || {};
  self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
  self.requests = [];
  self.sockets = [];

  self.on('free', function onFree(socket, host, port, localAddress) {
    var options = toOptions(host, port, localAddress);
    for (var i = 0, len = self.requests.length; i < len; ++i) {
      var pending = self.requests[i];
      if (pending.host === options.host && pending.port === options.port) {
        // Detect the request to connect same origin server,
        // reuse the connection.
        self.requests.splice(i, 1);
        pending.request.onSocket(socket);
        return;
      }
    }
    socket.destroy();
    self.removeSocket(socket);
  });
}
util.inherits(TunnelingAgent, events.EventEmitter);

TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
  var self = this;
  var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));

  if (self.sockets.length >= this.maxSockets) {
    // We are over limit so we'll add it to the queue.
    self.requests.push(options);
    return;
  }

  // If we are under maxSockets create a new one.
  self.createSocket(options, function(socket) {
    socket.on('free', onFree);
    socket.on('close', onCloseOrRemove);
    socket.on('agentRemove', onCloseOrRemove);
    req.onSocket(socket);

    function onFree() {
      self.emit('free', socket, options);
    }

    function onCloseOrRemove(err) {
      self.removeSocket(socket);
      socket.removeListener('free', onFree);
      socket.removeListener('close', onCloseOrRemove);
      socket.removeListener('agentRemove', onCloseOrRemove);
    }
  });
};

TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
  var self = this;
  var placeholder = {};
  self.sockets.push(placeholder);

  var connectOptions = mergeOptions({}, self.proxyOptions, {
    method: 'CONNECT',
    path: options.host + ':' + options.port,
    agent: false,
    headers: {
      host: options.host + ':' + options.port
    }
  });
  if (options.localAddress) {
    connectOptions.localAddress = options.localAddress;
  }
  if (connectOptions.proxyAuth) {
    connectOptions.headers = connectOptions.headers || {};
    connectOptions.headers['Proxy-Authorization'] = 'Basic ' +
        new Buffer(connectOptions.proxyAuth).toString('base64');
  }

  debug('making CONNECT request');
  var connectReq = self.request(connectOptions);
  connectReq.useChunkedEncodingByDefault = false; // for v0.6
  connectReq.once('response', onResponse); // for v0.6
  connectReq.once('upgrade', onUpgrade);   // for v0.6
  connectReq.once('connect', onConnect);   // for v0.7 or later
  connectReq.once('error', onError);
  connectReq.end();

  function onResponse(res) {
    // Very hacky. This is necessary to avoid http-parser leaks.
    res.upgrade = true;
  }

  function onUpgrade(res, socket, head) {
    // Hacky.
    process.nextTick(function() {
      onConnect(res, socket, head);
    });
  }

  function onConnect(res, socket, head) {
    connectReq.removeAllListeners();
    socket.removeAllListeners();

    if (res.statusCode !== 200) {
      debug('tunneling socket could not be established, statusCode=%d',
        res.statusCode);
      socket.destroy();
      var error = new Error('tunneling socket could not be established, ' +
        'statusCode=' + res.statusCode);
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    if (head.length > 0) {
      debug('got illegal response body from proxy');
      socket.destroy();
      var error = new Error('got illegal response body from proxy');
      error.code = 'ECONNRESET';
      options.request.emit('error', error);
      self.removeSocket(placeholder);
      return;
    }
    debug('tunneling connection has established');
    self.sockets[self.sockets.indexOf(placeholder)] = socket;
    return cb(socket);
  }

  function onError(cause) {
    connectReq.removeAllListeners();

    debug('tunneling socket could not be established, cause=%s\n',
          cause.message, cause.stack);
    var error = new Error('tunneling socket could not be established, ' +
                          'cause=' + cause.message);
    error.code = 'ECONNRESET';
    options.request.emit('error', error);
    self.removeSocket(placeholder);
  }
};

TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
  var pos = this.sockets.indexOf(socket)
  if (pos === -1) {
    return;
  }
  this.sockets.splice(pos, 1);

  var pending = this.requests.shift();
  if (pending) {
    // If we have pending requests and a socket gets closed a new one
    // needs to be created to take over in the pool for the one that closed.
    this.createSocket(pending, function(socket) {
      pending.request.onSocket(socket);
    });
  }
};

function createSecureSocket(options, cb) {
  var self = this;
  TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
    var hostHeader = options.request.getHeader('host');
    var tlsOptions = mergeOptions({}, self.options, {
      socket: socket,
      servername: hostHeader ? hostHeader.replace(/:.*$/, '') : options.host
    });

    // 0 is dummy port for v0.6
    var secureSocket = tls.connect(0, tlsOptions);
    self.sockets[self.sockets.indexOf(socket)] = secureSocket;
    cb(secureSocket);
  });
}


function toOptions(host, port, localAddress) {
  if (typeof host === 'string') { // since v0.10
    return {
      host: host,
      port: port,
      localAddress: localAddress
    };
  }
  return host; // for v0.11 or later
}

function mergeOptions(target) {
  for (var i = 1, len = arguments.length; i < len; ++i) {
    var overrides = arguments[i];
    if (typeof overrides === 'object') {
      var keys = Object.keys(overrides);
      for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
        var k = keys[j];
        if (overrides[k] !== undefined) {
          target[k] = overrides[k];
        }
      }
    }
  }
  return target;
}


var debug;
if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
  debug = function() {
    var args = Array.prototype.slice.call(arguments);
    if (typeof args[0] === 'string') {
      args[0] = 'TUNNEL: ' + args[0];
    } else {
      args.unshift('TUNNEL:');
    }
    console.error.apply(console, args);
  }
} else {
  debug = function() {};
}
exports.debug = debug; // for test


/***/ }),

/***/ 38:
/***/ ((module) => {

const TOKEN_URL = "https://auth.atlassian.com/oauth/token";

/**
 * Build the Authorization header value from the action inputs.
 *
 * Three credential shapes are supported, tried in this order:
 *
 *   1. OAuth 2.0 client credentials (Atlassian service account). Exchanges the
 *      client id and secret for a Bearer token that lives for one hour.
 *   2. Email plus API token, or the legacy username plus password. Sent as
 *      HTTP Basic. Scoped service-account tokens work here as long as the base
 *      URL is the api.atlassian.com gateway.
 *   3. An API token on its own, sent as Bearer. Scoped tokens are accepted
 *      directly by the gateway without a matching account identifier.
 *
 * @param {Object} inputs
 * @returns {Promise<string>} the full Authorization header value
 */
async function resolveAuthorization(inputs) {
  const clientId = inputs.clientId;
  const clientSecret = inputs.clientSecret;
  const user = inputs.email || inputs.username;
  const secret = inputs.apiToken || inputs.password;

  if (clientId && clientSecret) {
    const token = await fetchClientCredentialsToken(clientId, clientSecret);
    return "Bearer " + token;
  }

  if (user && secret) {
    return "Basic " + Buffer.from(user + ":" + secret).toString("base64");
  }

  if (secret) {
    return "Bearer " + secret;
  }

  throw new Error(
    "No usable credentials. Provide either client-id and client-secret, " +
      "or email and api-token, or api-token on its own."
  );
}

async function fetchClientCredentialsToken(clientId, clientSecret) {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    // The response body can echo the client id, so report status only.
    throw new Error(
      "OAuth token request failed with HTTP " + res.status + ". " +
        "Check the client id, secret, and that the service account is enabled."
    );
  }

  const data = await res.json();
  if (!data.access_token) {
    throw new Error("OAuth token response contained no access_token.");
  }
  return data.access_token;
}

/**
 * Normalise a Confluence base URL to the form the v2 API expects.
 *
 * Accepts any of:
 *   https://mysite.atlassian.net
 *   https://mysite.atlassian.net/wiki
 *   https://api.atlassian.com/ex/confluence/<cloudId>
 *   https://api.atlassian.com/ex/confluence/<cloudId>/wiki
 *
 * and always returns the variant ending in /wiki.
 */
function normaliseBaseUrl(baseUrl) {
  const trimmed = baseUrl.trim().replace(/\/+$/, "");
  if (trimmed.endsWith("/wiki")) {
    return trimmed;
  }
  return trimmed + "/wiki";
}

module.exports = { resolveAuthorization, normaliseBaseUrl };


/***/ }),

/***/ 794:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(896);
const path = __nccwpck_require__(928);

/**
 * Confluence Cloud client built on the v2 REST API.
 *
 * Pages and spaces use v2 throughout. Attachment uploads still use the v1
 * content API because v2 exposes attachments read-only: there is no v2
 * endpoint that creates or replaces attachment data.
 */
class SyncConfluence {
  /**
   * @param {string} baseUrl - normalised base URL ending in /wiki
   * @param {string} authorization - full Authorization header value
   * @param {string} spaceKey
   * @param {string} [spaceId] - skips the space lookup when supplied
   */
  constructor(baseUrl, authorization, spaceKey, spaceId) {
    this.baseUrl = baseUrl;
    this.authorization = authorization;
    this.spaceKey = spaceKey;
    this.spaceId = spaceId || undefined;
  }

  async request(method, url, options = {}) {
    const headers = Object.assign(
      { Authorization: this.authorization, Accept: "application/json" },
      options.headers || {}
    );

    let body;
    if (options.json !== undefined) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(options.json);
    } else if (options.body !== undefined) {
      body = options.body;
    }

    const res = await fetch(url, { method, headers, body });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(
        method + " " + stripQuery(url) + " failed with HTTP " + res.status +
          (detail ? ": " + truncate(detail) : "")
      );
    }

    if (res.status === 204) {
      return undefined;
    }
    return res.json();
  }

  /**
   * Resolve the numeric space id for the configured space key. Creating a page
   * in v2 needs the id; the key alone is not accepted.
   */
  async resolveSpaceId() {
    if (this.spaceId) {
      return this.spaceId;
    }

    const url =
      this.baseUrl + "/api/v2/spaces?keys=" + encodeURIComponent(this.spaceKey);
    const data = await this.request("GET", url);
    const space = (data.results || [])[0];

    if (!space) {
      throw new Error(
        "Space '" + this.spaceKey + "' not found, or the credential cannot see it. " +
          "Check the space key and the token's read:space scope."
      );
    }

    this.spaceId = space.id;
    return this.spaceId;
  }

  /**
   * Find a page by exact title within the configured space.
   * Returns undefined when no page matches.
   */
  async getPageIdByTitle(title) {
    const spaceId = await this.resolveSpaceId();
    const url =
      this.baseUrl +
      "/api/v2/pages?space-id=" + encodeURIComponent(spaceId) +
      "&title=" + encodeURIComponent(title) +
      "&status=current&limit=250";

    const data = await this.request("GET", url);
    const match = (data.results || []).find((page) => page.title === title);
    return match ? match.id : undefined;
  }

  async getPageVersion(pageId) {
    const url = this.baseUrl + "/api/v2/pages/" + encodeURIComponent(pageId);
    const data = await this.request("GET", url);
    return data.version.number;
  }

  /**
   * Create a page. Used both for the empty folder placeholder pages and,
   * indirectly, for content pages that do not exist yet.
   */
  async createEmptyParentPage(title, parentId) {
    const spaceId = await this.resolveSpaceId();
    const data = await this.request("POST", this.baseUrl + "/api/v2/pages", {
      json: {
        spaceId: spaceId,
        status: "current",
        title: title,
        parentId: parentId ? String(parentId) : undefined,
        body: { representation: "storage", value: "" },
      },
    });
    return data.id;
  }

  /**
   * Replace a page's body. The version is read immediately before the write so
   * concurrent edits surface as a 409 rather than being silently overwritten.
   */
  async putContent(pageId, title, content) {
    const version = await this.getPageVersion(pageId);
    const data = await this.request(
      "PUT",
      this.baseUrl + "/api/v2/pages/" + encodeURIComponent(pageId),
      {
        json: {
          id: String(pageId),
          status: "current",
          title: title,
          body: { representation: "storage", value: content },
          version: { number: version + 1, message: "Published by docs-as-code" },
        },
      }
    );

    const link = data._links || {};
    console.log(
      "Uploaded content successfully to page %s",
      (link.base || this.baseUrl) + (link.webui || "/pages/" + pageId)
    );
    return data;
  }

  async getAttachments(pageId) {
    const url =
      this.baseUrl + "/api/v2/pages/" + encodeURIComponent(pageId) +
      "/attachments?limit=250";
    const data = await this.request("GET", url);
    const results = data.results || [];
    return results.length ? results : undefined;
  }

  /**
   * Replace the binary data of an existing attachment. v1 only: see the class
   * comment. v2 attachment ids already carry the "att" prefix v1 expects, but
   * older responses omit it, so normalise both ways.
   */
  async updateAttachment(pageId, attachmentId, source) {
    const id = String(attachmentId).startsWith("att")
      ? attachmentId
      : "att" + attachmentId;
    const url =
      this.baseUrl + "/rest/api/content/" + encodeURIComponent(pageId) +
      "/child/attachment/" + encodeURIComponent(id) + "/data";

    const data = await this.request("POST", url, {
      headers: { "X-Atlassian-Token": "no-check" },
      body: attachmentForm(source),
    });
    return data;
  }

  async uploadAttachment(pageId, source) {
    const url =
      this.baseUrl + "/rest/api/content/" + encodeURIComponent(pageId) +
      "/child/attachment";

    const data = await this.request("POST", url, {
      headers: { "X-Atlassian-Token": "no-check" },
      body: attachmentForm(source),
    });
    return (data.results || [])[0];
  }
}

function attachmentForm(source) {
  const form = new FormData();
  const bytes = fs.readFileSync(source);
  form.set("file", new Blob([bytes]), path.basename(source));
  form.set("minorEdit", "true");
  return form;
}

function stripQuery(url) {
  const index = url.indexOf("?");
  return index === -1 ? url : url.slice(0, index);
}

function truncate(text) {
  return text.length > 500 ? text.slice(0, 500) + "..." : text;
}

module.exports = SyncConfluence;


/***/ }),

/***/ 397:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const parser = __nccwpck_require__(26);

/**
 * Confluence storage format is not HTML. Several constructs that markdown
 * produces have no HTML equivalent Confluence will render, and Confluence
 * silently drops them rather than reporting an error:
 *
 *   - <pre><code> renders as unstyled preformatted text. Syntax highlighting
 *     comes only from the code macro.
 *   - <input type="checkbox"> is stripped, so a task list becomes plain
 *     bullets and the ticked state is lost.
 *   - <details>/<summary> is stripped, leaving the summary as a stray line of
 *     text above the body with nothing to expand.
 *
 * This module converts each into the macro Confluence does render.
 */

// Languages the code macro highlights. An unrecognised value makes Confluence
// fall back to plain text, so anything not listed here is sent without a
// language parameter rather than guessed at.
const LANGUAGES = {
  bash: "bash", sh: "bash", shell: "bash", zsh: "bash", console: "bash",
  c: "c", "c++": "cpp", cpp: "cpp", cs: "csharp", csharp: "csharp",
  css: "css", diff: "diff", go: "go", groovy: "groovy", html: "html",
  java: "java", javascript: "javascript", js: "javascript", json: "json",
  kotlin: "kotlin", perl: "perl", php: "php", powershell: "powershell",
  ps1: "powershell", python: "python", py: "python", rb: "ruby", ruby: "ruby",
  rust: "rust", scala: "scala", sql: "sql", swift: "swift", text: "text",
  plain: "text", ts: "typescript", typescript: "typescript", xml: "xml",
  yaml: "yaml", yml: "yaml",
};

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Render a fenced code block as the Confluence code macro.
 *
 * The body goes in a CDATA section so it needs no escaping, which keeps the
 * code byte-identical to the source file. A literal "]]>" inside the code
 * would close the section early, so it is split across two sections.
 */
function codeMacro(text, lang) {
  const language = LANGUAGES[String(lang || "").trim().toLowerCase()];
  const body = String(text).replace(/]]>/g, "]]]]><![CDATA[>");

  return (
    '<ac:structured-macro ac:name="code" ac:schema-version="1">' +
    (language
      ? '<ac:parameter ac:name="language">' + language + "</ac:parameter>"
      : "") +
    "<ac:plain-text-body><![CDATA[" + body + "]]></ac:plain-text-body>" +
    "</ac:structured-macro>"
  );
}

function convertTaskLists(root) {
  for (const list of root.querySelectorAll("ul")) {
    const items = list.childNodes.filter(
      (node) => node.tagName && node.tagName.toUpperCase() === "LI"
    );
    const isTaskList = items.some((item) => item.querySelector("input"));
    if (!isTaskList) {
      continue;
    }

    const tasks = items.map((item) => {
      const checkbox = item.querySelector("input");
      const complete = checkbox !== null && checkbox.hasAttribute("checked");
      if (checkbox) {
        checkbox.remove();
      }
      return (
        "<ac:task>" +
        "<ac:task-status>" + (complete ? "complete" : "incomplete") + "</ac:task-status>" +
        "<ac:task-body>" + item.innerHTML.trim() + "</ac:task-body>" +
        "</ac:task>"
      );
    });

    list.replaceWith(
      parser.parse("<ac:task-list>" + tasks.join("") + "</ac:task-list>")
    );
  }
}

function convertExpands(root) {
  for (const details of root.querySelectorAll("details")) {
    const summary = details.querySelector("summary");
    const title = summary ? summary.text.trim() : "Details";
    if (summary) {
      summary.remove();
    }

    details.replaceWith(
      parser.parse(
        '<ac:structured-macro ac:name="expand" ac:schema-version="1">' +
          '<ac:parameter ac:name="title">' + escapeXml(title) + "</ac:parameter>" +
          "<ac:rich-text-body>" + details.innerHTML.trim() + "</ac:rich-text-body>" +
          "</ac:structured-macro>"
      )
    );
  }
}

/**
 * Convert the HTML constructs Confluence drops into the macros it renders.
 * Code blocks are handled at render time instead, in markdownToHtml, because
 * the parser treats the contents of <pre> as opaque raw text.
 *
 * @param {string} html
 * @returns {string}
 */
function toStorageFormat(html) {
  const root = parser.parse(html);
  convertTaskLists(root);
  convertExpands(root);
  return root.toString();
}

module.exports = { toStorageFormat, codeMacro, escapeXml };


/***/ }),

/***/ 349:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(896);
const path = __nccwpck_require__(928);

const readdirSync = (p, a = []) => {
  if (fs.statSync(p).isDirectory())
    fs.readdirSync(p).map((f) => {
      readdirSync(a[a.push(path.join(p, f)) - 1], a);
    });
  return a;
};

const filesStructure = (root) => {
  return readdirSync(root)
    .filter((f) => {
      return f.endsWith(".md");
    })
    .map((f) => {
      let splitted = f.split("/");
      splitted.shift();
      return splitted;
    });
};

module.exports = filesStructure;


/***/ }),

/***/ 385:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const { Marked } = __nccwpck_require__(22);
const fs = __nccwpck_require__(943);

const { codeMacro } = __nccwpck_require__(397);

// A private instance, so overriding the code renderer cannot leak into any
// other consumer of marked in the same process.
const marked = new Marked({
  renderer: {
    code({ text, lang }) {
      return codeMacro(text, lang);
    },
  },
});

/**
 * Read a markdown file and return it as Confluence-flavoured HTML. Fenced code
 * blocks become the code macro; see confluenceStorage for why.
 *
 * @param {string} path
 * @returns {Promise<string>}
 */
module.exports = async (path) => {
  const data = await fs.readFile(path, { encoding: "utf-8" });
  return marked.parse(data);
};


/***/ }),

/***/ 613:
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ 317:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 982:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 434:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 896:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 943:
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ 611:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 692:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 278:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 857:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 928:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 193:
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ 557:
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ 756:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 23:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 26:
/***/ ((__unused_webpack_module, exports) => {

Object.defineProperties(exports, {
	__esModule: { value: true },
	[Symbol.toStringTag]: { value: "Module" }
});
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region node_modules/entities/dist/decode-codepoint.js
const decodeMap = /* @__PURE__ */ new Map([
	[0, 65533],
	[128, 8364],
	[130, 8218],
	[131, 402],
	[132, 8222],
	[133, 8230],
	[134, 8224],
	[135, 8225],
	[136, 710],
	[137, 8240],
	[138, 352],
	[139, 8249],
	[140, 338],
	[142, 381],
	[145, 8216],
	[146, 8217],
	[147, 8220],
	[148, 8221],
	[149, 8226],
	[150, 8211],
	[151, 8212],
	[152, 732],
	[153, 8482],
	[154, 353],
	[155, 8250],
	[156, 339],
	[158, 382],
	[159, 376]
]);
/**
* Replace the given code point with a replacement character if it is a
* surrogate or is outside the valid range. Otherwise return the code
* point unchanged.
* @param codePoint Unicode code point to convert.
*/
function replaceCodePoint(codePoint) {
	var _decodeMap$get;
	if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) return 65533;
	return (_decodeMap$get = decodeMap.get(codePoint)) !== null && _decodeMap$get !== void 0 ? _decodeMap$get : codePoint;
}
//#endregion
//#region node_modules/entities/dist/internal/decode-shared.js
/**
* Shared base64 decode helper for generated decode data.
* Assumes global atob is available.
* @param input Input string to encode or decode.
*/
function decodeBase64(input) {
	const binary = atob(input);
	const evenLength = binary.length & -2;
	const out = new Uint16Array(evenLength / 2);
	for (let index = 0, outIndex = 0; index < evenLength; index += 2) {
		const lo = binary.charCodeAt(index);
		const hi = binary.charCodeAt(index + 1);
		out[outIndex++] = lo | hi << 8;
	}
	return out;
}
//#endregion
//#region node_modules/entities/dist/generated/decode-data-html.js
/** Packed HTML decode trie data. */
const htmlDecodeTree = /* #__PURE__ */ decodeBase64("QR08ALkAAgH6AYsDNQR2BO0EPgXZBQEGLAbdBxMISQrvCmQLfQurDKQNLw4fD4YPpA+6D/IPAAAAAAAAAAAAAAAAKhBMEY8TmxUWF2EYLBkxGuAa3RsJHDscWR8YIC8jSCSIJcMl6ie3Ku8rEC0CLjoupS7kLgAIRU1hYmNmZ2xtbm9wcnN0dVQAWgBeAGUAaQBzAHcAfgCBAIQAhwCSAJoAoACsALMAbABpAGcAO4DGAMZAUAA7gCYAJkBjAHUAdABlADuAwQDBQHIiZXZlAAJhAAFpeW0AcgByAGMAO4DCAMJAEGRyAADgNdgE3XIAYQB2AGUAO4DAAMBA8CFoYZFj4SFjcgBhZAAAoFMqAAFncIsAjgBvAG4ABGFmAADgNdg43fAlbHlGdW5jdGlvbgCgYSBpAG4AZwA7gMUAxUAAAWNzpACoAHIAAOA12Jzc6SFnbgCgVCJpAGwAZABlADuAwwDDQG0AbAA7gMQAxEAABGFjZWZvcnN1xQDYANoA7QDxAPYA+QD8AAABY3LJAM8AayNzbGFzaAAAoBYidgHTANUAAKDnKmUAZAAAoAYjeQARZIABY3J0AOAA5QDrAGEidXNlAACgNSLuI291bGxpcwCgLCFhAJJjcgAA4DXYBd1wAGYAAOA12Dnd5SF2ZdhiYwDyAOoAbSJwZXEAAKBOIgAHSE9hY2RlZmhpbG9yc3UXARoBHwE6AVIBVQFiAWQBZgGCAakB6QHtAfIBYwB5ACdkUABZADuAqQCpQIABY3B5ACUBKAE1AfUhdGUGYWmg0iJ0KGFsRGlmZmVyZW50aWFsRAAAoEUhbCJleXMAAKAtIQACYWVpb0EBRAFKAU0B8iFvbgxhZABpAGwAO4DHAMdAcgBjAAhhbiJpbnQAAKAwIm8AdAAKYQABZG5ZAV0BaSJsbGEAuGB0I2VyRG90ALdg8gA5AWkAp2NyImNsZQAAAkRNUFRwAXQBeQF9AW8AdAAAoJkiaSJudXMAAKCWIuwhdXMAoJUiaSJtZXMAAKCXIm8AAAFjc4cBlAFrKndpc2VDb250b3VySW50ZWdyYWwAAKAyImUjQ3VybHkAAAFEUZwBpAFvJXVibGVRdW90ZQAAoB0gdSJvdGUAAKAZIAACbG5wdbABtgHNAdgBbwBuAGWgNyIAoHQqgAFnaXQAvAHBAcUB8iJ1ZW50AKBhIm4AdAAAoC8i7yV1ckludGVncmFsAKAuIgABZnLRAdMBAKACIe8iZHVjdACgECJuLnRlckNsb2Nrd2lzZUNvbnRvdXJJbnRlZ3JhbAAAoDMi7yFzcwCgLypjAHIAAOA12J7ccABDoNMiYQBwAACgTSKABURKU1phY2VmaW9zAAsCEgIVAhgCGwIsAjQCOQI9AnMCfwNvoEUh9CJyYWhkAKARKWMAeQACZGMAeQAFZGMAeQAPZIABZ3JzACECJQIoAuchZXIAoCEgcgAAoKEhaAB2AACg5CoAAWF5MAIzAvIhb24OYRRkbAB0oAciYQCUY3IAAOA12AfdAAFhZkECawIAAWNtRQJnAvIjaXRpY2FsAAJBREdUUAJUAl8CYwJjInV0ZQC0YG8AdAFZAloC2WJiJGxlQWN1dGUA3WJyImF2ZQBgYGkibGRlANxi7yFuZACgxCJmJWVyZW50aWFsRAAAoEYhcAR9AgAAAAAAAIECjgIAABoDZgAA4DXYO91EoagAhQKJAm8AdAAAoNwgcSJ1YWwAAKBQIuIhbGUAA0NETFJVVpkCqAK1Au8C/wIRA28AbgB0AG8AdQByAEkAbgB0AGUAZwByAGEA7ADEAW8AdAKvAgAAAACwAqhgbiNBcnJvdwAAoNMhAAFlb7kC0AJmAHQAgAFBUlQAwQLGAs0CciJyb3cAAKDQIekkZ2h0QXJyb3cAoNQhZQDlACsCbgBnAAABTFLWAugC5SFmdAABQVLcAuECciJyb3cAAKD4J+kkZ2h0QXJyb3cAoPon6SRnaHRBcnJvdwCg+SdpImdodAAAAUFU9gL7AnIicm93AACg0iFlAGUAAKCoInAAQQIGAwAAAAALA3Iicm93AACg0SFvJHduQXJyb3cAAKDVIWUlcnRpY2FsQmFyAACgJSJuAAADQUJMUlRhJAM2AzoDWgNxA3oDciJyb3cAAKGTIUJVLAMwA2EAcgAAoBMpcCNBcnJvdwAAoPUhciJldmUAEWPlIWZ00gJDAwAASwMAAFIDaSVnaHRWZWN0b3IAAKBQKWUkZVZlY3RvcgAAoF4p5SJjdG9yQqC9IWEAcgAAoFYpaSJnaHQA1AFiAwAAaQNlJGVWZWN0b3IAAKBfKeUiY3RvckKgwSFhAHIAAKBXKWUAZQBBoKQiciJyb3cAAKCnIXIAcgBvAPcAtAIAAWN0gwOHA3IA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YwAAoN8i4SFycnCgtiEAoD0pgKIqImJjZG9zACsVMBU6FT4VQRVyImNhcAAAoEgqAAFhdTQVNxVwAACgRipwAACgSipvAHQAAKCNInIAAKBFKgDgKiIA/gACYWxydksVURVuFXMVcgByAG2gtyEAoDwpeQCAAWV2dwBYFWUVaRVxAHACXxUAAAAAYxVyAGUA4wAXFXUA4wAZFWUAZQAAoM4iZSJkZ2UAAKDPImUAbgA7gKQApEBlI2Fycm93AAABbHJ7FX8V5SFmdACgtiFpImdodAAAoLchZQDkAG0VAAFjaYsVkRVvAG4AaQBuAPQAkwFuAHQAAKAxImwiY3R5AACgLSOACUFIYWJjZGVmaGlqbG9yc3R1d3oAuBW7Fb8V1RXgFegV+RUKFhUWHxZUFlcWZRbFFtsW7xb7FgUXChdyAPIAtAJhAHIAAKBlKQACZ2xyc8YVyhXOFdAV5yFlcgCgICDlIXRoAKA4IfIA9QxoAHagECAAoKMiawHZFd4VYSJyb3cAAKAPKWEA4wBfAgABYXnkFecV8iFvbg9hNGQAoUYhYW/tFfQVAAFnciEC8RVyAACgyiF0InNlcQAAoHcqgAFnbG0A/xUCFgUWO4CwALBAdABhALRjcCJ0eXYAAKCxKQABaXIOFhIW8yFodACgfykA4DXYId1hAHIAAAFschsWHRYAoMMhAKDCIYACYWVnc3YAKBauAjYWOhY+Fm0AAKHEIm9zLhY0Fm4AZABzoMQi9SFpdACgZiZhIm1tYQDdY2kAbgAAoPIiAKH3AGlvQxZRFmQAZQAAgfcAO29KFksW90BuI3RpbWVzAACgxyJuAPgAUBZjAHkAUmRjAG8CXhYAAAAAYhZyAG4AAKAeI28AcAAAoA0jgAJscHR1dwBuFnEWdRaSFp4W7CFhciRgZgAA4DXYVd0AotkCZW1wc30WhBaJFo0WcQBkoFAibwB0AACgUSJpIm51cwAAoDgi7CF1cwCgFCLxInVhcmUAoKEiYgBsAGUAYgBhAHIAdwBlAGQAZwDlANcAbgCAAWFkaAClFqoWtBZyAHIAbwD3APUMbwB3AG4AYQByAHIAbwB3APMA8xVhI3Jwb29uAAABbHK8FsAWZQBmAPQAHBZpAGcAaAD0AB4WYgHJFs8WawBhAHIAbwD3AJILbwLUFgAAAADYFnIAbgAAoB8jbwBwAACgDCOAAWNvdADhFukW7BYAAXJ55RboFgDgNdi53FVkbAAAoPYp8iFvaxFhAAFkcvMW9xZvAHQAAKDxImkA5qC/JVsSAAFhaP8WAhdyAPIANQNhAPIA1wvhIm5nbGUAoKYpAAFjaQ4XEBd5AF9k5yJyYXJyAKD/JwAJRGFjZGVmZ2xtbm9wcXJzdHV4MRc4F0YXWxcyBF4XaRd5F40XrBe0F78X2RcVGCEYLRg1GEAYAAFEbzUXgRZvAPQA+BUAAWNzPBdCF3UAdABlADuA6QDpQPQhZXIAoG4qAAJhaW95TRdQF1YXWhfyIW9uG2FyAGOgViI7gOoA6kDsIW9uAKBVIk1kbwB0ABdhAAFEcmIXZhdvAHQAAKBSIgDgNdgi3XKhmipuF3QXYQB2AGUAO4DoAOhAZKCWKm8AdAAAoJgqgKGZKmlscwCAF4UXhxfuInRlcnMAoOcjAKATIWSglSpvAHQAAKCXKoABYXBzAJMXlheiF2MAcgATYXQAeQBzogUinxcAAAAAoRdlAHQAAKAFInAAMaADIDMBqRerFwCgBCAAoAUgAAFnc7AXsRdLYXAAAKACIAABZ3C4F7sXbwBuABlhZgAA4DXYVt2AAWFscwDFF8sXzxdyAHOg1SJsAACg4yl1AHMAAKBxKmkAAKG1A2x21RfYF28AbgC1Y/VjAAJjc3V24BfoF/0XEBgAAWlv5BdWF3IAYwAAoFYiaQLuFwAAAADwF+0ADQThIW50AAFnbPUX+Rd0AHIAAKCWKuUhc3MAoJUqgAFhZWkAAxgGGAoYbABzAD1gcwB0AACgXyJ2AESgYSJEAACgeCrwImFyc2wAoOUpAAFEYRkYHRhvAHQAAKBTInIAcgAAoHEpgAFjZGkAJxgqGO0XcgAAoC8hbwD0AIwCAAFhaDEYMhi3YzuA8ADwQAABbXI5GD0YbAA7gOsA60BvAACgrCCAAWNpcABGGEgYSxhsACFgcwD0ACwEAAFlb08YVxhjAHQAYQB0AGkAbwDuABoEbgBlAG4AdABpAGEAbADlADME4Ql1GAAAgRgAAIMYiBgAAAAAoRilGAAAqhgAALsYvhjRGAAA1xgnGWwAbABpAG4AZwBkAG8AdABzAGUA8QBlF3kARGRtImFsZQAAoEAmgAFpbHIAjRiRGJ0Y7CFpZwCgA/tpApcYAAAAAJoYZwAAoAD7aQBnAACgBPsA4DXYI93sIWlnAKAB++whaWcA4GYAagCAAWFsdACvGLIYthh0AACgbSZpAGcAAKAC+24AcwAAoLElbwBmAJJh8AHCGAAAxhhmAADgNdhX3QABYWvJGMwYbADsAGsEdqDUIgCg2SphI3J0aW50AACgDSoAAWFv2hgiGQABY3PeGB8ZsQPnGP0YBRkSGRUZAAAdGbID7xjyGPQY9xj5GAAA+xg7gL0AvUAAoFMhO4C8ALxAAKBVIQCgWSEAoFshswEBGQAAAxkAoFQhAKBWIbQCCxkOGQAAAAAQGTuAvgC+QACgVyEAoFwhNQAAoFghtgEZGQAAGxkAoFohAKBdITgAAKBeIWwAAKBEIHcAbgAAoCIjYwByAADgNdi73IAIRWFiY2RlZmdpamxub3JzdHYARhlKGVoZXhlmGWkZkhmWGZkZnRmgGa0ZxhnLGc8Z4BkjGmygZyIAoIwqgAFjbXAAUBlTGVgZ9SF0ZfVhbQBhAOSgswM6FgCghipyImV2ZQAfYQABaXliGWUZcgBjAB1hM2RvAHQAIWGAoWUibHFzAMYEcBl6GfGhZSLOBAAAdhlsAGEAbgD0AN8EgKF+KmNkbACBGYQZjBljAACgqSpvAHQAb6CAKmyggioAoIQqZeDbIgD+cwAAoJQqcgAA4DXYJN3noGsirATtIWVsAKA3IWMAeQBTZIChdyJFYWoApxmpGasZAKCSKgCgpSoAoKQqAAJFYWVztBm2Gb0ZwhkAoGkicABwoIoq8iFveACgiipxoIgq8aCIKrUZaQBtAACg5yJwAGYAAOA12FjdYQB2AOUAYwIAAWNp0xnWGXIAAKAKIW0AAKFzImVs3BneGQCgjioAoJAqAIM+ADtjZGxxco0E6xn0GfgZ/BkBGgABY2nvGfEZAKCnKnIAAKB6Km8AdAAAoNci0CFhcgCglSl1ImVzdAAAoHwqgAJhZGVscwAKGvQZFhrVBCAa8AEPGgAAFBpwAHIAbwD4AFkZcgAAoHgpcQAAAWxxxAQbGmwAZQBzAPMASRlpAO0A5AQAAWVuJxouGnIjdG5lcXEAAOBpIgD+xQAsGgAFQWFiY2Vma29zeUAaQxpmGmoabRqDGocalhrCGtMacgDyAMwCAAJpbG1yShpOGlAaVBpyAHMA8ABxD2YAvWBpAGwA9AASBQABZHJYGlsaYwB5AEpkAKGUIWN3YBpkGmkAcgAAoEgpAKCtIWEAcgAAoA8h6SFyYyVhgAFhbHIAcxp7Gn8a8iF0c3WgZSZpAHQAAKBlJuwhaXAAoCYg4yFvbgCguSJyAADgNdgl3XMAAAFld4wakRphInJvdwAAoCUpYSJyb3cAAKAmKYACYW1vcHIAnxqjGqcauhq+GnIAcgAAoP8h9CFodACgOyJrAAABbHKsGrMaZSRmdGFycm93AACgqSHpJGdodGFycm93AKCqIWYAAOA12Fnd4iFhcgCgFSCAAWNsdADIGswa0BpyAADgNdi93GEAcwDoAGka8iFvaydhAAFicNca2xr1IWxsAKBDIOghZW4AoBAg4Qr2GgAA/RoAAAgbExsaGwAAIRs7GwAAAAA+G2IbmRuVG6sbAACyG80b0htjAHUAdABlADuA7QDtQAChYyBpeQEbBhtyAGMAO4DuAO5AOGQAAWN4CxsNG3kANWRjAGwAO4ChAKFAAAFmcssCFhsA4DXYJt1yAGEAdgBlADuA7ADsQIChSCFpbm8AJxsyGzYbAAFpbisbLxtuAHQAAKAMKnQAAKAtIuYhaW4AoNwpdABhAACgKSHsIWlnM2GAAWFvcABDG1sbXhuAAWNndABJG0sbWRtyACthgAFlbHAAcQVRG1UbaQBuAOUAyAVhAHIA9AByBWgAMWFmAACgtyJlAGQAtWEAoggiY2ZvdGkbbRt1G3kb4SFyZQCgBSFpAG4AdKAeImkAZQAAoN0pZABvAPQAWxsAoisiY2VscIEbhRuPG5QbYQBsAACguiIAAWdyiRuNG2UAcgDzACMQ4wCCG2EicmhrAACgFyryIW9kAKA8KgACY2dwdJ8boRukG6gbeQBRZG8AbgAvYWYAAOA12FrdYQC5Y3UAZQBzAHQAO4C/AL9AAAFjabUbuRtyAADgNdi+3G4AAKIIIkVkc3bCG8QbyBvQAwCg+SJvAHQAAKD1Inag9CIAoPMiaaBiIOwhZGUpYesB1hsAANkbYwB5AFZkbAA7gO8A70AAA2NmbW9zdeYb7hvyG/Ub+hsFHAABaXnqG+0bcgBjADVhOWRyAADgNdgn3eEhdGg3YnAAZgAA4DXYW93jAf8bAAADHHIAAOA12L/c8iFjeVhk6yFjeVRkAARhY2ZnaGpvcxUcGhwiHCYcKhwtHDAcNRzwIXBhdqC6A/BjAAFleR4cIRzkIWls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ZmdobG1vcHJzdHV3CiwNLBEsHSwnLDEsQCxLLFIsYix6LIQsjyzLLOgs7Sz/LAotcgDyAAkDYQByAACgYykAAWNyFSwbLHUAdABlADuA+gD6QPIACQ1yAOMBIywAACUseQBeZHYAZQBtYQABaXkrLDAscgBjADuA+wD7QENkgAFhYmgANyw6LD0scgDyANEO7CFhY3FhYQDyAOAOAAFpckQsSCzzIWh0AKB+KQDgNdgy3XIAYQB2AGUAO4D5APlAYQFWLF8scgAAAWxyWixcLACgvyEAoL4hbABrAACggCUAAWN0Zix2LG8CbCwAAAAAcyxyAG4AZaAcI3IAAKAcI28AcAAAoA8jcgBpAACg+CUAAWFsfiyBLGMAcgBrYTuAqACoQAABZ3CILIssbwBuAHNhZgAA4DXYZt0AA2FkaGxzdZksniynLLgsuyzFLHIAcgBvAPcACQ1vAHcAbgBhAHIAcgBvAPcA2A5hI3Jwb29uAAABbHKvLLMsZQBmAPQAWyxpAGcAaAD0AF0sdQDzAKYOaQAAocUDaGzBLMIs0mNvAG4AxWPwI2Fycm93cwCgyCGAAWNpdADRLOEs5CxvAtcsAAAAAN4scgBuAGWgHSNyAACgHSNvAHAAAKAOI24AZwBvYXIAaQAAoPklYwByAADgNdjK3IABZGlyAPMs9yz6LG8AdAAAoPAi7CFkZWlhaQBmoLUlAKC0JQABYW0DLQYtcgDyAMosbAA7gPwA/EDhIm5nbGUAoKcpgAdBQkRhY2RlZmxub3Byc3oAJy0qLTAtNC2bLZ0toS2/LcMtxy3TLdgt3C3gLfwtcgDyABADYQByAHag6CoAoOkqYQBzAOgA/gIAAW5yOC08LechcnQAoJwpgANla25wcnN0AJkpSC1NLVQtXi1iLYItYQBwAHAA4QAaHG8AdABoAGkAbgDnAKEXgAFoaXIAoSmzJFotbwBwAPQAdCVooJUh7wD4JgABaXVmLWotZwBtAOEAuygAAWJwbi14LXMjZXRuZXEAceCKIgD+AODLKgD+cyNldG5lcQBx4IsiAP4A4MwqAP4AAWhyhi2KLWUAdADhABIraSNhbmdsZQAAAWxyki2WLeUhZnQAoLIiaSJnaHQAAKCzInkAMmThIXNoAKCiIoABZWxyAKcttC24LWKiKCKuLQAAAACyLWEAcgAAoLsicQAAoFoi7CFpcACg7iIAAWJ0vC1eD2EA8gBfD3IAAOA12DPddAByAOkAlS1zAHUAAAFicM0t0C0A4IIi0iAA4IMi0iBwAGYAAOA12GfdcgBvAPAAWQt0AHIA6QCaLQABY3XkLegtcgAA4DXYy9wAAWJw7C30LW4AAAFFZXUt8S0A4IoiAP5uAAABRWV/LfktAOCLIgD+6SJnemFnAKCaKYADY2Vmb3BycwANLhAuJS4pLiMuLi40LukhcmN1YQABZGkULiEuAAFiZxguHC5hAHIAAKBfKmUAcaAnIgCgWSLlIXJwAKAYIXIAAOA12DTdcABmAADgNdho3WWgQCJhAHQA6ABqD2MAcgAA4DXYzNzjCuQRUC4AAFQuAABYLmIuAAAAAGMubS5wLnQuAAAAAIguki4AAJouJxIqEnQAcgDpAB0ScgAA4DXYNd0AAUFhWy5eLnIA8gDnAnIA8gCTB75jAAFBYWYuaS5yAPIA4AJyAPIAjAdhAPAAeh5pAHMAAKD7IoABZHB0APgReS6DLgABZmx9LoAuAOA12GnddQDzAP8RaQBtAOUABBIAAUFhiy6OLnIA8gDuAnIA8gCaBwABY3GVLgoScgAA4DXYzdwAAXB0nS6hLmwAdQDzACUScgDpACASAARhY2VmaW9zdbEuvC7ELsguzC7PLtQu2S5jAAABdXm2LrsudABlADuA/QD9QE9kAAFpecAuwy5yAGMAd2FLZG4AO4ClAKVAcgAA4DXYNt1jAHkAV2RwAGYAAOA12GrdYwByAADgNdjO3AABY23dLt8ueQBOZGwAO4D/AP9AAAVhY2RlZmhpb3N38y73Lv8uAi8MLxAvEy8YLx0vIi9jInV0ZQB6YQABYXn7Lv4u8iFvbn5hN2RvAHQAfGEAAWV0Bi8KL3QAcgDmAB8QYQC2Y3IAAOA12DfdYwB5ADZk5yJyYXJyAKDdIXAAZgAA4DXYa91jAHIAAOA12M/cAAFqbiYvKC8AoA0gagAAoAwg");
//#endregion
//#region node_modules/entities/dist/internal/bin-trie-flags.js
/**
* Bit flags & masks for the binary trie encoding used for entity decoding.
*
* Bit layout (16 bits total):
* 15..14 VALUE_LENGTH   (+1 encoding; 0 => no value)
* 13     FLAG13.        If valueLength>0: semicolon required flag (implicit ';').
*                       If valueLength==0: compact run flag.
* 12..7  BRANCH_LENGTH  Branch length (0 => single branch in 6..0 if jumpOffset==char) OR run length (when compact run)
* 6..0   JUMP_TABLE     Jump offset (jump table) OR single-branch char code OR first run char
*/
var BinTrieFlags;
(function(BinTrieFlags) {
	BinTrieFlags[BinTrieFlags["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
	BinTrieFlags[BinTrieFlags["FLAG13"] = 8192] = "FLAG13";
	BinTrieFlags[BinTrieFlags["BRANCH_LENGTH"] = 8064] = "BRANCH_LENGTH";
	BinTrieFlags[BinTrieFlags["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
//#endregion
//#region node_modules/entities/dist/decode.js
var CharCodes;
(function(CharCodes) {
	CharCodes[CharCodes["NUM"] = 35] = "NUM";
	CharCodes[CharCodes["SEMI"] = 59] = "SEMI";
	CharCodes[CharCodes["EQUALS"] = 61] = "EQUALS";
	CharCodes[CharCodes["ZERO"] = 48] = "ZERO";
	CharCodes[CharCodes["NINE"] = 57] = "NINE";
	CharCodes[CharCodes["LOWER_A"] = 97] = "LOWER_A";
	CharCodes[CharCodes["LOWER_F"] = 102] = "LOWER_F";
	CharCodes[CharCodes["LOWER_X"] = 120] = "LOWER_X";
	CharCodes[CharCodes["LOWER_Z"] = 122] = "LOWER_Z";
	CharCodes[CharCodes["UPPER_A"] = 65] = "UPPER_A";
	CharCodes[CharCodes["UPPER_F"] = 70] = "UPPER_F";
	CharCodes[CharCodes["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
/** Bit that needs to be set to convert an upper case ASCII character to lower case */
const TO_LOWER_BIT = 32;
function isNumber(code) {
	return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
	return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric(code) {
	return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
}
/**
* Checks if the given character is a valid end character for an entity in an attribute.
*
* Attribute values that aren't terminated properly aren't parsed, and shouldn't lead to a parser error.
* See the example in https://html.spec.whatwg.org/multipage/parsing.html#named-character-reference-state
* @param code Code point to decode.
*/
function isEntityInAttributeInvalidEnd(code) {
	return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function(EntityDecoderState) {
	EntityDecoderState[EntityDecoderState["EntityStart"] = 0] = "EntityStart";
	EntityDecoderState[EntityDecoderState["NumericStart"] = 1] = "NumericStart";
	EntityDecoderState[EntityDecoderState["NumericDecimal"] = 2] = "NumericDecimal";
	EntityDecoderState[EntityDecoderState["NumericHex"] = 3] = "NumericHex";
	EntityDecoderState[EntityDecoderState["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
/**
* Decoding mode for named entities.
*/
var DecodingMode;
(function(DecodingMode) {
	/** Entities in text nodes that can end with any character. */
	DecodingMode[DecodingMode["Legacy"] = 0] = "Legacy";
	/** Only allow entities terminated with a semicolon. */
	DecodingMode[DecodingMode["Strict"] = 1] = "Strict";
	/** Entities in attributes have limitations on ending characters. */
	DecodingMode[DecodingMode["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
/**
* Token decoder with support of writing partial entities.
*/
var EntityDecoder = class {
	constructor(decodeTree, emitCodePoint, errors) {
		this.state = EntityDecoderState.EntityStart;
		this.consumed = 1;
		this.result = 0;
		this.treeIndex = 0;
		this.excess = 1;
		this.decodeMode = DecodingMode.Strict;
		this.runConsumed = 0;
		this.decodeTree = decodeTree;
		this.emitCodePoint = emitCodePoint;
		this.errors = errors;
	}
	/**
	* Resets the instance to make it reusable.
	* @param decodeMode Entity decoding mode to use.
	*/
	startEntity(decodeMode) {
		this.decodeMode = decodeMode;
		this.state = EntityDecoderState.EntityStart;
		this.result = 0;
		this.treeIndex = 0;
		this.excess = 1;
		this.consumed = 1;
		this.runConsumed = 0;
	}
	/**
	* Write an entity to the decoder. This can be called multiple times with partial entities.
	* If the entity is incomplete, the decoder will return -1.
	*
	* Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
	* entity is incomplete, and resume when the next string is written.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	write(input, offset) {
		switch (this.state) {
			case EntityDecoderState.EntityStart:
				if (input.charCodeAt(offset) === CharCodes.NUM) {
					this.state = EntityDecoderState.NumericStart;
					this.consumed += 1;
					return this.stateNumericStart(input, offset + 1);
				}
				this.state = EntityDecoderState.NamedEntity;
				return this.stateNamedEntity(input, offset);
			case EntityDecoderState.NumericStart: return this.stateNumericStart(input, offset);
			case EntityDecoderState.NumericDecimal: return this.stateNumericDecimal(input, offset);
			case EntityDecoderState.NumericHex: return this.stateNumericHex(input, offset);
			case EntityDecoderState.NamedEntity: return this.stateNamedEntity(input, offset);
		}
	}
	/**
	* Switches between the numeric decimal and hexadecimal states.
	*
	* Equivalent to the `Numeric character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericStart(input, offset) {
		if (offset >= input.length) return -1;
		if ((input.charCodeAt(offset) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
			this.state = EntityDecoderState.NumericHex;
			this.consumed += 1;
			return this.stateNumericHex(input, offset + 1);
		}
		this.state = EntityDecoderState.NumericDecimal;
		return this.stateNumericDecimal(input, offset);
	}
	/**
	* Parses a hexadecimal numeric entity.
	*
	* Equivalent to the `Hexademical character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericHex(input, offset) {
		while (offset < input.length) {
			const char = input.charCodeAt(offset);
			if (isNumber(char) || isHexadecimalCharacter(char)) {
				const digit = char <= CharCodes.NINE ? char - CharCodes.ZERO : (char | TO_LOWER_BIT) - CharCodes.LOWER_A + 10;
				this.result = this.result * 16 + digit;
				this.consumed++;
				offset++;
			} else return this.emitNumericEntity(char, 3);
		}
		return -1;
	}
	/**
	* Parses a decimal numeric entity.
	*
	* Equivalent to the `Decimal character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNumericDecimal(input, offset) {
		while (offset < input.length) {
			const char = input.charCodeAt(offset);
			if (isNumber(char)) {
				this.result = this.result * 10 + (char - CharCodes.ZERO);
				this.consumed++;
				offset++;
			} else return this.emitNumericEntity(char, 2);
		}
		return -1;
	}
	/**
	* Validate and emit a numeric entity.
	*
	* Implements the logic from the `Hexademical character reference start
	* state` and `Numeric character reference end state` in the HTML spec.
	* @param lastCp The last code point of the entity. Used to see if the
	*               entity was terminated with a semicolon.
	* @param expectedLength The minimum number of characters that should be
	*                       consumed. Used to validate that at least one digit
	*                       was consumed.
	* @returns The number of characters that were consumed.
	*/
	emitNumericEntity(lastCp, expectedLength) {
		if (this.consumed <= expectedLength) {
			var _this$errors;
			(_this$errors = this.errors) === null || _this$errors === void 0 || _this$errors.absenceOfDigitsInNumericCharacterReference(this.consumed);
			return 0;
		}
		if (lastCp === CharCodes.SEMI) this.consumed += 1;
		else if (this.decodeMode === DecodingMode.Strict) return 0;
		this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
		if (this.errors) {
			if (lastCp !== CharCodes.SEMI) this.errors.missingSemicolonAfterCharacterReference();
			this.errors.validateNumericCharacterReference(this.result);
		}
		return this.consumed;
	}
	/**
	* Parses a named entity.
	*
	* Equivalent to the `Named character reference state` in the HTML spec.
	* @param input The string containing the entity (or a continuation of the entity).
	* @param offset The current offset.
	* @returns The number of characters that were consumed, or -1 if the entity is incomplete.
	*/
	stateNamedEntity(input, offset) {
		const { decodeTree } = this;
		let current = decodeTree[this.treeIndex];
		let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
		while (offset < input.length) {
			if (valueLength === 0 && (current & BinTrieFlags.FLAG13) !== 0) {
				const runLength = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
				if (this.runConsumed === 0) {
					const firstChar = current & BinTrieFlags.JUMP_TABLE;
					if (input.charCodeAt(offset) !== firstChar) return this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
					offset++;
					this.excess++;
					this.runConsumed++;
				}
				while (this.runConsumed < runLength) {
					if (offset >= input.length) return -1;
					const charIndexInPacked = this.runConsumed - 1;
					const packedWord = decodeTree[this.treeIndex + 1 + (charIndexInPacked >> 1)];
					const expectedChar = charIndexInPacked % 2 === 0 ? packedWord & 255 : packedWord >> 8 & 255;
					if (input.charCodeAt(offset) !== expectedChar) {
						this.runConsumed = 0;
						return this.result === 0 ? 0 : this.emitNotTerminatedNamedEntity();
					}
					offset++;
					this.excess++;
					this.runConsumed++;
				}
				this.runConsumed = 0;
				this.treeIndex += 1 + (runLength >> 1);
				current = decodeTree[this.treeIndex];
				valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
			}
			if (offset >= input.length) break;
			const char = input.charCodeAt(offset);
			if (char === CharCodes.SEMI && valueLength !== 0 && (current & BinTrieFlags.FLAG13) !== 0) return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
			this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
			if (this.treeIndex < 0) return this.result === 0 || this.decodeMode === DecodingMode.Attribute && (valueLength === 0 || isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
			current = decodeTree[this.treeIndex];
			valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
			if (valueLength !== 0) {
				if (char === CharCodes.SEMI) return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
				if (this.decodeMode !== DecodingMode.Strict && (current & BinTrieFlags.FLAG13) === 0) {
					this.result = this.treeIndex;
					this.consumed += this.excess;
					this.excess = 0;
				}
			}
			offset++;
			this.excess++;
		}
		return -1;
	}
	/**
	* Emit a named entity that was not terminated with a semicolon.
	* @returns The number of characters consumed.
	*/
	emitNotTerminatedNamedEntity() {
		var _this$errors2;
		const { result, decodeTree } = this;
		const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
		this.emitNamedEntityData(result, valueLength, this.consumed);
		(_this$errors2 = this.errors) === null || _this$errors2 === void 0 || _this$errors2.missingSemicolonAfterCharacterReference();
		return this.consumed;
	}
	/**
	* Emit a named entity.
	* @param result The index of the entity in the decode tree.
	* @param valueLength The number of bytes in the entity.
	* @param consumed The number of characters consumed.
	* @returns The number of characters consumed.
	*/
	emitNamedEntityData(result, valueLength, consumed) {
		const { decodeTree } = this;
		this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~(BinTrieFlags.VALUE_LENGTH | BinTrieFlags.FLAG13) : decodeTree[result + 1], consumed);
		if (valueLength === 3) this.emitCodePoint(decodeTree[result + 2], consumed);
		return consumed;
	}
	/**
	* Signal to the parser that the end of the input was reached.
	*
	* Remaining data will be emitted and relevant errors will be produced.
	* @returns The number of characters consumed.
	*/
	end() {
		switch (this.state) {
			case EntityDecoderState.NamedEntity: return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
			case EntityDecoderState.NumericDecimal: return this.emitNumericEntity(0, 2);
			case EntityDecoderState.NumericHex: return this.emitNumericEntity(0, 3);
			case EntityDecoderState.NumericStart:
				var _this$errors3;
				(_this$errors3 = this.errors) === null || _this$errors3 === void 0 || _this$errors3.absenceOfDigitsInNumericCharacterReference(this.consumed);
				return 0;
			case EntityDecoderState.EntityStart: return 0;
		}
	}
};
/**
* Creates a function that decodes entities in a string.
* @param decodeTree The decode tree.
* @returns A function that decodes entities in a string.
*/
function getDecoder(decodeTree) {
	let returnValue = "";
	const decoder = new EntityDecoder(decodeTree, (data) => returnValue += String.fromCodePoint(data));
	return function decodeWithTrie(input, decodeMode) {
		let lastIndex = 0;
		let offset = 0;
		while ((offset = input.indexOf("&", offset)) >= 0) {
			returnValue += input.slice(lastIndex, offset);
			decoder.startEntity(decodeMode);
			const length = decoder.write(input, offset + 1);
			if (length < 0) {
				lastIndex = offset + decoder.end();
				break;
			}
			lastIndex = offset + length;
			offset = length === 0 ? lastIndex + 1 : lastIndex;
		}
		const result = returnValue + input.slice(lastIndex);
		returnValue = "";
		return result;
	};
}
/**
* Determines the branch of the current node that is taken given the current
* character. This function is used to traverse the trie.
* @param decodeTree The trie.
* @param current The current node.
* @param nodeIndex Index immediately after the current node header.
* @param char The current character.
* @returns The index of the next node, or -1 if no branch is taken.
*/
function determineBranch(decodeTree, current, nodeIndex, char) {
	const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
	const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
	if (branchCount === 0) return jumpOffset !== 0 && char === jumpOffset ? nodeIndex : -1;
	if (jumpOffset) {
		const value = char - jumpOffset;
		return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIndex + value] - 1;
	}
	const packedKeySlots = branchCount + 1 >> 1;
	let lo = 0;
	let hi = branchCount - 1;
	while (lo <= hi) {
		const mid = lo + hi >>> 1;
		const midKey = decodeTree[nodeIndex + (mid >> 1)] >> (mid & 1) * 8 & 255;
		if (midKey < char) lo = mid + 1;
		else if (midKey > char) hi = mid - 1;
		else return decodeTree[nodeIndex + packedKeySlots + mid];
	}
	return -1;
}
const htmlDecoder = /* #__PURE__ */ getDecoder(htmlDecodeTree);
/**
* Decodes an HTML string.
* @param htmlString The string to decode.
* @param mode The decoding mode.
* @returns The decoded string.
*/
function decodeHTML(htmlString, mode = DecodingMode.Legacy) {
	return htmlDecoder(htmlString, mode);
}
//#endregion
//#region node_modules/entities/dist/escape.js
const xmlCodeMap$1 = /* @__PURE__ */ new Map([
	[34, "&quot;"],
	[38, "&amp;"],
	[39, "&apos;"],
	[60, "&lt;"],
	[62, "&gt;"]
]);
/**
* Read a code point at a given index.
* @param input Input string to encode or decode.
* @param index Current read position in the input string.
*/
const getCodePoint$1 = typeof String.prototype.codePointAt === "function" ? (input, index) => input.codePointAt(index) : (c, index) => (c.charCodeAt(index) & 64512) === 55296 ? (c.charCodeAt(index) - 55296) * 1024 + c.charCodeAt(index + 1) - 56320 + 65536 : c.charCodeAt(index);
/**
* Bitset for ASCII characters that need to be escaped in XML.
*/
const XML_BITSET_VALUE = 1342177476;
/**
* Encodes all non-ASCII characters, as well as characters not valid in XML
* documents using XML entities. Uses a fast bitset scan instead of RegExp.
*
* If a character has no equivalent entity, a numeric hexadecimal reference
* (eg. `&#xfc;`) will be used.
* @param input Input string to encode or decode.
*/
function encodeXML$1(input) {
	let out;
	let last = 0;
	const { length } = input;
	for (let index = 0; index < length; index++) {
		const char = input.charCodeAt(index);
		if (char < 128 && ((1342177476 >>> char & 1) === 0 || char >= 64 || char < 32)) continue;
		if (out === void 0) out = input.substring(0, index);
		else if (last !== index) out += input.substring(last, index);
		if (char < 64) {
			out += xmlCodeMap$1.get(char);
			last = index + 1;
			continue;
		}
		const cp = getCodePoint$1(input, index);
		out += `&#x${cp.toString(16)};`;
		if (cp !== char) index++;
		last = index + 1;
	}
	if (out === void 0) return input;
	if (last < length) out += input.substr(last);
	return out;
}
/**
* Creates a function that escapes all characters matched by the given regular
* expression using the given map of characters to escape to their entities.
* @param regex Regular expression to match characters to escape.
* @param map Map of characters to escape to their entities.
* @returns Function that escapes all characters matched by the given regular
* expression using the given map of characters to escape to their entities.
*/
function getEscaper$1(regex, map) {
	return function escape(data) {
		let match;
		let lastIndex = 0;
		let result = "";
		while (match = regex.exec(data)) {
			if (lastIndex !== match.index) result += data.substring(lastIndex, match.index);
			result += map.get(match[0].charCodeAt(0));
			lastIndex = match.index + 1;
		}
		return result + data.substring(lastIndex);
	};
}
/**
* Encodes all characters not valid in XML documents using XML entities.
*
* Note that the output will be character-set dependent.
* @param data String to escape.
*/
const escapeUTF8$1 = /* #__PURE__ */ getEscaper$1(/["&'<>]/g, xmlCodeMap$1);
/**
* Encodes all characters that have to be escaped in HTML attributes,
* following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
* @param data String to escape.
*/
const escapeAttribute$1 = /* #__PURE__ */ getEscaper$1(/["&\u00A0]/g, /* @__PURE__ */ new Map([
	[34, "&quot;"],
	[38, "&amp;"],
	[160, "&nbsp;"]
]));
/**
* Encodes all characters that have to be escaped in HTML text,
* following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
* @param data String to escape.
*/
const escapeText$1 = /* #__PURE__ */ getEscaper$1(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
	[38, "&amp;"],
	[60, "&lt;"],
	[62, "&gt;"],
	[160, "&nbsp;"]
]));
//#endregion
//#region node_modules/entities/dist/internal/encode-shared.js
/**
* Parse a compact encode trie string into a Map structure used for encoding.
*
* Format per entry (ascending code points using delta encoding):
*   <diffBase36>[&name;][{<children>}]  -- diff omitted when 0
* Where diff = currentKey - previousKey - 1 (first entry stores absolute key).
* `&name;` is the entity value (already wrapped); a following `{` denotes children.
* @param serialized Serialized text fragment to encode.
*/
function parseEncodeTrie(serialized) {
	const top = /* @__PURE__ */ new Map();
	const totalLength = serialized.length;
	let cursor = 0;
	let lastTopKey = -1;
	function readDiff() {
		const start = cursor;
		while (cursor < totalLength) {
			const char = serialized.charAt(cursor);
			if ((char < "0" || char > "9") && (char < "a" || char > "z")) break;
			cursor++;
		}
		if (cursor === start) return 0;
		return Number.parseInt(serialized.slice(start, cursor), 36);
	}
	function readEntity() {
		if (serialized[cursor] !== "&") throw new Error(`Child entry missing value near index ${cursor}`);
		const start = cursor;
		const end = serialized.indexOf(";", cursor + 1);
		if (end === -1) throw new Error(`Unterminated entity starting at index ${start}`);
		cursor = end + 1;
		return serialized.slice(start, cursor);
	}
	while (cursor < totalLength) {
		const keyDiff = readDiff();
		const key = lastTopKey === -1 ? keyDiff : lastTopKey + keyDiff + 1;
		let value;
		if (serialized[cursor] === "&") value = readEntity();
		if (serialized[cursor] === "{") {
			cursor++;
			let diff = readDiff();
			let childKey = diff;
			const firstValue = readEntity();
			if (serialized[cursor] === "{") throw new Error("Unexpected nested '{' beyond depth 2");
			if (serialized[cursor] === "}") {
				top.set(key, {
					value,
					next: childKey,
					nextValue: firstValue
				});
				cursor++;
			} else {
				const childMap = /* @__PURE__ */ new Map([[childKey, firstValue]]);
				let lastChildKey = childKey;
				while (cursor < totalLength && serialized[cursor] !== "}") {
					diff = readDiff();
					childKey = lastChildKey + diff + 1;
					const childValue = readEntity();
					if (serialized[cursor] === "{") throw new Error("Unexpected nested '{' beyond depth 2");
					childMap.set(childKey, childValue);
					lastChildKey = childKey;
				}
				if (serialized[cursor] !== "}") throw new Error("Unterminated child block");
				cursor++;
				top.set(key, {
					value,
					next: childMap
				});
			}
		} else if (value === void 0) throw new Error(`Malformed encode trie: missing value at index ${cursor}`);
		else top.set(key, value);
		lastTopKey = key;
	}
	return top;
}
//#endregion
//#region node_modules/entities/dist/generated/encode-html.js
/** Compact serialized HTML encode trie (intended to stay small & JS engine friendly) */
/** HTML entity encode trie. */
const htmlTrie = /* #__PURE__ */ parseEncodeTrie("9&Tab;&NewLine;m&excl;&quot;&num;&dollar;&percnt;&amp;&apos;&lpar;&rpar;&ast;&plus;&comma;1&period;&sol;a&colon;&semi;&lt;{6he&nvlt;}&equals;{6hx&bne;}&gt;{6he&nvgt;}&quest;&commat;q&lbrack;&bsol;&rbrack;&Hat;&lowbar;&DiacriticalGrave;5{2y&fjlig;}k&lbrace;&verbar;&rbrace;y&nbsp;&iexcl;&cent;&pound;&curren;&yen;&brvbar;&sect;&die;&copy;&ordf;&laquo;&not;&shy;&circledR;&macr;&deg;&PlusMinus;&sup2;&sup3;&acute;&micro;&para;&centerdot;&cedil;&sup1;&ordm;&raquo;&frac14;&frac12;&frac34;&iquest;&Agrave;&Aacute;&Acirc;&Atilde;&Auml;&angst;&AElig;&Ccedil;&Egrave;&Eacute;&Ecirc;&Euml;&Igrave;&Iacute;&Icirc;&Iuml;&ETH;&Ntilde;&Ograve;&Oacute;&Ocirc;&Otilde;&Ouml;&times;&Oslash;&Ugrave;&Uacute;&Ucirc;&Uuml;&Yacute;&THORN;&szlig;&agrave;&aacute;&acirc;&atilde;&auml;&aring;&aelig;&ccedil;&egrave;&eacute;&ecirc;&euml;&igrave;&iacute;&icirc;&iuml;&eth;&ntilde;&ograve;&oacute;&ocirc;&otilde;&ouml;&div;&oslash;&ugrave;&uacute;&ucirc;&uuml;&yacute;&thorn;&yuml;&Amacr;&amacr;&Abreve;&abreve;&Aogon;&aogon;&Cacute;&cacute;&Ccirc;&ccirc;&Cdot;&cdot;&Ccaron;&ccaron;&Dcaron;&dcaron;&Dstrok;&dstrok;&Emacr;&emacr;2&Edot;&edot;&Eogon;&eogon;&Ecaron;&ecaron;&Gcirc;&gcirc;&Gbreve;&gbreve;&Gdot;&gdot;&Gcedil;1&Hcirc;&hcirc;&Hstrok;&hstrok;&Itilde;&itilde;&Imacr;&imacr;2&Iogon;&iogon;&Idot;&imath;&IJlig;&ijlig;&Jcirc;&jcirc;&Kcedil;&kcedil;&kgreen;&Lacute;&lacute;&Lcedil;&lcedil;&Lcaron;&lcaron;&Lmidot;&lmidot;&Lstrok;&lstrok;&Nacute;&nacute;&Ncedil;&ncedil;&Ncaron;&ncaron;&napos;&ENG;&eng;&Omacr;&omacr;2&Odblac;&odblac;&OElig;&oelig;&Racute;&racute;&Rcedil;&rcedil;&Rcaron;&rcaron;&Sacute;&sacute;&Scirc;&scirc;&Scedil;&scedil;&Scaron;&scaron;&Tcedil;&tcedil;&Tcaron;&tcaron;&Tstrok;&tstrok;&Utilde;&utilde;&Umacr;&umacr;&Ubreve;&ubreve;&Uring;&uring;&Udblac;&udblac;&Uogon;&uogon;&Wcirc;&wcirc;&Ycirc;&ycirc;&Yuml;&Zacute;&zacute;&Zdot;&zdot;&Zcaron;&zcaron;j&fnof;y&imped;1r&gacute;1t&jmath;3y&circ;&caron;g&breve;&DiacriticalDot;&ring;&ogon;&DiacriticalTilde;&dblac;1f&DownBreve;3j&Alpha;&Beta;&Gamma;&Delta;&Epsilon;&Zeta;&Eta;&Theta;&Iota;&Kappa;&Lambda;&Mu;&Nu;&Xi;&Omicron;&Pi;&Rho;1&Sigma;&Tau;&Upsilon;&Phi;&Chi;&Psi;&ohm;7&alpha;&beta;&gamma;&delta;&epsi;&zeta;&eta;&theta;&iota;&kappa;&lambda;&mu;&nu;&xi;&omicron;&pi;&rho;&sigmaf;&sigma;&tau;&upsi;&phi;&chi;&psi;&omega;7&thetasym;&Upsi;2&phiv;&piv;5&Gammad;&digamma;i&kappav;&rhov;3&epsiv;&backepsilon;a&IOcy;&DJcy;&GJcy;&Jukcy;&DScy;&Iukcy;&YIcy;&Jsercy;&LJcy;&NJcy;&TSHcy;&KJcy;1&Ubrcy;&DZcy;&Acy;&Bcy;&Vcy;&Gcy;&Dcy;&IEcy;&ZHcy;&Zcy;&Icy;&Jcy;&Kcy;&Lcy;&Mcy;&Ncy;&Ocy;&Pcy;&Rcy;&Scy;&Tcy;&Ucy;&Fcy;&KHcy;&TScy;&CHcy;&SHcy;&SHCHcy;&HARDcy;&Ycy;&SOFTcy;&Ecy;&YUcy;&YAcy;&acy;&bcy;&vcy;&gcy;&dcy;&iecy;&zhcy;&zcy;&icy;&jcy;&kcy;&lcy;&mcy;&ncy;&ocy;&pcy;&rcy;&scy;&tcy;&ucy;&fcy;&khcy;&tscy;&chcy;&shcy;&shchcy;&hardcy;&ycy;&softcy;&ecy;&yucy;&yacy;1&iocy;&djcy;&gjcy;&jukcy;&dscy;&iukcy;&yicy;&jsercy;&ljcy;&njcy;&tshcy;&kjcy;1&ubrcy;&dzcy;5gi&ensp;&emsp;&emsp13;&emsp14;1&numsp;&puncsp;&ThinSpace;&hairsp;&NegativeMediumSpace;&zwnj;&zwj;&lrm;&rlm;&dash;2&ndash;&mdash;&horbar;&Verbar;1&lsquo;&CloseCurlyQuote;&lsquor;1&ldquo;&CloseCurlyDoubleQuote;&bdquo;1&dagger;&Dagger;&bull;2&nldr;&hellip;9&permil;&pertenk;&prime;&Prime;&tprime;&backprime;3&lsaquo;&rsaquo;3&oline;2&caret;1&hybull;&frasl;a&bsemi;7&qprime;7&MediumSpace;{6bu&ThickSpace;}&NoBreak;&af;&InvisibleTimes;&ic;20&euro;1a&tdot;&DotDot;11&complexes;2&incare;4&gscr;&hamilt;&Hfr;&Hopf;&planckh;&hbar;&imagline;&Ifr;&lagran;&ell;1&naturals;&numero;&copysr;&weierp;&Popf;&Qopf;&realine;&real;&reals;&rx;3&trade;1&integers;2&mho;&zeetrf;&iiota;2&bernou;&Cayleys;1&escr;&Escr;&Fouriertrf;1&Mellintrf;&order;&alefsym;&beth;&gimel;&daleth;c&CapitalDifferentialD;&dd;&ee;&ii;a&frac13;&frac23;&frac15;&frac25;&frac35;&frac45;&frac16;&frac56;&frac18;&frac38;&frac58;&frac78;1d&larr;&ShortUpArrow;&rarr;&darr;&harr;&updownarrow;&nwarr;&nearr;&LowerRightArrow;&LowerLeftArrow;&nlarr;&nrarr;1&rarrw;{mw&nrarrw;}&Larr;&Uarr;&Rarr;&Darr;&larrtl;&rarrtl;&LeftTeeArrow;&mapstoup;&map;&DownTeeArrow;1&hookleftarrow;&hookrightarrow;&larrlp;&looparrowright;&harrw;&nharr;1&lsh;&rsh;&ldsh;&rdsh;1&crarr;&cularr;&curarr;2&circlearrowleft;&circlearrowright;&leftharpoonup;&DownLeftVector;&RightUpVector;&LeftUpVector;&rharu;&DownRightVector;&dharr;&dharl;&RightArrowLeftArrow;&udarr;&LeftArrowRightArrow;&leftleftarrows;&upuparrows;&rightrightarrows;&ddarr;&leftrightharpoons;&Equilibrium;&nlArr;&nhArr;&nrArr;&DoubleLeftArrow;&DoubleUpArrow;&DoubleRightArrow;&dArr;&DoubleLeftRightArrow;&DoubleUpDownArrow;&nwArr;&neArr;&seArr;&swArr;&lAarr;&rAarr;1&zigrarr;6&larrb;&rarrb;f&DownArrowUpArrow;7&loarr;&roarr;&hoarr;&forall;&comp;&part;{mw&npart;}&exist;&nexist;&empty;1&Del;&Element;&NotElement;1&ni;&notni;2&prod;&coprod;&sum;&minus;&MinusPlus;&dotplus;1&Backslash;&lowast;&compfn;1&radic;2&prop;&infin;&angrt;&ang;{6he&nang;}&angmsd;&angsph;&mid;&nmid;&DoubleVerticalBar;&NotDoubleVerticalBar;&and;&or;&cap;{1e68&caps;}&cup;{1e68&cups;}&int;&Int;&iiint;&conint;&Conint;&Cconint;&cwint;&ClockwiseContourIntegral;&awconint;&there4;&becaus;&ratio;&Colon;&dotminus;1&mDDot;&homtht;&sim;{6he&nvsim;}&backsim;{mp&race;}&ac;{mr&acE;}&acd;&VerticalTilde;&NotTilde;&eqsim;{mw&nesim;}&sime;&NotTildeEqual;&cong;&simne;&ncong;&ap;&nap;&ape;&apid;{mw&napid;}&backcong;&asympeq;{6he&nvap;}&bump;{mw&nbump;}&bumpe;{mw&nbumpe;}&doteq;{mw&nedot;}&doteqdot;&efDot;&erDot;&Assign;&ecolon;&ecir;&circeq;1&wedgeq;&veeeq;1&triangleq;2&equest;&ne;&Congruent;{6hx&bnequiv;}&nequiv;1&le;{6he&nvle;}&ge;{6he&nvge;}&lE;{mw&nlE;}&gE;{mw&ngE;}&lnE;{1e68&lvertneqq;}&gnE;{1e68&gvertneqq;}&ll;{mw&nLtv;5uh&nLt;}&gg;{mw&nGtv;5uh&nGt;}&between;&NotCupCap;&nless;&ngt;&nle;&nge;&lesssim;&GreaterTilde;&nlsim;&ngsim;&LessGreater;&gl;&NotLessGreater;&NotGreaterLess;&pr;&sc;&prcue;&sccue;&PrecedesTilde;&scsim;{mw&NotSucceedsTilde;}&NotPrecedes;&NotSucceeds;&sub;{6he&NotSubset;}&sup;{6he&NotSuperset;}&nsub;&nsup;&sube;&supe;&NotSubsetEqual;&NotSupersetEqual;&subne;{1e68&varsubsetneq;}&supne;{1e68&varsupsetneq;}1&cupdot;&UnionPlus;&sqsub;{mw&NotSquareSubset;}&sqsup;{mw&NotSquareSuperset;}&sqsube;&sqsupe;&sqcap;{1e68&sqcaps;}&sqcup;{1e68&sqcups;}&CirclePlus;&CircleMinus;&CircleTimes;&osol;&CircleDot;&circledcirc;&circledast;1&circleddash;&boxplus;&boxminus;&boxtimes;&dotsquare;&RightTee;&dashv;&DownTee;&bot;1&models;&DoubleRightTee;&Vdash;&Vvdash;&VDash;&nvdash;&nvDash;&nVdash;&nVDash;&prurel;1&LeftTriangle;&RightTriangle;&LeftTriangleEqual;{6he&nvltrie;}&RightTriangleEqual;{6he&nvrtrie;}&origof;&imof;&multimap;&hercon;&intcal;&veebar;1&barvee;&angrtvb;&lrtri;&bigwedge;&bigvee;&bigcap;&bigcup;&diam;&sdot;&sstarf;&divideontimes;&bowtie;&ltimes;&rtimes;&leftthreetimes;&rightthreetimes;&backsimeq;&curlyvee;&curlywedge;&Sub;&Sup;&Cap;&Cup;&fork;&epar;&lessdot;&gtdot;&Ll;{mw&nLl;}&Gg;{mw&nGg;}&leg;{1e68&lesg;}&gel;{1e68&gesl;}2&cuepr;&cuesc;&NotPrecedesSlantEqual;&NotSucceedsSlantEqual;&NotSquareSubsetEqual;&NotSquareSupersetEqual;2&lnsim;&gnsim;&precnsim;&scnsim;&nltri;&NotRightTriangle;&nltrie;&NotRightTriangleEqual;&vellip;&ctdot;&utdot;&dtdot;&disin;&isinsv;&isins;&isindot;{mw&notindot;}&notinvc;&notinvb;1&isinE;{mw&notinE;}&nisd;&xnis;&nis;&notnivc;&notnivb;6&barwed;&Barwed;1&lceil;&rceil;&LeftFloor;&rfloor;&drcrop;&dlcrop;&urcrop;&ulcrop;&bnot;1&profline;&profsurf;1&telrec;&target;5&ulcorn;&urcorn;&dlcorn;&drcorn;2&frown;&smile;9&cylcty;&profalar;7&topbot;6&ovbar;1&solbar;1o&angzarr;1f&lmoustache;&rmoustache;2&OverBracket;&bbrk;&bbrktbrk;11&OverParenthesis;&UnderParenthesis;&OverBrace;&UnderBrace;2&trpezium;4&elinters;1n&blank;4k&circledS;1j&boxh;1&boxv;9&boxdr;3&boxdl;3&boxur;3&boxul;3&boxvr;7&boxvl;7&boxhd;7&boxhu;7&boxvh;j&boxH;&boxV;&boxdR;&boxDr;&boxDR;&boxdL;&boxDl;&boxDL;&boxuR;&boxUr;&boxUR;&boxuL;&boxUl;&boxUL;&boxvR;&boxVr;&boxVR;&boxvL;&boxVl;&boxVL;&boxHd;&boxhD;&boxHD;&boxHu;&boxhU;&boxHU;&boxvH;&boxVh;&boxVH;j&uhblk;3&lhblk;3&block;8&blk14;&blk12;&blk34;d&square;8&blacksquare;&EmptyVerySmallSquare;1&rect;&marker;2&fltns;1&bigtriangleup;&blacktriangle;&triangle;2&blacktriangleright;&rtri;3&bigtriangledown;&blacktriangledown;&dtri;2&blacktriangleleft;&ltri;6&loz;&cir;w&tridot;2&bigcirc;8&ultri;&urtri;&lltri;&EmptySmallSquare;&FilledSmallSquare;8&bigstar;&star;7&phone;1d&female;1&male;t&spades;2&clubs;1&hearts;&diamondsuit;3&sung;2&flat;&natural;&sharp;4j&check;3&cross;8&malt;l&sext;x&VerticalSeparator;p&lbbrk;&rbbrk;2c&bsolhsub;&suphsol;s&LeftDoubleBracket;&RightDoubleBracket;&lang;&rang;&Lang;&Rang;&loang;&roang;7&longleftarrow;&longrightarrow;&longleftrightarrow;&DoubleLongLeftArrow;&DoubleLongRightArrow;&DoubleLongLeftRightArrow;1&longmapsto;2&dzigrarr;76&nvlArr;&nvrArr;&nvHarr;&Map;6&lbarr;&bkarow;&lBarr;&dbkarow;&drbkarow;&DDotrahd;&UpArrowBar;&DownArrowBar;2&Rarrtl;2&latail;&ratail;&lAtail;&rAtail;&larrfs;&rarrfs;&larrbfs;&rarrbfs;2&nwarhk;&nearhk;&hksearow;&hkswarow;&nwnear;&nesear;&seswar;&swnwar;8&rarrc;{mw&nrarrc;}1&cudarrr;&ldca;&rdca;&cudarrl;&larrpl;2&curarrm;&cularrp;7&rarrpl;2&harrcir;&Uarrocir;&lurdshar;&ldrushar;2&LeftRightVector;&RightUpDownVector;&DownLeftRightVector;&LeftUpDownVector;&LeftVectorBar;&RightVectorBar;&RightUpVectorBar;&RightDownVectorBar;&DownLeftVectorBar;&DownRightVectorBar;&LeftUpVectorBar;&LeftDownVectorBar;&LeftTeeVector;&RightTeeVector;&RightUpTeeVector;&RightDownTeeVector;&DownLeftTeeVector;&DownRightTeeVector;&LeftUpTeeVector;&LeftDownTeeVector;&lHar;&uHar;&rHar;&dHar;&luruhar;&ldrdhar;&ruluhar;&rdldhar;&lharul;&llhard;&rharul;&lrhard;&udhar;&duhar;&RoundImplies;&erarr;&simrarr;&larrsim;&rarrsim;&rarrap;&ltlarr;1&gtrarr;&subrarr;1&suplarr;&lfisht;&rfisht;&ufisht;&dfisht;5&lopar;&ropar;4&lbrke;&rbrke;&lbrkslu;&rbrksld;&lbrksld;&rbrkslu;&langd;&rangd;&lparlt;&rpargt;&gtlPar;&ltrPar;3&vzigzag;1&vangrt;&angrtvbd;6&ange;&range;&dwangle;&uwangle;&angmsdaa;&angmsdab;&angmsdac;&angmsdad;&angmsdae;&angmsdaf;&angmsdag;&angmsdah;&bemptyv;&demptyv;&cemptyv;&raemptyv;&laemptyv;&ohbar;&omid;&opar;1&operp;1&olcross;&odsold;1&olcir;&ofcir;&olt;&ogt;&cirscir;&cirE;&solb;&bsolb;3&boxbox;3&trisb;&rtriltri;&LeftTriangleBar;{mw&NotLeftTriangleBar;}&RightTriangleBar;{mw&NotRightTriangleBar;}b&iinfin;&infintie;&nvinfin;4&eparsl;&smeparsl;&eqvparsl;5&blacklozenge;8&RuleDelayed;1&dsol;9&bigodot;&bigoplus;&bigotimes;1&biguplus;1&bigsqcup;5&iiiint;&fpartint;2&cirfnint;&awint;&rppolint;&scpolint;&npolint;&pointint;&quatint;&intlarhk;a&pluscir;&plusacir;&simplus;&plusdu;&plussim;&plustwo;1&mcomma;&minusdu;2&loplus;&roplus;&Cross;&timesd;&timesbar;1&smashp;&lotimes;&rotimes;&otimesas;&Otimes;&odiv;&triplus;&triminus;&tritime;&intprod;2&amalg;&capdot;1&ncup;&ncap;&capand;&cupor;&cupcap;&capcup;&cupbrcap;&capbrcup;&cupcup;&capcap;&ccups;&ccaps;2&ccupssm;2&And;&Or;&andand;&oror;&orslope;&andslope;1&andv;&orv;&andd;&ord;1&wedbar;6&sdote;3&simdot;2&congdot;{mw&ncongdot;}&easter;&apacir;&apE;{mw&napE;}&eplus;&pluse;&Esim;&Colone;&Equal;1&ddotseq;&equivDD;&ltcir;&gtcir;&ltquest;&gtquest;&leqslant;{mw&nleqslant;}&geqslant;{mw&ngeqslant;}&lesdot;&gesdot;&lesdoto;&gesdoto;&lesdotor;&gesdotol;&lap;&gap;&lne;&gne;&lnap;&gnap;&lEg;&gEl;&lsime;&gsime;&lsimg;&gsiml;&lgE;&glE;&lesges;&gesles;&els;&egs;&elsdot;&egsdot;&el;&eg;2&siml;&simg;&simlE;&simgE;&LessLess;{mw&NotNestedLessLess;}&GreaterGreater;{mw&NotNestedGreaterGreater;}1&glj;&gla;&ltcc;&gtcc;&lescc;&gescc;&smt;&lat;&smte;{1e68&smtes;}&late;{1e68&lates;}&bumpE;&PrecedesEqual;{mw&NotPrecedesEqual;}&sce;{mw&NotSucceedsEqual;}2&prE;&scE;&precneqq;&scnE;&prap;&scap;&precnapprox;&scnap;&Pr;&Sc;&subdot;&supdot;&subplus;&supplus;&submult;&supmult;&subedot;&supedot;&subE;{mw&nsubE;}&supE;{mw&nsupE;}&subsim;&supsim;2&subnE;{1e68&varsubsetneqq;}&supnE;{1e68&varsupsetneqq;}2&csub;&csup;&csube;&csupe;&subsup;&supsub;&subsub;&supsup;&suphsub;&supdsub;&forkv;&topfork;&mlcp;8&Dashv;1&Vdashl;&Barv;&vBar;&vBarv;1&Vbar;&Not;&bNot;&rnmid;&cirmid;&midcir;&topcir;&nhpar;&parsim;9&parsl;{6hx&nparsl;}y7r{17ks&Ascr;1&Cscr;&Dscr;2&Gscr;2&Jscr;&Kscr;2&Nscr;&Oscr;&Pscr;&Qscr;1&Sscr;&Tscr;&Uscr;&Vscr;&Wscr;&Xscr;&Yscr;&Zscr;&ascr;&bscr;&cscr;&dscr;1&fscr;1&hscr;&iscr;&jscr;&kscr;&lscr;&mscr;&nscr;1&pscr;&qscr;&rscr;&sscr;&tscr;&uscr;&vscr;&wscr;&xscr;&yscr;&zscr;1g&Afr;&Bfr;1&Dfr;&Efr;&Ffr;&Gfr;2&Jfr;&Kfr;&Lfr;&Mfr;&Nfr;&Ofr;&Pfr;&Qfr;1&Sfr;&Tfr;&Ufr;&Vfr;&Wfr;&Xfr;&Yfr;1&afr;&bfr;&cfr;&dfr;&efr;&ffr;&gfr;&hfr;&ifr;&jfr;&kfr;&lfr;&mfr;&nfr;&ofr;&pfr;&qfr;&rfr;&sfr;&tfr;&ufr;&vfr;&wfr;&xfr;&yfr;&zfr;&Aopf;&Bopf;1&Dopf;&Eopf;&Fopf;&Gopf;1&Iopf;&Jopf;&Kopf;&Lopf;&Mopf;1&Oopf;3&Sopf;&Topf;&Uopf;&Vopf;&Wopf;&Xopf;&Yopf;1&aopf;&bopf;&copf;&dopf;&eopf;&fopf;&gopf;&hopf;&iopf;&jopf;&kopf;&lopf;&mopf;&nopf;&oopf;&popf;&qopf;&ropf;&sopf;&topf;&uopf;&vopf;&wopf;&xopf;&yopf;&zopf;}6ve&fflig;&filig;&fllig;&ffilig;&ffllig;");
//#endregion
//#region node_modules/entities/dist/encode.js
/**
* We store the characters to consider as a compact bitset for fast lookups.
*/
const HTML_BITSET = /* #__PURE__ */ new Uint32Array([
	5632,
	4227923966,
	4160749569,
	939524097
]);
const XML_BITSET = /* #__PURE__ */ new Uint32Array([
	0,
	XML_BITSET_VALUE,
	0,
	0
]);
/**
* Encodes all characters in the input using HTML entities. This includes
* characters that are valid ASCII characters in HTML documents, such as `#`.
*
* To get a more compact output, consider using the `encodeNonAsciiHTML`
* function, which will only encode characters that are not valid in HTML
* documents, as well as non-ASCII characters.
*
* If a character has no equivalent entity, a numeric hexadecimal reference
* (eg. `&#xfc;`) will be used.
* @param input Input string to encode or decode.
*/
function encodeHTML(input) {
	return encodeHTMLTrieRe(HTML_BITSET, input);
}
/**
* Encodes all non-ASCII characters, as well as characters not valid in HTML
* documents using HTML entities. This function will not encode characters that
* are valid in HTML documents, such as `#`.
*
* If a character has no equivalent entity, a numeric hexadecimal reference
* (eg. `&#xfc;`) will be used.
* @param input Input string to encode or decode.
*/
function encodeNonAsciiHTML(input) {
	return encodeHTMLTrieRe(XML_BITSET, input);
}
function encodeHTMLTrieRe(bitset, input) {
	let out;
	let last = 0;
	const { length } = input;
	for (let index = 0; index < length; index++) {
		const char = input.charCodeAt(index);
		if (char < 128 && !(bitset[char >>> 5] >>> char & 1)) continue;
		if (out === void 0) out = input.substring(0, index);
		else if (last !== index) out += input.substring(last, index);
		let node = htmlTrie.get(char);
		if (typeof node === "object") {
			if (index + 1 < length) {
				const nextChar = input.charCodeAt(index + 1);
				const value = typeof node.next === "number" ? node.next === nextChar ? node.nextValue : void 0 : node.next.get(nextChar);
				if (value !== void 0) {
					out += value;
					index++;
					last = index + 1;
					continue;
				}
			}
			node = node.value;
		}
		if (node === void 0) {
			const cp = getCodePoint$1(input, index);
			out += `&#x${cp.toString(16)};`;
			if (cp !== char) index++;
			last = index + 1;
		} else {
			out += node;
			last = index + 1;
		}
	}
	if (out === void 0) return input;
	if (last < length) out += input.substr(last);
	return out;
}
//#endregion
//#region node_modules/entities/dist/index.js
/** The level of entities to support. */
var EntityLevel;
(function(EntityLevel) {
	/** Support only XML entities. */
	EntityLevel[EntityLevel["XML"] = 0] = "XML";
	/** Support HTML entities, which are a superset of XML entities. */
	EntityLevel[EntityLevel["HTML"] = 1] = "HTML";
})(EntityLevel || (EntityLevel = {}));
/**
* Encoding strategy used by `encode`.
*/
var EncodingMode;
(function(EncodingMode) {
	/**
	* The output is UTF-8 encoded. Only characters that need escaping within
	* XML will be escaped.
	*/
	EncodingMode[EncodingMode["UTF8"] = 0] = "UTF8";
	/**
	* The output consists only of ASCII characters. Characters that need
	* escaping within HTML, and characters that aren't ASCII characters will
	* be escaped.
	*/
	EncodingMode[EncodingMode["ASCII"] = 1] = "ASCII";
	/**
	* Encode all characters that have an equivalent entity, as well as all
	* characters that are not ASCII characters.
	*/
	EncodingMode[EncodingMode["Extensive"] = 2] = "Extensive";
	/**
	* Encode all characters that have to be escaped in HTML attributes,
	* following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
	*/
	EncodingMode[EncodingMode["Attribute"] = 3] = "Attribute";
	/**
	* Encode all characters that have to be escaped in HTML text,
	* following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
	*/
	EncodingMode[EncodingMode["Text"] = 4] = "Text";
})(EncodingMode || (EncodingMode = {}));
/**
* Encodes a string with entities.
* @param input String to encode.
* @param options Encoding options.
*/
function encode(input, options = EntityLevel.XML) {
	const { mode = EncodingMode.Extensive, level = EntityLevel.XML } = typeof options === "number" ? { level: options } : options;
	switch (mode) {
		case EncodingMode.UTF8: return escapeUTF8$1(input);
		case EncodingMode.Attribute: return escapeAttribute$1(input);
		case EncodingMode.Text: return escapeText$1(input);
		case EncodingMode.ASCII: return level === EntityLevel.HTML ? encodeNonAsciiHTML(input) : encodeXML$1(input);
		case EncodingMode.Extensive:
		default: return level === EntityLevel.HTML ? encodeHTML(input) : encodeXML$1(input);
	}
}
//#endregion
//#region src/nodes/node.ts
/**
* Node Class as base class for TextNode and HTMLElement.
*/
var Node = class {
	constructor(parentNode = null, range) {
		this.parentNode = parentNode;
		this.childNodes = [];
		Object.defineProperty(this, "range", {
			enumerable: false,
			writable: true,
			configurable: true,
			value: range !== null && range !== void 0 ? range : [-1, -1]
		});
	}
	/**
	* Remove current node
	*/
	remove() {
		if (this.parentNode) {
			const children = this.parentNode.childNodes;
			this.parentNode.childNodes = children.filter((child) => {
				return this !== child;
			});
			this.parentNode = null;
		}
		return this;
	}
	get innerText() {
		return this.rawText;
	}
	get textContent() {
		return decodeHTML(this.rawText);
	}
	set textContent(val) {
		this.rawText = encode(val);
	}
};
//#endregion
//#region src/nodes/type.ts
var NodeType = /* @__PURE__ */ function(NodeType) {
	NodeType[NodeType["ELEMENT_NODE"] = 1] = "ELEMENT_NODE";
	NodeType[NodeType["TEXT_NODE"] = 3] = "TEXT_NODE";
	NodeType[NodeType["COMMENT_NODE"] = 8] = "COMMENT_NODE";
	return NodeType;
}(NodeType || {});
//#endregion
//#region src/nodes/comment.ts
var CommentNode = class CommentNode extends Node {
	clone() {
		return new CommentNode(this.rawText, null, void 0, this.rawTagName);
	}
	constructor(rawText, parentNode = null, range, rawTagName = "!--") {
		super(parentNode, range);
		this.rawText = rawText;
		this.rawTagName = rawTagName;
		this.nodeType = 8;
	}
	/**
	* Get unescaped text value of current node and its children.
	* @return {string} text content
	*/
	get text() {
		return this.rawText;
	}
	toString() {
		return `<!--${this.rawText}-->`;
	}
};
//#endregion
//#region node_modules/domelementtype/lib/esm/index.js
/** Types of elements found in htmlparser2's DOM */
var ElementType;
(function(ElementType) {
	/** Type for the root element of a document */
	ElementType["Root"] = "root";
	/** Type for Text */
	ElementType["Text"] = "text";
	/** Type for <? ... ?> */
	ElementType["Directive"] = "directive";
	/** Type for <!-- ... --> */
	ElementType["Comment"] = "comment";
	/** Type for <script> tags */
	ElementType["Script"] = "script";
	/** Type for <style> tags */
	ElementType["Style"] = "style";
	/** Type for Any tag */
	ElementType["Tag"] = "tag";
	/** Type for <![CDATA[ ... ]]> */
	ElementType["CDATA"] = "cdata";
	/** Type for <!doctype ...> */
	ElementType["Doctype"] = "doctype";
})(ElementType || (ElementType = {}));
/**
* Tests whether an element is a tag or not.
*
* @param elem Element to test
*/
function isTag$2(elem) {
	return elem.type === ElementType.Tag || elem.type === ElementType.Script || elem.type === ElementType.Style;
}
/** Type for the root element of a document */
const Root = ElementType.Root;
/** Type for Text */
const Text = ElementType.Text;
/** Type for <? ... ?> */
const Directive = ElementType.Directive;
/** Type for <!-- ... --> */
const Comment = ElementType.Comment;
/** Type for <script> tags */
const Script = ElementType.Script;
/** Type for <style> tags */
const Style = ElementType.Style;
/** Type for Any tag */
const Tag = ElementType.Tag;
/** Type for <![CDATA[ ... ]]> */
const CDATA = ElementType.CDATA;
/** Type for <!doctype ...> */
const Doctype = ElementType.Doctype;
//#endregion
//#region \0@oxc-project+runtime@0.138.0/helpers/esm/typeof.js
function _typeof(o) {
	"@babel/helpers - typeof";
	return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
		return typeof o;
	} : function(o) {
		return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
	}, _typeof(o);
}
//#endregion
//#region \0@oxc-project+runtime@0.138.0/helpers/esm/toPrimitive.js
function toPrimitive(t, r) {
	if ("object" != _typeof(t) || !t) return t;
	var e = t[Symbol.toPrimitive];
	if (void 0 !== e) {
		var i = e.call(t, r || "default");
		if ("object" != _typeof(i)) return i;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return ("string" === r ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.138.0/helpers/esm/toPropertyKey.js
function toPropertyKey(t) {
	var i = toPrimitive(t, "string");
	return "symbol" == _typeof(i) ? i : i + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.138.0/helpers/esm/defineProperty.js
function _defineProperty(e, r, t) {
	return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
		value: t,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[r] = t, e;
}
//#endregion
//#region \0@oxc-project+runtime@0.138.0/helpers/esm/objectSpread2.js
function ownKeys(e, r) {
	var t = Object.keys(e);
	if (Object.getOwnPropertySymbols) {
		var o = Object.getOwnPropertySymbols(e);
		r && (o = o.filter(function(r) {
			return Object.getOwnPropertyDescriptor(e, r).enumerable;
		})), t.push.apply(t, o);
	}
	return t;
}
function _objectSpread2(e) {
	for (var r = 1; r < arguments.length; r++) {
		var t = null != arguments[r] ? arguments[r] : {};
		r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
			_defineProperty(e, r, t[r]);
		}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
			Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
		});
	}
	return e;
}
//#endregion
//#region node_modules/domhandler/lib/esm/node.js
/**
* @param node Node to check.
* @returns `true` if the node is a `Element`, `false` otherwise.
*/
function isTag$1(node) {
	return isTag$2(node);
}
/**
* @param node Node to check.
* @returns `true` if the node has the type `CDATA`, `false` otherwise.
*/
function isCDATA(node) {
	return node.type === ElementType.CDATA;
}
/**
* @param node Node to check.
* @returns `true` if the node has the type `Text`, `false` otherwise.
*/
function isText(node) {
	return node.type === ElementType.Text;
}
/**
* @param node Node to check.
* @returns `true` if the node has the type `Comment`, `false` otherwise.
*/
function isComment(node) {
	return node.type === ElementType.Comment;
}
/**
* @param node Node to check.
* @returns `true` if the node has the type `ProcessingInstruction`, `false` otherwise.
*/
function isDocument(node) {
	return node.type === ElementType.Root;
}
/**
* @param node Node to check.
* @returns `true` if the node has children, `false` otherwise.
*/
function hasChildren(node) {
	return Object.prototype.hasOwnProperty.call(node, "children");
}
//#endregion
//#region node_modules/dom-serializer/node_modules/entities/lib/esm/escape.js
const xmlReplacer = /["&'<>$\x80-\uFFFF]/g;
const xmlCodeMap = /* @__PURE__ */ new Map([
	[34, "&quot;"],
	[38, "&amp;"],
	[39, "&apos;"],
	[60, "&lt;"],
	[62, "&gt;"]
]);
const getCodePoint = String.prototype.codePointAt != null ? (str, index) => str.codePointAt(index) : (c, index) => (c.charCodeAt(index) & 64512) === 55296 ? (c.charCodeAt(index) - 55296) * 1024 + c.charCodeAt(index + 1) - 56320 + 65536 : c.charCodeAt(index);
/**
* Encodes all non-ASCII characters, as well as characters not valid in XML
* documents using XML entities.
*
* If a character has no equivalent entity, a
* numeric hexadecimal reference (eg. `&#xfc;`) will be used.
*/
function encodeXML(str) {
	let ret = "";
	let lastIdx = 0;
	let match;
	while ((match = xmlReplacer.exec(str)) !== null) {
		const i = match.index;
		const char = str.charCodeAt(i);
		const next = xmlCodeMap.get(char);
		if (next !== void 0) {
			ret += str.substring(lastIdx, i) + next;
			lastIdx = i + 1;
		} else {
			ret += `${str.substring(lastIdx, i)}&#x${getCodePoint(str, i).toString(16)};`;
			lastIdx = xmlReplacer.lastIndex += Number((char & 64512) === 55296);
		}
	}
	return ret + str.substr(lastIdx);
}
/**
* Creates a function that escapes all characters matched by the given regular
* expression using the given map of characters to escape to their entities.
*
* @param regex Regular expression to match characters to escape.
* @param map Map of characters to escape to their entities.
*
* @returns Function that escapes all characters matched by the given regular
* expression using the given map of characters to escape to their entities.
*/
function getEscaper(regex, map) {
	return function escape(data) {
		let match;
		let lastIdx = 0;
		let result = "";
		while (match = regex.exec(data)) {
			if (lastIdx !== match.index) result += data.substring(lastIdx, match.index);
			result += map.get(match[0].charCodeAt(0));
			lastIdx = match.index + 1;
		}
		return result + data.substring(lastIdx);
	};
}
/**
* Encodes all characters that have to be escaped in HTML attributes,
* following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
*
* @param data String to escape.
*/
const escapeAttribute = getEscaper(/["&\u00A0]/g, /* @__PURE__ */ new Map([
	[34, "&quot;"],
	[38, "&amp;"],
	[160, "&nbsp;"]
]));
/**
* Encodes all characters that have to be escaped in HTML text,
* following {@link https://html.spec.whatwg.org/multipage/parsing.html#escapingString}.
*
* @param data String to escape.
*/
const escapeText = getEscaper(/[&<>\u00A0]/g, /* @__PURE__ */ new Map([
	[38, "&amp;"],
	[60, "&lt;"],
	[62, "&gt;"],
	[160, "&nbsp;"]
]));
//#endregion
//#region node_modules/dom-serializer/lib/esm/foreignNames.js
const elementNames = new Map([
	"altGlyph",
	"altGlyphDef",
	"altGlyphItem",
	"animateColor",
	"animateMotion",
	"animateTransform",
	"clipPath",
	"feBlend",
	"feColorMatrix",
	"feComponentTransfer",
	"feComposite",
	"feConvolveMatrix",
	"feDiffuseLighting",
	"feDisplacementMap",
	"feDistantLight",
	"feDropShadow",
	"feFlood",
	"feFuncA",
	"feFuncB",
	"feFuncG",
	"feFuncR",
	"feGaussianBlur",
	"feImage",
	"feMerge",
	"feMergeNode",
	"feMorphology",
	"feOffset",
	"fePointLight",
	"feSpecularLighting",
	"feSpotLight",
	"feTile",
	"feTurbulence",
	"foreignObject",
	"glyphRef",
	"linearGradient",
	"radialGradient",
	"textPath"
].map((val) => [val.toLowerCase(), val]));
const attributeNames = new Map([
	"definitionURL",
	"attributeName",
	"attributeType",
	"baseFrequency",
	"baseProfile",
	"calcMode",
	"clipPathUnits",
	"diffuseConstant",
	"edgeMode",
	"filterUnits",
	"glyphRef",
	"gradientTransform",
	"gradientUnits",
	"kernelMatrix",
	"kernelUnitLength",
	"keyPoints",
	"keySplines",
	"keyTimes",
	"lengthAdjust",
	"limitingConeAngle",
	"markerHeight",
	"markerUnits",
	"markerWidth",
	"maskContentUnits",
	"maskUnits",
	"numOctaves",
	"pathLength",
	"patternContentUnits",
	"patternTransform",
	"patternUnits",
	"pointsAtX",
	"pointsAtY",
	"pointsAtZ",
	"preserveAlpha",
	"preserveAspectRatio",
	"primitiveUnits",
	"refX",
	"refY",
	"repeatCount",
	"repeatDur",
	"requiredExtensions",
	"requiredFeatures",
	"specularConstant",
	"specularExponent",
	"spreadMethod",
	"startOffset",
	"stdDeviation",
	"stitchTiles",
	"surfaceScale",
	"systemLanguage",
	"tableValues",
	"targetX",
	"targetY",
	"textLength",
	"viewBox",
	"viewTarget",
	"xChannelSelector",
	"yChannelSelector",
	"zoomAndPan"
].map((val) => [val.toLowerCase(), val]));
//#endregion
//#region node_modules/dom-serializer/lib/esm/index.js
/**
* Mixed-case SVG and MathML tags & attributes
* recognized by the HTML parser.
*
* @see https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign
*/
const unencodedElements = /* @__PURE__ */ new Set([
	"style",
	"script",
	"xmp",
	"iframe",
	"noembed",
	"noframes",
	"plaintext",
	"noscript"
]);
function replaceQuotes(value) {
	return value.replace(/"/g, "&quot;");
}
/**
* Format attributes
*/
function formatAttributes(attributes, opts) {
	var _a;
	if (!attributes) return;
	const encode = ((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) === false ? replaceQuotes : opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML : escapeAttribute;
	return Object.keys(attributes).map((key) => {
		var _a, _b;
		const value = (_a = attributes[key]) !== null && _a !== void 0 ? _a : "";
		if (opts.xmlMode === "foreign") key = (_b = attributeNames.get(key)) !== null && _b !== void 0 ? _b : key;
		if (!opts.emptyAttrs && !opts.xmlMode && value === "") return key;
		return `${key}="${encode(value)}"`;
	}).join(" ");
}
/**
* Self-enclosing tags
*/
const singleTag = /* @__PURE__ */ new Set([
	"area",
	"base",
	"basefont",
	"br",
	"col",
	"command",
	"embed",
	"frame",
	"hr",
	"img",
	"input",
	"isindex",
	"keygen",
	"link",
	"meta",
	"param",
	"source",
	"track",
	"wbr"
]);
/**
* Renders a DOM node or an array of DOM nodes to a string.
*
* Can be thought of as the equivalent of the `outerHTML` of the passed node(s).
*
* @param node Node to be rendered.
* @param options Changes serialization behavior
*/
function render(node, options = {}) {
	const nodes = "length" in node ? node : [node];
	let output = "";
	for (let i = 0; i < nodes.length; i++) output += renderNode(nodes[i], options);
	return output;
}
function renderNode(node, options) {
	switch (node.type) {
		case Root: return render(node.children, options);
		case Doctype:
		case Directive: return renderDirective(node);
		case Comment: return renderComment(node);
		case CDATA: return renderCdata(node);
		case Script:
		case Style:
		case Tag: return renderTag(node, options);
		case Text: return renderText(node, options);
	}
}
const foreignModeIntegrationPoints = /* @__PURE__ */ new Set([
	"mi",
	"mo",
	"mn",
	"ms",
	"mtext",
	"annotation-xml",
	"foreignObject",
	"desc",
	"title"
]);
const foreignElements = /* @__PURE__ */ new Set(["svg", "math"]);
function renderTag(elem, opts) {
	var _a;
	if (opts.xmlMode === "foreign") {
		elem.name = (_a = elementNames.get(elem.name)) !== null && _a !== void 0 ? _a : elem.name;
		if (elem.parent && foreignModeIntegrationPoints.has(elem.parent.name)) opts = _objectSpread2(_objectSpread2({}, opts), {}, { xmlMode: false });
	}
	if (!opts.xmlMode && foreignElements.has(elem.name)) opts = _objectSpread2(_objectSpread2({}, opts), {}, { xmlMode: "foreign" });
	let tag = `<${elem.name}`;
	const attribs = formatAttributes(elem.attribs, opts);
	if (attribs) tag += ` ${attribs}`;
	if (elem.children.length === 0 && (opts.xmlMode ? opts.selfClosingTags !== false : opts.selfClosingTags && singleTag.has(elem.name))) {
		if (!opts.xmlMode) tag += " ";
		tag += "/>";
	} else {
		tag += ">";
		if (elem.children.length > 0) tag += render(elem.children, opts);
		if (opts.xmlMode || !singleTag.has(elem.name)) tag += `</${elem.name}>`;
	}
	return tag;
}
function renderDirective(elem) {
	return `<${elem.data}>`;
}
function renderText(elem, opts) {
	var _a;
	let data = elem.data || "";
	if (((_a = opts.encodeEntities) !== null && _a !== void 0 ? _a : opts.decodeEntities) !== false && !(!opts.xmlMode && elem.parent && unencodedElements.has(elem.parent.name))) data = opts.xmlMode || opts.encodeEntities !== "utf8" ? encodeXML(data) : escapeText(data);
	return data;
}
function renderCdata(elem) {
	return `<![CDATA[${elem.children[0].data}]]>`;
}
function renderComment(elem) {
	return `<!--${elem.data}-->`;
}
//#endregion
//#region node_modules/domutils/lib/esm/stringify.js
/**
* @category Stringify
* @deprecated Use the `dom-serializer` module directly.
* @param node Node to get the outer HTML of.
* @param options Options for serialization.
* @returns `node`'s outer HTML.
*/
function getOuterHTML(node, options) {
	return render(node, options);
}
/**
* @category Stringify
* @deprecated Use the `dom-serializer` module directly.
* @param node Node to get the inner HTML of.
* @param options Options for serialization.
* @returns `node`'s inner HTML.
*/
function getInnerHTML(node, options) {
	return hasChildren(node) ? node.children.map((node) => getOuterHTML(node, options)).join("") : "";
}
/**
* Get a node's inner text. Same as `textContent`, but inserts newlines for `<br>` tags. Ignores comments.
*
* @category Stringify
* @deprecated Use `textContent` instead.
* @param node Node to get the inner text of.
* @returns `node`'s inner text.
*/
function getText$1(node) {
	if (Array.isArray(node)) return node.map(getText$1).join("");
	if (isTag$1(node)) return node.name === "br" ? "\n" : getText$1(node.children);
	if (isCDATA(node)) return getText$1(node.children);
	if (isText(node)) return node.data;
	return "";
}
/**
* Get a node's text content. Ignores comments.
*
* @category Stringify
* @param node Node to get the text content of.
* @returns `node`'s text content.
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent}
*/
function textContent(node) {
	if (Array.isArray(node)) return node.map(textContent).join("");
	if (hasChildren(node) && !isComment(node)) return textContent(node.children);
	if (isText(node)) return node.data;
	return "";
}
/**
* Get a node's inner text, ignoring `<script>` and `<style>` tags. Ignores comments.
*
* @category Stringify
* @param node Node to get the inner text of.
* @returns `node`'s inner text.
* @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Node/innerText}
*/
function innerText(node) {
	if (Array.isArray(node)) return node.map(innerText).join("");
	if (hasChildren(node) && (node.type === ElementType.Tag || isCDATA(node))) return innerText(node.children);
	if (isText(node)) return node.data;
	return "";
}
//#endregion
//#region node_modules/domutils/lib/esm/traversal.js
/**
* Get a node's children.
*
* @category Traversal
* @param elem Node to get the children of.
* @returns `elem`'s children, or an empty array.
*/
function getChildren$1(elem) {
	return hasChildren(elem) ? elem.children : [];
}
/**
* Get a node's parent.
*
* @category Traversal
* @param elem Node to get the parent of.
* @returns `elem`'s parent node, or `null` if `elem` is a root node.
*/
function getParent$1(elem) {
	return elem.parent || null;
}
/**
* Gets an elements siblings, including the element itself.
*
* Attempts to get the children through the element's parent first. If we don't
* have a parent (the element is a root node), we walk the element's `prev` &
* `next` to get all remaining nodes.
*
* @category Traversal
* @param elem Element to get the siblings of.
* @returns `elem`'s siblings, including `elem`.
*/
function getSiblings$1(elem) {
	const parent = getParent$1(elem);
	if (parent != null) return getChildren$1(parent);
	const siblings = [elem];
	let { prev, next } = elem;
	while (prev != null) {
		siblings.unshift(prev);
		({prev} = prev);
	}
	while (next != null) {
		siblings.push(next);
		({next} = next);
	}
	return siblings;
}
/**
* Gets an attribute from an element.
*
* @category Traversal
* @param elem Element to check.
* @param name Attribute name to retrieve.
* @returns The element's attribute value, or `undefined`.
*/
function getAttributeValue$1(elem, name) {
	var _a;
	return (_a = elem.attribs) === null || _a === void 0 ? void 0 : _a[name];
}
/**
* Checks whether an element has an attribute.
*
* @category Traversal
* @param elem Element to check.
* @param name Attribute name to look for.
* @returns Returns whether `elem` has the attribute `name`.
*/
function hasAttrib$1(elem, name) {
	return elem.attribs != null && Object.prototype.hasOwnProperty.call(elem.attribs, name) && elem.attribs[name] != null;
}
/**
* Get the tag name of an element.
*
* @category Traversal
* @param elem The element to get the name for.
* @returns The tag name of `elem`.
*/
function getName$1(elem) {
	return elem.name;
}
/**
* Returns the next element sibling of a node.
*
* @category Traversal
* @param elem The element to get the next sibling of.
* @returns `elem`'s next sibling that is a tag, or `null` if there is no next
* sibling.
*/
function nextElementSibling(elem) {
	let { next } = elem;
	while (next !== null && !isTag$1(next)) ({next} = next);
	return next;
}
/**
* Returns the previous element sibling of a node.
*
* @category Traversal
* @param elem The element to get the previous sibling of.
* @returns `elem`'s previous sibling that is a tag, or `null` if there is no
* previous sibling.
*/
function prevElementSibling(elem) {
	let { prev } = elem;
	while (prev !== null && !isTag$1(prev)) ({prev} = prev);
	return prev;
}
//#endregion
//#region node_modules/domutils/lib/esm/manipulation.js
/**
* Remove an element from the dom
*
* @category Manipulation
* @param elem The element to be removed
*/
function removeElement(elem) {
	if (elem.prev) elem.prev.next = elem.next;
	if (elem.next) elem.next.prev = elem.prev;
	if (elem.parent) {
		const childs = elem.parent.children;
		const childsIndex = childs.lastIndexOf(elem);
		if (childsIndex >= 0) childs.splice(childsIndex, 1);
	}
	elem.next = null;
	elem.prev = null;
	elem.parent = null;
}
/**
* Replace an element in the dom
*
* @category Manipulation
* @param elem The element to be replaced
* @param replacement The element to be added
*/
function replaceElement(elem, replacement) {
	const prev = replacement.prev = elem.prev;
	if (prev) prev.next = replacement;
	const next = replacement.next = elem.next;
	if (next) next.prev = replacement;
	const parent = replacement.parent = elem.parent;
	if (parent) {
		const childs = parent.children;
		childs[childs.lastIndexOf(elem)] = replacement;
		elem.parent = null;
	}
}
/**
* Append a child to an element.
*
* @category Manipulation
* @param parent The element to append to.
* @param child The element to be added as a child.
*/
function appendChild(parent, child) {
	removeElement(child);
	child.next = null;
	child.parent = parent;
	if (parent.children.push(child) > 1) {
		const sibling = parent.children[parent.children.length - 2];
		sibling.next = child;
		child.prev = sibling;
	} else child.prev = null;
}
/**
* Append an element after another.
*
* @category Manipulation
* @param elem The element to append after.
* @param next The element be added.
*/
function append(elem, next) {
	removeElement(next);
	const { parent } = elem;
	const currNext = elem.next;
	next.next = currNext;
	next.prev = elem;
	elem.next = next;
	next.parent = parent;
	if (currNext) {
		currNext.prev = next;
		if (parent) {
			const childs = parent.children;
			childs.splice(childs.lastIndexOf(currNext), 0, next);
		}
	} else if (parent) parent.children.push(next);
}
/**
* Prepend a child to an element.
*
* @category Manipulation
* @param parent The element to prepend before.
* @param child The element to be added as a child.
*/
function prependChild(parent, child) {
	removeElement(child);
	child.parent = parent;
	child.prev = null;
	if (parent.children.unshift(child) !== 1) {
		const sibling = parent.children[1];
		sibling.prev = child;
		child.next = sibling;
	} else child.next = null;
}
/**
* Prepend an element before another.
*
* @category Manipulation
* @param elem The element to prepend before.
* @param prev The element be added.
*/
function prepend(elem, prev) {
	removeElement(prev);
	const { parent } = elem;
	if (parent) {
		const childs = parent.children;
		childs.splice(childs.indexOf(elem), 0, prev);
	}
	if (elem.prev) elem.prev.next = prev;
	prev.parent = parent;
	prev.prev = elem.prev;
	prev.next = elem;
	elem.prev = prev;
}
//#endregion
//#region node_modules/domutils/lib/esm/querying.js
/**
* Search a node and its children for nodes passing a test function. If `node` is not an array, it will be wrapped in one.
*
* @category Querying
* @param test Function to test nodes on.
* @param node Node to search. Will be included in the result set if it matches.
* @param recurse Also consider child nodes.
* @param limit Maximum number of nodes to return.
* @returns All nodes passing `test`.
*/
function filter(test, node, recurse = true, limit = Infinity) {
	return find(test, Array.isArray(node) ? node : [node], recurse, limit);
}
/**
* Search an array of nodes and their children for nodes passing a test function.
*
* @category Querying
* @param test Function to test nodes on.
* @param nodes Array of nodes to search.
* @param recurse Also consider child nodes.
* @param limit Maximum number of nodes to return.
* @returns All nodes passing `test`.
*/
function find(test, nodes, recurse, limit) {
	const result = [];
	/** Stack of the arrays we are looking at. */
	const nodeStack = [nodes];
	/** Stack of the indices within the arrays. */
	const indexStack = [0];
	for (;;) {
		if (indexStack[0] >= nodeStack[0].length) {
			if (indexStack.length === 1) return result;
			nodeStack.shift();
			indexStack.shift();
			continue;
		}
		const elem = nodeStack[0][indexStack[0]++];
		if (test(elem)) {
			result.push(elem);
			if (--limit <= 0) return result;
		}
		if (recurse && hasChildren(elem) && elem.children.length > 0) {
			indexStack.unshift(0);
			nodeStack.unshift(elem.children);
		}
	}
}
/**
* Finds the first element inside of an array that matches a test function. This is an alias for `Array.prototype.find`.
*
* @category Querying
* @param test Function to test nodes on.
* @param nodes Array of nodes to search.
* @returns The first node in the array that passes `test`.
* @deprecated Use `Array.prototype.find` directly.
*/
function findOneChild(test, nodes) {
	return nodes.find(test);
}
/**
* Finds one element in a tree that passes a test.
*
* @category Querying
* @param test Function to test nodes on.
* @param nodes Node or array of nodes to search.
* @param recurse Also consider child nodes.
* @returns The first node that passes `test`.
*/
function findOne$1(test, nodes, recurse = true) {
	let elem = null;
	for (let i = 0; i < nodes.length && !elem; i++) {
		const node = nodes[i];
		if (!isTag$1(node)) continue;
		else if (test(node)) elem = node;
		else if (recurse && node.children.length > 0) elem = findOne$1(test, node.children, true);
	}
	return elem;
}
/**
* Checks if a tree of nodes contains at least one node passing a test.
*
* @category Querying
* @param test Function to test nodes on.
* @param nodes Array of nodes to search.
* @returns Whether a tree of nodes contains at least one node passing the test.
*/
function existsOne$1(test, nodes) {
	return nodes.some((checked) => isTag$1(checked) && (test(checked) || existsOne$1(test, checked.children)));
}
/**
* Search an array of nodes and their children for elements passing a test function.
*
* Same as `find`, but limited to elements and with less options, leading to reduced complexity.
*
* @category Querying
* @param test Function to test nodes on.
* @param nodes Array of nodes to search.
* @returns All nodes passing `test`.
*/
function findAll$1(test, nodes) {
	const result = [];
	const nodeStack = [nodes];
	const indexStack = [0];
	for (;;) {
		if (indexStack[0] >= nodeStack[0].length) {
			if (nodeStack.length === 1) return result;
			nodeStack.shift();
			indexStack.shift();
			continue;
		}
		const elem = nodeStack[0][indexStack[0]++];
		if (!isTag$1(elem)) continue;
		if (test(elem)) result.push(elem);
		if (elem.children.length > 0) {
			indexStack.unshift(0);
			nodeStack.unshift(elem.children);
		}
	}
}
//#endregion
//#region node_modules/domutils/lib/esm/legacy.js
/**
* A map of functions to check nodes against.
*/
const Checks = {
	tag_name(name) {
		if (typeof name === "function") return (elem) => isTag$1(elem) && name(elem.name);
		else if (name === "*") return isTag$1;
		return (elem) => isTag$1(elem) && elem.name === name;
	},
	tag_type(type) {
		if (typeof type === "function") return (elem) => type(elem.type);
		return (elem) => elem.type === type;
	},
	tag_contains(data) {
		if (typeof data === "function") return (elem) => isText(elem) && data(elem.data);
		return (elem) => isText(elem) && elem.data === data;
	}
};
/**
* Returns a function to check whether a node has an attribute with a particular
* value.
*
* @param attrib Attribute to check.
* @param value Attribute value to look for.
* @returns A function to check whether the a node has an attribute with a
*   particular value.
*/
function getAttribCheck(attrib, value) {
	if (typeof value === "function") return (elem) => isTag$1(elem) && value(elem.attribs[attrib]);
	return (elem) => isTag$1(elem) && elem.attribs[attrib] === value;
}
/**
* Returns a function that returns `true` if either of the input functions
* returns `true` for a node.
*
* @param a First function to combine.
* @param b Second function to combine.
* @returns A function taking a node and returning `true` if either of the input
*   functions returns `true` for the node.
*/
function combineFuncs(a, b) {
	return (elem) => a(elem) || b(elem);
}
/**
* Returns a function that executes all checks in `options` and returns `true`
* if any of them match a node.
*
* @param options An object describing nodes to look for.
* @returns A function that executes all checks in `options` and returns `true`
*   if any of them match a node.
*/
function compileTest(options) {
	const funcs = Object.keys(options).map((key) => {
		const value = options[key];
		return Object.prototype.hasOwnProperty.call(Checks, key) ? Checks[key](value) : getAttribCheck(key, value);
	});
	return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}
/**
* Checks whether a node matches the description in `options`.
*
* @category Legacy Query Functions
* @param options An object describing nodes to look for.
* @param node The element to test.
* @returns Whether the element matches the description in `options`.
*/
function testElement(options, node) {
	const test = compileTest(options);
	return test ? test(node) : true;
}
/**
* Returns all nodes that match `options`.
*
* @category Legacy Query Functions
* @param options An object describing nodes to look for.
* @param nodes Nodes to search through.
* @param recurse Also consider child nodes.
* @param limit Maximum number of nodes to return.
* @returns All nodes that match `options`.
*/
function getElements(options, nodes, recurse, limit = Infinity) {
	const test = compileTest(options);
	return test ? filter(test, nodes, recurse, limit) : [];
}
/**
* Returns the node with the supplied ID.
*
* @category Legacy Query Functions
* @param id The unique ID attribute value to look for.
* @param nodes Nodes to search through.
* @param recurse Also consider child nodes.
* @returns The node with the supplied ID.
*/
function getElementById(id, nodes, recurse = true) {
	if (!Array.isArray(nodes)) nodes = [nodes];
	return findOne$1(getAttribCheck("id", id), nodes, recurse);
}
/**
* Returns all nodes with the supplied `tagName`.
*
* @category Legacy Query Functions
* @param tagName Tag name to search for.
* @param nodes Nodes to search through.
* @param recurse Also consider child nodes.
* @param limit Maximum number of nodes to return.
* @returns All nodes with the supplied `tagName`.
*/
function getElementsByTagName(tagName, nodes, recurse = true, limit = Infinity) {
	return filter(Checks["tag_name"](tagName), nodes, recurse, limit);
}
/**
* Returns all nodes with the supplied `type`.
*
* @category Legacy Query Functions
* @param type Element type to look for.
* @param nodes Nodes to search through.
* @param recurse Also consider child nodes.
* @param limit Maximum number of nodes to return.
* @returns All nodes with the supplied `type`.
*/
function getElementsByTagType(type, nodes, recurse = true, limit = Infinity) {
	return filter(Checks["tag_type"](type), nodes, recurse, limit);
}
//#endregion
//#region node_modules/domutils/lib/esm/helpers.js
/**
* Given an array of nodes, remove any member that is contained by another
* member.
*
* @category Helpers
* @param nodes Nodes to filter.
* @returns Remaining nodes that aren't contained by other nodes.
*/
function removeSubsets$1(nodes) {
	let idx = nodes.length;
	while (--idx >= 0) {
		const node = nodes[idx];
		if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
			nodes.splice(idx, 1);
			continue;
		}
		for (let ancestor = node.parent; ancestor; ancestor = ancestor.parent) if (nodes.includes(ancestor)) {
			nodes.splice(idx, 1);
			break;
		}
	}
	return nodes;
}
/**
* @category Helpers
* @see {@link http://dom.spec.whatwg.org/#dom-node-comparedocumentposition}
*/
var DocumentPosition;
(function(DocumentPosition) {
	DocumentPosition[DocumentPosition["DISCONNECTED"] = 1] = "DISCONNECTED";
	DocumentPosition[DocumentPosition["PRECEDING"] = 2] = "PRECEDING";
	DocumentPosition[DocumentPosition["FOLLOWING"] = 4] = "FOLLOWING";
	DocumentPosition[DocumentPosition["CONTAINS"] = 8] = "CONTAINS";
	DocumentPosition[DocumentPosition["CONTAINED_BY"] = 16] = "CONTAINED_BY";
})(DocumentPosition || (DocumentPosition = {}));
/**
* Compare the position of one node against another node in any other document,
* returning a bitmask with the values from {@link DocumentPosition}.
*
* Document order:
* > There is an ordering, document order, defined on all the nodes in the
* > document corresponding to the order in which the first character of the
* > XML representation of each node occurs in the XML representation of the
* > document after expansion of general entities. Thus, the document element
* > node will be the first node. Element nodes occur before their children.
* > Thus, document order orders element nodes in order of the occurrence of
* > their start-tag in the XML (after expansion of entities). The attribute
* > nodes of an element occur after the element and before its children. The
* > relative order of attribute nodes is implementation-dependent.
*
* Source:
* http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
*
* @category Helpers
* @param nodeA The first node to use in the comparison
* @param nodeB The second node to use in the comparison
* @returns A bitmask describing the input nodes' relative position.
*
* See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
* a description of these values.
*/
function compareDocumentPosition(nodeA, nodeB) {
	const aParents = [];
	const bParents = [];
	if (nodeA === nodeB) return 0;
	let current = hasChildren(nodeA) ? nodeA : nodeA.parent;
	while (current) {
		aParents.unshift(current);
		current = current.parent;
	}
	current = hasChildren(nodeB) ? nodeB : nodeB.parent;
	while (current) {
		bParents.unshift(current);
		current = current.parent;
	}
	const maxIdx = Math.min(aParents.length, bParents.length);
	let idx = 0;
	while (idx < maxIdx && aParents[idx] === bParents[idx]) idx++;
	if (idx === 0) return DocumentPosition.DISCONNECTED;
	const sharedParent = aParents[idx - 1];
	const siblings = sharedParent.children;
	const aSibling = aParents[idx];
	const bSibling = bParents[idx];
	if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
		if (sharedParent === nodeB) return DocumentPosition.FOLLOWING | DocumentPosition.CONTAINED_BY;
		return DocumentPosition.FOLLOWING;
	}
	if (sharedParent === nodeA) return DocumentPosition.PRECEDING | DocumentPosition.CONTAINS;
	return DocumentPosition.PRECEDING;
}
/**
* Sort an array of nodes based on their relative position in the document,
* removing any duplicate nodes. If the array contains nodes that do not belong
* to the same document, sort order is unspecified.
*
* @category Helpers
* @param nodes Array of DOM nodes.
* @returns Collection of unique nodes, sorted in document order.
*/
function uniqueSort(nodes) {
	nodes = nodes.filter((node, i, arr) => !arr.includes(node, i + 1));
	nodes.sort((a, b) => {
		const relative = compareDocumentPosition(a, b);
		if (relative & DocumentPosition.PRECEDING) return -1;
		else if (relative & DocumentPosition.FOLLOWING) return 1;
		return 0;
	});
	return nodes;
}
//#endregion
//#region node_modules/domutils/lib/esm/feeds.js
/**
* Get the feed object from the root of a DOM tree.
*
* @category Feeds
* @param doc - The DOM to to extract the feed from.
* @returns The feed.
*/
function getFeed(doc) {
	const feedRoot = getOneElement(isValidFeed, doc);
	return !feedRoot ? null : feedRoot.name === "feed" ? getAtomFeed(feedRoot) : getRssFeed(feedRoot);
}
/**
* Parse an Atom feed.
*
* @param feedRoot The root of the feed.
* @returns The parsed feed.
*/
function getAtomFeed(feedRoot) {
	var _a;
	const childs = feedRoot.children;
	const feed = {
		type: "atom",
		items: getElementsByTagName("entry", childs).map((item) => {
			var _a;
			const { children } = item;
			const entry = { media: getMediaElements(children) };
			addConditionally(entry, "id", "id", children);
			addConditionally(entry, "title", "title", children);
			const href = (_a = getOneElement("link", children)) === null || _a === void 0 ? void 0 : _a.attribs["href"];
			if (href) entry.link = href;
			const description = fetch("summary", children) || fetch("content", children);
			if (description) entry.description = description;
			const pubDate = fetch("updated", children);
			if (pubDate) entry.pubDate = new Date(pubDate);
			return entry;
		})
	};
	addConditionally(feed, "id", "id", childs);
	addConditionally(feed, "title", "title", childs);
	const href = (_a = getOneElement("link", childs)) === null || _a === void 0 ? void 0 : _a.attribs["href"];
	if (href) feed.link = href;
	addConditionally(feed, "description", "subtitle", childs);
	const updated = fetch("updated", childs);
	if (updated) feed.updated = new Date(updated);
	addConditionally(feed, "author", "email", childs, true);
	return feed;
}
/**
* Parse a RSS feed.
*
* @param feedRoot The root of the feed.
* @returns The parsed feed.
*/
function getRssFeed(feedRoot) {
	var _a, _b;
	const childs = (_b = (_a = getOneElement("channel", feedRoot.children)) === null || _a === void 0 ? void 0 : _a.children) !== null && _b !== void 0 ? _b : [];
	const feed = {
		type: feedRoot.name.substr(0, 3),
		id: "",
		items: getElementsByTagName("item", feedRoot.children).map((item) => {
			const { children } = item;
			const entry = { media: getMediaElements(children) };
			addConditionally(entry, "id", "guid", children);
			addConditionally(entry, "title", "title", children);
			addConditionally(entry, "link", "link", children);
			addConditionally(entry, "description", "description", children);
			const pubDate = fetch("pubDate", children) || fetch("dc:date", children);
			if (pubDate) entry.pubDate = new Date(pubDate);
			return entry;
		})
	};
	addConditionally(feed, "title", "title", childs);
	addConditionally(feed, "link", "link", childs);
	addConditionally(feed, "description", "description", childs);
	const updated = fetch("lastBuildDate", childs);
	if (updated) feed.updated = new Date(updated);
	addConditionally(feed, "author", "managingEditor", childs, true);
	return feed;
}
const MEDIA_KEYS_STRING = [
	"url",
	"type",
	"lang"
];
const MEDIA_KEYS_INT = [
	"fileSize",
	"bitrate",
	"framerate",
	"samplingrate",
	"channels",
	"duration",
	"height",
	"width"
];
/**
* Get all media elements of a feed item.
*
* @param where Nodes to search in.
* @returns Media elements.
*/
function getMediaElements(where) {
	return getElementsByTagName("media:content", where).map((elem) => {
		const { attribs } = elem;
		const media = {
			medium: attribs["medium"],
			isDefault: !!attribs["isDefault"]
		};
		for (const attrib of MEDIA_KEYS_STRING) if (attribs[attrib]) media[attrib] = attribs[attrib];
		for (const attrib of MEDIA_KEYS_INT) if (attribs[attrib]) media[attrib] = parseInt(attribs[attrib], 10);
		if (attribs["expression"]) media.expression = attribs["expression"];
		return media;
	});
}
/**
* Get one element by tag name.
*
* @param tagName Tag name to look for
* @param node Node to search in
* @returns The element or null
*/
function getOneElement(tagName, node) {
	return getElementsByTagName(tagName, node, true, 1)[0];
}
/**
* Get the text content of an element with a certain tag name.
*
* @param tagName Tag name to look for.
* @param where Node to search in.
* @param recurse Whether to recurse into child nodes.
* @returns The text content of the element.
*/
function fetch(tagName, where, recurse = false) {
	return textContent(getElementsByTagName(tagName, where, recurse, 1)).trim();
}
/**
* Adds a property to an object if it has a value.
*
* @param obj Object to be extended
* @param prop Property name
* @param tagName Tag name that contains the conditionally added property
* @param where Element to search for the property
* @param recurse Whether to recurse into child nodes.
*/
function addConditionally(obj, prop, tagName, where, recurse = false) {
	const val = fetch(tagName, where, recurse);
	if (val) obj[prop] = val;
}
/**
* Checks if an element is a feed root node.
*
* @param value The name of the element to check.
* @returns Whether an element is a feed root node.
*/
function isValidFeed(value) {
	return value === "rss" || value === "feed" || value === "rdf:RDF";
}
//#endregion
//#region node_modules/domutils/lib/esm/index.js
var esm_exports = /* @__PURE__ */ __exportAll({
	DocumentPosition: () => DocumentPosition,
	append: () => append,
	appendChild: () => appendChild,
	compareDocumentPosition: () => compareDocumentPosition,
	existsOne: () => existsOne$1,
	filter: () => filter,
	find: () => find,
	findAll: () => findAll$1,
	findOne: () => findOne$1,
	findOneChild: () => findOneChild,
	getAttributeValue: () => getAttributeValue$1,
	getChildren: () => getChildren$1,
	getElementById: () => getElementById,
	getElements: () => getElements,
	getElementsByTagName: () => getElementsByTagName,
	getElementsByTagType: () => getElementsByTagType,
	getFeed: () => getFeed,
	getInnerHTML: () => getInnerHTML,
	getName: () => getName$1,
	getOuterHTML: () => getOuterHTML,
	getParent: () => getParent$1,
	getSiblings: () => getSiblings$1,
	getText: () => getText$1,
	hasAttrib: () => hasAttrib$1,
	hasChildren: () => hasChildren,
	innerText: () => innerText,
	isCDATA: () => isCDATA,
	isComment: () => isComment,
	isDocument: () => isDocument,
	isTag: () => isTag$1,
	isText: () => isText,
	nextElementSibling: () => nextElementSibling,
	prepend: () => prepend,
	prependChild: () => prependChild,
	prevElementSibling: () => prevElementSibling,
	removeElement: () => removeElement,
	removeSubsets: () => removeSubsets$1,
	replaceElement: () => replaceElement,
	testElement: () => testElement,
	textContent: () => textContent,
	uniqueSort: () => uniqueSort
});
//#endregion
//#region node_modules/boolbase/index.js
var require_boolbase = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = {
		trueFunc: function trueFunc() {
			return true;
		},
		falseFunc: function falseFunc() {
			return false;
		}
	};
}));
//#endregion
//#region node_modules/css-what/lib/commonjs/types.js
var require_types = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AttributeAction = exports.IgnoreCaseMode = exports.SelectorType = void 0;
	(function(SelectorType) {
		SelectorType["Attribute"] = "attribute";
		SelectorType["Pseudo"] = "pseudo";
		SelectorType["PseudoElement"] = "pseudo-element";
		SelectorType["Tag"] = "tag";
		SelectorType["Universal"] = "universal";
		SelectorType["Adjacent"] = "adjacent";
		SelectorType["Child"] = "child";
		SelectorType["Descendant"] = "descendant";
		SelectorType["Parent"] = "parent";
		SelectorType["Sibling"] = "sibling";
		SelectorType["ColumnCombinator"] = "column-combinator";
	})(exports.SelectorType || (exports.SelectorType = {}));
	/**
	* Modes for ignore case.
	*
	* This could be updated to an enum, and the object is
	* the current stand-in that will allow code to be updated
	* without big changes.
	*/
	exports.IgnoreCaseMode = {
		Unknown: null,
		QuirksMode: "quirks",
		IgnoreCase: true,
		CaseSensitive: false
	};
	(function(AttributeAction) {
		AttributeAction["Any"] = "any";
		AttributeAction["Element"] = "element";
		AttributeAction["End"] = "end";
		AttributeAction["Equals"] = "equals";
		AttributeAction["Exists"] = "exists";
		AttributeAction["Hyphen"] = "hyphen";
		AttributeAction["Not"] = "not";
		AttributeAction["Start"] = "start";
	})(exports.AttributeAction || (exports.AttributeAction = {}));
}));
//#endregion
//#region node_modules/css-what/lib/commonjs/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.parse = exports.isTraversal = void 0;
	var types_1 = require_types();
	var reName = /^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/;
	var reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi;
	var actionTypes = /* @__PURE__ */ new Map([
		[126, types_1.AttributeAction.Element],
		[94, types_1.AttributeAction.Start],
		[36, types_1.AttributeAction.End],
		[42, types_1.AttributeAction.Any],
		[33, types_1.AttributeAction.Not],
		[124, types_1.AttributeAction.Hyphen]
	]);
	var unpackPseudos = /* @__PURE__ */ new Set([
		"has",
		"not",
		"matches",
		"is",
		"where",
		"host",
		"host-context"
	]);
	/**
	* Checks whether a specific selector is a traversal.
	* This is useful eg. in swapping the order of elements that
	* are not traversals.
	*
	* @param selector Selector to check.
	*/
	function isTraversal(selector) {
		switch (selector.type) {
			case types_1.SelectorType.Adjacent:
			case types_1.SelectorType.Child:
			case types_1.SelectorType.Descendant:
			case types_1.SelectorType.Parent:
			case types_1.SelectorType.Sibling:
			case types_1.SelectorType.ColumnCombinator: return true;
			default: return false;
		}
	}
	exports.isTraversal = isTraversal;
	var stripQuotesFromPseudos = /* @__PURE__ */ new Set(["contains", "icontains"]);
	function funescape(_, escaped, escapedWhitespace) {
		var high = parseInt(escaped, 16) - 65536;
		return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
	}
	function unescapeCSS(str) {
		return str.replace(reEscape, funescape);
	}
	function isQuote(c) {
		return c === 39 || c === 34;
	}
	function isWhitespace(c) {
		return c === 32 || c === 9 || c === 10 || c === 12 || c === 13;
	}
	/**
	* Parses `selector`, optionally with the passed `options`.
	*
	* @param selector Selector to parse.
	* @param options Options for parsing.
	* @returns Returns a two-dimensional array.
	* The first dimension represents selectors separated by commas (eg. `sub1, sub2`),
	* the second contains the relevant tokens for that selector.
	*/
	function parse(selector) {
		var subselects = [];
		var endIndex = parseSelector(subselects, "".concat(selector), 0);
		if (endIndex < selector.length) throw new Error("Unmatched selector: ".concat(selector.slice(endIndex)));
		return subselects;
	}
	exports.parse = parse;
	function parseSelector(subselects, selector, selectorIndex) {
		var tokens = [];
		function getName(offset) {
			var match = selector.slice(selectorIndex + offset).match(reName);
			if (!match) throw new Error("Expected name, found ".concat(selector.slice(selectorIndex)));
			var name = match[0];
			selectorIndex += offset + name.length;
			return unescapeCSS(name);
		}
		function stripWhitespace(offset) {
			selectorIndex += offset;
			while (selectorIndex < selector.length && isWhitespace(selector.charCodeAt(selectorIndex))) selectorIndex++;
		}
		function readValueWithParenthesis() {
			selectorIndex += 1;
			var start = selectorIndex;
			var counter = 1;
			for (; counter > 0 && selectorIndex < selector.length; selectorIndex++) if (selector.charCodeAt(selectorIndex) === 40 && !isEscaped(selectorIndex)) counter++;
			else if (selector.charCodeAt(selectorIndex) === 41 && !isEscaped(selectorIndex)) counter--;
			if (counter) throw new Error("Parenthesis not matched");
			return unescapeCSS(selector.slice(start, selectorIndex - 1));
		}
		function isEscaped(pos) {
			var slashCount = 0;
			while (selector.charCodeAt(--pos) === 92) slashCount++;
			return (slashCount & 1) === 1;
		}
		function ensureNotTraversal() {
			if (tokens.length > 0 && isTraversal(tokens[tokens.length - 1])) throw new Error("Did not expect successive traversals.");
		}
		function addTraversal(type) {
			if (tokens.length > 0 && tokens[tokens.length - 1].type === types_1.SelectorType.Descendant) {
				tokens[tokens.length - 1].type = type;
				return;
			}
			ensureNotTraversal();
			tokens.push({ type });
		}
		function addSpecialAttribute(name, action) {
			tokens.push({
				type: types_1.SelectorType.Attribute,
				name,
				action,
				value: getName(1),
				namespace: null,
				ignoreCase: "quirks"
			});
		}
		/**
		* We have finished parsing the current part of the selector.
		*
		* Remove descendant tokens at the end if they exist,
		* and return the last index, so that parsing can be
		* picked up from here.
		*/
		function finalizeSubselector() {
			if (tokens.length && tokens[tokens.length - 1].type === types_1.SelectorType.Descendant) tokens.pop();
			if (tokens.length === 0) throw new Error("Empty sub-selector");
			subselects.push(tokens);
		}
		stripWhitespace(0);
		if (selector.length === selectorIndex) return selectorIndex;
		loop: while (selectorIndex < selector.length) {
			var firstChar = selector.charCodeAt(selectorIndex);
			switch (firstChar) {
				case 32:
				case 9:
				case 10:
				case 12:
				case 13:
					if (tokens.length === 0 || tokens[0].type !== types_1.SelectorType.Descendant) {
						ensureNotTraversal();
						tokens.push({ type: types_1.SelectorType.Descendant });
					}
					stripWhitespace(1);
					break;
				case 62:
					addTraversal(types_1.SelectorType.Child);
					stripWhitespace(1);
					break;
				case 60:
					addTraversal(types_1.SelectorType.Parent);
					stripWhitespace(1);
					break;
				case 126:
					addTraversal(types_1.SelectorType.Sibling);
					stripWhitespace(1);
					break;
				case 43:
					addTraversal(types_1.SelectorType.Adjacent);
					stripWhitespace(1);
					break;
				case 46:
					addSpecialAttribute("class", types_1.AttributeAction.Element);
					break;
				case 35:
					addSpecialAttribute("id", types_1.AttributeAction.Equals);
					break;
				case 91:
					stripWhitespace(1);
					var name_1 = void 0;
					var namespace = null;
					if (selector.charCodeAt(selectorIndex) === 124) name_1 = getName(1);
					else if (selector.startsWith("*|", selectorIndex)) {
						namespace = "*";
						name_1 = getName(2);
					} else {
						name_1 = getName(0);
						if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 61) {
							namespace = name_1;
							name_1 = getName(1);
						}
					}
					stripWhitespace(0);
					var action = types_1.AttributeAction.Exists;
					var possibleAction = actionTypes.get(selector.charCodeAt(selectorIndex));
					if (possibleAction) {
						action = possibleAction;
						if (selector.charCodeAt(selectorIndex + 1) !== 61) throw new Error("Expected `=`");
						stripWhitespace(2);
					} else if (selector.charCodeAt(selectorIndex) === 61) {
						action = types_1.AttributeAction.Equals;
						stripWhitespace(1);
					}
					var value = "";
					var ignoreCase = null;
					if (action !== "exists") {
						if (isQuote(selector.charCodeAt(selectorIndex))) {
							var quote = selector.charCodeAt(selectorIndex);
							var sectionEnd = selectorIndex + 1;
							while (sectionEnd < selector.length && (selector.charCodeAt(sectionEnd) !== quote || isEscaped(sectionEnd))) sectionEnd += 1;
							if (selector.charCodeAt(sectionEnd) !== quote) throw new Error("Attribute value didn't end");
							value = unescapeCSS(selector.slice(selectorIndex + 1, sectionEnd));
							selectorIndex = sectionEnd + 1;
						} else {
							var valueStart = selectorIndex;
							while (selectorIndex < selector.length && (!isWhitespace(selector.charCodeAt(selectorIndex)) && selector.charCodeAt(selectorIndex) !== 93 || isEscaped(selectorIndex))) selectorIndex += 1;
							value = unescapeCSS(selector.slice(valueStart, selectorIndex));
						}
						stripWhitespace(0);
						var forceIgnore = selector.charCodeAt(selectorIndex) | 32;
						if (forceIgnore === 115) {
							ignoreCase = false;
							stripWhitespace(1);
						} else if (forceIgnore === 105) {
							ignoreCase = true;
							stripWhitespace(1);
						}
					}
					if (selector.charCodeAt(selectorIndex) !== 93) throw new Error("Attribute selector didn't terminate");
					selectorIndex += 1;
					var attributeSelector = {
						type: types_1.SelectorType.Attribute,
						name: name_1,
						action,
						value,
						namespace,
						ignoreCase
					};
					tokens.push(attributeSelector);
					break;
				case 58:
					if (selector.charCodeAt(selectorIndex + 1) === 58) {
						tokens.push({
							type: types_1.SelectorType.PseudoElement,
							name: getName(2).toLowerCase(),
							data: selector.charCodeAt(selectorIndex) === 40 ? readValueWithParenthesis() : null
						});
						continue;
					}
					var name_2 = getName(1).toLowerCase();
					var data = null;
					if (selector.charCodeAt(selectorIndex) === 40) if (unpackPseudos.has(name_2)) {
						if (isQuote(selector.charCodeAt(selectorIndex + 1))) throw new Error("Pseudo-selector ".concat(name_2, " cannot be quoted"));
						data = [];
						selectorIndex = parseSelector(data, selector, selectorIndex + 1);
						if (selector.charCodeAt(selectorIndex) !== 41) throw new Error("Missing closing parenthesis in :".concat(name_2, " (").concat(selector, ")"));
						selectorIndex += 1;
					} else {
						data = readValueWithParenthesis();
						if (stripQuotesFromPseudos.has(name_2)) {
							var quot = data.charCodeAt(0);
							if (quot === data.charCodeAt(data.length - 1) && isQuote(quot)) data = data.slice(1, -1);
						}
						data = unescapeCSS(data);
					}
					tokens.push({
						type: types_1.SelectorType.Pseudo,
						name: name_2,
						data
					});
					break;
				case 44:
					finalizeSubselector();
					tokens = [];
					stripWhitespace(1);
					break;
				default:
					if (selector.startsWith("/*", selectorIndex)) {
						var endIndex = selector.indexOf("*/", selectorIndex + 2);
						if (endIndex < 0) throw new Error("Comment was not terminated");
						selectorIndex = endIndex + 2;
						if (tokens.length === 0) stripWhitespace(0);
						break;
					}
					var namespace = null;
					var name_3 = void 0;
					if (firstChar === 42) {
						selectorIndex += 1;
						name_3 = "*";
					} else if (firstChar === 124) {
						name_3 = "";
						if (selector.charCodeAt(selectorIndex + 1) === 124) {
							addTraversal(types_1.SelectorType.ColumnCombinator);
							stripWhitespace(2);
							break;
						}
					} else if (reName.test(selector.slice(selectorIndex))) name_3 = getName(0);
					else break loop;
					if (selector.charCodeAt(selectorIndex) === 124 && selector.charCodeAt(selectorIndex + 1) !== 124) {
						namespace = name_3;
						if (selector.charCodeAt(selectorIndex + 1) === 42) {
							name_3 = "*";
							selectorIndex += 2;
						} else name_3 = getName(1);
					}
					tokens.push(name_3 === "*" ? {
						type: types_1.SelectorType.Universal,
						namespace
					} : {
						type: types_1.SelectorType.Tag,
						name: name_3,
						namespace
					});
			}
		}
		finalizeSubselector();
		return selectorIndex;
	}
}));
//#endregion
//#region node_modules/css-what/lib/commonjs/stringify.js
var require_stringify = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __spreadArray = exports && exports.__spreadArray || function(to, from, pack) {
		if (pack || arguments.length === 2) {
			for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
				if (!ar) ar = Array.prototype.slice.call(from, 0, i);
				ar[i] = from[i];
			}
		}
		return to.concat(ar || Array.prototype.slice.call(from));
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.stringify = void 0;
	var types_1 = require_types();
	var attribValChars = ["\\", "\""];
	var pseudoValChars = __spreadArray(__spreadArray([], attribValChars, true), ["(", ")"], false);
	var charsToEscapeInAttributeValue = new Set(attribValChars.map(function(c) {
		return c.charCodeAt(0);
	}));
	var charsToEscapeInPseudoValue = new Set(pseudoValChars.map(function(c) {
		return c.charCodeAt(0);
	}));
	var charsToEscapeInName = new Set(__spreadArray(__spreadArray([], pseudoValChars, true), [
		"~",
		"^",
		"$",
		"*",
		"+",
		"!",
		"|",
		":",
		"[",
		"]",
		" ",
		"."
	], false).map(function(c) {
		return c.charCodeAt(0);
	}));
	/**
	* Turns `selector` back into a string.
	*
	* @param selector Selector to stringify.
	*/
	function stringify(selector) {
		return selector.map(function(token) {
			return token.map(stringifyToken).join("");
		}).join(", ");
	}
	exports.stringify = stringify;
	function stringifyToken(token, index, arr) {
		switch (token.type) {
			case types_1.SelectorType.Child: return index === 0 ? "> " : " > ";
			case types_1.SelectorType.Parent: return index === 0 ? "< " : " < ";
			case types_1.SelectorType.Sibling: return index === 0 ? "~ " : " ~ ";
			case types_1.SelectorType.Adjacent: return index === 0 ? "+ " : " + ";
			case types_1.SelectorType.Descendant: return " ";
			case types_1.SelectorType.ColumnCombinator: return index === 0 ? "|| " : " || ";
			case types_1.SelectorType.Universal: return token.namespace === "*" && index + 1 < arr.length && "name" in arr[index + 1] ? "" : "".concat(getNamespace(token.namespace), "*");
			case types_1.SelectorType.Tag: return getNamespacedName(token);
			case types_1.SelectorType.PseudoElement: return "::".concat(escapeName(token.name, charsToEscapeInName)).concat(token.data === null ? "" : "(".concat(escapeName(token.data, charsToEscapeInPseudoValue), ")"));
			case types_1.SelectorType.Pseudo: return ":".concat(escapeName(token.name, charsToEscapeInName)).concat(token.data === null ? "" : "(".concat(typeof token.data === "string" ? escapeName(token.data, charsToEscapeInPseudoValue) : stringify(token.data), ")"));
			case types_1.SelectorType.Attribute:
				if (token.name === "id" && token.action === types_1.AttributeAction.Equals && token.ignoreCase === "quirks" && !token.namespace) return "#".concat(escapeName(token.value, charsToEscapeInName));
				if (token.name === "class" && token.action === types_1.AttributeAction.Element && token.ignoreCase === "quirks" && !token.namespace) return ".".concat(escapeName(token.value, charsToEscapeInName));
				var name_1 = getNamespacedName(token);
				if (token.action === types_1.AttributeAction.Exists) return "[".concat(name_1, "]");
				return "[".concat(name_1).concat(getActionValue(token.action), "=\"").concat(escapeName(token.value, charsToEscapeInAttributeValue), "\"").concat(token.ignoreCase === null ? "" : token.ignoreCase ? " i" : " s", "]");
		}
	}
	function getActionValue(action) {
		switch (action) {
			case types_1.AttributeAction.Equals: return "";
			case types_1.AttributeAction.Element: return "~";
			case types_1.AttributeAction.Start: return "^";
			case types_1.AttributeAction.End: return "$";
			case types_1.AttributeAction.Any: return "*";
			case types_1.AttributeAction.Not: return "!";
			case types_1.AttributeAction.Hyphen: return "|";
			case types_1.AttributeAction.Exists: throw new Error("Shouldn't be here");
		}
	}
	function getNamespacedName(token) {
		return "".concat(getNamespace(token.namespace)).concat(escapeName(token.name, charsToEscapeInName));
	}
	function getNamespace(namespace) {
		return namespace !== null ? "".concat(namespace === "*" ? "*" : escapeName(namespace, charsToEscapeInName), "|") : "";
	}
	function escapeName(str, charsToEscape) {
		var lastIdx = 0;
		var ret = "";
		for (var i = 0; i < str.length; i++) if (charsToEscape.has(str.charCodeAt(i))) {
			ret += "".concat(str.slice(lastIdx, i), "\\").concat(str.charAt(i));
			lastIdx = i + 1;
		}
		return ret.length > 0 ? ret + str.slice(lastIdx) : str;
	}
}));
//#endregion
//#region node_modules/css-what/lib/commonjs/index.js
var require_commonjs = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		var desc = Object.getOwnPropertyDescriptor(m, k);
		if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) desc = {
			enumerable: true,
			get: function() {
				return m[k];
			}
		};
		Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
		if (k2 === void 0) k2 = k;
		o[k2] = m[k];
	}));
	var __exportStar = exports && exports.__exportStar || function(m, exports$1) {
		for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports$1, p)) __createBinding(exports$1, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.stringify = exports.parse = exports.isTraversal = void 0;
	__exportStar(require_types(), exports);
	var parse_1 = require_parse();
	Object.defineProperty(exports, "isTraversal", {
		enumerable: true,
		get: function() {
			return parse_1.isTraversal;
		}
	});
	Object.defineProperty(exports, "parse", {
		enumerable: true,
		get: function() {
			return parse_1.parse;
		}
	});
	var stringify_1 = require_stringify();
	Object.defineProperty(exports, "stringify", {
		enumerable: true,
		get: function() {
			return stringify_1.stringify;
		}
	});
}));
//#endregion
//#region node_modules/css-select/lib/esm/sort.js
var import_boolbase = /* @__PURE__ */ __toESM(require_boolbase(), 1);
var import_commonjs = require_commonjs();
const procedure = /* @__PURE__ */ new Map([
	[import_commonjs.SelectorType.Universal, 50],
	[import_commonjs.SelectorType.Tag, 30],
	[import_commonjs.SelectorType.Attribute, 1],
	[import_commonjs.SelectorType.Pseudo, 0]
]);
function isTraversal(token) {
	return !procedure.has(token.type);
}
const attributes = /* @__PURE__ */ new Map([
	[import_commonjs.AttributeAction.Exists, 10],
	[import_commonjs.AttributeAction.Equals, 8],
	[import_commonjs.AttributeAction.Not, 7],
	[import_commonjs.AttributeAction.Start, 6],
	[import_commonjs.AttributeAction.End, 6],
	[import_commonjs.AttributeAction.Any, 5]
]);
/**
* Sort the parts of the passed selector,
* as there is potential for optimization
* (some types of selectors are faster than others)
*
* @param arr Selector to sort
*/
function sortByProcedure(arr) {
	const procs = arr.map(getProcedure);
	for (let i = 1; i < arr.length; i++) {
		const procNew = procs[i];
		if (procNew < 0) continue;
		for (let j = i - 1; j >= 0 && procNew < procs[j]; j--) {
			const token = arr[j + 1];
			arr[j + 1] = arr[j];
			arr[j] = token;
			procs[j + 1] = procs[j];
			procs[j] = procNew;
		}
	}
}
function getProcedure(token) {
	var _a, _b;
	let proc = (_a = procedure.get(token.type)) !== null && _a !== void 0 ? _a : -1;
	if (token.type === import_commonjs.SelectorType.Attribute) {
		proc = (_b = attributes.get(token.action)) !== null && _b !== void 0 ? _b : 4;
		if (token.action === import_commonjs.AttributeAction.Equals && token.name === "id") proc = 9;
		if (token.ignoreCase) proc >>= 1;
	} else if (token.type === import_commonjs.SelectorType.Pseudo) if (!token.data) proc = 3;
	else if (token.name === "has" || token.name === "contains") proc = 0;
	else if (Array.isArray(token.data)) {
		proc = Math.min(...token.data.map((d) => Math.min(...d.map(getProcedure))));
		if (proc < 0) proc = 0;
	} else proc = 2;
	return proc;
}
//#endregion
//#region node_modules/css-select/lib/esm/attributes.js
/**
* All reserved characters in a regex, used for escaping.
*
* Taken from XRegExp, (c) 2007-2020 Steven Levithan under the MIT license
* https://github.com/slevithan/xregexp/blob/95eeebeb8fac8754d54eafe2b4743661ac1cf028/src/xregexp.js#L794
*/
const reChars = /[-[\]{}()*+?.,\\^$|#\s]/g;
function escapeRegex(value) {
	return value.replace(reChars, "\\$&");
}
/**
* Attributes that are case-insensitive in HTML.
*
* @private
* @see https://html.spec.whatwg.org/multipage/semantics-other.html#case-sensitivity-of-selectors
*/
const caseInsensitiveAttributes = /* @__PURE__ */ new Set([
	"accept",
	"accept-charset",
	"align",
	"alink",
	"axis",
	"bgcolor",
	"charset",
	"checked",
	"clear",
	"codetype",
	"color",
	"compact",
	"declare",
	"defer",
	"dir",
	"direction",
	"disabled",
	"enctype",
	"face",
	"frame",
	"hreflang",
	"http-equiv",
	"lang",
	"language",
	"link",
	"media",
	"method",
	"multiple",
	"nohref",
	"noresize",
	"noshade",
	"nowrap",
	"readonly",
	"rel",
	"rev",
	"rules",
	"scope",
	"scrolling",
	"selected",
	"shape",
	"target",
	"text",
	"type",
	"valign",
	"valuetype",
	"vlink"
]);
function shouldIgnoreCase(selector, options) {
	return typeof selector.ignoreCase === "boolean" ? selector.ignoreCase : selector.ignoreCase === "quirks" ? !!options.quirksMode : !options.xmlMode && caseInsensitiveAttributes.has(selector.name);
}
/**
* Attribute selectors
*/
const attributeRules = {
	equals(next, data, options) {
		const { adapter } = options;
		const { name } = data;
		let { value } = data;
		if (shouldIgnoreCase(data, options)) {
			value = value.toLowerCase();
			return (elem) => {
				const attr = adapter.getAttributeValue(elem, name);
				return attr != null && attr.length === value.length && attr.toLowerCase() === value && next(elem);
			};
		}
		return (elem) => adapter.getAttributeValue(elem, name) === value && next(elem);
	},
	hyphen(next, data, options) {
		const { adapter } = options;
		const { name } = data;
		let { value } = data;
		const len = value.length;
		if (shouldIgnoreCase(data, options)) {
			value = value.toLowerCase();
			return function hyphenIC(elem) {
				const attr = adapter.getAttributeValue(elem, name);
				return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len).toLowerCase() === value && next(elem);
			};
		}
		return function hyphen(elem) {
			const attr = adapter.getAttributeValue(elem, name);
			return attr != null && (attr.length === len || attr.charAt(len) === "-") && attr.substr(0, len) === value && next(elem);
		};
	},
	element(next, data, options) {
		const { adapter } = options;
		const { name, value } = data;
		if (/\s/.test(value)) return import_boolbase.default.falseFunc;
		const regex = new RegExp(`(?:^|\\s)${escapeRegex(value)}(?:$|\\s)`, shouldIgnoreCase(data, options) ? "i" : "");
		return function element(elem) {
			const attr = adapter.getAttributeValue(elem, name);
			return attr != null && attr.length >= value.length && regex.test(attr) && next(elem);
		};
	},
	exists(next, { name }, { adapter }) {
		return (elem) => adapter.hasAttrib(elem, name) && next(elem);
	},
	start(next, data, options) {
		const { adapter } = options;
		const { name } = data;
		let { value } = data;
		const len = value.length;
		if (len === 0) return import_boolbase.default.falseFunc;
		if (shouldIgnoreCase(data, options)) {
			value = value.toLowerCase();
			return (elem) => {
				const attr = adapter.getAttributeValue(elem, name);
				return attr != null && attr.length >= len && attr.substr(0, len).toLowerCase() === value && next(elem);
			};
		}
		return (elem) => {
			var _a;
			return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.startsWith(value)) && next(elem);
		};
	},
	end(next, data, options) {
		const { adapter } = options;
		const { name } = data;
		let { value } = data;
		const len = -value.length;
		if (len === 0) return import_boolbase.default.falseFunc;
		if (shouldIgnoreCase(data, options)) {
			value = value.toLowerCase();
			return (elem) => {
				var _a;
				return ((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.substr(len).toLowerCase()) === value && next(elem);
			};
		}
		return (elem) => {
			var _a;
			return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.endsWith(value)) && next(elem);
		};
	},
	any(next, data, options) {
		const { adapter } = options;
		const { name, value } = data;
		if (value === "") return import_boolbase.default.falseFunc;
		if (shouldIgnoreCase(data, options)) {
			const regex = new RegExp(escapeRegex(value), "i");
			return function anyIC(elem) {
				const attr = adapter.getAttributeValue(elem, name);
				return attr != null && attr.length >= value.length && regex.test(attr) && next(elem);
			};
		}
		return (elem) => {
			var _a;
			return !!((_a = adapter.getAttributeValue(elem, name)) === null || _a === void 0 ? void 0 : _a.includes(value)) && next(elem);
		};
	},
	not(next, data, options) {
		const { adapter } = options;
		const { name } = data;
		let { value } = data;
		if (value === "") return (elem) => !!adapter.getAttributeValue(elem, name) && next(elem);
		else if (shouldIgnoreCase(data, options)) {
			value = value.toLowerCase();
			return (elem) => {
				const attr = adapter.getAttributeValue(elem, name);
				return (attr == null || attr.length !== value.length || attr.toLowerCase() !== value) && next(elem);
			};
		}
		return (elem) => adapter.getAttributeValue(elem, name) !== value && next(elem);
	}
};
//#endregion
//#region node_modules/nth-check/lib/esm/parse.js
const whitespace = /* @__PURE__ */ new Set([
	9,
	10,
	12,
	13,
	32
]);
const ZERO = "0".charCodeAt(0);
const NINE = "9".charCodeAt(0);
/**
* Parses an expression.
*
* @throws An `Error` if parsing fails.
* @returns An array containing the integer step size and the integer offset of the nth rule.
* @example nthCheck.parse("2n+3"); // returns [2, 3]
*/
function parse$4(formula) {
	formula = formula.trim().toLowerCase();
	if (formula === "even") return [2, 0];
	else if (formula === "odd") return [2, 1];
	let idx = 0;
	let a = 0;
	let sign = readSign();
	let number = readNumber();
	if (idx < formula.length && formula.charAt(idx) === "n") {
		idx++;
		a = sign * (number !== null && number !== void 0 ? number : 1);
		skipWhitespace();
		if (idx < formula.length) {
			sign = readSign();
			skipWhitespace();
			number = readNumber();
		} else sign = number = 0;
	}
	if (number === null || idx < formula.length) throw new Error(`n-th rule couldn't be parsed ('${formula}')`);
	return [a, sign * number];
	function readSign() {
		if (formula.charAt(idx) === "-") {
			idx++;
			return -1;
		}
		if (formula.charAt(idx) === "+") idx++;
		return 1;
	}
	function readNumber() {
		const start = idx;
		let value = 0;
		while (idx < formula.length && formula.charCodeAt(idx) >= ZERO && formula.charCodeAt(idx) <= NINE) {
			value = value * 10 + (formula.charCodeAt(idx) - ZERO);
			idx++;
		}
		return idx === start ? null : value;
	}
	function skipWhitespace() {
		while (idx < formula.length && whitespace.has(formula.charCodeAt(idx))) idx++;
	}
}
//#endregion
//#region node_modules/nth-check/lib/esm/compile.js
/**
* Returns a function that checks if an elements index matches the given rule
* highly optimized to return the fastest solution.
*
* @param parsed A tuple [a, b], as returned by `parse`.
* @returns A highly optimized function that returns whether an index matches the nth-check.
* @example
*
* ```js
* const check = nthCheck.compile([2, 3]);
*
* check(0); // `false`
* check(1); // `false`
* check(2); // `true`
* check(3); // `false`
* check(4); // `true`
* check(5); // `false`
* check(6); // `true`
* ```
*/
function compile$2(parsed) {
	const a = parsed[0];
	const b = parsed[1] - 1;
	if (b < 0 && a <= 0) return import_boolbase.default.falseFunc;
	if (a === -1) return (index) => index <= b;
	if (a === 0) return (index) => index === b;
	if (a === 1) return b < 0 ? import_boolbase.default.trueFunc : (index) => index >= b;
	const absA = Math.abs(a);
	const bMod = (b % absA + absA) % absA;
	return a > 1 ? (index) => index >= b && index % absA === bMod : (index) => index <= b && index % absA === bMod;
}
//#endregion
//#region node_modules/nth-check/lib/esm/index.js
/**
* Parses and compiles a formula to a highly optimized function.
* Combination of {@link parse} and {@link compile}.
*
* If the formula doesn't match any elements,
* it returns [`boolbase`](https://github.com/fb55/boolbase)'s `falseFunc`.
* Otherwise, a function accepting an _index_ is returned, which returns
* whether or not the passed _index_ matches the formula.
*
* Note: The nth-rule starts counting at `1`, the returned function at `0`.
*
* @param formula The formula to compile.
* @example
* const check = nthCheck("2n+3");
*
* check(0); // `false`
* check(1); // `false`
* check(2); // `true`
* check(3); // `false`
* check(4); // `true`
* check(5); // `false`
* check(6); // `true`
*/
function nthCheck(formula) {
	return compile$2(parse$4(formula));
}
//#endregion
//#region node_modules/css-select/lib/esm/pseudo-selectors/filters.js
function getChildFunc(next, adapter) {
	return (elem) => {
		const parent = adapter.getParent(elem);
		return parent != null && adapter.isTag(parent) && next(elem);
	};
}
const filters = {
	contains(next, text, { adapter }) {
		return function contains(elem) {
			return next(elem) && adapter.getText(elem).includes(text);
		};
	},
	icontains(next, text, { adapter }) {
		const itext = text.toLowerCase();
		return function icontains(elem) {
			return next(elem) && adapter.getText(elem).toLowerCase().includes(itext);
		};
	},
	"nth-child"(next, rule, { adapter, equals }) {
		const func = nthCheck(rule);
		if (func === import_boolbase.default.falseFunc) return import_boolbase.default.falseFunc;
		if (func === import_boolbase.default.trueFunc) return getChildFunc(next, adapter);
		return function nthChild(elem) {
			const siblings = adapter.getSiblings(elem);
			let pos = 0;
			for (let i = 0; i < siblings.length; i++) {
				if (equals(elem, siblings[i])) break;
				if (adapter.isTag(siblings[i])) pos++;
			}
			return func(pos) && next(elem);
		};
	},
	"nth-last-child"(next, rule, { adapter, equals }) {
		const func = nthCheck(rule);
		if (func === import_boolbase.default.falseFunc) return import_boolbase.default.falseFunc;
		if (func === import_boolbase.default.trueFunc) return getChildFunc(next, adapter);
		return function nthLastChild(elem) {
			const siblings = adapter.getSiblings(elem);
			let pos = 0;
			for (let i = siblings.length - 1; i >= 0; i--) {
				if (equals(elem, siblings[i])) break;
				if (adapter.isTag(siblings[i])) pos++;
			}
			return func(pos) && next(elem);
		};
	},
	"nth-of-type"(next, rule, { adapter, equals }) {
		const func = nthCheck(rule);
		if (func === import_boolbase.default.falseFunc) return import_boolbase.default.falseFunc;
		if (func === import_boolbase.default.trueFunc) return getChildFunc(next, adapter);
		return function nthOfType(elem) {
			const siblings = adapter.getSiblings(elem);
			let pos = 0;
			for (let i = 0; i < siblings.length; i++) {
				const currentSibling = siblings[i];
				if (equals(elem, currentSibling)) break;
				if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) pos++;
			}
			return func(pos) && next(elem);
		};
	},
	"nth-last-of-type"(next, rule, { adapter, equals }) {
		const func = nthCheck(rule);
		if (func === import_boolbase.default.falseFunc) return import_boolbase.default.falseFunc;
		if (func === import_boolbase.default.trueFunc) return getChildFunc(next, adapter);
		return function nthLastOfType(elem) {
			const siblings = adapter.getSiblings(elem);
			let pos = 0;
			for (let i = siblings.length - 1; i >= 0; i--) {
				const currentSibling = siblings[i];
				if (equals(elem, currentSibling)) break;
				if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === adapter.getName(elem)) pos++;
			}
			return func(pos) && next(elem);
		};
	},
	root(next, _rule, { adapter }) {
		return (elem) => {
			const parent = adapter.getParent(elem);
			return (parent == null || !adapter.isTag(parent)) && next(elem);
		};
	},
	scope(next, rule, options, context) {
		const { equals } = options;
		if (!context || context.length === 0) return filters["root"](next, rule, options);
		if (context.length === 1) return (elem) => equals(context[0], elem) && next(elem);
		return (elem) => context.includes(elem) && next(elem);
	},
	hover: dynamicStatePseudo("isHovered"),
	visited: dynamicStatePseudo("isVisited"),
	active: dynamicStatePseudo("isActive")
};
/**
* Dynamic state pseudos. These depend on optional Adapter methods.
*
* @param name The name of the adapter method to call.
* @returns Pseudo for the `filters` object.
*/
function dynamicStatePseudo(name) {
	return function dynamicPseudo(next, _rule, { adapter }) {
		const func = adapter[name];
		if (typeof func !== "function") return import_boolbase.default.falseFunc;
		return function active(elem) {
			return func(elem) && next(elem);
		};
	};
}
//#endregion
//#region node_modules/css-select/lib/esm/pseudo-selectors/pseudos.js
const pseudos = {
	empty(elem, { adapter }) {
		return !adapter.getChildren(elem).some((elem) => adapter.isTag(elem) || adapter.getText(elem) !== "");
	},
	"first-child"(elem, { adapter, equals }) {
		if (adapter.prevElementSibling) return adapter.prevElementSibling(elem) == null;
		const firstChild = adapter.getSiblings(elem).find((elem) => adapter.isTag(elem));
		return firstChild != null && equals(elem, firstChild);
	},
	"last-child"(elem, { adapter, equals }) {
		const siblings = adapter.getSiblings(elem);
		for (let i = siblings.length - 1; i >= 0; i--) {
			if (equals(elem, siblings[i])) return true;
			if (adapter.isTag(siblings[i])) break;
		}
		return false;
	},
	"first-of-type"(elem, { adapter, equals }) {
		const siblings = adapter.getSiblings(elem);
		const elemName = adapter.getName(elem);
		for (let i = 0; i < siblings.length; i++) {
			const currentSibling = siblings[i];
			if (equals(elem, currentSibling)) return true;
			if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) break;
		}
		return false;
	},
	"last-of-type"(elem, { adapter, equals }) {
		const siblings = adapter.getSiblings(elem);
		const elemName = adapter.getName(elem);
		for (let i = siblings.length - 1; i >= 0; i--) {
			const currentSibling = siblings[i];
			if (equals(elem, currentSibling)) return true;
			if (adapter.isTag(currentSibling) && adapter.getName(currentSibling) === elemName) break;
		}
		return false;
	},
	"only-of-type"(elem, { adapter, equals }) {
		const elemName = adapter.getName(elem);
		return adapter.getSiblings(elem).every((sibling) => equals(elem, sibling) || !adapter.isTag(sibling) || adapter.getName(sibling) !== elemName);
	},
	"only-child"(elem, { adapter, equals }) {
		return adapter.getSiblings(elem).every((sibling) => equals(elem, sibling) || !adapter.isTag(sibling));
	}
};
function verifyPseudoArgs(func, name, subselect, argIndex) {
	if (subselect === null) {
		if (func.length > argIndex) throw new Error(`Pseudo-class :${name} requires an argument`);
	} else if (func.length === argIndex) throw new Error(`Pseudo-class :${name} doesn't have any arguments`);
}
//#endregion
//#region node_modules/css-select/lib/esm/pseudo-selectors/aliases.js
/**
* Aliases are pseudos that are expressed as selectors.
*/
const aliases = {
	"any-link": ":is(a, area, link)[href]",
	link: ":any-link:not(:visited)",
	disabled: `:is(
        :is(button, input, select, textarea, optgroup, option)[disabled],
        optgroup[disabled] > option,
        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)
    )`,
	enabled: ":not(:disabled)",
	checked: ":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",
	required: ":is(input, select, textarea)[required]",
	optional: ":is(input, select, textarea):not([required])",
	selected: "option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",
	checkbox: "[type=checkbox]",
	file: "[type=file]",
	password: "[type=password]",
	radio: "[type=radio]",
	reset: "[type=reset]",
	image: "[type=image]",
	submit: "[type=submit]",
	parent: ":not(:empty)",
	header: ":is(h1, h2, h3, h4, h5, h6)",
	button: ":is(button, input[type=button])",
	input: ":is(input, textarea, select, button)",
	text: "input:is(:not([type!='']), [type=text])"
};
//#endregion
//#region node_modules/css-select/lib/esm/pseudo-selectors/subselects.js
/** Used as a placeholder for :has. Will be replaced with the actual element. */
const PLACEHOLDER_ELEMENT = {};
function ensureIsTag(next, adapter) {
	if (next === import_boolbase.default.falseFunc) return import_boolbase.default.falseFunc;
	return (elem) => adapter.isTag(elem) && next(elem);
}
function getNextSiblings(elem, adapter) {
	const siblings = adapter.getSiblings(elem);
	if (siblings.length <= 1) return [];
	const elemIndex = siblings.indexOf(elem);
	if (elemIndex < 0 || elemIndex === siblings.length - 1) return [];
	return siblings.slice(elemIndex + 1).filter(adapter.isTag);
}
function copyOptions(options) {
	return {
		xmlMode: !!options.xmlMode,
		lowerCaseAttributeNames: !!options.lowerCaseAttributeNames,
		lowerCaseTags: !!options.lowerCaseTags,
		quirksMode: !!options.quirksMode,
		cacheResults: !!options.cacheResults,
		pseudos: options.pseudos,
		adapter: options.adapter,
		equals: options.equals
	};
}
const is$1 = (next, token, options, context, compileToken) => {
	const func = compileToken(token, copyOptions(options), context);
	return func === import_boolbase.default.trueFunc ? next : func === import_boolbase.default.falseFunc ? import_boolbase.default.falseFunc : (elem) => func(elem) && next(elem);
};
const subselects = {
	is: is$1,
	/**
	* `:matches` and `:where` are aliases for `:is`.
	*/
	matches: is$1,
	where: is$1,
	not(next, token, options, context, compileToken) {
		const func = compileToken(token, copyOptions(options), context);
		return func === import_boolbase.default.falseFunc ? next : func === import_boolbase.default.trueFunc ? import_boolbase.default.falseFunc : (elem) => !func(elem) && next(elem);
	},
	has(next, subselect, options, _context, compileToken) {
		const { adapter } = options;
		const opts = copyOptions(options);
		opts.relativeSelector = true;
		const context = subselect.some((s) => s.some(isTraversal)) ? [PLACEHOLDER_ELEMENT] : void 0;
		const compiled = compileToken(subselect, opts, context);
		if (compiled === import_boolbase.default.falseFunc) return import_boolbase.default.falseFunc;
		const hasElement = ensureIsTag(compiled, adapter);
		if (context && compiled !== import_boolbase.default.trueFunc) {
			const { shouldTestNextSiblings = false } = compiled;
			return (elem) => {
				if (!next(elem)) return false;
				context[0] = elem;
				const childs = adapter.getChildren(elem);
				const nextElements = shouldTestNextSiblings ? [...childs, ...getNextSiblings(elem, adapter)] : childs;
				return adapter.existsOne(hasElement, nextElements);
			};
		}
		return (elem) => next(elem) && adapter.existsOne(hasElement, adapter.getChildren(elem));
	}
};
//#endregion
//#region node_modules/css-select/lib/esm/pseudo-selectors/index.js
function compilePseudoSelector(next, selector, options, context, compileToken) {
	var _a;
	const { name, data } = selector;
	if (Array.isArray(data)) {
		if (!(name in subselects)) throw new Error(`Unknown pseudo-class :${name}(${data})`);
		return subselects[name](next, data, options, context, compileToken);
	}
	const userPseudo = (_a = options.pseudos) === null || _a === void 0 ? void 0 : _a[name];
	const stringPseudo = typeof userPseudo === "string" ? userPseudo : aliases[name];
	if (typeof stringPseudo === "string") {
		if (data != null) throw new Error(`Pseudo ${name} doesn't have any arguments`);
		const alias = (0, import_commonjs.parse)(stringPseudo);
		return subselects["is"](next, alias, options, context, compileToken);
	}
	if (typeof userPseudo === "function") {
		verifyPseudoArgs(userPseudo, name, data, 1);
		return (elem) => userPseudo(elem, data) && next(elem);
	}
	if (name in filters) return filters[name](next, data, options, context);
	if (name in pseudos) {
		const pseudo = pseudos[name];
		verifyPseudoArgs(pseudo, name, data, 2);
		return (elem) => pseudo(elem, options, data) && next(elem);
	}
	throw new Error(`Unknown pseudo-class :${name}`);
}
//#endregion
//#region node_modules/css-select/lib/esm/general.js
function getElementParent(node, adapter) {
	const parent = adapter.getParent(node);
	if (parent && adapter.isTag(parent)) return parent;
	return null;
}
function compileGeneralSelector(next, selector, options, context, compileToken) {
	const { adapter, equals } = options;
	switch (selector.type) {
		case import_commonjs.SelectorType.PseudoElement: throw new Error("Pseudo-elements are not supported by css-select");
		case import_commonjs.SelectorType.ColumnCombinator: throw new Error("Column combinators are not yet supported by css-select");
		case import_commonjs.SelectorType.Attribute:
			if (selector.namespace != null) throw new Error("Namespaced attributes are not yet supported by css-select");
			if (!options.xmlMode || options.lowerCaseAttributeNames) selector.name = selector.name.toLowerCase();
			return attributeRules[selector.action](next, selector, options);
		case import_commonjs.SelectorType.Pseudo: return compilePseudoSelector(next, selector, options, context, compileToken);
		case import_commonjs.SelectorType.Tag: {
			if (selector.namespace != null) throw new Error("Namespaced tag names are not yet supported by css-select");
			let { name } = selector;
			if (!options.xmlMode || options.lowerCaseTags) name = name.toLowerCase();
			return function tag(elem) {
				return adapter.getName(elem) === name && next(elem);
			};
		}
		case import_commonjs.SelectorType.Descendant: {
			if (options.cacheResults === false || typeof WeakSet === "undefined") return function descendant(elem) {
				let current = elem;
				while (current = getElementParent(current, adapter)) if (next(current)) return true;
				return false;
			};
			const isFalseCache = /* @__PURE__ */ new WeakSet();
			return function cachedDescendant(elem) {
				let current = elem;
				while (current = getElementParent(current, adapter)) if (!isFalseCache.has(current)) {
					if (adapter.isTag(current) && next(current)) return true;
					isFalseCache.add(current);
				}
				return false;
			};
		}
		case "_flexibleDescendant": return function flexibleDescendant(elem) {
			let current = elem;
			do
				if (next(current)) return true;
			while (current = getElementParent(current, adapter));
			return false;
		};
		case import_commonjs.SelectorType.Parent: return function parent(elem) {
			return adapter.getChildren(elem).some((elem) => adapter.isTag(elem) && next(elem));
		};
		case import_commonjs.SelectorType.Child: return function child(elem) {
			const parent = adapter.getParent(elem);
			return parent != null && adapter.isTag(parent) && next(parent);
		};
		case import_commonjs.SelectorType.Sibling: return function sibling(elem) {
			const siblings = adapter.getSiblings(elem);
			for (let i = 0; i < siblings.length; i++) {
				const currentSibling = siblings[i];
				if (equals(elem, currentSibling)) break;
				if (adapter.isTag(currentSibling) && next(currentSibling)) return true;
			}
			return false;
		};
		case import_commonjs.SelectorType.Adjacent:
			if (adapter.prevElementSibling) return function adjacent(elem) {
				const previous = adapter.prevElementSibling(elem);
				return previous != null && next(previous);
			};
			return function adjacent(elem) {
				const siblings = adapter.getSiblings(elem);
				let lastElement;
				for (let i = 0; i < siblings.length; i++) {
					const currentSibling = siblings[i];
					if (equals(elem, currentSibling)) break;
					if (adapter.isTag(currentSibling)) lastElement = currentSibling;
				}
				return !!lastElement && next(lastElement);
			};
		case import_commonjs.SelectorType.Universal:
			if (selector.namespace != null && selector.namespace !== "*") throw new Error("Namespaced universal selectors are not yet supported by css-select");
			return next;
	}
}
//#endregion
//#region node_modules/css-select/lib/esm/compile.js
/**
* Compiles a selector to an executable function.
*
* @param selector Selector to compile.
* @param options Compilation options.
* @param context Optional context for the selector.
*/
function compile$1(selector, options, context) {
	return ensureIsTag(compileUnsafe(selector, options, context), options.adapter);
}
function compileUnsafe(selector, options, context) {
	return compileToken(typeof selector === "string" ? (0, import_commonjs.parse)(selector) : selector, options, context);
}
function includesScopePseudo(t) {
	return t.type === import_commonjs.SelectorType.Pseudo && (t.name === "scope" || Array.isArray(t.data) && t.data.some((data) => data.some(includesScopePseudo)));
}
const DESCENDANT_TOKEN = { type: import_commonjs.SelectorType.Descendant };
const FLEXIBLE_DESCENDANT_TOKEN = { type: "_flexibleDescendant" };
const SCOPE_TOKEN = {
	type: import_commonjs.SelectorType.Pseudo,
	name: "scope",
	data: null
};
function absolutize(token, { adapter }, context) {
	const hasContext = !!(context === null || context === void 0 ? void 0 : context.every((e) => {
		const parent = adapter.isTag(e) && adapter.getParent(e);
		return e === PLACEHOLDER_ELEMENT || parent && adapter.isTag(parent);
	}));
	for (const t of token) {
		if (t.length > 0 && isTraversal(t[0]) && t[0].type !== import_commonjs.SelectorType.Descendant) {} else if (hasContext && !t.some(includesScopePseudo)) t.unshift(DESCENDANT_TOKEN);
		else continue;
		t.unshift(SCOPE_TOKEN);
	}
}
function compileToken(token, options, context) {
	var _a;
	token.forEach(sortByProcedure);
	context = (_a = options.context) !== null && _a !== void 0 ? _a : context;
	const isArrayContext = Array.isArray(context);
	const finalContext = context && (Array.isArray(context) ? context : [context]);
	if (options.relativeSelector !== false) absolutize(token, options, finalContext);
	else if (token.some((t) => t.length > 0 && isTraversal(t[0]))) throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled");
	let shouldTestNextSiblings = false;
	const query = token.map((rules) => {
		if (rules.length >= 2) {
			const [first, second] = rules;
			if (first.type !== import_commonjs.SelectorType.Pseudo || first.name !== "scope") {} else if (isArrayContext && second.type === import_commonjs.SelectorType.Descendant) rules[1] = FLEXIBLE_DESCENDANT_TOKEN;
			else if (second.type === import_commonjs.SelectorType.Adjacent || second.type === import_commonjs.SelectorType.Sibling) shouldTestNextSiblings = true;
		}
		return compileRules(rules, options, finalContext);
	}).reduce(reduceRules, import_boolbase.default.falseFunc);
	query.shouldTestNextSiblings = shouldTestNextSiblings;
	return query;
}
function compileRules(rules, options, context) {
	var _a;
	return rules.reduce((previous, rule) => previous === import_boolbase.default.falseFunc ? import_boolbase.default.falseFunc : compileGeneralSelector(previous, rule, options, context, compileToken), (_a = options.rootFunc) !== null && _a !== void 0 ? _a : import_boolbase.default.trueFunc);
}
function reduceRules(a, b) {
	if (b === import_boolbase.default.falseFunc || a === import_boolbase.default.trueFunc) return a;
	if (a === import_boolbase.default.falseFunc || b === import_boolbase.default.trueFunc) return b;
	return function combine(elem) {
		return a(elem) || b(elem);
	};
}
//#endregion
//#region node_modules/css-select/lib/esm/index.js
const defaultEquals = (a, b) => a === b;
const defaultOptions = {
	adapter: esm_exports,
	equals: defaultEquals
};
function convertOptionFormats(options) {
	var _a, _b, _c, _d;
	const opts = options !== null && options !== void 0 ? options : defaultOptions;
	(_a = opts.adapter) !== null && _a !== void 0 || (opts.adapter = esm_exports);
	(_b = opts.equals) !== null && _b !== void 0 || (opts.equals = (_d = (_c = opts.adapter) === null || _c === void 0 ? void 0 : _c.equals) !== null && _d !== void 0 ? _d : defaultEquals);
	return opts;
}
function getSelectorFunc(searchFunc) {
	return function select(query, elements, options) {
		const opts = convertOptionFormats(options);
		if (typeof query !== "function") query = compileUnsafe(query, opts, elements);
		const filteredElements = prepareContext(elements, opts.adapter, query.shouldTestNextSiblings);
		return searchFunc(query, filteredElements, opts);
	};
}
function prepareContext(elems, adapter, shouldTestNextSiblings = false) {
	if (shouldTestNextSiblings) elems = appendNextSiblings(elems, adapter);
	return Array.isArray(elems) ? adapter.removeSubsets(elems) : adapter.getChildren(elems);
}
function appendNextSiblings(elem, adapter) {
	const elems = Array.isArray(elem) ? elem.slice(0) : [elem];
	const elemsLength = elems.length;
	for (let i = 0; i < elemsLength; i++) {
		const nextSiblings = getNextSiblings(elems[i], adapter);
		elems.push(...nextSiblings);
	}
	return elems;
}
/**
* @template Node The generic Node type for the DOM adapter being used.
* @template ElementNode The Node type for elements for the DOM adapter being used.
* @param elems Elements to query. If it is an element, its children will be queried..
* @param query can be either a CSS selector string or a compiled query function.
* @param [options] options for querying the document.
* @see compile for supported selector queries.
* @returns All matching elements.
*
*/
const selectAll = getSelectorFunc((query, elems, options) => query === import_boolbase.default.falseFunc || !elems || elems.length === 0 ? [] : options.adapter.findAll(query, elems));
/**
* @template Node The generic Node type for the DOM adapter being used.
* @template ElementNode The Node type for elements for the DOM adapter being used.
* @param elems Elements to query. If it is an element, its children will be queried..
* @param query can be either a CSS selector string or a compiled query function.
* @param [options] options for querying the document.
* @see compile for supported selector queries.
* @returns the first match, or null if there was no match.
*/
const selectOne = getSelectorFunc((query, elems, options) => query === import_boolbase.default.falseFunc || !elems || elems.length === 0 ? null : options.adapter.findOne(query, elems));
/**
* Tests whether or not an element is matched by query.
*
* @template Node The generic Node type for the DOM adapter being used.
* @template ElementNode The Node type for elements for the DOM adapter being used.
* @param elem The element to test if it matches the query.
* @param query can be either a CSS selector string or a compiled query function.
* @param [options] options for querying the document.
* @see compile for supported selector queries.
* @returns
*/
function is(elem, query, options) {
	const opts = convertOptionFormats(options);
	return (typeof query === "function" ? query : compile$1(query, opts))(elem);
}
//#endregion
//#region src/back.ts
function arr_back(arr) {
	return arr[arr.length - 1];
}
//#endregion
//#region src/matcher.ts
function isTag(node) {
	return node && node.nodeType === 1;
}
function getAttributeValue(elem, name) {
	return isTag(elem) ? elem.getAttribute(name) : void 0;
}
function getName(elem) {
	return (elem && elem.rawTagName || "").toLowerCase();
}
function getChildren(node) {
	return node && node.childNodes;
}
function getParent(node) {
	return node ? node.parentNode : null;
}
function getText(node) {
	return node.text;
}
function removeSubsets(nodes) {
	let idx = nodes.length;
	let node;
	let ancestor;
	let replace;
	while (--idx > -1) {
		node = ancestor = nodes[idx];
		nodes[idx] = null;
		replace = true;
		while (ancestor) {
			if (nodes.indexOf(ancestor) > -1) {
				replace = false;
				nodes.splice(idx, 1);
				break;
			}
			ancestor = getParent(ancestor);
		}
		if (replace) nodes[idx] = node;
	}
	return nodes;
}
function existsOne(test, elems) {
	return elems.some((elem) => {
		return isTag(elem) ? test(elem) || existsOne(test, getChildren(elem)) : false;
	});
}
function getSiblings(node) {
	const parent = getParent(node);
	return parent ? getChildren(parent) : [];
}
function hasAttrib(elem, name) {
	return getAttributeValue(elem, name) !== void 0;
}
function findOne(test, elems) {
	let elem = null;
	for (let i = 0, l = elems === null || elems === void 0 ? void 0 : elems.length; i < l && !elem; i++) {
		const el = elems[i];
		if (test(el)) elem = el;
		else {
			const childs = getChildren(el);
			if (childs && childs.length > 0) elem = findOne(test, childs);
		}
	}
	return elem;
}
function findAll(test, nodes) {
	let result = [];
	for (let i = 0, j = nodes.length; i < j; i++) {
		const node = nodes[i];
		if (!isTag(node)) continue;
		if (test(node)) result.push(node);
		const childs = getChildren(node);
		if (childs) result = result.concat(findAll(test, childs));
	}
	return result;
}
const matcher = {
	isTag,
	getAttributeValue,
	getName,
	getChildren,
	getParent,
	getText,
	removeSubsets,
	existsOne,
	getSiblings,
	hasAttrib,
	findOne,
	findAll
};
//#endregion
//#region src/void-tag.ts
var VoidTag = class {
	constructor(addClosingSlash = false, tags) {
		this.addClosingSlash = addClosingSlash;
		if (Array.isArray(tags)) this.voidTags = tags.reduce((set, tag) => {
			return set.add(tag.toLowerCase()).add(tag.toUpperCase()).add(tag);
		}, /* @__PURE__ */ new Set());
		else this.voidTags = [
			"area",
			"base",
			"br",
			"col",
			"embed",
			"hr",
			"img",
			"input",
			"link",
			"meta",
			"param",
			"source",
			"track",
			"wbr"
		].reduce((set, tag) => {
			return set.add(tag.toLowerCase()).add(tag.toUpperCase()).add(tag);
		}, /* @__PURE__ */ new Set());
	}
	formatNode(tag, attrs, innerHTML) {
		const addClosingSlash = this.addClosingSlash;
		const closingSpace = addClosingSlash && attrs && !attrs.endsWith(" ") ? " " : "";
		const closingSlash = addClosingSlash ? `${closingSpace}/` : "";
		return this.isVoidElement(tag.toLowerCase()) ? `<${tag}${attrs}${closingSlash}>` : `<${tag}${attrs}>${innerHTML}</${tag}>`;
	}
	isVoidElement(tag) {
		return this.voidTags.has(tag);
	}
};
//#endregion
//#region src/nodes/text.ts
/**
* TextNode to contain a text element in DOM tree.
* @param {string} value [description]
*/
var TextNode = class TextNode extends Node {
	clone() {
		return new TextNode(this._rawText, null);
	}
	constructor(rawText, parentNode = null, range) {
		super(parentNode, range);
		this.nodeType = 3;
		this.rawTagName = "";
		this._rawText = rawText;
	}
	get rawText() {
		return this._rawText;
	}
	/**
	* Set rawText and invalidate trimmed caches
	*/
	set rawText(text) {
		this._rawText = text;
		this._trimmedRawText = void 0;
		this._trimmedText = void 0;
	}
	/**
	* Returns raw text with all whitespace trimmed except single leading/trailing non-breaking space
	*/
	get trimmedRawText() {
		if (this._trimmedRawText !== void 0) return this._trimmedRawText;
		this._trimmedRawText = trimText(this.rawText);
		return this._trimmedRawText;
	}
	/**
	* Returns text with all whitespace trimmed except single leading/trailing non-breaking space
	*/
	get trimmedText() {
		if (this._trimmedText !== void 0) return this._trimmedText;
		this._trimmedText = trimText(this.text);
		return this._trimmedText;
	}
	/**
	* Get unescaped text value of current node and its children.
	* @return {string} text content
	*/
	get text() {
		return decodeHTML(this.rawText);
	}
	/**
	* Detect if the node contains only white space.
	* @return {boolean}
	*/
	get isWhitespace() {
		return /^(\s|&nbsp;)*$/.test(this.rawText);
	}
	toString() {
		return this.rawText;
	}
};
/**
* Trim whitespace except single leading/trailing non-breaking space
*/
function trimText(text) {
	let i = 0;
	let startPos;
	let endPos;
	while (i >= 0 && i < text.length) {
		if (/\S/.test(text[i])) if (startPos === void 0) {
			startPos = i;
			i = text.length;
		} else {
			endPos = i;
			i = void 0;
		}
		if (startPos === void 0) i++;
		else i--;
	}
	if (startPos === void 0) startPos = 0;
	if (endPos === void 0) endPos = text.length - 1;
	const hasLeadingSpace = startPos > 0 && /[^\S\r\n]/.test(text[startPos - 1]);
	const hasTrailingSpace = endPos < text.length - 1 && /[^\S\r\n]/.test(text[endPos + 1]);
	return (hasLeadingSpace ? " " : "") + text.slice(startPos, endPos + 1) + (hasTrailingSpace ? " " : "");
}
//#endregion
//#region src/nodes/html.ts
function decode(val) {
	return decodeHTML(val);
}
const Htags = [
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"header",
	"hgroup"
];
const Dtags = [
	"details",
	"dialog",
	"dd",
	"div",
	"dt"
];
const Ftags = [
	"fieldset",
	"figcaption",
	"figure",
	"footer",
	"form"
];
const tableTags = [
	"table",
	"td",
	"tr"
];
const htmlTags = [
	"address",
	"article",
	"aside",
	"blockquote",
	"br",
	"hr",
	"li",
	"main",
	"nav",
	"ol",
	"p",
	"pre",
	"section",
	"ul"
];
const kBlockElements = /* @__PURE__ */ new Set();
function addToKBlockElement(...args) {
	const addToSet = (array) => {
		for (let index = 0; index < array.length; index++) {
			const element = array[index];
			kBlockElements.add(element);
			kBlockElements.add(element.toUpperCase());
		}
	};
	for (const arg of args) addToSet(arg);
}
addToKBlockElement(Htags, Dtags, Ftags, tableTags, htmlTags);
var DOMTokenList = class {
	_validate(c) {
		if (/\s/.test(c)) throw new Error(`DOMException in DOMTokenList.add: The token '${c}' contains HTML space characters, which are not valid in tokens.`);
	}
	constructor(valuesInit = [], afterUpdate = () => null) {
		this._set = new Set(valuesInit);
		this._afterUpdate = afterUpdate;
	}
	add(c) {
		this._validate(c);
		this._set.add(c);
		this._afterUpdate(this);
	}
	replace(c1, c2) {
		this._validate(c2);
		this._set.delete(c1);
		this._set.add(c2);
		this._afterUpdate(this);
	}
	remove(c) {
		this._set.delete(c) && this._afterUpdate(this);
	}
	toggle(c) {
		this._validate(c);
		if (this._set.has(c)) this._set.delete(c);
		else this._set.add(c);
		this._afterUpdate(this);
	}
	contains(c) {
		return this._set.has(c);
	}
	get length() {
		return this._set.size;
	}
	values() {
		return this._set.values();
	}
	get value() {
		return Array.from(this._set.values());
	}
	toString() {
		return Array.from(this._set.values()).join(" ");
	}
};
/**
* HTMLElement, which contains a set of children.
*
* Note: this is a minimalist implementation, no complete tree
*   structure provided (no parentNode, nextSibling,
*   previousSibling etc).
* @class HTMLElement
* @extends {Node}
*/
var HTMLElement = class HTMLElement extends Node {
	/**
	* Quote attribute values
	* @param attr attribute value
	* @returns {string} quoted value
	*/
	quoteAttribute(attr) {
		if (attr == null) return "null";
		return `"${attr.replace(/"/g, "&quot;")}"`;
	}
	/**
	* Creates an instance of HTMLElement.
	* @param keyAttrs	id and class attribute
	* @param [rawAttrs]	attributes in string
	*
	* @memberof HTMLElement
	*/
	constructor(tagName, keyAttrs, rawAttrs = "", parentNode = null, range, voidTag = new VoidTag(), _parseOptions = {}) {
		super(parentNode, range);
		this.rawAttrs = rawAttrs;
		this.voidTag = voidTag;
		this.nodeType = 1;
		this.rawTagName = tagName;
		this.rawAttrs = rawAttrs || "";
		this._id = keyAttrs.id || "";
		this.childNodes = [];
		this._parseOptions = _parseOptions;
		this.classList = new DOMTokenList(keyAttrs.class ? keyAttrs.class.split(/\s+/) : [], (classList) => this.setAttribute("class", classList.toString()));
		if (keyAttrs.id) {
			if (!rawAttrs) this.rawAttrs = `id="${keyAttrs.id}"`;
		}
		if (keyAttrs.class) {
			if (!rawAttrs) {
				const cls = `class="${this.classList.toString()}"`;
				if (this.rawAttrs) this.rawAttrs += ` ${cls}`;
				else this.rawAttrs = cls;
			}
		}
	}
	/**
	* Remove Child element from childNodes array
	* @param {HTMLElement} node     node to remove
	*/
	removeChild(node) {
		this.childNodes = this.childNodes.filter((child) => {
			return child !== node;
		});
		return this;
	}
	/**
	* Exchanges given child with new child
	* @param {HTMLElement} oldNode     node to exchange
	* @param {HTMLElement} newNode     new node
	*/
	exchangeChild(oldNode, newNode) {
		const children = this.childNodes;
		this.childNodes = children.map((child) => {
			if (child === oldNode) return newNode;
			return child;
		});
		return this;
	}
	get tagName() {
		return this.rawTagName ? this.rawTagName.toUpperCase() : this.rawTagName;
	}
	set tagName(newname) {
		this.rawTagName = newname.toLowerCase();
	}
	get localName() {
		return this.rawTagName.toLowerCase();
	}
	get isVoidElement() {
		return this.voidTag.isVoidElement(this.localName);
	}
	get id() {
		return this._id;
	}
	set id(newid) {
		this.setAttribute("id", newid);
	}
	/**
	* Get escpaed (as-it) text value of current node and its children.
	* @return {string} text content
	*/
	get rawText() {
		if (/^br$/i.test(this.rawTagName)) return "\n";
		return this.childNodes.reduce((pre, cur) => {
			return pre += cur.rawText;
		}, "");
	}
	get textContent() {
		return decode(this.rawText);
	}
	set textContent(val) {
		const content = [new TextNode(val, this)];
		this.childNodes = content;
	}
	/**
	* Get unescaped text value of current node and its children.
	* @return {string} text content
	*/
	get text() {
		return decode(this.rawText);
	}
	/**
	* Get structured Text (with '\n' etc.)
	* @return {string} structured text
	*/
	get structuredText() {
		let currentBlock = [];
		const blocks = [currentBlock];
		function dfs(node) {
			if (node.nodeType === 1) if (kBlockElements.has(node.rawTagName)) {
				if (currentBlock.length > 0) blocks.push(currentBlock = []);
				node.childNodes.forEach(dfs);
				if (currentBlock.length > 0) blocks.push(currentBlock = []);
			} else node.childNodes.forEach(dfs);
			else if (node.nodeType === 3) if (node.isWhitespace) currentBlock.prependWhitespace = true;
			else {
				let text = node.trimmedText;
				if (currentBlock.prependWhitespace) {
					text = ` ${text}`;
					currentBlock.prependWhitespace = false;
				}
				currentBlock.push(text);
			}
		}
		dfs(this);
		return blocks.map((block) => {
			return block.join("").replace(/\s{2,}/g, " ");
		}).join("\n").replace(/\s+$/, "");
	}
	toString() {
		const tag = this.rawTagName;
		if (tag) {
			const attrs = this.rawAttrs ? ` ${this.rawAttrs}` : "";
			return this.voidTag.formatNode(tag, attrs, this.innerHTML);
		}
		return this.innerHTML;
	}
	get innerHTML() {
		return this.childNodes.map((child) => {
			return child.toString();
		}).join("");
	}
	set innerHTML(content) {
		const r = parse$1(content, this._parseOptions);
		const nodes = r.childNodes.length ? r.childNodes : [new TextNode(content, this)];
		resetParent(nodes, this);
		resetParent(this.childNodes, null);
		this.childNodes = nodes;
	}
	set_content(content, options = {}) {
		if (content instanceof Node) content = [content];
		else if (typeof content == "string") {
			options = _objectSpread2(_objectSpread2({}, this._parseOptions), options);
			const r = parse$1(content, options);
			content = r.childNodes.length ? r.childNodes : [new TextNode(r.innerHTML, this)];
		}
		resetParent(this.childNodes, null);
		resetParent(content, this);
		this.childNodes = content;
		return this;
	}
	replaceWith(...nodes) {
		const parent = this.parentNode;
		const content = nodes.map((node) => {
			if (node instanceof Node) return [node];
			else if (typeof node == "string") {
				const r = parse$1(node, this._parseOptions);
				return r.childNodes.length ? r.childNodes : [new TextNode(node, this)];
			}
			return [];
		}).flat();
		const idx = parent.childNodes.findIndex((child) => {
			return child === this;
		});
		resetParent([this], null);
		parent.childNodes = [
			...parent.childNodes.slice(0, idx),
			...resetParent(content, parent),
			...parent.childNodes.slice(idx + 1)
		];
		return this;
	}
	get outerHTML() {
		return this.toString();
	}
	/**
	* Trim element from right (in block) after seeing pattern in a TextNode.
	* @param  {RegExp} pattern pattern to find
	* @return {HTMLElement}    reference to current node
	*/
	trimRight(pattern) {
		for (let i = 0; i < this.childNodes.length; i++) {
			const childNode = this.childNodes[i];
			if (childNode.nodeType === 1) childNode.trimRight(pattern);
			else {
				const index = childNode.rawText.search(pattern);
				if (index > -1) {
					childNode.rawText = childNode.rawText.substr(0, index);
					this.childNodes.length = i + 1;
				}
			}
		}
		return this;
	}
	/**
	* Get DOM structure
	* @return {string} structure
	*/
	get structure() {
		const res = [];
		let indention = 0;
		function write(str) {
			res.push("  ".repeat(indention) + str);
		}
		function dfs(node) {
			const idStr = node._id ? `#${node._id}` : "";
			const classStr = node.classList.length ? `.${node.classList.value.join(".")}` : "";
			write(`${node.rawTagName}${idStr}${classStr}`);
			indention++;
			node.childNodes.forEach((childNode) => {
				if (childNode.nodeType === 1) dfs(childNode);
				else if (childNode.nodeType === 3) {
					if (!childNode.isWhitespace) write("#text");
				}
			});
			indention--;
		}
		dfs(this);
		return res.join("\n");
	}
	/**
	* Remove whitespaces in this sub tree.
	* @return {HTMLElement} pointer to this
	*/
	removeWhitespace() {
		let o = 0;
		this.childNodes.forEach((node) => {
			if (node.nodeType === 3) {
				if (node.isWhitespace) return;
				node.rawText = node.trimmedRawText;
			} else if (node.nodeType === 1) node.removeWhitespace();
			this.childNodes[o++] = node;
		});
		this.childNodes.length = o;
		const attrs = Object.keys(this.rawAttributes).map((key) => {
			const val = this.quoteAttribute(this.rawAttributes[key]);
			if (val === "null" || val === "\"\"") return key;
			return `${key}=${val}`;
		}).join(" ");
		this.rawAttrs = attrs;
		delete this._rawAttrs;
		return this;
	}
	/**
	* Query CSS selector to find matching nodes.
	* @param  {string}         selector Simplified CSS selector
	* @return {HTMLElement[]}  matching elements
	*/
	querySelectorAll(selector) {
		return selectAll(selector, this, {
			xmlMode: true,
			adapter: matcher
		});
	}
	/**
	* Query CSS Selector to find matching node.
	* @param  {string}         selector Simplified CSS selector
	* @return {(HTMLElement|null)}    matching node
	*/
	querySelector(selector) {
		return selectOne(selector, this, {
			xmlMode: true,
			adapter: matcher
		});
	}
	/**
	* Tests whether the node matches a given CSS selector.
	* @param  {string}   selector Simplified CSS selector
	* @return {boolean}
	*/
	matches(selector) {
		return is(this, selector, {
			xmlMode: true,
			adapter: matcher
		});
	}
	/**
	* find elements by their tagName
	* @param {string} tagName the tagName of the elements to select
	*/
	getElementsByTagName(tagName) {
		const upperCasedTagName = tagName.toUpperCase();
		const re = [];
		const stack = [];
		let currentNodeReference = this;
		let index = 0;
		while (index !== void 0) {
			let child;
			do
				child = currentNodeReference.childNodes[index++];
			while (index < currentNodeReference.childNodes.length && child === void 0);
			if (child === void 0) {
				currentNodeReference = currentNodeReference.parentNode;
				index = stack.pop();
				continue;
			}
			if (child.nodeType === 1) {
				if (tagName === "*" || child.tagName === upperCasedTagName) re.push(child);
				if (child.childNodes.length > 0) {
					stack.push(index);
					currentNodeReference = child;
					index = 0;
				}
			}
		}
		return re;
	}
	/**
	* find element by it's id
	* @param {string} id the id of the element to select
	* @returns {HTMLElement | null} the element with the given id or null if not found
	*/
	getElementById(id) {
		const stack = [];
		let currentNodeReference = this;
		let index = 0;
		while (index !== void 0) {
			let child;
			do
				child = currentNodeReference.childNodes[index++];
			while (index < currentNodeReference.childNodes.length && child === void 0);
			if (child === void 0) {
				currentNodeReference = currentNodeReference.parentNode;
				index = stack.pop();
				continue;
			}
			if (child.nodeType === 1) {
				if (child._id === id) return child;
				if (child.childNodes.length > 0) {
					stack.push(index);
					currentNodeReference = child;
					index = 0;
				}
			}
		}
		return null;
	}
	/**
	* traverses the Element and its parents (heading toward the document root) until it finds a node that matches the provided selector string. Will return itself or the matching ancestor. If no such element exists, it returns null.
	* @param selector a DOMString containing a selector list
	* @returns {HTMLElement | null} the element with the given id or null if not found
	*/
	closest(selector) {
		const mapChild = /* @__PURE__ */ new Map();
		let el = this;
		let old = null;
		function findOne(test, elems) {
			let elem = null;
			for (let i = 0, l = elems.length; i < l && !elem; i++) {
				const el = elems[i];
				if (test(el)) elem = el;
				else {
					const child = mapChild.get(el);
					if (child) elem = findOne(test, [child]);
				}
			}
			return elem;
		}
		while (el) {
			mapChild.set(el, old);
			old = el;
			el = el.parentNode;
		}
		el = this;
		while (el) {
			const e = selectOne(selector, el, {
				xmlMode: true,
				adapter: _objectSpread2(_objectSpread2({}, matcher), {}, {
					getChildren(node) {
						const child = mapChild.get(node);
						return child && [child];
					},
					getSiblings(node) {
						return [node];
					},
					findOne,
					findAll() {
						return [];
					}
				})
			});
			if (e) return e;
			el = el.parentNode;
		}
		return null;
	}
	/**
	* Append a child node to childNodes
	* @param  {Node} node node to append
	* @return {Node}      node appended
	*/
	appendChild(node) {
		this.append(node);
		return node;
	}
	/**
	* Get attributes
	* @access private
	* @return {Object} parsed and unescaped attributes
	*/
	get attrs() {
		if (this._attrs) return this._attrs;
		this._attrs = {};
		const attrs = this.rawAttributes;
		for (const key in attrs) {
			const val = attrs[key] || "";
			this._attrs[key.toLowerCase()] = decode(val);
		}
		return this._attrs;
	}
	get attributes() {
		const ret_attrs = {};
		const attrs = this.rawAttributes;
		for (const key in attrs) ret_attrs[key] = decode(attrs[key] || "");
		return ret_attrs;
	}
	/**
	* Get escaped (as-is) attributes
	* @return {Object} parsed attributes
	*/
	get rawAttributes() {
		if (this._rawAttrs) return this._rawAttrs;
		const attrs = {};
		if (this.rawAttrs) {
			const re = /([a-zA-Z()[\]#@$.?:][a-zA-Z0-9-._:()[\]#]*)(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+))?/g;
			let match;
			while (match = re.exec(this.rawAttrs)) {
				const key = match[1];
				let val = match[2] || null;
				if (val && (val[0] === `'` || val[0] === `"`)) val = val.slice(1, val.length - 1);
				attrs[key] = attrs[key] || val;
			}
		}
		this._rawAttrs = attrs;
		return attrs;
	}
	removeAttribute(key) {
		const attrs = this.rawAttributes;
		delete attrs[key];
		if (this._attrs) delete this._attrs[key];
		this.rawAttrs = Object.keys(attrs).map((name) => {
			const val = this.quoteAttribute(attrs[name]);
			if (val === "null" || val === "\"\"") return name;
			return `${name}=${val}`;
		}).join(" ");
		if (key === "id") this._id = "";
		return this;
	}
	hasAttribute(key) {
		return key.toLowerCase() in this.attrs;
	}
	/**
	* Get an attribute
	* @return {string | undefined} value of the attribute; or undefined if not exist
	*/
	getAttribute(key) {
		return this.attrs[key.toLowerCase()];
	}
	/**
	* Set an attribute value to the HTMLElement
	* @param {string} key The attribute name
	* @param {string} value The value to set, or null / undefined to remove an attribute
	*/
	setAttribute(key, value) {
		if (arguments.length < 2) throw new Error("Failed to execute 'setAttribute' on 'Element'");
		const k2 = key.toLowerCase();
		const attrs = this.rawAttributes;
		for (const k in attrs) if (k.toLowerCase() === k2) {
			key = k;
			break;
		}
		attrs[key] = String(value);
		if (this._attrs) this._attrs[k2] = decode(attrs[key]);
		this.rawAttrs = Object.keys(attrs).map((name) => {
			const val = this.quoteAttribute(attrs[name]);
			if (val === "null" || val === "\"\"") return name;
			return `${name}=${val}`;
		}).join(" ");
		if (key === "id") this._id = value;
		return this;
	}
	/**
	* Replace all the attributes of the HTMLElement by the provided attributes
	* @param {Attributes} attributes the new attribute set
	*/
	setAttributes(attributes) {
		if (this._attrs) delete this._attrs;
		if (this._rawAttrs) delete this._rawAttrs;
		this.rawAttrs = Object.keys(attributes).map((name) => {
			const val = attributes[name];
			if (val === "null" || val === "\"\"") return name;
			return `${name}=${this.quoteAttribute(String(val))}`;
		}).join(" ");
		if ("id" in attributes) this._id = attributes["id"];
		return this;
	}
	insertAdjacentHTML(where, html) {
		if (arguments.length < 2) throw new Error("2 arguments required");
		const p = parse$1(html, this._parseOptions);
		if (where === "afterend") this.after(...p.childNodes);
		else if (where === "afterbegin") this.prepend(...p.childNodes);
		else if (where === "beforeend") this.append(...p.childNodes);
		else if (where === "beforebegin") this.before(...p.childNodes);
		else throw new Error(`The value provided ('${where}') is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'`);
		return this;
	}
	/** Prepend nodes or strings to this node's children. */
	prepend(...insertable) {
		const nodes = resolveInsertable(insertable);
		resetParent(nodes, this);
		this.childNodes.unshift(...nodes);
	}
	/** Append nodes or strings to this node's children. */
	append(...insertable) {
		const nodes = resolveInsertable(insertable);
		resetParent(nodes, this);
		this.childNodes.push(...nodes);
	}
	/** Insert nodes or strings before this node. */
	before(...insertable) {
		const nodes = resolveInsertable(insertable);
		const siblings = this.parentNode.childNodes;
		resetParent(nodes, this.parentNode);
		siblings.splice(siblings.indexOf(this), 0, ...nodes);
	}
	/** Insert nodes or strings after this node. */
	after(...insertable) {
		const nodes = resolveInsertable(insertable);
		const siblings = this.parentNode.childNodes;
		resetParent(nodes, this.parentNode);
		siblings.splice(siblings.indexOf(this) + 1, 0, ...nodes);
	}
	get nextSibling() {
		if (this.parentNode) {
			const children = this.parentNode.childNodes;
			let i = 0;
			while (i < children.length) {
				const child = children[i++];
				if (this === child) return children[i] || null;
			}
			return null;
		}
	}
	get nextElementSibling() {
		if (this.parentNode) {
			const children = this.parentNode.childNodes;
			let i = 0;
			let find = false;
			while (i < children.length) {
				const child = children[i++];
				if (find) {
					if (child instanceof HTMLElement) return child || null;
				} else if (this === child) find = true;
			}
			return null;
		}
	}
	get previousSibling() {
		if (this.parentNode) {
			const children = this.parentNode.childNodes;
			let i = children.length;
			while (i > 0) {
				const child = children[--i];
				if (this === child) return children[i - 1] || null;
			}
			return null;
		}
	}
	get previousElementSibling() {
		if (this.parentNode) {
			const children = this.parentNode.childNodes;
			let i = children.length;
			let find = false;
			while (i > 0) {
				const child = children[--i];
				if (find) {
					if (child instanceof HTMLElement) return child || null;
				} else if (this === child) find = true;
			}
			return null;
		}
	}
	/** Get all childNodes of type {@link HTMLElement}. */
	get children() {
		const children = [];
		for (const childNode of this.childNodes) if (childNode instanceof HTMLElement) children.push(childNode);
		return children;
	}
	/**
	* Get the first child node.
	* @return The first child or undefined if none exists.
	*/
	get firstChild() {
		return this.childNodes[0];
	}
	/**
	* Get the first child node of type {@link HTMLElement}.
	* @return The first child element or undefined if none exists.
	*/
	get firstElementChild() {
		return this.children[0];
	}
	/**
	* Get the last child node.
	* @return The last child or undefined if none exists.
	*/
	get lastChild() {
		return arr_back(this.childNodes);
	}
	/**
	* Get the last child node of type {@link HTMLElement}.
	* @return The last child element or undefined if none exists.
	*/
	get lastElementChild() {
		return this.children[this.children.length - 1];
	}
	get childElementCount() {
		return this.children.length;
	}
	get classNames() {
		return this.classList.toString();
	}
	/** Clone this Node */
	clone() {
		return parse$1(this.toString(), this._parseOptions).firstChild;
	}
};
const kMarkupPattern = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][-.:0-9_a-zA-Z@\xB7\xC0-\xD6\xD8-\xF6\u00F8-\u03A1\u03A3-\u03D9\u03DB-\u03EF\u03F7-\u03FF\u0400-\u04FF\u0500-\u052F\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E00-\u1E9B\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A-\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA78E\uA790-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64-\uAB65\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\x37F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/gu;
const kMarkupPatternWithCDATA = /<!--[\s\S]*?-->|<!\[CDATA\[[\s\S]*?\]\]>|<(\/?)([a-zA-Z][-.:0-9_a-zA-Z@\xB7\xC0-\xD6\xD8-\xF6\u00F8-\u03A1\u03A3-\u03D9\u03DB-\u03EF\u03F7-\u03FF\u0400-\u04FF\u0500-\u052F\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E00-\u1E9B\u1F00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2126\u212A-\u212B\u2132\u214E\u2160-\u2188\u2C60-\u2C7F\uA722-\uA787\uA78B-\uA78E\uA790-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA7FF\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64-\uAB65\uFB00-\uFB06\uFB13-\uFB17\uFF21-\uFF3A\uFF41-\uFF5A\x37F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/gu;
const kAttributePattern = /(?:^|\s)(id|class)\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+)/gi;
const kElementsClosedByOpening = {
	li: {
		li: true,
		LI: true
	},
	LI: {
		li: true,
		LI: true
	},
	p: {
		p: true,
		div: true,
		P: true,
		DIV: true
	},
	P: {
		p: true,
		div: true,
		P: true,
		DIV: true
	},
	b: {
		div: true,
		DIV: true
	},
	B: {
		div: true,
		DIV: true
	},
	td: {
		td: true,
		th: true,
		TD: true,
		TH: true
	},
	TD: {
		td: true,
		th: true,
		TD: true,
		TH: true
	},
	th: {
		td: true,
		th: true,
		TD: true,
		TH: true
	},
	TH: {
		td: true,
		th: true,
		TD: true,
		TH: true
	},
	h1: {
		h1: true,
		H1: true
	},
	H1: {
		h1: true,
		H1: true
	},
	h2: {
		h2: true,
		H2: true
	},
	H2: {
		h2: true,
		H2: true
	},
	h3: {
		h3: true,
		H3: true
	},
	H3: {
		h3: true,
		H3: true
	},
	h4: {
		h4: true,
		H4: true
	},
	H4: {
		h4: true,
		H4: true
	},
	h5: {
		h5: true,
		H5: true
	},
	H5: {
		h5: true,
		H5: true
	},
	h6: {
		h6: true,
		H6: true
	},
	H6: {
		h6: true,
		H6: true
	}
};
const kElementsClosedByClosing = {
	li: {
		ul: true,
		ol: true,
		UL: true,
		OL: true
	},
	LI: {
		ul: true,
		ol: true,
		UL: true,
		OL: true
	},
	a: {
		div: true,
		DIV: true
	},
	A: {
		div: true,
		DIV: true
	},
	b: {
		div: true,
		DIV: true
	},
	B: {
		div: true,
		DIV: true
	},
	i: {
		div: true,
		DIV: true
	},
	I: {
		div: true,
		DIV: true
	},
	p: {
		div: true,
		DIV: true
	},
	P: {
		div: true,
		DIV: true
	},
	td: {
		tr: true,
		table: true,
		TR: true,
		TABLE: true
	},
	TD: {
		tr: true,
		table: true,
		TR: true,
		TABLE: true
	},
	th: {
		tr: true,
		table: true,
		TR: true,
		TABLE: true
	},
	TH: {
		tr: true,
		table: true,
		TR: true,
		TABLE: true
	}
};
const kElementsClosedByClosingExcept = { p: {
	a: true,
	audio: true,
	del: true,
	ins: true,
	map: true,
	noscript: true,
	video: true
} };
const frameflag = "documentfragmentcontainer";
/**
* Parses HTML and returns a root element
* Parse a chuck of HTML source.
* @param  {string} data      html
* @return {HTMLElement}      root element
*/
function base_parse(data, options = {}) {
	var _options$voidTag, _options$voidTag2;
	const voidTag = new VoidTag(options === null || options === void 0 || (_options$voidTag = options.voidTag) === null || _options$voidTag === void 0 ? void 0 : _options$voidTag.closingSlash, options === null || options === void 0 || (_options$voidTag2 = options.voidTag) === null || _options$voidTag2 === void 0 ? void 0 : _options$voidTag2.tags);
	const hasCDATA = data.includes("<![CDATA[");
	const markupPattern = hasCDATA ? kMarkupPatternWithCDATA : kMarkupPattern;
	const elements = options.blockTextElements || {
		script: true,
		noscript: true,
		style: true,
		pre: true
	};
	const element_names = Object.keys(elements);
	const kBlockTextElements = element_names.map((it) => new RegExp(`^${it}$`, "i"));
	const kIgnoreElements = element_names.filter((it) => Boolean(elements[it])).map((it) => new RegExp(`^${it}$`, "i"));
	function element_should_be_ignore(tag) {
		return kIgnoreElements.some((it) => it.test(tag));
	}
	function is_block_text_element(tag) {
		return kBlockTextElements.some((it) => it.test(tag));
	}
	const createRange = (startPos, endPos) => [startPos - frameFlagOffset, endPos - frameFlagOffset];
	const root = new HTMLElement(null, {}, "", null, [0, data.length], voidTag, options);
	let currentParent = root;
	const stack = [root];
	let lastTextPos = -1;
	let noNestedTagIndex = void 0;
	let match;
	data = `<${frameflag}>${data}</${frameflag}>`;
	const { lowerCaseTagName, fixNestedATags } = options;
	const dataEndPos = data.length - 27;
	const frameFlagOffset = 27;
	markupPattern.lastIndex = 0;
	while (match = markupPattern.exec(data)) {
		let { 0: matchText, 1: leadingSlash, 2: tagName, 3: attributes, 4: closingSlash } = match;
		const matchLength = matchText.length;
		const tagStartPos = markupPattern.lastIndex - matchLength;
		const tagEndPos = markupPattern.lastIndex;
		if (lastTextPos > -1) {
			if (lastTextPos + matchLength < tagEndPos) {
				const text = data.substring(lastTextPos, tagStartPos);
				currentParent.appendChild(new TextNode(text, currentParent, createRange(lastTextPos, tagStartPos)));
			}
		}
		lastTextPos = markupPattern.lastIndex;
		if (hasCDATA && matchText.startsWith("<![CDATA[")) {
			currentParent.appendChild(new TextNode(matchText, currentParent, createRange(tagStartPos, tagEndPos)));
			continue;
		}
		if (tagName === frameflag) continue;
		if (matchText[1] === "!") {
			if (options.comment) {
				const text = data.substring(tagStartPos + 4, tagEndPos - 3);
				currentParent.appendChild(new CommentNode(text, currentParent, createRange(tagStartPos, tagEndPos)));
			}
			continue;
		}
		if (lowerCaseTagName) tagName = tagName.toLowerCase();
		if (!leadingSlash) {
			const attrs = {};
			for (let attMatch; attMatch = kAttributePattern.exec(attributes);) {
				const { 1: key, 2: val } = attMatch;
				const isQuoted = val[0] === `'` || val[0] === `"`;
				attrs[key.toLowerCase()] = isQuoted ? val.slice(1, val.length - 1) : val;
			}
			const parentTagName = currentParent.rawTagName;
			if (!closingSlash && !options.preserveTagNesting && kElementsClosedByOpening[parentTagName]) {
				if (kElementsClosedByOpening[parentTagName][tagName]) {
					stack.pop();
					currentParent = arr_back(stack);
				}
			}
			if (fixNestedATags && (tagName === "a" || tagName === "A")) {
				if (noNestedTagIndex !== void 0) {
					stack.splice(noNestedTagIndex);
					currentParent = arr_back(stack);
				}
				noNestedTagIndex = stack.length;
			}
			const tagEndPos = markupPattern.lastIndex;
			const tagStartPos = tagEndPos - matchLength;
			currentParent = currentParent.appendChild(new HTMLElement(tagName, attrs, attributes.slice(1), null, createRange(tagStartPos, tagEndPos), voidTag, options));
			stack.push(currentParent);
			if (is_block_text_element(tagName)) {
				const closeMarkup = `</${tagName}>`;
				const closeIndex = lowerCaseTagName ? data.toLocaleLowerCase().indexOf(closeMarkup, markupPattern.lastIndex) : data.indexOf(closeMarkup, markupPattern.lastIndex);
				const textEndPos = closeIndex === -1 ? dataEndPos : closeIndex;
				if (element_should_be_ignore(tagName)) {
					const text = data.substring(tagEndPos, textEndPos);
					if (text.length > 0 && /\S/.test(text)) currentParent.appendChild(new TextNode(text, currentParent, createRange(tagEndPos, textEndPos)));
				}
				if (closeIndex === -1) lastTextPos = markupPattern.lastIndex = data.length + 1;
				else {
					lastTextPos = markupPattern.lastIndex = closeIndex + closeMarkup.length;
					leadingSlash = "/";
				}
			}
		}
		if (leadingSlash || closingSlash || voidTag.isVoidElement(tagName)) while (true) {
			if (noNestedTagIndex != null && (tagName === "a" || tagName === "A")) noNestedTagIndex = void 0;
			if (currentParent.rawTagName === tagName) {
				currentParent.range[1] = createRange(-1, Math.max(lastTextPos, tagEndPos))[1];
				stack.pop();
				currentParent = arr_back(stack);
				break;
			} else {
				const parentTagName = currentParent.tagName;
				if (kElementsClosedByClosing[parentTagName]) {
					if (kElementsClosedByClosing[parentTagName][tagName]) {
						stack.pop();
						currentParent = arr_back(stack);
						continue;
					}
				}
				const openTag = currentParent.rawTagName ? currentParent.rawTagName.toLowerCase() : "";
				if (kElementsClosedByClosingExcept[openTag]) {
					const closingTag = tagName.toLowerCase();
					if (stack.length > 1) {
						const possibleContainer = stack[stack.length - 2];
						if (possibleContainer && possibleContainer.rawTagName && possibleContainer.rawTagName.toLowerCase() === closingTag && !kElementsClosedByClosingExcept[openTag][closingTag]) {
							currentParent.range[1] = createRange(-1, Math.max(lastTextPos, tagEndPos))[1];
							stack.pop();
							currentParent = arr_back(stack);
							continue;
						}
					}
				}
				if (options.closeAllByClosing === true) {
					let i;
					for (i = stack.length - 2; i >= 0; i--) if (stack[i].rawTagName === tagName) break;
					if (i >= 0) {
						while (stack.length > i) {
							currentParent.range[1] = createRange(-1, Math.max(lastTextPos, tagEndPos))[1];
							stack.pop();
							currentParent = arr_back(stack);
						}
						continue;
					}
				}
				break;
			}
		}
	}
	return stack;
}
/**
* Parses HTML and returns a root element
* Parse a chuck of HTML source.
*/
function parse$1(data, options = {}) {
	const stack = base_parse(data, options);
	const [root] = stack;
	while (stack.length > 1) {
		const last = stack.pop();
		const oneBefore = arr_back(stack);
		if (last.parentNode && last.parentNode.parentNode) {
			if (last.parentNode === oneBefore && last.tagName === oneBefore.tagName) {
				if (options.parseNoneClosedTags !== true) {
					oneBefore.removeChild(last);
					last.childNodes.forEach((child) => {
						oneBefore.parentNode.appendChild(child);
					});
					stack.pop();
				}
			} else if (options.parseNoneClosedTags !== true) {
				oneBefore.removeChild(last);
				last.childNodes.forEach((child) => {
					oneBefore.appendChild(child);
				});
			}
		}
	}
	return root;
}
/**
* Resolves a list of {@link NodeInsertable} to a list of nodes,
* and removes nodes from any potential parent.
*/
function resolveInsertable(insertable) {
	return insertable.map((val) => {
		if (typeof val === "string") return new TextNode(val);
		val.remove();
		return val;
	});
}
function resetParent(nodes, parent) {
	return nodes.map((node) => {
		node.parentNode = parent;
		return node;
	});
}
//#endregion
//#region src/valid.ts
/**
* Parses HTML and returns a root element
* Parse a chuck of HTML source.
*/
function valid(data, options = {}) {
	const stack = base_parse(data, options);
	return Boolean(stack.length === 1);
}
//#endregion
//#region src/index.ts
function parse(data, options = {}) {
	return parse$1(data, options);
}
parse.parse = parse$1;
parse.HTMLElement = HTMLElement;
parse.CommentNode = CommentNode;
parse.valid = valid;
parse.Node = Node;
parse.TextNode = TextNode;
parse.NodeType = NodeType;
//#endregion
exports.CommentNode = CommentNode;
exports.HTMLElement = HTMLElement;
exports.Node = Node;
exports.NodeType = NodeType;
exports.TextNode = TextNode;
exports["default"] = parse;
exports.parse = parse;
exports.valid = valid;


/***/ }),

/***/ 22:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

"use strict";
__nccwpck_require__.r(__webpack_exports__);
/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   Hooks: () => (/* binding */ S),
/* harmony export */   Lexer: () => (/* binding */ x),
/* harmony export */   Marked: () => (/* binding */ Z),
/* harmony export */   Parser: () => (/* binding */ b),
/* harmony export */   Renderer: () => (/* binding */ P),
/* harmony export */   TextRenderer: () => (/* binding */ L),
/* harmony export */   Tokenizer: () => (/* binding */ y),
/* harmony export */   defaults: () => (/* binding */ R),
/* harmony export */   getDefaults: () => (/* binding */ C),
/* harmony export */   lexer: () => (/* binding */ pn),
/* harmony export */   marked: () => (/* binding */ f),
/* harmony export */   options: () => (/* binding */ nn),
/* harmony export */   parse: () => (/* binding */ an),
/* harmony export */   parseInline: () => (/* binding */ on),
/* harmony export */   parser: () => (/* binding */ ln),
/* harmony export */   setOptions: () => (/* binding */ rn),
/* harmony export */   use: () => (/* binding */ kt),
/* harmony export */   walkTokens: () => (/* binding */ sn)
/* harmony export */ });
/**
 * marked v18.0.9 - a markdown parser
 * Copyright (c) 2018-2026, MarkedJS. (MIT License)
 * Copyright (c) 2011-2018, Christopher Jeffrey. (MIT License)
 * https://github.com/markedjs/marked
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */

function C(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var R=C();function j(l){R=l}var z={exec:()=>null};function A(l){let e=[];return t=>{let n=Math.max(0,Math.min(3,t-1)),s=e[n];return s||(s=l(n),e[n]=s),s}}function k(l,e=""){let t=typeof l=="string"?l:l.source,n={replace:(s,r)=>{let i=typeof r=="string"?r:r.source;return i=i.replace(m.caret,"$1"),t=t.replace(s,i),n},getRegex:()=>new RegExp(t,e)};return n}var Te=((l="")=>{try{return!!new RegExp("(?<=1)(?<!1)"+l)}catch{return!1}})(),m={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:l=>new RegExp(`^( {0,3}${l})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:A(l=>new RegExp(`^ {0,${l}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:A(l=>new RegExp(`^ {0,${l}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`)),fencesBeginRegex:A(l=>new RegExp(`^ {0,${l}}(?:\`\`\`|~~~)`)),headingBeginRegex:A(l=>new RegExp(`^ {0,${l}}#`)),htmlBeginRegex:A(l=>new RegExp(`^ {0,${l}}<(?:[a-z].*>|!--)`,"i")),blockquoteBeginRegex:A(l=>new RegExp(`^ {0,${l}}>`))},Oe=/^(?:[ \t]*(?:\n|$))+/,we=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ye=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,q=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Pe=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,U=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,oe=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,ae=k(oe).replace(/bull/g,U).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Se=k(oe).replace(/bull/g,U).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),K=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,_e=/^[^\n]+/,W=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,$e=k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",W).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Le=k(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,U).getRegex(),Q="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",X=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Me=k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",X).replace("tag",Q).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),le=l=>k(K).replace("hr",q).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list",l).replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Q).getRegex(),ze=le(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),Ee=le(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),Ce=k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ee).getRegex(),J={blockquote:Ce,code:we,def:$e,fences:ye,heading:Pe,hr:q,html:Me,lheading:ae,list:Le,newline:Oe,paragraph:ze,table:z,text:_e},se=k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",q).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Q).getRegex(),Ae={...J,lheading:Se,table:se,paragraph:k(K).replace("hr",q).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",se).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~~~)[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Q).getRegex()},Ie={...J,html:k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",X).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:z,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:k(K).replace("hr",q).replace("heading",` *#{1,6} *[^
]`).replace("lheading",ae).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Be=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,De=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,pe=/^( {2,}|\\)\n(?!\s*$)/,qe=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,_=/[\p{P}\p{S}]/u,I=/[\s\p{P}\p{S}]/u,v=/[^\s\p{P}\p{S}]/u,ve=k(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,I).getRegex(),He=/[\p{Pi}\p{Ps}"']/u,ue=/(?!~)[\p{P}\p{S}]/u,Ze=/(?!~)[\s\p{P}\p{S}]/u,Ge=/(?:[^\s\p{P}\p{S}]|~)/u,Qe=k(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Te?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ce=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Ne=k(ce,"u").replace(/punct/g,_).getRegex(),je=k(ce,"u").replace(/punct/g,ue).getRegex(),Fe=/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,Ue=k(Fe,"u").replace(/openQuote/g,He).replace(/punct/g,_).getRegex(),he="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ke=k(he,"gu").replace(/notPunctSpace/g,v).replace(/punctSpace/g,I).replace(/punct/g,_).getRegex(),We=k(he,"gu").replace(/notPunctSpace/g,Ge).replace(/punctSpace/g,Ze).replace(/punct/g,ue).getRegex(),Xe="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)",Je=k(Xe,"gu").replace(/notPunctSpace/g,v).replace(/punctSpace/g,I).replace(/punct/g,_).getRegex(),Ve=k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,v).replace(/punctSpace/g,I).replace(/punct/g,_).getRegex(),Ye="^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)",et=k(Ye,"gu").replace(/notPunctSpace/g,v).replace(/punctSpace/g,I).replace(/punct/g,_).getRegex(),tt=k(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,_).getRegex(),nt="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",rt=k(nt,"gu").replace(/notPunctSpace/g,v).replace(/punctSpace/g,I).replace(/punct/g,_).getRegex(),st=k(/\\(punct)/,"gu").replace(/punct/g,_).getRegex(),it=k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ot=k(X).replace("(?:-->|$)","-->").getRegex(),at=k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ot).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),G=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,lt=k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",G).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),de=k(/^!?\[(label)\]\[(ref)\]/).replace("label",G).replace("ref",W).getRegex(),ke=k(/^!?\[(ref)\](?:\[\])?/).replace("ref",W).getRegex(),pt=k("reflink|nolink(?!\\()","g").replace("reflink",de).replace("nolink",ke).getRegex(),ie=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,V={_backpedal:z,anyPunctuation:st,autolink:it,blockSkip:Qe,br:pe,code:De,del:z,delLDelim:z,delRDelim:z,emStrongLDelim:Ne,emStrongRDelimAst:Ke,emStrongRDelimUnd:Ve,escape:Be,link:lt,nolink:ke,punctuation:ve,reflink:de,reflinkSearch:pt,tag:at,text:qe,url:z},ut={...V,emStrongLDelim:Ue,emStrongRDelimAst:Je,emStrongRDelimUnd:et,link:k(/^!?\[(label)\]\((.*?)\)/).replace("label",G).getRegex(),reflink:k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",G).getRegex()},F={...V,emStrongRDelimAst:We,emStrongLDelim:je,delLDelim:tt,delRDelim:rt,url:k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",ie).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:k(/^(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",ie).getRegex()},ct={...F,br:k(pe).replace("{2,}","*").getRegex(),text:k(F.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},H={normal:J,gfm:Ae,pedantic:Ie},B={normal:V,gfm:F,breaks:ct,pedantic:ut};var ht={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},ge=l=>ht[l];function O(l,e){if(e){if(m.escapeTest.test(l))return l.replace(m.escapeReplace,ge)}else if(m.escapeTestNoEncode.test(l))return l.replace(m.escapeReplaceNoEncode,ge);return l}function Y(l){try{l=encodeURI(l).replace(m.percentDecode,"%")}catch{return null}return l}function ee(l,e){let t=l.replace(m.findPipe,(r,i,o)=>{let p=!1,a=i;for(;--a>=0&&o[a]==="\\";)p=!p;return p?"|":" |"}),n=t.split(m.splitPipe),s=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;s<n.length;s++)n[s]=n[s].trim().replace(m.slashPipe,"|");return n}function $(l,e,t){let n=l.length;if(n===0)return"";let s=0;for(;s<n;){let r=l.charAt(n-s-1);if(r===e&&!t)s++;else if(r!==e&&t)s++;else break}return l.slice(0,n-s)}function te(l){let e=l.split(`
`),t=e.length-1;for(;t>=0&&m.blankLine.test(e[t]);)t--;return e.length-t<=2?l:e.slice(0,t+1).join(`
`)}function fe(l,e){if(l.indexOf(e[1])===-1)return-1;let t=0;for(let n=0;n<l.length;n++)if(l[n]==="\\")n++;else if(l[n]===e[0])t++;else if(l[n]===e[1]&&(t--,t<0))return n;return t>0?-2:-1}function me(l,e=0){let t=e,n="";for(let s of l)if(s==="	"){let r=4-t%4;n+=" ".repeat(r),t+=r}else n+=s,t++;return n}function xe(l,e,t,n,s){let r=e.href,i=e.title||null,o=l[1].replace(s.other.outputLinkReplace,"$1");n.state.inLink=!0;let p={type:l[0].charAt(0)==="!"?"image":"link",raw:t,href:r,title:i,text:o,tokens:n.inlineTokens(o)};return n.state.inLink=!1,p}function dt(l,e,t){let n=l.match(t.other.indentCodeCompensation);if(n===null)return e;let s=n[1];return e.split(`
`).map(r=>{let i=r.match(t.other.beginningSpace);if(i===null)return r;let[o]=i;return o.length>=s.length?r.slice(s.length):r}).join(`
`)}var y=class{options;rules;lexer;constructor(e){this.options=e||R}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=this.options.pedantic?t[0]:te(t[0]),s=n.replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:n,codeBlockStyle:"indented",text:s}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],s=dt(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:s}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let s=$(n,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(n=s.trim())}return{type:"heading",raw:$(t[0],`
`),depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:$(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=$(t[0],`
`).split(`
`),s="",r="",i=[];for(;n.length>0;){let o=!1,p=[],a;for(a=0;a<n.length;a++)if(this.rules.other.blockquoteStart.test(n[a]))p.push(n[a]),o=!0;else if(!o)p.push(n[a]);else break;n=n.slice(a);let u=p.join(`
`),c=u.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${u}`:u,r=r?`${r}
${c}`:c;let h=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=h,n.length===0)break;let d=i.at(-1);if(d?.type==="code")break;if(d?.type==="blockquote"){let T=d,g=n.join(`
`),w=T.raw+`
`+g.replace(this.rules.other.blockquoteSetextReplace2,""),M=this.blockquote(w);i[i.length-1]=M,s=`${s}
${g}`,r=r.substring(0,r.length-T.text.length)+M.text;break}else if(d?.type==="list"){let T=d,g=T.raw+`
`+n.join(`
`),w=this.list(g);i[i.length-1]=w,s=s.substring(0,s.length-d.raw.length)+w.raw,r=r.substring(0,r.length-T.raw.length)+w.raw,n=g.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),s=n.length>1,r={type:"list",raw:"",ordered:s,start:s?+n.slice(0,-1):"",loose:!1,items:[]};n=s?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=s?n:"[*+-]");let i=this.rules.other.listItemRegex(n),o=!1;for(;e;){let a=!1,u="",c="";if(!(t=i.exec(e))||this.rules.block.hr.test(e))break;u=t[0],e=e.substring(u.length);let h=me(t[2].split(`
`,1)[0],t[1].length),d=e.split(`
`,1)[0],T=!h.trim(),g=0;if(this.options.pedantic?(g=2,c=h.trimStart()):T?g=t[1].length+1:(g=h.search(this.rules.other.nonSpaceChar),g=g>4?1:g,c=h.slice(g),g+=t[1].length),T&&this.rules.other.blankLine.test(d)&&(u+=d+`
`,e=e.substring(d.length+1),a=!0),!a){let w=this.rules.other.nextBulletRegex(g),M=this.rules.other.hrRegex(g),ne=this.rules.other.fencesBeginRegex(g),re=this.rules.other.headingBeginRegex(g),be=this.rules.other.htmlBeginRegex(g),Re=this.rules.other.blockquoteBeginRegex(g);for(;e;){let N=e.split(`
`,1)[0],D;if(d=N,this.options.pedantic?(d=d.replace(this.rules.other.listReplaceNesting,"  "),D=d):D=d.replace(this.rules.other.tabCharGlobal,"    "),ne.test(d)||re.test(d)||be.test(d)||Re.test(d)||w.test(d)||M.test(d))break;if(D.search(this.rules.other.nonSpaceChar)>=g||!d.trim())c+=`
`+D.slice(g);else{if(T||h.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ne.test(h)||re.test(h)||M.test(h))break;c+=`
`+d}T=!d.trim(),u+=N+`
`,e=e.substring(N.length+1),h=D.slice(g)}}r.loose||(o?r.loose=!0:this.rules.other.doubleBlankLine.test(u)&&(o=!0)),r.items.push({type:"list_item",raw:u,task:!!this.options.gfm&&this.rules.other.listIsTask.test(c),loose:!1,text:c,tokens:[]}),r.raw+=u}let p=r.items.at(-1);if(p)p.raw=p.raw.trimEnd(),p.text=p.text.trimEnd();else return;r.raw=r.raw.trimEnd();for(let a of r.items){this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]);let u=a.tokens[0];if(a.task&&(u?.type==="text"||u?.type==="paragraph")){a.text=a.text.replace(this.rules.other.listReplaceTask,""),u.raw=u.raw.replace(this.rules.other.listReplaceTask,""),u.text=u.text.replace(this.rules.other.listReplaceTask,"");for(let h=this.lexer.inlineQueue.length-1;h>=0;h--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[h].src)){this.lexer.inlineQueue[h].src=this.lexer.inlineQueue[h].src.replace(this.rules.other.listReplaceTask,"");break}let c=this.rules.other.listTaskCheckbox.exec(a.raw);if(c){let h={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};a.checked=h.checked,r.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=h.raw+a.tokens[0].raw,a.tokens[0].text=h.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(h)):a.tokens.unshift({type:"paragraph",raw:h.raw,text:h.raw,tokens:[h]}):a.tokens.unshift(h)}}else a.task&&(a.task=!1);if(!r.loose){let c=a.tokens.filter(d=>d.type==="space"),h=c.length>0&&c.some(d=>this.rules.other.anyLine.test(d.raw));r.loose=h}}if(r.loose)for(let a of r.items){a.loose=!0;for(let u of a.tokens)u.type==="text"&&(u.type="paragraph")}return r}}html(e){let t=this.rules.block.html.exec(e);if(t){let n=te(t[0]);return{type:"html",block:!0,raw:n,pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:n}}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:$(t[0],`
`),href:s,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=ee(t[1]),s=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),r=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:$(t[0],`
`),header:[],align:[],rows:[]};if(n.length===s.length){for(let o of s)this.rules.other.tableAlignRight.test(o)?i.align.push("right"):this.rules.other.tableAlignCenter.test(o)?i.align.push("center"):this.rules.other.tableAlignLeft.test(o)?i.align.push("left"):i.align.push(null);for(let o=0;o<n.length;o++)i.header.push({text:n[o],tokens:this.lexer.inline(n[o]),header:!0,align:i.align[o]});for(let o of r)i.rows.push(ee(o,i.header.length).map((p,a)=>({text:p,tokens:this.lexer.inline(p),header:!1,align:i.align[a]})));return i}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let n=t[1].trim();return{type:"heading",raw:$(t[0],`
`),depth:t[2].charAt(0)==="="?1:2,text:n,tokens:this.lexer.inline(n)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let i=$(n.slice(0,-1),"\\");if((n.length-i.length)%2===0)return}else{let i=fe(t[2],"()");if(i===-2)return;if(i>-1){let p=(t[0].indexOf("!")===0?5:4)+t[1].length+i;t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,p).trim(),t[3]=""}}let s=t[2],r="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],r=i[3])}else r=t[3]?t[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?s=s.slice(1):s=s.slice(1,-1)),xe(t,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:r&&r.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let s=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),r=t[s.toLowerCase()];if(!r){let i=n[0].charAt(0);return{type:"text",raw:i,text:i}}return xe(n,r,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let s=this.rules.inline.emStrongLDelim.exec(e);if(!s||!s[1]&&!s[2]&&!s[3]&&!s[4]||s[4]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(s[1]||s[3]||"")||!n||this.rules.inline.punctuation.exec(n)){let i=[...s[0]].length-1,o,p,a=i,u=0,c=s[0][0],h=n===c,d=c==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(d.lastIndex=0,t=t.slice(-1*e.length+i);(s=d.exec(t))!==null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o)continue;if(p=[...o].length,s[3]||s[4]){a+=p;continue}else if(s[5]||s[6]){if(i%3&&!((i+p)%3)){u+=p;continue}if(h)break}if(a-=p,a>0)continue;p=Math.min(p,p+a+u);let T=[...s[0]][0].length,g=e.slice(0,i+s.index+T+p);if(Math.min(i,p)%2){let M=g.slice(1,-1);return{type:"em",raw:g,text:M,tokens:this.lexer.inlineTokens(M)}}let w=g.slice(2,-2);return{type:"strong",raw:g,text:w,tokens:this.lexer.inlineTokens(w)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(n),r=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return s&&r&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let s=this.rules.inline.delLDelim.exec(e);if(!s)return;if(!(s[1]||"")||!n||this.rules.inline.punctuation.exec(n)){let i=[...s[0]].length-1,o,p,a=i,u=this.rules.inline.delRDelim;for(u.lastIndex=0,t=t.slice(-1*e.length+i);(s=u.exec(t))!==null;){if(o=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!o||(p=[...o].length,p!==i))continue;if(s[3]||s[4]){a+=p;continue}if(a-=p,a>0)continue;p=Math.min(p,p+a);let c=[...s[0]][0].length,h=e.slice(0,i+s.index+c+p),d=h.slice(i,-i);return{type:"del",raw:h,text:d,tokens:this.lexer.inlineTokens(d)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,s;return t[2]==="@"?(n=t[1],s="mailto:"+n):(n=t[1],s=n),{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,s;if(t[2]==="@")n=t[0],s="mailto:"+n;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(r!==t[0]);n=t[0],t[1]==="www."?s="http://"+t[0]:s=t[0]}return{type:"link",raw:t[0],text:n,href:s,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}};var x=class l{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||R,this.options.tokenizer=this.options.tokenizer||new y,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:m,block:H.normal,inline:B.normal};this.options.pedantic?(t.block=H.pedantic,t.inline=B.pedantic):this.options.gfm&&(t.block=H.gfm,this.options.breaks?t.inline=B.breaks:t.inline=B.gfm),this.tokenizer.rules=t}static get rules(){return{block:H,inline:B}}static lex(e,t){return new l(t).lex(e)}static lexInline(e,t){return new l(t).inlineTokens(e)}lex(e){e=e.replace(m.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(m.tabCharGlobal,"    ").replace(m.spaceLine,""));let s=1/0;for(;e;){if(e.length<s)s=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}let r;if(this.options.extensions?.block?.some(o=>(r=o.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let o=t.at(-1);r.raw.length===1&&o!==void 0?o.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let o=t.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+r.raw,o.text+=`
`+r.text,this.inlineQueue.at(-1).src=o.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let o=t.at(-1);o?.type==="paragraph"||o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+r.raw,o.text+=`
`+r.raw,this.inlineQueue.at(-1).src=o.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startBlock){let o=1/0,p=e.slice(1),a;this.options.extensions.startBlock.forEach(u=>{a=u.call({lexer:this},p),typeof a=="number"&&a>=0&&(o=Math.min(o,a))}),o<1/0&&o>=0&&(i=e.substring(0,o+1))}if(this.state.top&&(r=this.tokenizer.paragraph(i))){let o=t.at(-1);n&&o?.type==="paragraph"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+r.raw,o.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):t.push(r),n=i.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let o=t.at(-1);o?.type==="text"?(o.raw+=(o.raw.endsWith(`
`)?"":`
`)+r.raw,o.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=o.text):t.push(r);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=e;if(this.tokens.links){let o=Object.keys(this.tokens.links);o.length>0&&(n=n.replace(this.tokenizer.rules.inline.reflinkSearch,p=>o.includes(p.slice(p.lastIndexOf("[")+1,-1))?"["+"a".repeat(p.length-2)+"]":p))}n=n.replace(this.tokenizer.rules.inline.anyPunctuation,"++"),n=n.replace(this.tokenizer.rules.inline.blockSkip,(o,p,a)=>{let u=a?a.length:0;return o.slice(0,u)+"["+"a".repeat(o.length-u-2)+"]"}),n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let s=!1,r="",i=1/0;for(;e;){if(e.length<i)i=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}s||(r=""),s=!1;let o;if(this.options.extensions?.inline?.some(a=>(o=a.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let a=t.at(-1);o.type==="text"&&a?.type==="text"?(a.raw+=o.raw,a.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,n,r)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e,n,r)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let p=e;if(this.options.extensions?.startInline){let a=1/0,u=e.slice(1),c;this.options.extensions.startInline.forEach(h=>{c=h.call({lexer:this},u),typeof c=="number"&&c>=0&&(a=Math.min(a,c))}),a<1/0&&a>=0&&(p=e.substring(0,a+1))}if(o=this.tokenizer.inlineText(p)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(r=o.raw.slice(-1)),s=!0;let a=t.at(-1);a?.type==="text"?(a.raw+=o.raw,a.text+=o.text):t.push(o);continue}if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return t}infiniteLoopError(e){let t="Infinite loop on byte: "+e;if(this.options.silent)console.error(t);else throw new Error(t)}};var P=class{options;parser;constructor(e){this.options=e||R}space(e){return""}code({text:e,lang:t,escaped:n}){let s=(t||"").match(m.notSpaceStart)?.[0],r=e.replace(m.endingNewline,"")+`
`;return s?'<pre><code class="language-'+O(s)+'">'+(n?r:O(r,!0))+`</code></pre>
`:"<pre><code>"+(n?r:O(r,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,s="";for(let o=0;o<e.items.length;o++){let p=e.items[o];s+=this.listitem(p)}let r=t?"ol":"ul",i=t&&n!==1?' start="'+n+'"':"";return"<"+r+i+`>
`+s+"</"+r+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let r=0;r<e.header.length;r++)n+=this.tablecell(e.header[r]);t+=this.tablerow({text:n});let s="";for(let r=0;r<e.rows.length;r++){let i=e.rows[r];n="";for(let o=0;o<i.length;o++)n+=this.tablecell(i[o]);s+=this.tablerow({text:n})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+s+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${O(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let s=this.parser.parseInline(n),r=Y(e);if(r===null)return s;e=r;let i='<a href="'+e+'"';return t&&(i+=' title="'+O(t)+'"'),i+=">"+s+"</a>",i}image({href:e,title:t,text:n,tokens:s}){s&&(n=this.parser.parseInline(s,this.parser.textRenderer));let r=Y(e);if(r===null)return O(n);e=r;let i=`<img src="${e}" alt="${O(n)}"`;return t&&(i+=` title="${O(t)}"`),i+=">",i}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:O(e.text)}};var L=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}};var b=class l{options;renderer;textRenderer;constructor(e){this.options=e||R,this.options.renderer=this.options.renderer||new P,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new L}static parse(e,t){return new l(t).parse(e)}static parseInline(e,t){return new l(t).parseInline(e)}parse(e){this.renderer.parser=this;let t="";for(let n=0;n<e.length;n++){let s=e[n];if(this.options.extensions?.renderers?.[s.type]){let i=s,o=this.options.extensions.renderers[i.type].call({parser:this},i);if(o!==!1||!["space","hr","heading","code","table","blockquote","list","checkbox","html","def","paragraph","text"].includes(i.type)){t+=o||"";continue}}let r=s;switch(r.type){case"space":{t+=this.renderer.space(r);break}case"hr":{t+=this.renderer.hr(r);break}case"heading":{t+=this.renderer.heading(r);break}case"code":{t+=this.renderer.code(r);break}case"table":{t+=this.renderer.table(r);break}case"blockquote":{t+=this.renderer.blockquote(r);break}case"list":{t+=this.renderer.list(r);break}case"checkbox":{t+=this.renderer.checkbox(r);break}case"html":{t+=this.renderer.html(r);break}case"def":{t+=this.renderer.def(r);break}case"paragraph":{t+=this.renderer.paragraph(r);break}case"text":{t+=this.renderer.text(r);break}default:{let i='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(i),"";throw new Error(i)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n="";for(let s=0;s<e.length;s++){let r=e[s];if(this.options.extensions?.renderers?.[r.type]){let o=this.options.extensions.renderers[r.type].call({parser:this},r);if(o!==!1||!["escape","html","link","image","checkbox","strong","em","codespan","br","del","text"].includes(r.type)){n+=o||"";continue}}let i=r;switch(i.type){case"escape":{n+=t.text(i);break}case"html":{n+=t.html(i);break}case"link":{n+=t.link(i);break}case"image":{n+=t.image(i);break}case"checkbox":{n+=t.checkbox(i);break}case"strong":{n+=t.strong(i);break}case"em":{n+=t.em(i);break}case"codespan":{n+=t.codespan(i);break}case"br":{n+=t.br(i);break}case"del":{n+=t.del(i);break}case"text":{n+=t.text(i);break}default:{let o='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw new Error(o)}}}return n}};var S=class{options;block;constructor(e){this.options=e||R}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?x.lex:x.lexInline}provideParser(e=this.block){return e?b.parse:b.parseInline}};var Z=class{defaults=C();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=b;Renderer=P;TextRenderer=L;Lexer=x;Tokenizer=y;Hooks=S;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let s of e)switch(n=n.concat(t.call(this,s)),s.type){case"table":{let r=s;for(let i of r.header)n=n.concat(this.walkTokens(i.tokens,t));for(let i of r.rows)for(let o of i)n=n.concat(this.walkTokens(o.tokens,t));break}case"list":{let r=s;n=n.concat(this.walkTokens(r.items,t));break}default:{let r=s;this.defaults.extensions?.childTokens?.[r.type]?this.defaults.extensions.childTokens[r.type].forEach(i=>{let o=r[i].flat(1/0);n=n.concat(this.walkTokens(o,t))}):r.tokens&&(n=n.concat(this.walkTokens(r.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let s={...n};if(s.async=this.defaults.async||s.async||!1,n.extensions&&(n.extensions.forEach(r=>{if(!r.name)throw new Error("extension name required");if("renderer"in r){let i=t.renderers[r.name];i?t.renderers[r.name]=function(...o){let p=r.renderer.apply(this,o);return p===!1&&(p=i.apply(this,o)),p}:t.renderers[r.name]=r.renderer}if("tokenizer"in r){if(!r.level||r.level!=="block"&&r.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=t[r.level];i?i.unshift(r.tokenizer):t[r.level]=[r.tokenizer],r.start&&(r.level==="block"?t.startBlock?t.startBlock.push(r.start):t.startBlock=[r.start]:r.level==="inline"&&(t.startInline?t.startInline.push(r.start):t.startInline=[r.start]))}"childTokens"in r&&r.childTokens&&(t.childTokens[r.name]=r.childTokens)}),s.extensions=t),n.renderer){let r=this.defaults.renderer||new P(this.defaults);for(let i in n.renderer){if(!(i in r))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let o=i,p=n.renderer[o],a=r[o];r[o]=(...u)=>{let c=p.apply(r,u);return c===!1&&(c=a.apply(r,u)),c||""}}s.renderer=r}if(n.tokenizer){let r=this.defaults.tokenizer||new y(this.defaults);for(let i in n.tokenizer){if(!(i in r))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let o=i,p=n.tokenizer[o],a=r[o];r[o]=(...u)=>{let c=p.apply(r,u);return c===!1&&(c=a.apply(r,u)),c}}s.tokenizer=r}if(n.hooks){let r=this.defaults.hooks||new S;for(let i in n.hooks){if(!(i in r))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let o=i,p=n.hooks[o],a=r[o];S.passThroughHooks.has(i)?r[o]=u=>{if(this.defaults.async&&S.passThroughHooksRespectAsync.has(i))return(async()=>{let h=await p.call(r,u);return a.call(r,h)})();let c=p.call(r,u);return a.call(r,c)}:r[o]=(...u)=>{if(this.defaults.async)return(async()=>{let h=await p.apply(r,u);return h===!1&&(h=await a.apply(r,u)),h})();let c=p.apply(r,u);return c===!1&&(c=a.apply(r,u)),c}}s.hooks=r}if(n.walkTokens){let r=this.defaults.walkTokens,i=n.walkTokens;s.walkTokens=function(o){let p=[];return p.push(i.call(this,o)),r&&(p=p.concat(r.call(this,o))),p}}this.defaults={...this.defaults,...s}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return x.lex(e,t??this.defaults)}parser(e,t){return b.parse(e,t??this.defaults)}parseMarkdown(e){return(n,s)=>{let r={...s},i={...this.defaults,...r},o=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return o(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return o(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return o(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let p=i.hooks?await i.hooks.preprocess(n):n,u=await(i.hooks?await i.hooks.provideLexer(e):e?x.lex:x.lexInline)(p,i),c=i.hooks?await i.hooks.processAllTokens(u):u;i.walkTokens&&await Promise.all(this.walkTokens(c,i.walkTokens));let d=await(i.hooks?await i.hooks.provideParser(e):e?b.parse:b.parseInline)(c,i);return i.hooks?await i.hooks.postprocess(d):d})().catch(o);try{i.hooks&&(n=i.hooks.preprocess(n));let a=(i.hooks?i.hooks.provideLexer(e):e?x.lex:x.lexInline)(n,i);i.hooks&&(a=i.hooks.processAllTokens(a)),i.walkTokens&&this.walkTokens(a,i.walkTokens);let c=(i.hooks?i.hooks.provideParser(e):e?b.parse:b.parseInline)(a,i);return i.hooks&&(c=i.hooks.postprocess(c)),c}catch(p){return o(p)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let s="<p>An error occurred:</p><pre>"+O(n.message+"",!0)+"</pre>";return t?Promise.resolve(s):s}if(t)return Promise.reject(n);throw n}}};var E=new Z;function f(l,e){return E.parse(l,e)}f.options=f.setOptions=function(l){return E.setOptions(l),f.defaults=E.defaults,j(f.defaults),f};f.getDefaults=C;f.defaults=R;function kt(...l){return E.use(...l),f.defaults=E.defaults,j(f.defaults),f}f.use=kt;f.walkTokens=function(l,e){return E.walkTokens(l,e)};f.parseInline=E.parseInline;f.Parser=b;f.parser=b.parse;f.Renderer=P;f.TextRenderer=L;f.Lexer=x;f.lexer=x.lex;f.Tokenizer=y;f.Hooks=S;f.parse=f;var nn=f.options,rn=f.setOptions,sn=f.walkTokens,on=f.parseInline,an=f,ln=b.parse,pn=x.lex;
//# sourceMappingURL=marked.esm.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__nccwpck_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
const core = __nccwpck_require__(484);
const parser = __nccwpck_require__(26);
const path = __nccwpck_require__(928);

const filesStructure = __nccwpck_require__(349);
const SyncConfluence = __nccwpck_require__(794);
const markdownToHtml = __nccwpck_require__(385);
const { toStorageFormat } = __nccwpck_require__(397);
const { resolveAuthorization, normaliseBaseUrl } = __nccwpck_require__(38);

const root = "./" + core.getInput("folder", { required: true }) + "/";
const spaceKey = core.getInput("space-key", { required: true });
const rootParentPageId = core.getInput("parent-page-id", { required: true });

const cachedPageIdByTitle = {};
let syncConfluence;

async function findOrCreatePage(pageTitle, parentPageId) {
  let pageId;
  if (cachedPageIdByTitle[pageTitle]) {
    pageId = cachedPageIdByTitle[pageTitle];
  } else {
    pageId = await syncConfluence.getPageIdByTitle(pageTitle);
    if (!pageId) {
      pageId = await syncConfluence.createEmptyParentPage(
        pageTitle,
        parentPageId
      );
    }
    cachedPageIdByTitle[pageTitle] = pageId;
  }
  return pageId;
}

async function uploadAttachment(attachmentSource, pageId) {
  attachmentSource = root + attachmentSource;
  const existingAttachments = await syncConfluence.getAttachments(pageId);
  if (existingAttachments) {
    for (let attachment of existingAttachments) {
      if (attachment.title === path.basename(attachmentSource)) {
        return await syncConfluence.updateAttachment(
          pageId,
          attachment.id,
          attachmentSource
        );
      }
    }
  }
  return await syncConfluence.uploadAttachment(pageId, attachmentSource);
}

async function handleAttachments(contentPageId, data) {
  const html = parser.parse(data);
  const images = html.querySelectorAll("img");
  for (var image of images) {
    const attachmentSource = image.getAttribute("src");
    // TODO handle remote images
    if (attachmentSource.includes("http")) {
      continue;
    }
    var attachment = await uploadAttachment(
      attachmentSource.replace("..", "."),
      contentPageId
    );
    image.replaceWith(
      parser.parse(
        '<ac:image><ri:attachment ri:filename=' + attachment.title + " /></ac:image>"
      )
    );
  }
  return html.toString();
}

async function main() {
  const authorization = await resolveAuthorization({
    email: core.getInput("email"),
    apiToken: core.getInput("api-token"),
    username: core.getInput("username"),
    password: core.getInput("password"),
    clientId: core.getInput("client-id"),
    clientSecret: core.getInput("client-secret"),
  });

  syncConfluence = new SyncConfluence(
    normaliseBaseUrl(core.getInput("confluence-base-url", { required: true })),
    authorization,
    spaceKey,
    core.getInput("space-id")
  );

  const files = filesStructure(root);
  if (!files.length) {
    console.log("No markdown files found in %s", root);
  }
  for (const f of files) {
    let filePath = f.join("/");
    let currentParentPageId = rootParentPageId;
    let pathsInRoot = root.split("/");
    let newRoot = root;
    if (pathsInRoot.length > 2) {
      newRoot = "./" + pathsInRoot[1] + "/";
      console.log("Root for action includes subfolder. Assigning root as: " + newRoot);
    }
    for (const subPath of f) {
      if (subPath.includes(".md")) {
        let pageTitle = subPath.replace(".md", "");
        let contentPageId = await findOrCreatePage(pageTitle, currentParentPageId);
        const data = await markdownToHtml(newRoot + filePath);
        let htmlContent = await handleAttachments(contentPageId, data);
        await syncConfluence.putContent(
          contentPageId,
          pageTitle,
          toStorageFormat(htmlContent)
        );
      } else {
        currentParentPageId = await findOrCreatePage(subPath, currentParentPageId);
      }
    }
  }
}

main().catch((err) => {
  core.setFailed(err.message);
});

module.exports = __webpack_exports__;
/******/ })()
;