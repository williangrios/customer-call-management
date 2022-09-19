import React, {useState, useEffect, useContext} from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiPlus} from 'react-icons/fi'
import './new.css';
import { AuthContext } from '../../contexts/auth';
import firebase from '../../services/firebaseConnection';
import {toast} from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';


function New() {

  const {id} = useParams();
  const history = useHistory();
  const [customers, setCustomers] =useState([]);
  
  const [selectedCustomer, setSelectedCustomer] = useState(0);

  const [assunto, setAssunto] =useState('Suporte');
  const [status, setStatus] = useState('Aberto');
  const [complemento, setComplemento] = useState('');

  const [idCustomer, setIdCustomer] = useState(false);

  const {user} = useContext(AuthContext);

  useEffect (() => {
    async function loadCustomers(){
      await firebase.firestore().collection('customers')
      .get()
      .then((snapshot) => {
        let lista =[];
        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nomeFantasia: doc.data().nomeFantasia
          })
        }) 

        if (lista.length ===0 ){
          setCustomers([{id: 1, nomeFantasia: 'Cadastre clientes primeiro'}]);  
          return;
        }
        setCustomers(lista);
        
        //verificando se estamos editando um chamado
        if(id){
          loadId(lista)
        }

      })
      .catch((error) =>{
        alert('erro')
        
        setCustomers([{id: 1, nomeFantasia: ''}]);
      })
    }

    loadCustomers();
  }, [id])


  async function loadId(list){
    //tentando buscar o id do chamado para saber se realmente existe
    await firebase.firestore().collection('chamados').doc(id)
    .get()
    .then((snapshot) => {
      setAssunto(snapshot.data().assunto);
      setStatus(snapshot.data().status);
      setComplemento(snapshot.data().complemento);

      let index = list.findIndex(item => item.id === snapshot.data().clienteId);
      setSelectedCustomer(index);
      setIdCustomer(true);
    })
    .catch((e) => {
      console.log('Erro no id passado:' , e);
      setIdCustomer(false);
    })
  }

  //registra o chamado
  async function handleSubmit(e){
    e.preventDefault();

    if (idCustomer === true){
      //está editando o registro
      await firebase.firestore().collection('chamados').doc(id)
      .update({
        cliente: customers[selectedCustomer].nomeFantasia,
        clienteId: customers[selectedCustomer].id,
        assunto: assunto,
        status: status,
        complemento: complemento,
        userId: user.uid  
      })
      .then(() =>{
        toast.success('Atualizado com sucesso')
        setSelectedCustomer(0);
        setComplemento('');
        history.push('/dashboard');
      })
      .catch((e) =>{
        toast.error('Erro ao atualizar, tente mais tarde');
        console.log(e)
      })
      return;
    }

    await firebase.firestore().collection('chamados')
    .add({
      created: new Date(),
      cliente: customers[selectedCustomer].nomeFantasia,
      clienteId: customers[selectedCustomer].id,
      assunto: assunto,
      status: status,
      complemento: complemento,
      userId: user.uid
    })
    .then(() => {
      toast.success('Registrado com sucesso');
      setComplemento('');
      setSelectedCustomer('0');
    })
    .catch((e) => {
      toast.error('Ops, algo deu errado');
    })

  }

  function handleOptionChange(e){
    setStatus(e.target.value)
  }

  function handleChangeCustomers(e) {
    setSelectedCustomer(e.target.value)
  }

  return (
    <div>
        <Header/>
        <div className='content'>
          <Title name='Novo chamado'>
            <FiPlus size={25} />
          </Title>

          <div className='container'>
            <form className='form-profile' onSubmit={handleSubmit}>
              <label>Cliente</label>

                <select value={selectedCustomer} onChange={handleChangeCustomers}>
                  {customers.map((cliente, index) => {
                    return(
                      <option key={cliente.id} value={index}>{cliente.nomeFantasia}</option>
                    )
                  })}
                </select>
  

              
              <label>Assunto</label>
              <select value={assunto} onChange={((e) => {
                  setAssunto(e.target.value);
                  })}>
                <option key={1} value={'Suporte'}>Suporte</option>
                <option key={2} value={'Visita técnica'}>Visita técnica</option>
                <option key={3} value={'Financeiro'}>Financeiro</option>
              </select>
              <label>Status</label>
              <div className='status'>
                <input type='radio' name='radio' value='Aberto' checked={status==='Aberto'} onChange={handleOptionChange}/><span>Aberto</span>
                <input type='radio' name='radio' value='Progresso' checked={status==='Progresso'} onChange={handleOptionChange}/><span>Progresso</span>
                <input type='radio' name='radio' value='Atendido' checked={status==='Atendido'} onChange={handleOptionChange}/><span>Atendido</span>
              </div>
              <label>Complemento</label>
              <textarea type='text' placeholder='Descreva a demanda (opcional)' value={complemento}
              onChange={(e) => setComplemento(e.target.value)}/>
              <button type='submit'>{idCustomer ? 'Salvar alterações' : 'Registrar chamado' }</button>

            </form>

          </div>

        </div>
    </div>
  )
}

export default New