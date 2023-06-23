import { __extends } from "tslib";
import { GetIdentitySummariesInput, GetIdentitySummariesOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetIdentitySummariesCommand, serializeAws_restJson1GetIdentitySummariesCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetIdentitySummariesCommand = (function (_super) {
    __extends(GetIdentitySummariesCommand, _super);
    function GetIdentitySummariesCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetIdentitySummariesCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "GetIdentitySummariesCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetIdentitySummariesInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetIdentitySummariesOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetIdentitySummariesCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetIdentitySummariesCommand(input, context);
    };
    GetIdentitySummariesCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetIdentitySummariesCommand(output, context);
    };
    return GetIdentitySummariesCommand;
}($Command));
export { GetIdentitySummariesCommand };
