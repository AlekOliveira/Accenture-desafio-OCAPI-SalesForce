import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import auth from '../services/auth';
import dataApi from '../services/dataApi';

export default function CrudForm(props) {

  const { register, handleSubmit } = useForm();
  const [token, setToken] = useState([]);

  useEffect(() => {
    auth.getToken().then(res => {
      setToken((res.data.access_token));
    })
  }, [])

  async function validateUserLogin(formData) {
    var data = JSON.stringify({
      "query": {
        "bool_query": {
          "must": [
            {
              "term_query": {
                "fields": [
                  "c_senha"
                ],
                "operator": "is",
                "values": [
                  formData.senha
                ]
              }
            },
            {
              "term_query": {
                "fields": [
                  "key_value_string"
                ],
                "operator": "is",
                "values": [
                  formData.email
                ]
              }
            }
          ]
        }
      },
      "select": "(**)"
    });

    dataApi.post('/dw/data/v21_3/custom_objects_search/ObjDesafioAlexandre', data, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if(res.data.hits) {
        props.history.push('/cadastro');      
      }
      else
      {
        alert('Usuário ou senha inválidos!');
      }
    });
  }

  const onSubmit = (formData) => {  
    validateUserLogin(formData);
  }

  function cadastrar() {
    // props.history.push('/cadastro');
    alert('teste');
  }

  return (    
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" name="email" {...register('email')} />
        <input type="password" placeholder="Senha" name="senha" {...register('senha')} />
        {/* <input type="submit" /> */}
        <button type="submit">Login!</button>      
      </form>
    
      <button onClick={cadastrar}>Cadastre-se!</button>
    </>
  );
}