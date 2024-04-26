import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./ReviewForm.css";
import { createReview } from "../../store/reviews";

function ReviewFormModal({ spotId }) {
  const dispatch = useDispatch();
  const [review, setReview] = useState("");
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const payload = {
      review,
      stars,
    };
    return dispatch(createReview(spotId, payload))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.message) {
          setErrors({ message: data.message });
        }
      });
  };

  return (
    <div>
      <h1>How was your stay?</h1>
      <p
        className="form-errors"
        style={{ paddingBottom: "30px", paddingLeft: "33px" }}
      >
        {errors && errors.message}
      </p>
      <form id="review-form" onSubmit={handleSubmit}>
        <input
          type="textarea"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
          placeholder="Leave your review here..."
        />
        <label className="rating-label">
          <div className="star-rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={value <= stars ? "star-filled" : "star"}
                onClick={() => setStars(value)}
              >
                &#9733;
              </span>
            ))}
          </div>
          <p className="star-total">
            {stars} <b style={{ fontSize: "12px" }}>stars</b>{" "}
          </p>
        </label>
        <button
          className="submit-log-in"
          id="review-btn"
          type="submit"
          disabled={review.length < 10 || stars === 0}
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default ReviewFormModal;
