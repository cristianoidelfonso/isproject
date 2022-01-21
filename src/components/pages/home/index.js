import savings from '../../../img/savings.svg'
import LinkButton from '../../layouts/LinkButton';
import './style.css'

function Home() {
  return(
    <section className='home_container'>
      <h1>Bem vindo ao <span>Is Project</span></h1>
      <p>Comece a gerenciar os seus projetos agora mesmo!</p>
      <LinkButton to="/newproject" text="Criar Projeto" />
      <img src={savings} alt="Is Project"/>
    </section>
  );
}

export default Home;