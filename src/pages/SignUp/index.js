import React, { useContext } from 'react'
import { useState } from 'react'
import logo from '../../assets/logo.png'
import {Link} from 'react-router-dom';
import {AuthContext} from '../../contexts/auth';


function SignUp() {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const {signUp, loadingAuth} = useContext(AuthContext);

  function handleSubmit(e){
    e.preventDefault();
    alert('ok')
    if (nome !=='' && email !== '' && password !== '' && passwordConfirm !== ''){
      signUp(email, password, nome);
      alert('ok')
    }

  }

  return (
    <div className='container-center'>
      <div className='login'>
        <div className='logo-area'>
          <img src={logo} alt='Logo sistema'/>
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Cadastrar</h1>
          <input type='text' placeholder='Digite seu nome' value={nome} onChange={(e) => setNome(e.target.value)}/>
          <input type='text' placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          <input type='password' placeholder='Digite sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type='password' placeholder='Confirme sua senha' value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
          <button type='submit'>{loadingAuth ? 'Carregando...' : 'Cadastrar'}</button>
        </form>
        <Link to='/'>Já possuo cadastro</Link>


      </div>

    </div>
  )
}

export default SignUp