import React, {useState, useEffect} from 'react'
import Styles from './login-styles.scss'
import {Footer, LoginHeader, Input, FormStatus} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication } from '@/domain/usercases'

type Props = {
    validation: Validation
    authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
    const [state, setState ] = useState ({
        isLoading: false,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        mainError: ''
    })

    useEffect(() => {
        setState({
            ...state,
            emailError: validation.validate('email', state.email ),
            passwordError: validation.validate( 'password', state.password )
        })
    
    }, [state.email, state.password])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        // se nao o loading retorna vamos ver se nao tem email ou password rettorna pra traz nao pode passar
        if (state.isLoading || state.emailError || state.passwordError) {
            return
        }
        setState({...state, isLoading: true})
        await authentication.auth({
            email: state.email, 
            password: state.password
        })
    }

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={{state, setState}}>
                <form data-testid="form" className={Styles.form} onSubmit={handleSubmit} >
                    <h2>Login</h2>
                    <Input type="email" name="email" placeholder="Digite o E-mail"/>
                    <Input type="password" name="password" placeholder="Digite a Senha"/>                
                    <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
                    <span className={Styles.link}>Criar Conta</span>
                    <FormStatus />
                </form>
                <Footer /> 
            </Context.Provider> 
        </div>
    )
}

export default Login
