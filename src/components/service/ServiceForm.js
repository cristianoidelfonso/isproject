import { useState } from 'react';
import Input from '../form/Input';
import Submit from '../form/SubmitButton';
import styles from './ServiceForm.module.css';

function ServiceForm({ handleSubmit, btnText, projectData }) {

  const [service, setService] = useState({});


  function submit(event){
    event.preventDefault();
    projectData.services.push(service);
    handleSubmit(projectData);
  } 

  function handleChange(event){
    setService( {...service, [event.target.name]: event.target.value} )
  }

  return(
    <form onSubmit={submit} className={styles.form}>
      <Input 
        type="text" 
        name="name" 
        text="Nome do serviço"
        placeholder="Insira o nome do serviço"
        handleOnChange={handleChange}
      />

      <Input 
        type="number" 
        name="cost" 
        text="Custo do serviço"
        placeholder="Insira o valor total"
        handleOnChange={handleChange}
      />

      <Input 
        type="text" 
        name="description" 
        text="Descrição do serviço"
        placeholder="Descreva o serviço"
        handleOnChange={handleChange}
      />

      <Submit text={btnText}/>
    </form>
  );
}

export default ServiceForm;