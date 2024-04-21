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
                color: 'red',
                fontSize: '16px',
                border: '1px solid rgb(22,65,73)',
                borderRadius: '3px',
                boxShadow: '2px 2px 5px',
                padding: '2px',
            }
        }
        if (rating >= 2 && rating < 4) {
            return {
                color: 'orange',
                fontSize: '16px',
                border: '1px solid rgb(22,65,73)',
                borderRadius: '3px',
                boxShadow: '2px 2px 5px',
                padding: '2px',
            }
        }
        if (rating >= 4 && rating < 5) {
            return {
                color: 'green',
                fontSize: '16px',
                border: '1px solid rgb(22,65,73)',
                borderRadius: '3px',
                boxShadow: '2px 2px 5px',
                padding: '2px',

            }
        }
        if (rating === 5) {
            return {
                color: '#4CBB17',
                fontSize: '16px',
                border: '1px solid rgb(22,65,73)',
                borderRadius: '3px',
                boxShadow: '2px 2px 5px',
                padding: '2px',


            }
        }
        if (rating === undefined) {
            return {
                color: 'rgb(22,65,73)',
                fontSize: '16px',
                border: '1px solid rgb(22,65,73)',
                borderRadius: '3px',
                boxShadow: '2px 2px 5px rgb(22,65,73)',
                padding: '2px',

            }
        }
    }

    // styleRatings(spot.avgRating)

    return (
        <div id="spots">
            {isLoaded &&  Object.values(spots).map((spot) => (
                <NavLink className="spot-tile" key={spot.id} to={`/spots/${spot.id}`}>
                    <img src={spot.previewImage} alt={`${spot.name} Preview Image`} />
                    <h2 className="spot-name">{spot.name}</h2>
                    <p className="spot-location">{`${spot.city}, ${spot.state}`}</p>
                    <p className="spot-rating">Rating: <b style={styleRatings(spot.avgRating)}>{`${spot.avgRating !== undefined ? (Number.isInteger(spot.avgRating) ? spot.avgRating.toFixed(1) : spot.avgRating) : 'New'}`}</b></p>
                    <p className="spot-price"> <b>{`$${spot.price}`}</b> / night</p>
                </NavLink>
            ))}
        </div>
    );
}

export default Spots;
