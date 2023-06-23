import { __extends } from "tslib";
import { GetNamespaceAnalyticsMatchmakerLiveInput, GetNamespaceAnalyticsMatchmakerLiveOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand, serializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetNamespaceAnalyticsMatchmakerLiveCommand = (function (_super) {
    __extends(GetNamespaceAnalyticsMatchmakerLiveCommand, _super);
    function GetNamespaceAnalyticsMatchmakerLiveCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetNamespaceAnalyticsMatchmakerLiveCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetNamespaceAnalyticsMatchmakerLiveCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetNamespaceAnalyticsMatchmakerLiveInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetNamespaceAnalyticsMatchmakerLiveOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetNamespaceAnalyticsMatchmakerLiveCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand(input, context);
    };
    GetNamespaceAnalyticsMatchmakerLiveCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetNamespaceAnalyticsMatchmakerLiveCommand(output, context);
    };
    return GetNamespaceAnalyticsMatchmakerLiveCommand;
}($Command));
export { GetNamespaceAnalyticsMatchmakerLiveCommand };
