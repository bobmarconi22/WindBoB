import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchSpots } from "../../store/spots"
import { fetchReviews } from "../../store/reviews"
import { useEffect, useState } from "react"

function SpotShow(){
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spotById);
    const reviews = useSelector((state) => state.reviews.reviews)
    const currentUserId = useSelector((state) => {
        if(state.session.user) return state.session.user.id
        else{
            return 0
        }
    })
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchSpots(spotId)).then(() => {
        });
        dispatch(fetchReviews(spotId)).then(() => {
            setIsLoaded(true)
        });
    }, [dispatch, spotId]);

    return (
        <div>
            {isLoaded && spot && (
                <div id="spot-by-id">
                    <h1>{spot.name}</h1>
                    <p id="spot-location">Location: {spot.city}, {spot.state}, {spot.country}</p>
                    <div id="images-container">
                        <img id="img-large" src={spot.SpotImages[0]} alt="image 1" />
                        <div id="small-images">
                        <img className="img-small" src={spot.SpotImages[1]} alt="image 2" />
                        <img className="img-small" src={spot.SpotImages[2]} alt="image 3" />
                        <img className="img-small" src={spot.SpotImages[3]} alt="image 4" />
                        <img className="img-small" src={spot.SpotImages[4]} alt="image 5" /><button id="all-photos" onClick={()=> alert('Feature coming soon!')}>All Photos</button>
                    </div>

                        <p id="owner-name">Hosted by: &nbsp; {spot.Owner.firstName} {spot.Owner.lastName}</p>
                        <div id="callout-info">
                            <h1>Book Now!</h1>
                            <div id="callout-reviews">
                                {spot.numReviews ? (spot.numReviews === 1 ? (<p>{spot.numReviews} Review · {spot.avgStarRating.toFixed(1)} Average Stars</p>) : (<p>{spot.numReviews} Reviews · {spot.avgStarRating.toFixed(1)} Average Stars</p>)) : (<p>-- Average Stars</p>)}
                            </div>

                            <p>${spot.price} / night</p>
                            <button id="reserve" onClick={()=> alert('Feature coming soon!')}>Reserve</button>
                        </div>
                    </div>
                    <div id="desc-reviews-container">
                        <p className="spot-desc">Paragraph:</p>
                        <p className="spot-desc" style={{marginLeft: '60px'}}>{spot.description}</p>
                        <div id="detail-reviews">
                            <div id="detail-reviews-header">
                                {spot.numReviews ? (spot.numReviews === 1 ? (<p>{spot.numReviews} Review · {spot.avgStarRating.toFixed(1)} Average Stars</p>) : (<p>{spot.numReviews} Reviews · {spot.avgStarRating} Average Stars</p>)) : (<p>-- Average Stars</p>)}
                            </div>
                            <button id="new-review-btn" onClick={() => navigate('/reviews/new')}>Post Your Review</button>
                            <ul id="reviews-body">
                                {Object.values(reviews).length ? Object.values(reviews).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((review, index) => (<li className="indiv-review" key={index}>
                                    <p className="rev-user-name">{review.User.firstName}</p>
                                     <p className="rev-review">{review.review}</p>
                                     <p className="rev-date">{review.createdAt === review.updatedAt ? review.createdAt.split('T').join(' ').slice(0, 10) : review.createdAt.split('T').join(' ').slice(0, 10)}</p>
                                     <p className="rev-stars">{review.stars} Stars</p>
                                     </li>
                                )) : spot.ownerId === currentUserId ? <p id="no-reviews">No reviews Yet</p> : <p id="no-reviews">Be the first to post a review!</p>}
                            </ul>
                    </div>

                    </div>
                </div>
            )}
        </div>
    );
}

export default SpotShow
