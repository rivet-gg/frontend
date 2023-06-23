import { __extends } from "tslib";
import { GetRegionTiersInput, GetRegionTiersOutput, } from "../models/models_0";
import { deserializeAws_restJson1GetRegionTiersCommand, serializeAws_restJson1GetRegionTiersCommand, } from "../protocols/Aws_restJson1";
import { getSerdePlugin } from "@aws-sdk/middleware-serde";
import { Command as $Command } from "@aws-sdk/smithy-client";
var GetRegionTiersCommand = (function (_super) {
    __extends(GetRegionTiersCommand, _super);
    function GetRegionTiersCommand(input) {
        var _this = _super.call(this) || this;
        _this.input = input;
        return _this;
    }
    GetRegionTiersCommand.prototype.resolveMiddleware = function (clientStack, configuration, options) {
        this.middlewareStack.use(getSerdePlugin(configuration, this.serialize, this.deserialize));
        var stack = clientStack.concat(this.middlewareStack);
        var logger = configuration.logger;
        var clientName = "CloudServiceClient";
        var commandName = "GetRegionTiersCommand";
        var handlerExecutionContext = {
            logger: logger,
            clientName: clientName,
            commandName: commandName,
            inputFilterSensitiveLog: GetRegionTiersInput.filterSensitiveLog,
            outputFilterSensitiveLog: GetRegionTiersOutput.filterSensitiveLog,
        };
        var requestHandler = configuration.requestHandler;
        return stack.resolve(function (request) {
            return requestHandler.handle(request.request, options || {});
        }, handlerExecutionContext);
    };
    GetRegionTiersCommand.prototype.serialize = function (input, context) {
        return serializeAws_restJson1GetRegionTiersCommand(input, context);
    };
    GetRegionTiersCommand.prototype.deserialize = function (output, context) {
        return deserializeAws_restJson1GetRegionTiersCommand(output, context);
    };
    return GetRegionTiersCommand;
}($Command));
export { GetRegionTiersCommand };
