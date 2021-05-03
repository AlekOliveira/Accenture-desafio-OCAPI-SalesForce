import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import auth from '../services/auth';
import dataApi from '../services/dataApi';

export default function LoginForm(props) {

  const { register, handleSubmit } = useForm();
  const [token, setToken] = useState([]);
  const setEmail = props.setEmail;
  const setUsr = props.setUsr;

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
      if (res.data.hits) {
        setEmail(res.data.hits[0].key_value_string);
        setUsr(res.data.hits[0]);
        props.history.push('/perfil');
      }
      else {
        alert('Usuário ou senha inválidos!');
      }
    });
  }

  const onSubmit = (formData) => {
    validateUserLogin(formData);
  }

  function cadastrar() {
    props.history.push('/cadastro');
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Área exclusiva para login de revendedores</p>
        <input
          type="text"
          placeholder="email@email.com"
          name="email"
          {...register('email')}
        />
        <input
          type="password"
          placeholder="Senha"
          name="senha"
          {...register('senha')}
        />

        <button type="submit">Acessar</button>
      </form>

      <button onClick={cadastrar}>Quero ser um revendedor</button>
    </>
  );
}