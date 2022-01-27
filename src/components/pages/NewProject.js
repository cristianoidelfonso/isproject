import { useHistory } from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {

  const history = useHistory();

  function createPost(project){
    // initialize isproject and services
    project.isproject = 0; 
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
      history.push('/projects', {message: 'Projeto criado com sucesso!'});
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