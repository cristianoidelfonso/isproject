import { useNavigate } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {

  const navigate = useNavigate();

  function createPost(project){
    // initialize cost and services
    project.cost = 0; 
    project.services = [];

    fetch('http://localhost:5000/projects', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(project)

    })
    .then((response) => response.json())
    .then((data) =>{
      // console.log(data);
      // redirect
      navigate('/projects', {message: 'Projeto criado com sucesso!'});
    })
    .catch((error) => console.log(error))
  }

  return(
    <div className={styles.newproject_container}>
      <h1>Criar projeto</h1>
      <p>Crie seu projeto para em seguida adicionar os recursos</p>
      <ProjectForm handleSubmit={createPost} btnText="Criar projeto" />
    </div>
  );
}

export default NewProject;