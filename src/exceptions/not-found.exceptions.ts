export class NotFoundError extends Error {
  constructor(
    public message: string = 'not found',
    public readonly resource: string,
  ) {
    super(message);
  }
}
