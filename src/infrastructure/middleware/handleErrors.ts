const ERROR_HANDLERS: any = {
  ObjectId: (res: any) =>
    res.status(400).send({ error: 'id used is malformed' }),

  ValidationError: (res: any, error: any) =>
    res.status(409).send({ error: error.message }),

  JsonWebTokenError: (res: any) =>
    res.status(401).json({ error: 'token missing or invalid' }),

  TokenExpirerError: (res: any) =>
    res.status(401).json({ error: 'token expired' }),

  defaultError: (res: any, error: any) => {
    console.error(error.name)
    res.status(500).end()
  }
}

export default (error: any, request: any, response: any, next: any) => {
  const handler =
    ERROR_HANDLERS[error.kind] || ERROR_HANDLERS.defaultError

  handler(response, error)
}