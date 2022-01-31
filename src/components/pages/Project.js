import { parse, v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../layouts/Loading';
import Container from '../layouts/Container';
import Message from '../layouts/Message';
import ProjectForm from '../project/ProjectForm';

import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

import styles from './Project.module.css';

function Project(){

  const { id } = useParams();
  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
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
        setServices(data.services);
      })
      .catch((error) => console.log(error))
    
    }, 300);
  }, [id]);
  
  function editProject(project) {
    setMessage('');
    setTypeMessage('');
    // console.log(project);
    // budget validation
    if(project.budget < project.cost){
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

  function createService(project){
    setMessage('');
    setTypeMessage('');
    // last service
    const lastService = project.services[project.services.length - 1];
    
    lastService.id = uuidv4();
    
    const newCost = parseFloat(project.cost) + parseFloat(lastService.cost);

    //  maxim value validate
    if(newCost > parseFloat(project.budget)){
      setMessage('Orçamento utrapassado. Verifique o valor do serviço');
      setTypeMessage('error');
      project.services.pop();
      return false;
    }

    // add service cost to project total cost
    project.cost = newCost;

    // update project
    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type':'application/json', 
      }, 
      body: JSON.stringify(project)
    })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      setShowServiceForm(false);

    })
    .catch((error) => console.log(error))
  }

  function  removeService(id, cost){
    setMessage('');
    setTypeMessage('');
    
    const servicesUpdated = project.services.filter((service) => service.id !== id);

    const projectUpdated = project;

    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    fetch(`http://localhost:5000/projects/${projectUpdated.id}`, {
      method: 'PATCH', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(projectUpdated)
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setProject(projectUpdated);
      setServices(servicesUpdated);
      setMessage('Serviço removido com sucesso.');
      setTypeMessage('success');
    })
    .catch((error) => console.log(error))


  }
  
  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }

  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
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
                <button className={styles.btn} onClick={toggleProjectForm}>
                  { !showProjectForm ? 'Editar projeto' : 'Fechar' }
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
                      <ProjectForm 
                        handleSubmit={editProject}
                        btnText="Concluir edição"
                        projectData={project}
                      />
                    </div>
                  )
                }
              </div>

              <div className={styles.service_form_container}>
                <h2>Adicione um serviço</h2>
                <button className={styles.btn} onClick={toggleServiceForm}>
                  { !showServiceForm ? 'Adicionar Serviço' : 'Fechar' }
                </button>
                <div className={styles.project_info}>
                  { showServiceForm && ( 
                      <ServiceForm 
                        handleSubmit={createService}
                        btnText="Adicionar serviço"
                        projectData={project}
                      /> 
                    ) 
                  }

                </div>
              </div>
              <h3>Serviços</h3>
              <Container customClass="start">
                {services.length > 0  && services.map((service) => (
                  <ServiceCard 
                    id = {service.id}
                    name = {service.name}
                    cost = {service.cost}
                    description = {service.description}
                    key = {service.id}
                    handleRemove={removeService}
                  />
                ))
                }
                {services.length === 0 && <p>Não há serviços cadastrados.</p>}
              </Container>

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