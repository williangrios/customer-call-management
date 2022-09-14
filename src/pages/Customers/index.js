import React, {useState} from 'react'
import Title from '../../components/Title'
import Header from '../../components/Header'
import { FiUser } from 'react-icons/fi'
import firebase from '../../services/firebaseConnection'
import {toast} from 'react-toastify'

function Customers() {

  const [nomeFantasia, setNomeFantasia] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');

  async function handleSubmit(e){
    e.preventDefault();

    if (nomeFantasia !== '' && cnpj !== '' && endereco !==''){
      await firebase.firestore().collection('customers')
      .add({
        nomeFantasia: nomeFantasia,
        cnpj: cnpj,
        endereco: endereco
      })
      .then(() => {
        setCnpj('');
        setNomeFantasia('');
        setEndereco('');
        toast.info('Cliente cadastrado com sucesso')
      })
      .catch((e) => {
        toast.error(`Ocorreu o erro ${e}`);
      })
    }
    else {
      toast.error('Preencha todos os campos');
    }

  }

  return (
    <div>
      <Header/>
      <div className='content'>
        <Title name='Clientes'>
          <FiUser size={25}/>
        </Title>

        <div className='container'>
          <form className='form-profile customer' onSubmit={handleSubmit}>
            <label>Nome fantasia</label>
            <input type='text' value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} placeholder='Nome fantasia do cliente'/>
            <label>CNPJ</label>
            <input type='text' value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder='CNPJ do cliente'/>
            <label>Endereço</label>
            <input type='text' value={endereco} onChange={(e) => setEndereco(e.target.value)} placeholder='Endereço do cliente'/>
            <button type='submit'>Cadastrar</button>
          </form>
        </div>


      </div>
    </div>
  )
}

export default Customers