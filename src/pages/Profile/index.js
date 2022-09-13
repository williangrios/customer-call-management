import React from 'react'
import './profile.css'
import Header from '../../components/Header'
import Title from '../../components/Title'
import {FiSettings} from 'react-icons/fi'

function index() {
  return (
    <div>
        <Header/>
        <div className='content'>
            <Title name='Meu Perfil'>
                <FiSettings size={25} />
                
            </Title>
        </div>
    </div>
  )
}

export default index