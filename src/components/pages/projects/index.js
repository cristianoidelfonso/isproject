import { useLocation } from "react-router-dom";
import Message from "../../layouts/Message";
import Container from "../../layouts/Container";
import LinkButton from "../../layouts/LinkButton";

import styles from  './style.module.css';
import ProjectCard from "../../project/ProjetcCard";
import { useState, useEffect } from "react";

function Projects() {

  const [projects, setProjects] = useState([]);

  const location = useLocation();

  let message = '';

  if(location.state) {
    message = location.state.message;
  }

  useEffect(() => {

    fetch('http://localhost:5000/projects', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setProjects(data);
    })
    .catch((error) => console.log(error))

  }, []);

  return(
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message type="success" message={message} />}
      
      <Container customClass="start">
        {
          projects.length > 0 &&
            projects.map((project) => (
              <ProjectCard 
                key={project.id} 
                id={project.id} 
                name={project.name} 
                budget={project.budget} 
                category={project.category.name}  
              />
            ))
        }
      </Container>

    </div>   
  );
}

export default Projects;