var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/is-promise/index.js
var require_is_promise = __commonJS({
  "node_modules/is-promise/index.js"(exports, module2) {
    module2.exports = isPromise;
    module2.exports.default = isPromise;
    function isPromise(obj) {
      return !!obj && (typeof obj === "object" || typeof obj === "function") && typeof obj.then === "function";
    }
  }
});

// node_modules/@netlify/functions/dist/lib/consts.js
var require_consts = __commonJS({
  "node_modules/@netlify/functions/dist/lib/consts.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.METADATA_VERSION = exports.HTTP_STATUS_OK = exports.HTTP_STATUS_METHOD_NOT_ALLOWED = exports.BUILDER_FUNCTIONS_FLAG = void 0;
    var BUILDER_FUNCTIONS_FLAG = true;
    exports.BUILDER_FUNCTIONS_FLAG = BUILDER_FUNCTIONS_FLAG;
    var HTTP_STATUS_METHOD_NOT_ALLOWED = 405;
    exports.HTTP_STATUS_METHOD_NOT_ALLOWED = HTTP_STATUS_METHOD_NOT_ALLOWED;
    var HTTP_STATUS_OK = 200;
    exports.HTTP_STATUS_OK = HTTP_STATUS_OK;
    var METADATA_VERSION = 1;
    exports.METADATA_VERSION = METADATA_VERSION;
  }
});

// node_modules/@netlify/functions/dist/lib/builder.js
var require_builder = __commonJS({
  "node_modules/@netlify/functions/dist/lib/builder.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.builder = void 0;
    var is_promise_1 = __importDefault(require_is_promise());
    var consts_1 = require_consts();
    var augmentResponse = function(response) {
      var _a;
      if (!response || response.statusCode !== consts_1.HTTP_STATUS_OK) {
        return response;
      }
      var metadata = { version: consts_1.METADATA_VERSION, builder_function: consts_1.BUILDER_FUNCTIONS_FLAG, ttl: (_a = response.ttl) !== null && _a !== void 0 ? _a : 0 };
      return __assign(__assign({}, response), { metadata });
    };
    var wrapHandler = function(handler2) {
      return function(event, context, callback) {
        if (event.httpMethod !== "GET" && event.httpMethod !== "HEAD") {
          return Promise.resolve({
            body: "Method Not Allowed",
            statusCode: consts_1.HTTP_STATUS_METHOD_NOT_ALLOWED
          });
        }
        var modifiedEvent = __assign(__assign({}, event), { multiValueQueryStringParameters: {}, queryStringParameters: {} });
        var wrappedCallback = function(error, response) {
          return callback === null || callback === void 0 ? void 0 : callback(error, augmentResponse(response));
        };
        var execution = handler2(modifiedEvent, context, wrappedCallback);
        if ((0, is_promise_1.default)(execution)) {
          return execution.then(augmentResponse);
        }
        return execution;
      };
    };
    exports.builder = wrapHandler;
  }
});

// node_modules/@netlify/functions/dist/lib/schedule.js
var require_schedule = __commonJS({
  "node_modules/@netlify/functions/dist/lib/schedule.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.schedule = void 0;
    var schedule2 = function(cron, handler2) {
      return handler2;
    };
    exports.schedule = schedule2;
  }
});

