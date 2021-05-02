import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import auth from '../services/auth';
import dataApi from '../services/dataApi';

export default function CrudForm() {

  const { register, handleSubmit } = useForm();

  const [token, setToken] = useState([]);

  useEffect(() => {
    auth.getToken().then(res => {
      setToken((res.data.access_token));
    })
  }, [])

  function insert(formData) {
    const data = JSON.stringify({
      "c_cep": formData.cep,
      "c_complemento": formData.complemento,
      "c_cpf": formData.cpf,
      "c_fone": formData.fone,
      "c_genero": formData.genero,
      "c_indicacao": formData.indicacao,
      "c_nascimento": formData.nascimento.split('/').reverse().join('-'),
      "c_nome": formData.nome,
      "c_numRua": formData.numRua,
      "c_rua": formData.rua,
      "c_senha": formData.senha
    });
  
    dataApi.put('/dw/data/v21_3/custom_objects/ObjDesafioAlexandre/' + formData.email,
      data,
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }
    );
  }
  
  function update(formData, emailUsr) {
    const data = JSON.stringify({
      "c_cep": formData.cep,
      "c_complemento": formData.complemento,
      "c_cpf": formData.cpf,
      "c_fone": formData.fone,
      "c_genero": formData.genero,
      "c_indicacao": formData.indicacao,
      "c_nascimento": formData.nascimento.split('/').reverse().join('-'),
      "c_nome": formData.nome,
      "c_numRua": formData.numRua,
      "c_rua": formData.rua,
      "c_senha": formData.senha,
      "c_email": formData.email
    });
  
    dataApi.patch('/dw/data/v21_3/custom_objects/ObjDesafioAlexandre/' + emailUsr,
      data,
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }
    );
  }
  
  function remove(emailUsr) {
    dataApi.delete('/dw/data/v21_3/custom_objects/ObjDesafioAlexandre/' + emailUsr,
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }
    );
  }
  
  function show(emailUsr) {
    dataApi.get('/dw/data/v21_3/custom_objects/ObjDesafioAlexandre/' + emailUsr,
      {
        headers: {
          'Authorization': 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      }
    ).then(res => {
      console.log(res.data);
    });  
  }

  const onSubmit = (formData) => {
    //insert(formData);
    //update(formData, 'new@email');
    //remove('new@email');
    //show('alexandre.cardozo1@gmail.com');
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