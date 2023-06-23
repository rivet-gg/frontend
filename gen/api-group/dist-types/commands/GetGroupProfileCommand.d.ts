import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { GetGroupProfileInput, GetGroupProfileOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGroupProfileCommandInput extends GetGroupProfileInput {
}
export interface GetGroupProfileCommandOutput extends GetGroupProfileOutput, __MetadataBearer {
}
/**
 * Returns a group profile.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { GroupServiceClient, GetGroupProfileCommand } from "@rivet-gg/group"; // ES Modules import
 * // const { GroupServiceClient, GetGroupProfileCommand } = require("@rivet-gg/group"); // CommonJS import
 * const client = new GroupServiceClient(config);
 * const command = new GetGroupProfileCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GetGroupProfileCommandInput} for command's `input` shape.
 * @see {@link GetGroupProfileCommandOutput} for command's `response` shape.
 * @see {@link GroupServiceClientResolvedConfig | config} for GroupServiceClient's `config` shape.
 *
 */
export declare class GetGroupProfileCommand extends $Command<GetGroupProfileCommandInput, GetGroupProfileCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: GetGroupProfileCommandInput;
    constructor(input: GetGroupProfileCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGroupProfileCommandInput, GetGroupProfileCommandOutput>;
    private serialize;
    private deserialize;
}
