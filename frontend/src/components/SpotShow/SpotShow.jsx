import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchSpots } from "../../store/spots"
import { fetchReviews } from "../../store/reviews"
import { useEffect, useState } from "react"
import ReviewFormModal from './ReviewFormModal';
import './SpotShow.css'
import OpenModalButton from './OpenModalButton'
import ConfirmDeleteModal from "./ConfirmDeleteModal"

function SpotShow() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spotById);
    const reviews = useSelector((state) => state.reviews.reviews);
    const currentUserId = useSelector((state) => state.session.user?.id || 0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchSpots(spotId)).then(() => {
        });
        dispatch(fetchReviews(spotId)).then(() => {
            setIsLoaded(true);
        });
    }, [dispatch, spotId]);

    return (
        <>
            {isLoaded && spot && (
                <div id="spot-by-id">
                    <h1>{spot.name}</h1>
                    <p id="spot-location">Location: {spot.city}, {spot.state}, {spot.country}</p>
                    <div id="images-container">
                        <img id="img-large" src={spot.SpotImages.find((img) => img.preview === true)?.url} onClick={() => alert('Feature coming soon!')} alt="image 1" />
                        <div id="small-images" style={{zIndex: 2}}>
                            <img className="img-small" onClick={() => alert('Feature coming soon!')} src={spot.SpotImages[1] ? spot.SpotImages[1].url : ''} alt="image 2" />
                            <img className="img-small" onClick={() => alert('Feature coming soon!')} src={spot.SpotImages[2] ? spot.SpotImages[1].url : ''} alt="image 3" />
                            <img className="img-small" onClick={() => alert('Feature coming soon!')} src={spot.SpotImages[3] ? spot.SpotImages[1].url : ''} alt="image 4" />
                            <img className="img-small" onClick={() => alert('Feature coming soon!')} src={spot.SpotImages[4] ? spot.SpotImages[1].url : ''} alt="image 5" /><button id="all-photos" onClick={() => alert('Feature coming soon!')}>All Photos</button>
                        </div>
                    </div>
                    <div id="name-callout">
                        <p id="owner-name">Hosted by: &nbsp; {spot.Owner.firstName} {spot.Owner.lastName}</p>
                        <div id="callout-info">
                            <h1>Book Now!</h1>
                            <div id="callout-reviews">
                                {spot.numReviews ? (spot.numReviews === 1 ? (<p>{spot.numReviews} Review · {spot.avgStarRating.toFixed(1)} Average Stars</p>) : (<p>{spot.numReviews} Reviews · {spot.avgStarRating.toFixed(1)} Average Stars</p>)) : (<p>-- Average Stars</p>)}
                            </div>
                            <p>${spot.price} / night</p>
                            <button id="reserve" onClick={() => alert('Feature coming soon!')}>Reserve</button>
                        </div>
                    </div>

                    <div id="desc-reviews-container">
                        <p className="spot-desc">Paragraph:</p>
                        <p className="spot-desc" style={{ marginLeft: '60px' }}>{spot.description}</p>
                        <div id="detail-reviews">
                            <div id="detail-reviews-header">
                                {spot.numReviews ? (spot.numReviews === 1 ? (<p>{spot.numReviews} Review · {spot.avgStarRating.toFixed(1)} Average Stars</p>) : (<p>{spot.numReviews} Reviews · {spot.avgStarRating} Average Stars</p>)) : (<p>-- Average Stars</p>)}
                            </div>
                            {currentUserId !== 0 && spot.ownerId !== currentUserId && Object.values(reviews).find(review => review.userId === currentUserId) === undefined && <OpenModalButton modalComponent={<ReviewFormModal spotId={spotId}/>} id="new-review-btn"  buttonText='Post Your Review'/>}
                            <ul id="reviews-body">
                                {Object.values(reviews).length ? Object.values(reviews).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((review, index) => (<li className="indiv-review" key={index}>
                                    <p className="rev-user-name">{review.User.firstName}</p>
                                    <p className="rev-review">{review.review}</p>
                                    <p className="rev-date">{review.createdAt === review.updatedAt ? review.createdAt.split('T').join(' ').slice(0, 10) : review.createdAt.split('T').join(' ').slice(0, 10)}</p>
                                    <p className="rev-stars">{review.stars} Stars</p>
                                    {review.userId === currentUserId && <OpenModalButton className="review-delete-btn" modalComponent={<ConfirmDeleteModal reviewId={review.id} spotId={spotId}/>} buttonText={'Delete'} />}
                                </li>
                                )) : spot.ownerId === currentUserId ? <p id="no-reviews">No reviews Yet</p> : <p id="no-reviews">Be the first to post a review!</p>}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
    }

export default SpotShow;
