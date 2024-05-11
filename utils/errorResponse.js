class ErrorResponse extends Error {
    constructor(message, status) {
      super(message);
      console.log('ErrorResponse :status: ', status);
      this.statusCode = status;
      console.log('ErrorResponse :this.statusCode: ', this.statusCode);
    }
  }
  
  module.exports = ErrorResponse;
  