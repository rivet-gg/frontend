// smithy-typescript generated code
import { AuthServiceServiceException as __BaseException } from "./AuthServiceServiceException";
import {
  SENSITIVE_STRING,
  ExceptionOptionType as __ExceptionOptionType,
} from "@aws-sdk/smithy-client";
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

export namespace CompleteEmailVerificationInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CompleteEmailVerificationInput): any => ({
    ...obj,
  })
}

export enum CompleteStatus {
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
  TOO_MANY_ATTEMPTS = "too_many_attempts",
}

export interface CompleteEmailVerificationOutput {
  /**
   * Represents the state of an external account linking process.
   */
  status: CompleteStatus | string | undefined;
}

export namespace CompleteEmailVerificationOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CompleteEmailVerificationOutput): any => ({
    ...obj,
  })
}

/**
 * hCaptcha configuration.
 */
export interface CaptchaConfigHcaptcha {
  clientResponse: string | undefined;
}

export namespace CaptchaConfigHcaptcha {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CaptchaConfigHcaptcha): any => ({
    ...obj,
  })
}

/**
 * Cloudflare Turnstile configuration.
 */
export interface CaptchaConfigTurnstile {
  clientResponse: string | undefined;
}

export namespace CaptchaConfigTurnstile {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CaptchaConfigTurnstile): any => ({
    ...obj,
  })
}

/**
 * Methods to verify a captcha.
 */
export type CaptchaConfig =
  | CaptchaConfig.HcaptchaMember
  | CaptchaConfig.TurnstileMember
  | CaptchaConfig.$UnknownMember

export namespace CaptchaConfig {

  /**
   * hCaptcha configuration.
   */
  export interface HcaptchaMember {
    hcaptcha: CaptchaConfigHcaptcha;
    turnstile?: never;
    $unknown?: never;
  }

  /**
   * Cloudflare Turnstile configuration.
   */
  export interface TurnstileMember {
    hcaptcha?: never;
    turnstile: CaptchaConfigTurnstile;
    $unknown?: never;
  }

  export interface $UnknownMember {
    hcaptcha?: never;
    turnstile?: never;
    $unknown: [string, any];
  }

  export interface Visitor<T> {
    hcaptcha: (value: CaptchaConfigHcaptcha) => T;
    turnstile: (value: CaptchaConfigTurnstile) => T;
    _: (name: string, value: any) => T;
  }

  export const visit = <T>(
    value: CaptchaConfig,
    visitor: Visitor<T>
  ): T => {
    if (value.hcaptcha !== undefined) return visitor.hcaptcha(value.hcaptcha);
    if (value.turnstile !== undefined) return visitor.turnstile(value.turnstile);
    return visitor._(value.$unknown[0], value.$unknown[1]);
  }

  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: CaptchaConfig): any => {
    if (obj.hcaptcha !== undefined) return {hcaptcha:
      CaptchaConfigHcaptcha.filterSensitiveLog(obj.hcaptcha)
    };
    if (obj.turnstile !== undefined) return {turnstile:
      CaptchaConfigTurnstile.filterSensitiveLog(obj.turnstile)
    };
    if (obj.$unknown !== undefined) return {[obj.$unknown[0]]: 'UNKNOWN'};
  }
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

export namespace StartEmailVerificationInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: StartEmailVerificationInput): any => ({
    ...obj,
    ...(obj.captcha && { captcha:
      CaptchaConfig.filterSensitiveLog(obj.captcha)
    }),
  })
}

export interface StartEmailVerificationOutput {
  /**
   * A universally unique identifier.
   */
  verificationId: string | undefined;
}

export namespace StartEmailVerificationOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: StartEmailVerificationOutput): any => ({
    ...obj,
  })
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

export namespace RefreshIdentityTokenInput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: RefreshIdentityTokenInput): any => ({
    ...obj,
  })
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

export namespace RefreshIdentityTokenOutput {
  /**
   * @internal
   */
  export const filterSensitiveLog = (obj: RefreshIdentityTokenOutput): any => ({
    ...obj,
    ...(obj.token && { token:
      SENSITIVE_STRING
    }),
  })
}

/**
 * An error thrown when the requestee has sent an invalid or malformed request.
 */
export class BadRequestError extends __BaseException {
  readonly name: "BadRequestError" = "BadRequestError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<BadRequestError, __BaseException>) {
    super({
      name: "BadRequestError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, BadRequestError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee requests a resource they do not have access to.
 */
export class ForbiddenError extends __BaseException {
  readonly name: "ForbiddenError" = "ForbiddenError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<ForbiddenError, __BaseException>) {
    super({
      name: "ForbiddenError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, ForbiddenError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error caused by internal server problems.
 */
export class InternalError extends __BaseException {
  readonly name: "InternalError" = "InternalError";
  readonly $fault: "server" = "server";
  $retryable = {
  };
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<InternalError, __BaseException>) {
    super({
      name: "InternalError",
      $fault: "server",
      ...opts
    });
    Object.setPrototypeOf(this, InternalError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee requests a non existant resource.
 */
export class NotFoundError extends __BaseException {
  readonly name: "NotFoundError" = "NotFoundError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<NotFoundError, __BaseException>) {
    super({
      name: "NotFoundError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, NotFoundError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee has hit a rate limit. You are sending too many requests too quickly.
 */
export class RateLimitError extends __BaseException {
  readonly name: "RateLimitError" = "RateLimitError";
  readonly $fault: "client" = "client";
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<RateLimitError, __BaseException>) {
    super({
      name: "RateLimitError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, RateLimitError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}

/**
 * An error thrown when the requestee is not authenticated.
 */
export class UnauthorizedError extends __BaseException {
  readonly name: "UnauthorizedError" = "UnauthorizedError";
  readonly $fault: "client" = "client";
  $retryable = {
  };
  code: string | undefined;
  documentation?: string;
  /**
   * Unstructured metadata relating to an error. Must be manually parsed.
   */
  metadata?: __DocumentType;

  /**
   * @internal
   */
  constructor(opts: __ExceptionOptionType<UnauthorizedError, __BaseException>) {
    super({
      name: "UnauthorizedError",
      $fault: "client",
      ...opts
    });
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    this.code = opts.code;
    this.documentation = opts.documentation;
    this.metadata = opts.metadata;
  }
}
