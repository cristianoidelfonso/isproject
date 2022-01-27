import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../layouts/Loading';
import Container from '../layouts/Container';

import styles from './Project.module.css';

function Project(){

  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);

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

  function toggleProjectForm() {

    setShowProjectForm(!showProjectForm);
  
  }

  return(
    <>
      {project.name 
        ? (
          <div className={styles.project_details}>
            <Container customClass="column">
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
                      <p><span>Total utilizado: </span> R${project.cost}</p>
                    </div>
                  ) 
                  :(
                    <div className={styles.project_info}>
                      <p>Detalhes do projeto</p>
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