import { CloudServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../CloudServiceClient";
import { GameLogoUploadCompleteInput, GameLogoUploadCompleteOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GameLogoUploadCompleteCommandInput extends GameLogoUploadCompleteInput {
}
export interface GameLogoUploadCompleteCommandOutput extends GameLogoUploadCompleteOutput, __MetadataBearer {
}
/**
 * Completes a game logo image upload. Must be called after the file upload process completes.
 * @example
 * Use a bare-bones client and the command you need to make an API call.
 * ```javascript
 * import { CloudServiceClient, GameLogoUploadCompleteCommand } from "@rivet-gg/cloud"; // ES Modules import
 * // const { CloudServiceClient, GameLogoUploadCompleteCommand } = require("@rivet-gg/cloud"); // CommonJS import
 * const client = new CloudServiceClient(config);
 * const command = new GameLogoUploadCompleteCommand(input);
 * const response = await client.send(command);
 * ```
 *
 * @see {@link GameLogoUploadCompleteCommandInput} for command's `input` shape.
 * @see {@link GameLogoUploadCompleteCommandOutput} for command's `response` shape.
 * @see {@link CloudServiceClientResolvedConfig | config} for CloudServiceClient's `config` shape.
 *
 */
export declare class GameLogoUploadCompleteCommand extends $Command<GameLogoUploadCompleteCommandInput, GameLogoUploadCompleteCommandOutput, CloudServiceClientResolvedConfig> {
    readonly input: GameLogoUploadCompleteCommandInput;
    constructor(input: GameLogoUploadCompleteCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: CloudServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GameLogoUploadCompleteCommandInput, GameLogoUploadCompleteCommandOutput>;
    private serialize;
    private deserialize;
}
