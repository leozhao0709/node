export default class Exception {
  constructor(
    public message: string,
    public errorCode: number = -1,
    public httpStatusCode = 500
  ) {}
}
