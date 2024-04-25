import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReview, fetchReviews } from '../../store/reviews';
import { fetchSpots } from '../../store/spots';
import './ConfirmDelete.css';

function ConfirmDeleteModal({reviewId, spotId}) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const processDelete = (e) => {
      e.preventDefault();
        return dispatch(deleteReview(reviewId, spotId)).then(closeModal).then(() =>{
        dispatch(fetchSpots(spotId)).then((data) => {
          dispatch(fetchReviews(data.id))
        })
      })
      };

  return (
    <div>
      <h1>Confirm Delete</h1>
      <p className='subtitle' style={{border: 'none', textAlign: 'center', padding: 0, fontSize: '15px'}}>Are you sure you want to delete this review?</p>
          <button className='confirm-delete-btn' id='delete-btn' type='submit' onClick={(e) => {
          processDelete(e);
          }}>Yes (Delete Review)</button>
          <button className='confirm-delete-btn' id='keep-btn' type='submit' onClick={() => {
          closeModal()
          }}>No (Keep Review)</button>
    </div>
  );
}

export default ConfirmDeleteModal;
