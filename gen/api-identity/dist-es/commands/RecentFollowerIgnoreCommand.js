import { __extends } from "tslib";
import { RecentFollowerIgnoreInput, RecentFollowerIgnoreOutput, } from "../models/models_0";
import { deserializeAws_restJson1RecentFollowerIgnoreCommand, serializeAws_restJson1RecentFollowerIgnoreCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var RecentFollowerIgnoreCommand = (function (_super) {
    __extends(RecentFollowerIgnoreCommand, _super);
    function RecentFollowerIgnoreCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    RecentFollowerIgnoreCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "IdentityServiceClient";
        var commandName = "RecentFollowerIgnoreCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: RecentFollowerIgnoreInput.filterSensitiveLog,
            outputFilterSensitiveLog: RecentFollowerIgnoreOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    RecentFollowerIgnoreCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1RecentFollowerIgnoreCommand(input, context);
    };
    RecentFollowerIgnoreCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1RecentFollowerIgnoreCommand(output, context);
    };
    return RecentFollowerIgnoreCommand;
}($Command));
export { RecentFollowerIgnoreCommand };
