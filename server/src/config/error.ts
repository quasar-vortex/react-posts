// Adding message to error
class CustomError extends Error {
  public code: number;
  constructor({ message, code }: { code: number; message: string }) {
    super(message);
    this.code = code;
  }
}
export default CustomError;
