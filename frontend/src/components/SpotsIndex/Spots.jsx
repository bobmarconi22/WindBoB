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

    return (
        <div id="spots">
            {isLoaded &&  Object.values(spots).map((spot) => (
                <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                    <div className="spot-tile">
                    <img src={spot.previewImage} alt={`${spot.name} Preview Image`} />
                    <h2>{spot.name}</h2>
                    <p>{`${spot.city}, ${spot.state}`}</p>
                    <p>{`Rating: ${spot.avgRating !== undefined ? spot.avgRating : 'New'}`}</p>
                    <p>{`$${spot.price} / night`}</p>
                    </div>
                </NavLink>
            ))}
        </div>
    );
}

export default Spots;
