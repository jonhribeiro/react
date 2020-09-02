export class EmailInUseError extends Error {
  constructor () {
    super('Esse e-mail ja consta em nosso sistema')
    this.name = 'EmailInUseError'
  }
}
