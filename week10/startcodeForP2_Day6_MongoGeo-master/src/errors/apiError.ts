/*
  See this article for details about custom errors:
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error
*/
class ApiError extends Error {
  constructor(msg: string, public errorCode?: number) {
    super(msg);
    // Set the prototype explicitly.
    // https://github.com/Microsoft/TypeScript/wiki/Breaking-Changes#extending-built-ins-like-error-array-and-map-may-no-longer-work
    Object.setPrototypeOf(this, ApiError.prototype);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = "ApiError";
    this.errorCode = errorCode || 500;
  }
}

export { ApiError };
