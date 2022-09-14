import React, {useState, useContext} from 'react'
import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiSettings, FiUpload} from 'react-icons/fi'
import {AuthContext} from '../../contexts/auth'
import avatar from '../../assets/avatar.png'
import firebase from '../../services/firebaseConnection'
import { toast } from "react-toastify";


function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext); 

  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  function handleFile(e){
    if (e.target.files[0]){
        const image = e.target.files[0]
        if (image.type === 'image/jpeg' || image.type === 'image/png'){
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(e.target.files[0]))
        }else{
            toast.error('Selecione imagem do tipo JPG ou PNG')
            setImageAvatar(null);
            return null;
        }
    }
  }

  async function handleUpload(){
    const currentUID = user.uid;
    const uploadTask = await firebase.storage()
    .ref(`images/${currentUID}/${imageAvatar.name}`)
    .put(imageAvatar)
    .then( async ()=> {
        toast.success('Foto enviada com sucesso');
        await firebase.storage().ref(`images/${currentUID}`)
        .child(imageAvatar.name).getDownloadURL()
        .then(async (url)=>{
            let urlFoto = url;
            await firebase.firestore().collection('users')
            .doc(user.uid)
            .update({
                avatarUrl: urlFoto,
                nome: nome 
            })
            .then(()=>{
                let data ={
                    ...user,
                    avatarUrl: urlFoto,
                    nome: nome
                };
                setUser(data);
                storageUser(data);
            })

        })
    }).catch((e)=>{
        console.log(e)
    })
  }

  async function handleSave(e){
    e.preventDefault();

    if (imageAvatar ===null && nome !==''){
        await firebase.firestore().collection('users')
        .doc(user.uid)
        .update({
            nome: nome,
        })
        .then(() => {
            let data ={
                ...user,
                nome: nome
            };
            setUser(data);
            storageUser(data);
        })
        .catch((error) => {
            console.log(error)
        })
    }
    else if(nome !=='' && imageAvatar !== null){
        alert('entrou')
        handleUpload();
    }

  }
  

  return (
    <div>
        <Header/>
        <div className='content'>
            <Title name='Meu Perfil'>
                <FiSettings size={25} />
                
            </Title>
        </div>
        <div className='content'>
            <form className='form-profile' onSubmit={handleSave}>
                <label className='label-avatar'>
                    <span>
                        <FiUpload color='#fff' size={25} />
                    </span>
                    <input type='file' accept='image/*' onChange={handleFile}/> <br/>
                    {avatarUrl ===null  ?
                        <img src={avatar} width='250px' height='250px' alt='Imagem avatar' /> :
                        <img src={avatarUrl} width='250px' height='250px' alt='Imagem avatar' />
                    }
                </label>
                <label>Nome</label>
                <input type='text' value={nome} onChange={(e)=> setNome(e.target.value)}/>
                <label>Email</label>
                <input type='text' value={email} disabled='true'/>
                <button type='submit'>Salvar</button>
            </form>
        </div>
        <div className='content'>
            <button className='logout-btn' onClick={signOut}>Sair</button>
        </div>
    </div>
  )
}

export default Profile