// node_modules/@netlify/functions/dist/lib/secrets_helper.js
var require_secrets_helper = __commonJS({
  "node_modules/@netlify/functions/dist/lib/secrets_helper.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSecrets = void 0;
    var buffer_1 = require("buffer");
    var https_1 = require("https");
    var process_1 = require("process");
    var siteId = process_1.env.SITE_ID;
    var camelize = function(text) {
      var safe = text.replace(/[-_\s.]+(.)?/g, function(_, sub) {
        return sub ? sub.toUpperCase() : "";
      });
      return safe.slice(0, 1).toLowerCase() + safe.slice(1);
    };
    var serviceNormalizeOverrides = {
      GITHUB: "gitHub"
    };
    var oneGraphRequest = function(secretToken, requestBody) {
      return new Promise(function(resolve, reject) {
        var port = 443;
        var options = {
          host: "serve.onegraph.com",
          path: "/graphql?app_id=".concat(siteId),
          port,
          method: "POST",
          headers: {
            Authorization: "Bearer ".concat(secretToken),
            "Content-Type": "application/json",
            Accept: "application/json",
            "Content-Length": requestBody ? buffer_1.Buffer.byteLength(requestBody) : 0
          }
        };
        var req = (0, https_1.request)(options, function(res) {
          if (res.statusCode !== 200) {
            return reject(new Error(String(res.statusCode)));
          }
          var body = [];
          res.on("data", function(chunk) {
            body.push(chunk);
          });
          res.on("end", function() {
            var data = buffer_1.Buffer.concat(body).toString();
            try {
              var result = JSON.parse(data);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          });
        });
        req.on("error", function(error) {
          reject(error);
        });
        req.write(requestBody);
        req.end();
      });
    };
    var formatSecrets = function(result) {
      var _a, _b, _c;
      var responseServices = (_c = (_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.serviceMetadata) === null || _c === void 0 ? void 0 : _c.loggedInServices;
      if (!responseServices) {
        return {};
      }
      var newSecrets = responseServices.reduce(function(acc, service) {
        var _a2;
        var normalized = serviceNormalizeOverrides[service.service] || camelize(service.friendlyServiceName);
        return __assign(__assign({}, acc), (_a2 = {}, _a2[normalized] = service, _a2));
      }, {});
      return newSecrets;
    };
    var getSecrets = function(event) {
      return __awaiter(void 0, void 0, void 0, function() {
        var eventToken, secretToken, doc, body, result, newSecrets;
        var _a;
        return __generator(this, function(_b) {
          switch (_b.label) {
            case 0:
              eventToken = (_a = event) === null || _a === void 0 ? void 0 : _a.authlifyToken;
              secretToken = eventToken || process_1.env.ONEGRAPH_AUTHLIFY_TOKEN;
              if (!secretToken) {
                return [2, {}];
              }
              doc = "query FindLoggedInServicesQuery {\n    me {\n      serviceMetadata {\n        loggedInServices {\n          friendlyServiceName\n          service\n          isLoggedIn\n          bearerToken\n          grantedScopes {\n            scope\n            scopeInfo {\n              category\n              scope\n              display\n              isDefault\n              isRequired\n              description\n              title\n            }\n          }\n        }\n      }\n    }\n  }";
              body = JSON.stringify({ query: doc });
              return [4, oneGraphRequest(secretToken, new TextEncoder().encode(body))];
            case 1:
              result = _b.sent();
              newSecrets = formatSecrets(result);
              return [2, newSecrets];
          }
        });
      });
    };
    exports.getSecrets = getSecrets;
  }
});

// node_modules/@netlify/functions/dist/lib/secrets.js
var require_secrets = __commonJS({
  "node_modules/@netlify/functions/dist/lib/secrets.js"(exports) {
    "use strict";
    var __assign = exports && exports.__assign || function() {
      __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };
    var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    var __generator = exports && exports.__generator || function(thisArg, body) {
      var _ = { label: 0, sent: function() {
        if (t[0] & 1)
          throw t[1];
        return t[1];
      }, trys: [], ops: [] }, f, y, t, g;
      return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
        return this;
      }), g;
      function verb(n) {
        return function(v) {
          return step([n, v]);
        };
      }
      function step(op) {
        if (f)
          throw new TypeError("Generator is already executing.");
        while (_)
          try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
              return t;
            if (y = 0, t)
              op = [op[0] & 2, t.value];
            switch (op[0]) {
              case 0:
              case 1:
                t = op;
                break;
              case 4:
                _.label++;
                return { value: op[1], done: false };
              case 5:
                _.label++;
                y = op[1];
                op = [0];
                continue;
              case 7:
                op = _.ops.pop();
                _.trys.pop();
                continue;
              default:
                if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                  _ = 0;
                  continue;
                }
                if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                  _.label = op[1];
                  break;
                }
                if (op[0] === 6 && _.label < t[1]) {
                  _.label = t[1];
                  t = op;
                  break;
                }
                if (t && _.label < t[2]) {
                  _.label = t[2];
                  _.ops.push(op);
                  break;
                }
                if (t[2])
                  _.ops.pop();
                _.trys.pop();
                continue;
            }
            op = body.call(thisArg, _);
          } catch (e) {
            op = [6, e];
            y = 0;
          } finally {
            f = t = 0;
          }
        if (op[0] & 5)
          throw op[1];
        return { value: op[0] ? op[1] : void 0, done: true };
      }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.withSecrets = exports.getSecrets = void 0;
    var secrets_helper_1 = require_secrets_helper();
    var secrets_helper_2 = require_secrets_helper();
    Object.defineProperty(exports, "getSecrets", { enumerable: true, get: function() {
      return secrets_helper_2.getSecrets;
    } });
    var withSecrets = function(handler2) {
      return function(event, context, callback) {
        return __awaiter(void 0, void 0, void 0, function() {
          var secrets;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4, (0, secrets_helper_1.getSecrets)(event)];
              case 1:
                secrets = _a.sent();
                return [2, handler2(event, __assign(__assign({}, context), { secrets }), callback)];
            }
          });
        });
      };
    };
    exports.withSecrets = withSecrets;
  }
});

// node_modules/@netlify/functions/dist/function/index.js
var require_function = __commonJS({
  "node_modules/@netlify/functions/dist/function/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.withSecrets = exports.getSecrets = void 0;
    var secrets_1 = require_secrets();
    Object.defineProperty(exports, "getSecrets", { enumerable: true, get: function() {
      return secrets_1.getSecrets;
    } });
    Object.defineProperty(exports, "withSecrets", { enumerable: true, get: function() {
      return secrets_1.withSecrets;
    } });
  }
});

// node_modules/@netlify/functions/dist/main.js
var require_main = __commonJS({
  "node_modules/@netlify/functions/dist/main.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.schedule = exports.builder = void 0;
    var builder_1 = require_builder();
    Object.defineProperty(exports, "builder", { enumerable: true, get: function() {
      return builder_1.builder;
    } });
    var schedule_1 = require_schedule();
    Object.defineProperty(exports, "schedule", { enumerable: true, get: function() {
      return schedule_1.schedule;
    } });
    __exportStar(require_function(), exports);
  }
});

// netlify/functions/hello-cron.ts
__export(exports, {
  handler: () => handler
});
var import_functions = __toModule(require_main());
var handlerFn = async () => {
  return {
    statusCode: 200,
    body: "this is a demo cron"
  };
};
var handler = (0, import_functions.schedule)("* * * * *", handlerFn);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=hello-cron.js.map
