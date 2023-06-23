import { AuthServiceServiceException as __BaseException } from "./AuthServiceServiceException";
import { ExceptionOptionType as __ExceptionOptionType } from "@aws-sdk/smithy-client";
import { DocumentType as __DocumentType } from "@aws-sdk/types";
export interface CompleteEmailVerificationInput {
    /**
     * A universally unique identifier.
     */
    verificationId: string | undefined;
    /**
     * The code sent to the requestee's email.
     */
    code: string | undefined;
}
export declare namespace CompleteEmailVerificationInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CompleteEmailVerificationInput) => any;
}
export declare enum CompleteStatus {
    /**
     * The current linking process has already completed.
     */
    ALREADY_COMPLETE = "already_complete",
    /**
     * The current linking process has expired.
     */
    EXPIRED = "expired",
    /**
     * The code given to the current linking process is incorrect.
     */
    INCORRECT = "incorrect",
    /**
     * The linking process succeeded and the new account is now added.
     */
    LINKED_ACCOUNT_ADDED = "linked_account_added",
    /**
     * The linking process succeeded and will now switch identities.
     */
    SWITCH_IDENTITY = "switch_identity",
    /**
     * The current linking process has been tried too many times.
     */
    TOO_MANY_ATTEMPTS = "too_many_attempts"
}
export interface CompleteEmailVerificationOutput {
    /**
     * Represents the state of an external account linking process.
     */
    status: CompleteStatus | string | undefined;
}
export declare namespace CompleteEmailVerificationOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CompleteEmailVerificationOutput) => any;
}
/**
 * hCaptcha configuration.
 */
export interface CaptchaConfigHcaptcha {
    clientResponse: string | undefined;
}
export declare namespace CaptchaConfigHcaptcha {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CaptchaConfigHcaptcha) => any;
}
/**
 * Cloudflare Turnstile configuration.
 */
export interface CaptchaConfigTurnstile {
    clientResponse: string | undefined;
}
export declare namespace CaptchaConfigTurnstile {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CaptchaConfigTurnstile) => any;
}
/**
 * Methods to verify a captcha.
 */
export declare type CaptchaConfig = CaptchaConfig.HcaptchaMember | CaptchaConfig.TurnstileMember | CaptchaConfig.$UnknownMember;
export declare namespace CaptchaConfig {
    /**
     * hCaptcha configuration.
     */
    interface HcaptchaMember {
        hcaptcha: CaptchaConfigHcaptcha;
        turnstile?: never;
        $unknown?: never;
    }
    /**
     * Cloudflare Turnstile configuration.
     */
    interface TurnstileMember {
        hcaptcha?: never;
        turnstile: CaptchaConfigTurnstile;
        $unknown?: never;
    }
    interface $UnknownMember {
        hcaptcha?: never;
        turnstile?: never;
        $unknown: [string, any];
    }
    interface Visitor<T> {
        hcaptcha: (value: CaptchaConfigHcaptcha) => T;
        turnstile: (value: CaptchaConfigTurnstile) => T;
        _: (name: string, value: any) => T;
    }
    const visit: <T>(value: CaptchaConfig, visitor: Visitor<T>) => T;
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: CaptchaConfig) => any;
}
export interface StartEmailVerificationInput {
    email: string | undefined;
    /**
     * Methods to verify a captcha.
     */
    captcha: CaptchaConfig | undefined;
    /**
     * A universally unique identifier.
     */
    gameId?: string;
}
export declare namespace StartEmailVerificationInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: StartEmailVerificationInput) => any;
}
export interface StartEmailVerificationOutput {
    /**
     * A universally unique identifier.
     */
    verificationId: string | undefined;
}
export declare namespace StartEmailVerificationOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: StartEmailVerificationOutput) => any;
}
export interface RefreshIdentityTokenInput {
    /**
     * Cookie values. Usually does not need to be manually set.
     */
    cookie?: (string)[];
    /**
     * When `true`, the current identity for the provided cookie will be logged
     * out and a new identity will be returned.
     */
    logout: boolean | undefined;
}
export declare namespace RefreshIdentityTokenInput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RefreshIdentityTokenInput) => any;
}
export interface RefreshIdentityTokenOutput {
    /**
     * Server-set cookie values.
     */
    setCookie: (string)[] | undefined;
    /**
     * A JSON Web Token.
     *
     * Slightly modified to include a description prefix and use Protobufs of
     * JSON.
     */
    token: string | undefined;
    /**
     * Token expiration time (in milliseconds).
     */
    exp: Date | undefined;
    /**
     * A universally unique identifier.
     */
    identityId: string | undefined;
}
export declare namespace RefreshIdentityTokenOutput {
    /**
     * @internal
     */
    const filterSensitiveLog: (obj: RefreshIdentityTokenOutput) => any;
}
/**
 * An error thrown when the requestee has sent an invalid or malformed request.
 */
export declare class BadRequestError extends __BaseException {
    readonly name: "BadRequestError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<BadRequestError, __BaseException>);
}
/**
 * An error thrown when the requestee requests a resource they do not have access to.
 */
export declare class ForbiddenError extends __BaseException {
    readonly name: "ForbiddenError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<ForbiddenError, __BaseException>);
}
/**
 * An error caused by internal server problems.
 */
export declare class InternalError extends __BaseException {
    readonly name: "InternalError";
    readonly $fault: "server";
    $retryable: {};
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<InternalError, __BaseException>);
}
/**
 * An error thrown when the requestee requests a non existant resource.
 */
export declare class NotFoundError extends __BaseException {
    readonly name: "NotFoundError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<NotFoundError, __BaseException>);
}
/**
 * An error thrown when the requestee has hit a rate limit. You are sending too many requests too quickly.
 */
export declare class RateLimitError extends __BaseException {
    readonly name: "RateLimitError";
    readonly $fault: "client";
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<RateLimitError, __BaseException>);
}
/**
 * An error thrown when the requestee is not authenticated.
 */
export declare class UnauthorizedError extends __BaseException {
    readonly name: "UnauthorizedError";
    readonly $fault: "client";
    $retryable: {};
    code: string | undefined;
    documentation?: string;
    /**
     * Unstructured metadata relating to an error. Must be manually parsed.
     */
    metadata?: __DocumentType;
    /**
     * @internal
     */
    constructor(opts: __ExceptionOptionType<UnauthorizedError, __BaseException>);
}
