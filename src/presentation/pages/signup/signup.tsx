import React, { useState, useEffect } from 'react'
import Styles from './signup-styles.scss'
import {Footer, LoginHeader, Input, FormStatus} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from '@/presentation/protocols/validation'

type Props = {
    validation: Validation
}

const SignUp: React.FC<Props> = ({ validation }: Props) => {
    const [state, setState ] = useState ({
        isLoading: false,
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        nameError: '',
        emailError: '',
        passwordError: '',
        passwordConfirmationError: '',
        mainError: ''
    })

    useEffect(() => {
        setState({
            ...state,
            nameError: validation.validate('name', state.name),
            emailError: validation.validate('email', state.email),
            passwordError: validation.validate('password', state.password),
            passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
        })
    
    }, [state.name, state.email, state.password, state.passwordConfirmation])

    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={ {state, setState } }>
                <form className={Styles.form} >
                    <h2>Criar Conta</h2>
                    <Input type="text" name="name" placeholder="Digite seu nome"/>
                    <Input type="email" name="email" placeholder="Digite o E-mail"/>
                    <Input type="password" name="password" placeholder="Digite a Senha"/>                
                    <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha"/>                
                    <button data-testid="submit" disabled={!!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError} className={Styles.submit} type="submit">Entrar</button>
                    <span className={Styles.link}>Volta para Login</span>
                    <FormStatus />
                </form>
                <Footer /> 
            </Context.Provider> 
        </div>
    )
}

export default SignUp
