import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './style.module.css';

function Project(){

  const { id } = useParams();
  const [project, setProject] = useState([]);

  useEffect(() => {
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
  }, [id])

  return(
    <>
    <h1>{project.name}</h1>
    </>
  );
}

export default Project;