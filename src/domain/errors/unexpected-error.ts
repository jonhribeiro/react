export class UnexpectedError extends Error {
  constructor () {
    super('Algo errado aconteceu. tente novamente mais tarde')
    this.name = 'UnexpectedError'
  }
}
