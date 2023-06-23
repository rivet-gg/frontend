import { AuthServiceClient } from "./AuthServiceClient";
import { CompleteEmailVerificationCommandInput, CompleteEmailVerificationCommandOutput } from "./commands/CompleteEmailVerificationCommand";
import { RefreshIdentityTokenCommandInput, RefreshIdentityTokenCommandOutput } from "./commands/RefreshIdentityTokenCommand";
import { StartEmailVerificationCommandInput, StartEmailVerificationCommandOutput } from "./commands/StartEmailVerificationCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";
export declare class AuthService extends AuthServiceClient {
    /**
     * Completes the email verification process.
     */
    completeEmailVerification(args: CompleteEmailVerificationCommandInput, options?: __HttpHandlerOptions): Promise<CompleteEmailVerificationCommandOutput>;
    completeEmailVerification(args: CompleteEmailVerificationCommandInput, cb: (err: any, data?: CompleteEmailVerificationCommandOutput) => void): void;
    completeEmailVerification(args: CompleteEmailVerificationCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: CompleteEmailVerificationCommandOutput) => void): void;
    /**
     * Refreshes the current identity's token and sets authentication headers.
     */
    refreshIdentityToken(args: RefreshIdentityTokenCommandInput, options?: __HttpHandlerOptions): Promise<RefreshIdentityTokenCommandOutput>;
    refreshIdentityToken(args: RefreshIdentityTokenCommandInput, cb: (err: any, data?: RefreshIdentityTokenCommandOutput) => void): void;
    refreshIdentityToken(args: RefreshIdentityTokenCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: RefreshIdentityTokenCommandOutput) => void): void;
    /**
     * Starts the verification process for linking an emal to your identity.
     */
    startEmailVerification(args: StartEmailVerificationCommandInput, options?: __HttpHandlerOptions): Promise<StartEmailVerificationCommandOutput>;
    startEmailVerification(args: StartEmailVerificationCommandInput, cb: (err: any, data?: StartEmailVerificationCommandOutput) => void): void;
    startEmailVerification(args: StartEmailVerificationCommandInput, options: __HttpHandlerOptions, cb: (err: any, data?: StartEmailVerificationCommandOutput) => void): void;
}
