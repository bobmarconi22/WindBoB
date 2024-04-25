import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './ReviewForm.css';

function ReviewFormModal() {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ comment, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message === 'Invalid comments') {
          setErrors({comment: 'The provided comments were invalid'});
        }
      });
  };


    const handleStarClick = (value) => {
      setRating(value);
    }


  return (
    <div>
      <h1>How was your stay?</h1>
      <form id='review-form' onSubmit={handleSubmit}>
          <input
            type="textarea"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            placeholder='Leave your review here...'
          />
        <label class='rating-label'>
        <div className="star-rating">
      {[1,2,3,4,5].map((value) => (
        <span
          key={value}
          className={value <= rating ? 'star-filled' : 'star'}
          onClick={() => handleStarClick(value)}
        >
          &#9733;
        </span>
      ))}
    </div>
    <p className='star-total'>{rating} <b style={{fontSize: '12px'}}>stars</b> </p>
        </label>
        <button className='submit-log-in' type='submit' disabled={comment.length < 10 || stars === 0} onClick={() => {
          handleSubmit()
          }}>Submit Your Review</button>
      </form>
    </div>
  );
}

export default ReviewFormModal;
