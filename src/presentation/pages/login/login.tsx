import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import Styles from './login-styles.scss'
import {Footer, LoginHeader, Input, FormStatus, SubmitButton} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'
import { Authentication, SaveAccessToken } from '@/domain/usercases'

type Props = {
    validation: Validation
    authentication: Authentication
    saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
    const history = useHistory()
    const [state, setState ] = useState ({
        isLoading: false,
        isFormInvalid: true,
        email: '',
        password: '',
        emailError: '',
        passwordError: '',
        mainError: ''
    })

    useEffect(() => {
        const { email, password } = state
        const formData = { email, password }
        const emailError = validation.validate('email', formData)
        const passwordError = validation.validate('password', formData)

        setState({
            ...state,
            emailError,
            passwordError,
            isFormInvalid: !!emailError || !!passwordError
        })
    
    }, [state.email, state.password])

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault()
        try {
            // se nao o loading retorna vamos ver se nao tem email ou password rettorna pra traz nao pode passar
            if (state.isLoading || state.isFormInvalid) {
                return
            }
            setState({...state, isLoading: true})
            const account = await authentication.auth({
                email: state.email, 
                password: state.password
            })
            await saveAccessToken.save(account.accessToken)
            history.replace('/')
        } catch (error) {
            setState({
                ...state,
                isLoading: false,
                mainError: error.message
            })
        }
    }

    return (
        <div className={Styles.login}>
            <LoginHeader />
            <Context.Provider value={{state, setState}}>
                <form data-testid="form" className={Styles.form} onSubmit={handleSubmit} >
                    <h2>Login</h2>
                    <Input type="email" name="email" placeholder="Digite o E-mail"/>
                    <Input type="password" name="password" placeholder="Digite a Senha"/> 
                    <SubmitButton text="Entrar" />               
                    <Link data-testid="signup-link" to="/signup" className={Styles.link}>Criar Conta</Link>
                    <FormStatus />
                </form>
                <Footer /> 
            </Context.Provider> 
        </div>
    )
}

export default Login
