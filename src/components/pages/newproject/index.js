import ProjectForm from '../../project/ProjectForm';
import './style.css'

function NewProject() {
  return(
    <div className='newproject_container'>
      <h1>Criar projeto</h1>
      <p>Crie seu projeto para em seguida adicionar os recursos</p>
      <ProjectForm btnText="Criar projeto" />
    </div>
  );
}

export default NewProject;