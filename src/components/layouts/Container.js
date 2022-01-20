import Styles from './Container.module.css'

function Container(props) {
  return(
    <div className={`${Styles.container} ${Styles[props.customClass]}`}>
      {props.children}
    </div>
  );
}

export default Container;