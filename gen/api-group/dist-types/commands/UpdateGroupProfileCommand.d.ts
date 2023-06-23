import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { UpdateGroupProfileInput, UpdateGroupProfileOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface UpdateGroupProfileCommandInput extends UpdateGroupProfileInput {
}
export interface UpdateGroupProfileCommandOutput extends UpdateGroupProfileOutput, __MetadataBearer {
}
export declare class UpdateGroupProfileCommand extends $Command<UpdateGroupProfileCommandInput, UpdateGroupProfileCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: UpdateGroupProfileCommandInput;
    constructor(input: UpdateGroupProfileCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<UpdateGroupProfileCommandInput, UpdateGroupProfileCommandOutput>;
    private serialize;
    private deserialize;
}
