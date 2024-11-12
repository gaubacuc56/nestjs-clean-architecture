import { HttpStatus } from "@Domain/common/enum/http";
import { HttpException } from "./root";

export class NotModifiedException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.NOT_MODIFIED, null);
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.BAD_REQUEST, null);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.NOT_FOUND, null);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.UNAUTHORIZED, null);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.FORBIDDEN, null);
  }
}

export class InteralServerErrorException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.INTERNAL_SERVER_ERROR, null);
  }
}
export class PaymentRequiredException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.PAYMENT_REQUIRED, null);
  }
}

export class MethodNotAllowedException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.METHOD_NOT_ALLOWED, null);
  }
}

export class NotAcceptableException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.NOT_ACCEPTABLE, null);
  }
}

export class ProxyAuthenticationRequiredException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.PROXY_AUTHENTICATION_REQUIRED, null);
  }
}

export class RequestTimeoutException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.REQUEST_TIMEOUT, null);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.CONFLICT, null);
  }
}

export class GoneException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.GONE, null);
  }
}

export class LengthRequiredException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.LENGTH_REQUIRED, null);
  }
}

export class PreconditionFailedException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.PRECONDITION_FAILED, null);
  }
}

export class PayloadTooLargeException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.PAYLOAD_TOO_LARGE, null);
  }
}

export class UriTooLongException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.URI_TOO_LONG, null);
  }
}

export class UnsupportedMediaTypeException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.UNSUPPORTED_MEDIA_TYPE, null);
  }
}

export class RangeNotSatisfiableException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.RANGE_NOT_SATISFIABLE, null);
  }
}

export class ExpectationFailedException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.EXPECTATION_FAILED, null);
  }
}

export class ImATeapotException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.I_AM_A_TEAPOT, null);
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.UNPROCESSABLE_ENTITY, null);
  }
}

export class LockedException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.LOCKED, null);
  }
}

export class FailedDependencyException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.FAILED_DEPENDENCY, null);
  }
}

export class UpgradeRequiredException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.UPGRADE_REQUIRED, null);
  }
}

export class PreconditionRequiredException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.PRECONDITION_REQUIRED, null);
  }
}

export class TooManyRequestsException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.TOO_MANY_REQUESTS, null);
  }
}

export class RequestHeaderFieldsTooLargeException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.REQUEST_HEADER_FIELDS_TOO_LARGE, null);
  }
}

export class UnavailableForLegalReasonsException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.UNAVAILABLE_FOR_LEGAL_REASONS, null);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.INTERNAL_SERVER_ERROR, null);
  }
}

export class NotImplementedException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.NOT_IMPLEMENTED, null);
  }
}

export class BadGatewayException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.BAD_GATEWAY, null);
  }
}

export class ServiceUnavailableException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.SERVICE_UNAVAILABLE, null);
  }
}

export class GatewayTimeoutException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.GATEWAY_TIMEOUT, null);
  }
}

export class HttpVersionNotSupportedException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.HTTP_VERSION_NOT_SUPPORTED, null);
  }
}

export class VariantAlsoNegotiatesException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.VARIANT_ALSO_NEGOTIATES, null);
  }
}

export class InsufficientStorageException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.INSUFFICIENT_STORAGE, null);
  }
}

export class LoopDetectedException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.LOOP_DETECTED, null);
  }
}

export class NotExtendedException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.NOT_EXTENDED, null);
  }
}

export class NetworkAuthenticationRequiredException extends HttpException {
  constructor(message: string) {
    super(message, null, HttpStatus.NETWORK_AUTHENTICATION_REQUIRED, null);
  }
}
