// smithy-typescript generated code
import { AuthServiceClient } from "./AuthServiceClient";
import {
  CompleteEmailVerificationCommand,
  CompleteEmailVerificationCommandInput,
  CompleteEmailVerificationCommandOutput,
} from "./commands/CompleteEmailVerificationCommand";
import {
  RefreshIdentityTokenCommand,
  RefreshIdentityTokenCommandInput,
  RefreshIdentityTokenCommandOutput,
} from "./commands/RefreshIdentityTokenCommand";
import {
  StartEmailVerificationCommand,
  StartEmailVerificationCommandInput,
  StartEmailVerificationCommandOutput,
} from "./commands/StartEmailVerificationCommand";
import { HttpHandlerOptions as __HttpHandlerOptions } from "@aws-sdk/types";

export class AuthService extends AuthServiceClient {
  /**
   * Completes the email verification process.
   */
  public completeEmailVerification(
    args: CompleteEmailVerificationCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<CompleteEmailVerificationCommandOutput>;
  public completeEmailVerification(
    args: CompleteEmailVerificationCommandInput,
    cb: (err: any, data?: CompleteEmailVerificationCommandOutput) => void
  ): void;
  public completeEmailVerification(
    args: CompleteEmailVerificationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: CompleteEmailVerificationCommandOutput) => void
  ): void;
  public completeEmailVerification(
    args: CompleteEmailVerificationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: CompleteEmailVerificationCommandOutput) => void),
    cb?: (err: any, data?: CompleteEmailVerificationCommandOutput) => void
  ): Promise<CompleteEmailVerificationCommandOutput> | void {
    const command = new CompleteEmailVerificationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Refreshes the current identity's token and sets authentication headers.
   */
  public refreshIdentityToken(
    args: RefreshIdentityTokenCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<RefreshIdentityTokenCommandOutput>;
  public refreshIdentityToken(
    args: RefreshIdentityTokenCommandInput,
    cb: (err: any, data?: RefreshIdentityTokenCommandOutput) => void
  ): void;
  public refreshIdentityToken(
    args: RefreshIdentityTokenCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: RefreshIdentityTokenCommandOutput) => void
  ): void;
  public refreshIdentityToken(
    args: RefreshIdentityTokenCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: RefreshIdentityTokenCommandOutput) => void),
    cb?: (err: any, data?: RefreshIdentityTokenCommandOutput) => void
  ): Promise<RefreshIdentityTokenCommandOutput> | void {
    const command = new RefreshIdentityTokenCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

  /**
   * Starts the verification process for linking an emal to your identity.
   */
  public startEmailVerification(
    args: StartEmailVerificationCommandInput,
    options?: __HttpHandlerOptions,
  ): Promise<StartEmailVerificationCommandOutput>;
  public startEmailVerification(
    args: StartEmailVerificationCommandInput,
    cb: (err: any, data?: StartEmailVerificationCommandOutput) => void
  ): void;
  public startEmailVerification(
    args: StartEmailVerificationCommandInput,
    options: __HttpHandlerOptions,
    cb: (err: any, data?: StartEmailVerificationCommandOutput) => void
  ): void;
  public startEmailVerification(
    args: StartEmailVerificationCommandInput,
    optionsOrCb?: __HttpHandlerOptions | ((err: any, data?: StartEmailVerificationCommandOutput) => void),
    cb?: (err: any, data?: StartEmailVerificationCommandOutput) => void
  ): Promise<StartEmailVerificationCommandOutput> | void {
    const command = new StartEmailVerificationCommand(args);
    if (typeof optionsOrCb === "function") {
      this.send(command, optionsOrCb)
    } else if (typeof cb === "function") {
      if (typeof optionsOrCb !== "object")
        throw new Error(`Expect http options but get ${typeof optionsOrCb}`)
      this.send(command, optionsOrCb || {}, cb)
    } else {
      return this.send(command, optionsOrCb);
    }
  }

}
