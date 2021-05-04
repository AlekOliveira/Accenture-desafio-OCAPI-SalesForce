import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import auth from '../services/auth';
import dataApi from '../services/dataApi';
import '../style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CrudForm(props) {

  const { register, handleSubmit } = useForm();
  const [token, setToken] = useState('');
  const [operacao, setOperacao] = useState('insert');
  
  //######formStates######
  const [cep, setCep] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cpf, setCpf] = useState('');
  const [fone, setFone] = useState('');
  const [genero, setGenero] = useState('');
  const [indicacao, setIndicacao] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [nome, setNome] = useState('');
  const [numRua, setNumRua] = useState('');
  const [rua, setRua] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  //######formStates######

  //const email = props.email;
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
    c_senha: "",
    key_value_string: ""
  };

  useEffect(() => {
    auth.getToken().then(res => {
      setToken((res.data.access_token));
    })
    setCep(usr.c_cep);
    setComplemento(usr.c_complemento);
    setCpf(usr.c_cpf);
    setFone(usr.c_fone);
    setGenero(usr.c_genero);
    setIndicacao(usr.c_indicacao);
    setNascimento(usr.c_nascimento);    
    setNome(usr.c_nome);
    setNumRua(usr.c_numRua);
    setRua(usr.c_rua);
    setSenha(usr.c_senha);
    setEmail(usr.key_value_string);
  }, [])
 
  function insert(formData) {
    const data = JSON.stringify({
      "c_cep": formData.cep,
      "c_complemento": formData.complemento,
      "c_cpf": formData.cpf,
      "c_fone": formData.fone,
      "c_genero": formData.genero,
      "c_indicacao": formData.indicacao,
      "c_nascimento": formData.nascimento,
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
    const data = {
      c_cep: cep,
      c_complemento: complemento,
      c_cpf: cpf,
      c_fone: fone,
      c_genero: genero,
      c_indicacao: indicacao,
      c_nascimento: nascimento,
      c_nome: nome,
      c_numRua: numRua,
      c_rua: rua,
      c_senha: senha,
      c_email: email
    };
    console.log(data);

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

  function destroy(email) {    
    if (window.confirm("Tem certeza que deseja excluir sua conta?")) {
      dataApi.delete('/dw/data/v21_3/custom_objects/ObjDesafioAlexandre/' + email,
        {
          headers: {
            'Authorization': 'Bearer ' +token,
            'Content-Type': 'application/json'
          }
        }
      ).then(res => {
        alert('Conta excluida!');
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
    //for insert and updates
    switch (operacao) {
      case 'insert':
        insert(formData);
        break;
      case 'update':
        update(formData, email);
    }
  }

  return (
    <>
      <div class="crud-image">   
      <form onSubmit={handleSubmit(onSubmit)}>

      <div class="row"> 
        <div id="infoPessoais" class="col">
          <h3 class="title">1 - Informações pessoais</h3>
          <label class="title2" htmlFor="">Nome e Sobrenome</label><br />
          <input
            class="form-input"
            {...register('nome')}
            required
            type="text"
            placeholder="Nome e sobrenome*"
            name="nome"
            value={nome}
            onChange={ (e) => setNome(e.target.value) }
            
          /><br /><br />

          <label class="title2" htmlFor="">Celular</label><br />
          <input
            class="form-input"
            {...register('fone')}
            required
            type="text"
            placeholder="Com ddd sem espaços"
            name="fone"
            pattern="([1-9]{2}[0-9]{9})"
            value={fone}
            onChange={ (e) => setFone(e.target.value) }
          /><br /><br />

          <label class="title2" htmlFor="">CPF</label><br />
          <input
            class="form-input"
            {...register('cpf')}
            required
            type="text"
            placeholder="xxx.xxx.xxx-xx"
            name="cpf"
            pattern="([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})"
            value={cpf}
            onChange={ (e) => setCpf(e.target.value) }
          /><br /><br />

          <label class="title2" htmlFor="">Nascimento</label><br />
          <input
            class="form-input"
            {...register('nascimento')}
            required
            type="text"
            placeholder="Data de nascimento*"
            name="nascimento"
            value={nascimento}
            onChange={ (e) => setNascimento(e.target.value) }
          /><br /><br />

          <div class="myRadio">
            <label class="title2" htmlFor="">Gênero</label><br />
            <input {...register('genero')} checked={'Masculino' === genero} onChange={ (e) => setGenero(e.target.value) } required type="radio" value="Masculino" name="genero" />Masculino
            <input {...register('genero')} checked={'Feminino' === genero} onChange={ (e) => setGenero(e.target.value) } required type="radio" value="Feminino" name="genero" />Feminino
            <input {...register('genero')} checked={'Outro' === genero} onChange={ (e) => setGenero(e.target.value) } required type="radio" value="Outro" name="genero" />Outro
          </div>

          <label class="title2" htmlFor="">Email</label><br />
          <input
            class="form-input"
            {...register('email')}
            required
            type="text"
            placeholder="email@email.com"
            name="email"
            pattern="^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          /><br /><br />

          <label class="title2" htmlFor="">Senha</label><br />
          <input
            class="form-input"
            {...register('senha')}
            required
            type="password"
            placeholder="Senha*"
            name="senha"
            value={senha}
            onChange={ (e) => setSenha(e.target.value) }
          /><br /><br />
        </div>

        <div id="endereco" class="col">
          <h3 class="title">2 - Endereço</h3>
          <label class="title2" htmlFor="">CEP</label><br />
          <input
            class="form-input"
            {...register('cep')}
            required
            type="text"
            placeholder="xxxxx-xxx"
            name="cep"
            pattern="^\d{5}[\-]?\d{3}$"
            value={cep}
            onChange={ (e) => setCep(e.target.value) }
          /><br /><br />

          <label class="title2" htmlFor="">Rua</label><br />
          <input
            class="form-input"
            {...register('rua')}
            required
            type="text"
            placeholder="Rua*"
            name="rua"
            value={rua}
            onChange={ (e) => setRua(e.target.value) }
          /><br /><br />

          <label class="title2" htmlFor="">Numero</label><br />
          <input
            class="form-input"
            {...register('numRua')}
            required
            type="text"
            placeholder="Numero*"
            name="numRua"
            value={numRua}
            onChange={ (e) => setNumRua(e.target.value) }
          /><br /><br />

          <label class="title2" htmlFor="">Complemento</label><br />
          <input
            class="form-input"
            {...register('complemento')}
            type="text"
            placeholder="(Opcional)"
            name="complemento"
            value={complemento}
            onChange={ (e) => setComplemento(e.target.value) }
          /><br /><br />

        </div>

        <div id="sobreNos" class="col">
          <h3 class="title">3 - Como ficou sabendo sobre nós?*</h3>
          <div class="myRadio">
            <input {...register('indicacao')} checked={'Por indicação de amigos ou conhecidos' === indicacao } onChange={ (e) => setIndicacao(e.target.value) } required type="radio" value="Por indicação de amigos ou conhecidos" name="indicacao" /> Por indicação de amigos ou conhecidos
            <br/>
            <input {...register('indicacao')} checked={'Redes Sociais (Facebook, Instagram, etc.)' === indicacao } onChange={ (e) => setIndicacao(e.target.value) } required type="radio" value="Redes Sociais (Facebook, Instagram, etc.)" name="indicacao" /> Redes Sociais (Facebook, Instagram, etc.)
            <br/>
            <input {...register('indicacao')} checked={'Recebi um e-mail' === indicacao } onChange={ (e) => setIndicacao(e.target.value) } required type="radio" value="Recebi um e-mail" name="indicacao" /> Recebi um e-mail
            <br/>
            <input {...register('indicacao')} checked={'TV ou rádio' === indicacao } onChange={ (e) => setIndicacao(e.target.value) } required type="radio" value="TV ou rádio" name="indicacao" /> TV ou rádio
          </div>
        </div>
      </div>

        {
          props.newProfile ?
            <input class="form-button" id="btSubmit" type="submit" />
            :
            <button class="form-button" onClick={() => setOperacao('update')} type="submit">Atualizar</button>                         
            
        }
      </form>
      {
        !props.newProfile ?
        <button class="form-button" onClick={() => destroy(email)} >Excluir Conta</button>
        :
        '' 
      }
      </div>
      </>
  );
}