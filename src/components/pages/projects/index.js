import { useLocation } from "react-router-dom";
import Message from "../../layouts/Message";
import Container from "../../layouts/Container";
import LinkButton from "../../layouts/LinkButton";

import styles from  './style.module.css';

function Projects() {

  const location = useLocation();

  let message = '';

  if(location.state) {
    message = location.state.message;
  }

  return(
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus projetos</h1>
        <LinkButton to="/newproject" text="Criar Projeto" />
      </div>
      {message && <Message type="success" message={message} />}
      
      <Container customClass="start">
        <p>Projetos ...</p>
      </Container>

    </div>   
  );
}

export default Projects;