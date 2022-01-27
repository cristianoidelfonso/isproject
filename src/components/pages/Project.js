import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../layouts/Loading';
import Container from '../layouts/Container';
import Message from '../layouts/Message';
import ProjectForm from '../project/ProjectForm';

import styles from './Project.module.css';

function Project(){

  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();

  useEffect(() => {
    setTimeout(() => {
      
      fetch(`http://localhost:5000/projects/${id}`, {
        method: "GET",
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then(response => response.json())
      .then((data) => {
        setProject(data);
      })
      .catch((error) => console.log(error))
    
    }, 300);
  }, [id]);
  
  function editProject(project) {
    // console.log(project);
    // budget validation
    if(project.budget < project.isproject){
      setMessage('O orçamento não pode ser menor que o custo do projeto.');
      setTypeMessage('error');
      return false;
    } 

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        'Content-type':'application/json'
      },
      body: JSON.stringify(project),
    })
    .then(response => response.json())
    .then((data) => {
      setProject(data);
      setShowProjectForm(false);
      setMessage('Projeto atualizado!');
      setTypeMessage('success');
    })
    .catch((error) => console.log(error))
  }
  
  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  return(
    <>
      {project.name 
        ? (
          <div className={styles.project_details}>
            <Container customClass="column">
              {message && <Message type={typeMessage} message={message} />}
              <div className={styles.details_container}>
                <h1>Projeto: {project.name}</h1>
                <button onClick={toggleProjectForm} className={styles.btn}>
                  {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                </button>
                {!showProjectForm 
                  ?(
                    <div className={styles.project_info}>
                      <p><span>Categoria: </span> {project.category.name}</p>
                      <p><span>Total de orçamento: </span> R${project.budget}</p>
                      <p><span>Total utilizado: </span> R${project.isproject}</p>
                    </div>
                  ) 
                  :(
                    <div className={styles.project_info}>
                      <ProjectForm 
                        handleSubmit={editProject}
                        btnText="Concluir edição"
                        projectData={project}
                      />
                    </div>
                  )
                }
              </div>
            </Container>
          </div> 
        )
        : (
          <Loading />
          ) 
      }
    </>
  );
}

export default Project;