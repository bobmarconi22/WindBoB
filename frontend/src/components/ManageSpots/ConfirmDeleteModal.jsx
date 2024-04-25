import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteSpot, fetchSpotsCurrent } from '../../store/spots';
import './ConfirmDelete.css';

function ConfirmDeleteModal({spotId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const processDelete = async(e) => {
  e.preventDefault()
      dispatch(deleteSpot(spotId)).then(()=> {
        dispatch(fetchSpotsCurrent())
      }).then(closeModal)
      };

  return (
    <div>
      <h1>Confirm Delete</h1>
          <button className='confirm-delete-btns' id='delete-btn' type='submit' onClick={(e) => {
          processDelete(e);
          }}>Yes (Delete Spot)</button>
          <button className='confirm-delete-btns' id='keep-btn' type='submit' onClick={() => {
          closeModal()
          }}>No (Keep Spot)</button>
    </div>
  );
}

export default ConfirmDeleteModal;
