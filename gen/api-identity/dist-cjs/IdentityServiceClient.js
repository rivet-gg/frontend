"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityServiceClient = void 0;
const runtimeConfig_1 = require("./runtimeConfig");
const config_resolver_1 = require("@aws-sdk/config-resolver");
const middleware_content_length_1 = require("@aws-sdk/middleware-content-length");
const middleware_host_header_1 = require("@aws-sdk/middleware-host-header");
const middleware_logger_1 = require("@aws-sdk/middleware-logger");
const middleware_retry_1 = require("@aws-sdk/middleware-retry");
const middleware_user_agent_1 = require("@aws-sdk/middleware-user-agent");
const smithy_client_1 = require("@aws-sdk/smithy-client");
const common_1 = require("@rivet-gg/common");
class IdentityServiceClient extends smithy_client_1.Client {
    constructor(configuration) {
        function rivetConfig(input) {
            var _a, _b, _c, _d, _e;
            let endpoint = (_a = configuration.endpoint) !== null && _a !== void 0 ? _a : null;
            if (endpoint === null) {
                try {
                    endpoint = (_b = process.env.RIVET_IDENTITY_API_URL) !== null && _b !== void 0 ? _b : null;
                }
                catch (_f) {
                }
                if (endpoint === null) {
                    endpoint = "https://identity.api.rivet.gg/v1";
                }
            }
            let token = (_c = input.token) !== null && _c !== void 0 ? _c : null;
            if (token === null) {
                try {
                    token = (_e = (_d = process.env.RIVET_IDENTITY_TOKEN) !== null && _d !== void 0 ? _d : process.env.RIVET_TOKEN) !== null && _e !== void 0 ? _e : null;
                }
                catch (_g) {
                }
            }
            return Object.assign(Object.assign({}, input), {
                endpoint,
                token,
            });
        }
        let _config_0 = (0, runtimeConfig_1.getRuntimeConfig)(configuration);
        let _config_1 = rivetConfig(_config_0);
        if (!configuration.hasOwnProperty("requestHandler")) {
            _config_1.requestHandler = common_1.middleware.requestHandlerMiddleware(_config_1.token);
        }
        let _config_2 = (0, config_resolver_1.resolveCustomEndpointsConfig)(_config_1);
        let _config_3 = (0, middleware_retry_1.resolveRetryConfig)(_config_2);
        let _config_4 = (0, middleware_host_header_1.resolveHostHeaderConfig)(_config_3);
        let _config_5 = (0, middleware_user_agent_1.resolveUserAgentConfig)(_config_4);
        super(_config_5);
        this.config = _config_5;
        this.middlewareStack.use((0, middleware_retry_1.getRetryPlugin)(this.config));
        this.middlewareStack.use((0, middleware_content_length_1.getContentLengthPlugin)(this.config));
        this.middlewareStack.use((0, middleware_host_header_1.getHostHeaderPlugin)(this.config));
        this.middlewareStack.use((0, middleware_logger_1.getLoggerPlugin)(this.config));
        this.middlewareStack.use((0, middleware_user_agent_1.getUserAgentPlugin)(this.config));
    }
    destroy() {
        super.destroy();
    }
}
exports.IdentityServiceClient = IdentityServiceClient;
