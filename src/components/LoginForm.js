import React from 'react';
import { useForm } from "react-hook-form";

export default function CrudForm(props) {

  const {register, handleSubmit} = useForm();

  const onSubmit = (data) => {
    console.log(data);
    

    //react router example
    props.history.push('/dados');
  }

  return(
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Email" name="email" {...register('email')}/>
      <input type="password" placeholder="Senha" name="password" {...register('password')}/>
      <input type="submit"/>
    </form>
  );
}