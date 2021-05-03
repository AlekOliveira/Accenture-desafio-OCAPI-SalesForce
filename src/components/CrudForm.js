import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import auth from '../services/auth';
import dataApi from '../services/dataApi';

export default function CrudForm(props) {

  const { register, handleSubmit } = useForm();
  const [token, setToken] = useState('');
  const [operacao, setOperacao] = useState('insert');
  //const [usr, setUsr] = useState(null); 

  const email = props.email;
  const usr = props.usr ? props.usr :
    {
      c_cep: "",
      c_complemento: "",
      c_cpf: "",
      c_fone: "",
      c_genero: "",
      c_indicacao: "",
      c_nascimento: "",
      c_nome: "",
      c_numRua: "",
      c_rua: "",
      c_senha: ""
    };
  
  console.log(usr);
  

  useEffect(() => {
    auth.getToken().then(res => {
      setToken((res.data.access_token));
    })
    
    //setUsr(props.usr);
  }, [])

  console.log(usr);

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
    ).then(res => {
      alert('Cadastro realizado com sucesso!');
    }).catch(err => {
      alert('Revise seus dados e tente novamente!');
    });
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
    ).then(res => {
      alert('Informações autalizadas com sucesso!');
    }).catch(err => {
      alert('Revise seus dados e tente novamente!');
    });
  }

  function destroy(emailUsr) {
    if (window.confirm("Tem certeza que deseja excluir sua conta?")) {
      dataApi.delete('/dw/data/v21_3/custom_objects/ObjDesafioAlexandre/' + emailUsr,
        {
          headers: {
            'Authorization': 'Bearrer ' + token,
            'Content-Type': 'application/json'
          }
        }
      ).then(res => {
        alert('Conta excluida, você será redirecionado!');
      }).catch(err => {
        alert('Erro inesperado: ' + err);
      });

      props.history.push('/');
    }
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
    switch (operacao) {
      case 'insert':
        insert(formData);
        break;
      case 'update':
        update(formData, email);
        break;
      case 'destroy':
        destroy(email);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div id="infoPessoais">
          <h3>1 - Informações pessoais</h3>
          <label htmlFor="">Nome e Sobrenome</label><br />
          <input {...register('nome')} required type="text" placeholder="Nome e sobrenome*" name="nome" value={usr.c_nome}/><br /><br />

          <label htmlFor="">Celular</label><br />
          <input
            {...register('fone')}
            required
            type="text"
            placeholder="Com ddd sem espaços"
            name="fone"
            pattern="([1-9]{2}[0-9]{9})"
          /><br /><br />

          <label htmlFor="">CPF</label><br />
          <input
            {...register('cpf')}
            required
            type="text"
            placeholder="xxx.xxx.xxx-xx"
            name="cpf"
            pattern="([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"
          /><br /><br />

          <label htmlFor="">Nascimento</label><br />
          <input {...register('nascimento')} required type="date" placeholder="Data de nascimento*" name="nascimento" /><br /><br />

          <div>
            <label htmlFor="">Gênero</label><br />
            <input {...register('genero')} required type="radio" value="Masculino" name="genero" /> Masculino
          <input {...register('genero')} required type="radio" value="Feminino" name="genero" /> Feminino
          <input {...register('genero')} required type="radio" value="Outro" name="genero" /> Outro
        </div><br /><br />

          <label htmlFor="">Email</label><br />
          <input
            {...register('email')}
            required
            type="text"
            placeholder="email@email.com"
            name="email"
            pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
          /><br /><br />

          <label htmlFor="">Senha</label><br />
          <input {...register('senha')} required type="password" placeholder="Senha*" name="senha" /><br /><br />
        </div>

        <div id="endereco">
          <h3>2 - Endereço</h3>
          <label htmlFor="">CEP</label><br />
          <input
            {...register('cep')}
            required
            type="text"
            placeholder="xxxxx-xxx"
            name="cep"
            pattern="^\d{5}[\-]?\d{3}$"
          /><br /><br />

          <label htmlFor="">Rua</label><br />
          <input {...register('rua')} required type="text" placeholder="Rua*" name="rua" /><br /><br />

          <label htmlFor="">Numero</label><br />
          <input {...register('numRua')} required type="text" placeholder="Numero*" name="numRua" /><br /><br />

          <label htmlFor="">Complemento</label><br />
          <input {...register('complemento')} type="text" placeholder="(Opcional)" name="complemento" /><br /><br />

        </div>

        <div id="sobreNos">
          <h3>3 - Como ficou sabendo sobre nós?*</h3>
          <div>
            <input {...register('indicacao')} required type="radio" value="Por indicação de amigos ou conhecidos" name="indicacao" /> Por indicação de amigos ou conhecidos
            <input {...register('indicacao')} required type="radio" value="Redes Sociais (Facebook, Instagram, etc.)" name="indicacao" /> Redes Sociais (Facebook, Instagram, etc.)
            <input {...register('indicacao')} required type="radio" value="Recebi um e-mail" name="indicacao" /> Recebi um e-mail
            <input {...register('indicacao')} required type="radio" value="TV ou rádio" name="indicacao" /> TV ou rádio
          </div>
        </div>

        {
          props.newProfile ?
            <input id="btSubmit" type="submit" />
            :
            <div>
              <button onClick={() => setOperacao('update')} type="submit">Atualizar</button>
              <button onClick={() => setOperacao('destroy')} type="submit">Excluir Conta</button>
              {/* trocar o destrou pra uma function evitando submit */}
            
            </div>
        }
      </form>
    </>
  );
}