import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { fetchSpots } from "../../store/spots"
import { useEffect, useState } from "react"

function SpotShow(){
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.spotById);
    const [isLoaded, setIsLoaded] = useState(false);

    // const navigate = useNavigate()
    useEffect(() => {
        dispatch(fetchSpots(spotId)).then(() => {
            setIsLoaded(true);
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
                                {spot.numReviews ? (spot.numReviews === 1 ? (Number.isInteger(spot.avgStarRating) ? (<p>{spot.numReviews} Reviews · {spot.avgStarRating.toFixed(1)} Average Stars</p>) : (<p>Reviews: {spot.avgStarRating} Average Stars</p>)) : (<p>{spot.numReviews} Reviews · {spot.avgStarRating} Average Stars</p>)) : (<p>- Average Stars</p>)}
                            </div>

                            <p>${spot.price} / night</p>
                            <button id="reserve" onClick={()=> alert('Feature coming soon!')}>Reserve</button>
                        </div>
                        <div id="detail-reviews">
                            <div id="detail-review-header">
                                {spot.numReviews ? (spot.numReviews === 1 ? (Number.isInteger(spot.avgStarRating) ? (<p>{spot.numReviews} Review · {spot.avgStarRating.toFixed(1)} Average Stars</p>) : (<p>{spot.numReviews} Review · {spot.avgStarRating.toFixed(1)} Average Stars</p>)) : (<p>{spot.numReviews} Reviews · {spot.avgStarRating} Average Stars</p>)) : (<p>- Average Stars</p>)}
                            </div>
                    </div>
                    </div>
                    <p className="spot-desc">Paragraph:</p>
                    <p className="spot-desc" style={{marginLeft: '60px'}}>{spot.description}</p>

                </div>
            )}
        </div>
    );
}

export default SpotShow
