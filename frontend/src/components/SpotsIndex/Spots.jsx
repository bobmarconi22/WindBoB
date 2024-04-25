import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { fetchSpots } from "../../store/spots"
import { NavLink } from "react-router-dom";

function Spots() {
    const dispatch = useDispatch();
    const spots = useSelector((state) => state.spots);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(fetchSpots()).then(() => {
            setIsLoaded(true)
          });
        }, [dispatch]);

    const styleRatings = (rating) =>{
        if (rating < 2){
            return {
                color: 'rgb(200, 0, 0)',
                marginRight: '12px'
            }
        }
        if (rating >= 2 && rating < 4) {
            return {
                color: 'rgb(255, 178, 23)',
                marginRight: '12px'
            }
        }
        if (rating >= 4 && rating < 5) {
            return {
                color: 'green',
                marginRight: '12px'
            }
        }
        if (rating === 5) {
            return {
                color: 'rgb(111,223,197)',
                textShadow: '-1px -1px 0 rgb(22,65,73), 1px -1px 0 rgb(22,65,73), -1px 1px 0 rgb(22,65,73), 1px 1px 0 rgb(22,65,73)',
                marginRight: '12px'
            }
        }
        if (rating === undefined) {
            return {
                color: 'rgb(22,65,73)',
                textShadow: '-1px -1px 0 rgb(111,223,197), 1px -1px 0 rgb(111,223,197), -1px 1px 0 rgb(111,223,197), 1px 1px 0 rgb(111,223,197)'
            }
        }
    }

    return (
        <div className="spots">
            {isLoaded && Object.values(spots.allSpots).map((spot) => (
                !spot.Owner && <NavLink className="spot-tile" key={spot.id} to={`/spots/${spot.id}`}>
                    <div className="tooltip">
                        <img className="preview-img" key={spot.id} src={spot.previewImage} alt={`${spot.previewImage}`} />
                        <h2 key={spot.name} className="spot-name">{spot.name}</h2>
                    </div>
                    <div id="location-reviews"></div>
                    <p key={spot.city} className="spot-location">{`${spot.city}, ${spot.state}`}</p>
                    <img src="../public/star.png" alt="star-icon" id="star-icon" />
                    <p key={spot.rating} className="spot-rating"><b className="rating-nums" style={styleRatings(spot.avgRating)}>{`${spot.avgRating !== undefined ? (Number.isInteger(spot.avgRating) ? spot.avgRating.toFixed(1) : spot.avgRating) : 'New'}`}</b></p>
                    <p key={spot.price} className="spot-price"> <b style={{fontWeight: "bold"}}>{`$${spot.price}`}</b> <b style={{ fontSize: "9px"}}>/ night</b></p>
                </NavLink>
            ))}
        </div>
    );
}

export default Spots;
