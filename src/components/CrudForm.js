import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
// import dataApi from '../services/dataApi';
import auth from '../services/auth';


export default function CrudForm() {  

  const { register, handleSubmit } = useForm();
  const [token, setToken] = useState([]);
  
  useEffect(() =>{
    auth.getToken().then(res => {
      setToken(JSON.stringify(res.data));
    }) 
  }, []) 

  const onSubmit = (data) => {
    console.log(token);

    
   
    


  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <h3>1 - Informações pessoais</h3>
      <input type="text" placeholder="Nome e sobrenome" name="nome" {...register('nome')} />
      <input type="text" placeholder="Celular" name="fone" {...register('fone')} />
      <input type="text" placeholder="Cpf" name="cpf" {...register('cpf')} />
      <input type="text" placeholder="Data de nascimento" name="nascimento" {...register('nascimento')} />
      <div>
        <input type="radio" value="Masculino" name="genero" {...register('genero')} /> Masculino
        <input type="radio" value="Feminino" name="genero" {...register('genero')} /> Feminino
        <input type="radio" value="Outro" name="genero" {...register('genero')} /> Outro
      </div>
      <input type="text" placeholder="Email" name="email" {...register('email')} />
      <input type="password" placeholder="Senha" name="senha" {...register('senha')} />

      <h3>2 - Endereço</h3>
      <input type="text" placeholder="CEP" name="cep" {...register('cep')} />
      <input type="text" placeholder="Rua" name="rua" {...register('rua')} />
      <input type="text" placeholder="Numero" name="numRua" {...register('numRua')} />
      <input type="text" placeholder="Complemento (Opcional)" name="complemento" {...register('complemento')} />

      <h3>3 - Como ficou sabendo sobre nós?</h3>
      <div>
        <input type="radio" value="Por indicação de amigos ou conhecidos" name="indicacao" {...register('indicacao')} /> Por indicação de amigos ou conhecidos
        <input type="radio" value="Redes Sociais (Facebook, Instagram, etc.)" name="indicacao" {...register('indicacao')} /> Redes Sociais (Facebook, Instagram, etc.)
        <input type="radio" value="Recebi um e-mail" name="indicacao" {...register('indicacao')} /> Recebi um e-mail
        <input type="radio" value="TV ou rádio" name="indicacao" {...register('indicacao')} /> TV ou rádio
      </div>

      <input type="submit" />
    </form>
  );
}

