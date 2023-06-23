import { GroupServiceClientResolvedConfig, ServiceInputTypes, ServiceOutputTypes } from "../GroupServiceClient";
import { GetGroupSummaryInput, GetGroupSummaryOutput } from "../models/models_0";
import { Command as $Command } from "@aws-sdk/smithy-client";
import { Handler, MiddlewareStack, HttpHandlerOptions as __HttpHandlerOptions, MetadataBearer as __MetadataBearer } from "@aws-sdk/types";
export interface GetGroupSummaryCommandInput extends GetGroupSummaryInput {
}
export interface GetGroupSummaryCommandOutput extends GetGroupSummaryOutput, __MetadataBearer {
}
export declare class GetGroupSummaryCommand extends $Command<GetGroupSummaryCommandInput, GetGroupSummaryCommandOutput, GroupServiceClientResolvedConfig> {
    readonly input: GetGroupSummaryCommandInput;
    constructor(input: GetGroupSummaryCommandInput);
    /**
     * @internal
     */
    resolveMiddleware(clientStack: MiddlewareStack<ServiceInputTypes, ServiceOutputTypes>, configuration: GroupServiceClientResolvedConfig, options?: __HttpHandlerOptions): Handler<GetGroupSummaryCommandInput, GetGroupSummaryCommandOutput>;
    private serialize;
    private deserialize;
}
