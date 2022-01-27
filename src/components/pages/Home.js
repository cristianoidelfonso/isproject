import savings from '../../img/savings.svg'
import LinkButton from '../layouts/LinkButton';
import styles from './Home.module.css';

function Home() {
  return(
    <section className={styles.home_container}>
      <h1>Bem vindo ao <span>IS Project</span></h1>
      <p>Comece a gerenciar os seus projetos agora mesmo!</p>
      <LinkButton to="/newproject" text="Criar Projeto" />
      <img src={savings} alt="Is Project"/>
    </section>
  );
}

export default Home;