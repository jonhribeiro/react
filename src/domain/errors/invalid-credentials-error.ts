export class IncalidCredentialsError extends Error {
    constructor () {
        super('Credenciais Invalidas')
        this.name = 'IncalidCredentialsError'
    }
}