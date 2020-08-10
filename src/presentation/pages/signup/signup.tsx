import React from 'react'
import { Link } from 'react-router-dom'
import Styles from './signup-styles.scss'
import {Footer, LoginHeader, Input, FormStatus} from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

const SignUp: React.FC = () => {

    return (
        <div className={Styles.signup}>
            <LoginHeader />
            <Context.Provider value={{state: {} }}>
                <form className={Styles.form} >
                    <h2>Criar Conta</h2>
                    <Input type="text" name="name" placeholder="Digite seu nome"/>
                    <Input type="email" name="email" placeholder="Digite o E-mail"/>
                    <Input type="password" name="password" placeholder="Digite a Senha"/>                
                    <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha"/>                
                    <button className={Styles.submit} type="submit">Entrar</button>
                    <Link to="/login" className={Styles.link}>Volta para Login</Link>
                    <FormStatus />
                </form>
                <Footer /> 
            </Context.Provider> 
        </div>
    )
}

export default SignUp
