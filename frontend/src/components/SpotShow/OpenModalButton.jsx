import { useModal } from '../../context/Modal';
import ConfirmDeleteModal from './ConfirmDeleteModal';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button id={modalComponent === ConfirmDeleteModal ? 'review-delete-btn' : "new-review-btn" } className={modalComponent === ConfirmDeleteModal ? 'delete-btn' : "new-review-btn" } onClick={onClick}>{buttonText}</button>;
}

export default OpenModalButton;
