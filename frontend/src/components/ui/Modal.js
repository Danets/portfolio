import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const BackDrop = (props) => {
  return <div onClick={props.onCloseModal} className={styles.backdrop}></div>;
};

const ModalWindow = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const modalElement = document.getElementById("modal");

const Modal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(<BackDrop onCloseModal={props.onCloseModal} />, modalElement)}
      {ReactDOM.createPortal(<ModalWindow>{props.children}</ModalWindow>, modalElement)}
    </>
  );
};

export default Modal;
