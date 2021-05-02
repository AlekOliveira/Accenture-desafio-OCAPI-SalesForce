import React from 'react';
import { useForm } from "react-hook-form";

// import dataApi from '../services/dataApi';
//import auth from '../services/auth';

export default function CrudForm() {

  const {register, handleSubmit} = useForm();

  const onSubmit = (data) => {
    console.log(data);

    /**
     * validar se existe
     *       se sim, criar novo registro
     * 
     * se nao, carregar dados da tela e permitir alteração ou remoção
     */

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", "Basic Z3J1cG8xLnNhbGVzZm9yY2VAZ21haWwuY29tOkdydXBvMUFjY2VudHVyZTIwMjE6YWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFh");

    var urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("https://zzrl-034.sandbox.us01.dx.commercecloud.salesforce.com/dw/oauth2/access_token?client_id=aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>

      <h3>1 - Informações pessoais</h3>
      <input type="text" placeholder="Nome e sobrenome" name="nome" {...register('nome')}/>      
      <input type="text" placeholder="Celular" name="fone" {...register('fone')}/>
      <input type="text" placeholder="Cpf" name="cpf" {...register('cpf')}/>
      <input type="text" placeholder="Data de nascimento" name="nascimento" {...register('nascimento')}/>      
      <div>
        <input type="radio" value="Masculino" name="genero" {...register('genero')}/> Masculino
        <input type="radio" value="Feminino" name="genero" {...register('genero')}/> Feminino
        <input type="radio" value="Outro" name="genero" {...register('genero')}/> Outro
      </div>
      <input type="text" placeholder="Email" name="email" {...register('email')}/>
      <input type="password" placeholder="Senha" name="senha" {...register('senha')}/>     
      
      <h3>2 - Endereço</h3>
      <input type="text" placeholder="CEP" name="cep" {...register('cep')}/>
      <input type="text" placeholder="Rua" name="rua" {...register('rua')}/>
      <input type="text" placeholder="Numero" name="numRua" {...register('numRua')}/>
      <input type="text" placeholder="Complemento (Opcional)" name="complemento" {...register('complemento')}/>

      <h3>3 - Como ficou sabendo sobre nós?</h3>
      <div>
        <input type="radio" value="Por indicação de amigos ou conhecidos" name="indicacao" {...register('indicacao')}/> Por indicação de amigos ou conhecidos
        <input type="radio" value="Redes Sociais (Facebook, Instagram, etc.)" name="indicacao" {...register('indicacao')}/> Redes Sociais (Facebook, Instagram, etc.)
        <input type="radio" value="Recebi um e-mail" name="indicacao" {...register('indicacao')}/> Recebi um e-mail
        <input type="radio" value="TV ou rádio" name="indicacao" {...register('indicacao')}/> TV ou rádio   
      </div>
      
      <input type="submit"/>
    </form>
  );
}

// Right click on desktop, add new shortcut.
// Add the target as "[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp.
// Click OK. 