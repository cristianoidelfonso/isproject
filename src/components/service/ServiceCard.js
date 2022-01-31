import { BsFillTrashFill } from 'react-icons/bs';
import styles from './ServiceCard.module.css';

function ServiceCard({ id, name, cost, description, handleRemove }){

  const remove = (event) => {
    event.preventDefault();
    handleRemove(id, cost);
  }

  return(
    <div className={styles.service_card}>
      <h4>{name}</h4>
      <p><span>Custo total: </span>R${cost}</p>
      <p>{description}</p>
      <div className={styles.service_card_actions}>
        <button onClick={remove}>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;