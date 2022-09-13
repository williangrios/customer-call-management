import React, { useContext } from 'react'
import './signin.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import {AuthContext} from '../../contexts/auth';

function SignIn() {

  const {signIn, loadingAuth} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e){
    e.preventDefault();

    if (email !=='' && password !== ''){
      signIn(email, password) ;
    }

  }

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='logo-area'>
          <img src={logo} alt='Logo sistema'/>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input type='text' placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type='submit'>{loadingAuth ? 'Carregando...' : 'Entrar'}</button>
        </form>
        <Link to='/register'>Cadastre-se</Link>


      </div>

    </div>
  )
}

export default SignIn;
