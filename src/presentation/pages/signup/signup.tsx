import React, { useState } from 'react'
import Styles from './signup-styles.scss'
import {Footer, LoginHeader, Input, FormStatus} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const SignUp: React.FC = () => {
    
    const [state ] = useState ({
        isLoading: false,
        nameError: 'Campo obrigatório',
        emailError: 'Campo obrigatório',
        passwordError: 'Campo obrigatório',
        passwordConfirmationError: 'Campo obrigatório',
        mainError: ''
    })

    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={{state }}>
                <form className={Styles.form} >
                    <h2>Criar Conta</h2>
                    <Input type="text" name="name" placeholder="Digite seu nome"/>
                    <Input type="email" name="email" placeholder="Digite o E-mail"/>
                    <Input type="password" name="password" placeholder="Digite a Senha"/>                
                    <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha"/>                
                    <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
                    <span className={Styles.link}>Volta para Login</span>
                    <FormStatus />
                </form>
                <Footer /> 
            </Context.Provider> 
        </div>
    )
}

export default SignUp
