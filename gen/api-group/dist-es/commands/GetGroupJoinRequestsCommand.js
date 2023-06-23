import { __extends } from "tslib";
import { GetGroupJoinRequestsInput, GetGroupJoinRequestsOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetGroupJoinRequestsCommand, serializeAws_restJson1GetGroupJoinRequestsCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetGroupJoinRequestsCommand = (function (_super) {
    __extends(GetGroupJoinRequestsCommand, _super);
    function GetGroupJoinRequestsCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetGroupJoinRequestsCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "GroupServiceClient";
        var commandName = "GetGroupJoinRequestsCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetGroupJoinRequestsInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetGroupJoinRequestsOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetGroupJoinRequestsCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetGroupJoinRequestsCommand(input, context);
    };
    GetGroupJoinRequestsCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetGroupJoinRequestsCommand(output, context);
    };
    return GetGroupJoinRequestsCommand;
}($Command));
export { GetGroupJoinRequestsCommand };
