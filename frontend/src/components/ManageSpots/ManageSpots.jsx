import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpotsCurrent } from "../../store/spots";
import { NavLink, useNavigate } from "react-router-dom";
import OpenModalButton from "./OpenModalButton";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

function ManageSpots() {
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const spots = useSelector((state) => state.spots.current);
  console.log(spots);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchSpotsCurrent()).then(() => {
      setIsLoaded(true);
    });
  }, [dispatch]);

  const createNewSpot = () => {
    navigate("/spots/new");
  };

  const editSpot = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };

  const styleRatings = (rating) => {
    if (rating < 2) {
      return {
        color: "rgb(200, 0, 0)",
        marginRight: "12px",
      };
    }
    if (rating >= 2 && rating < 4) {
      return {
        color: "rgb(255, 178, 23)",
        marginRight: "12px",
      };
    }
    if (rating >= 4 && rating < 5) {
      return {
        color: "green",
        marginRight: "12px",
      };
    }
    if (rating === 5) {
      return {
        color: "rgb(111,223,197)",
        textShadow:
          "-1px -1px 0 rgb(22,65,73), 1px -1px 0 rgb(22,65,73), -1px 1px 0 rgb(22,65,73), 1px 1px 0 rgb(22,65,73)",
        marginRight: "12px",
      };
    }
    if (rating === undefined) {
      return {
        color: "rgb(22,65,73)",
        textShadow:
          "-1px -1px 0 rgb(111,223,197), 1px -1px 0 rgb(111,223,197), -1px 1px 0 rgb(111,223,197), 1px 1px 0 rgb(111,223,197)",
      };
    }
  };

  return (
    <div className="spots">
      {isLoaded && spots.Spots.length ? (
        spots.Spots.map((spot) => (
          <div key={spot.id} className="edit-spots">
            <NavLink
              className="spot-tile"
              key={spot.id}
              to={`/spots/${spot.id}`}
            >
              <div className="tooltip">
                <img
                  className="preview-img"
                  key={spot.id}
                  src={spot.previewImage}
                  alt={`${spot.previewImage}`}
                />
                <h2 key={spot.name} className="spot-name">
                  {spot.name}
                </h2>
              </div>
              <div id="location-reviews"></div>
              <p
                key={spot.city}
                className="spot-location"
              >{`${spot.city}, ${spot.state}`}</p>
              <img src="../public/star.png" alt="star-icon" id="star-icon" />
              <p key={spot.rating} className="spot-rating">
                <b className="rating-nums" style={styleRatings(spot.avgRating)}>
                  {`${
                    spot.avgRating !== undefined
                      ? Number.isInteger(spot.avgRating)
                        ? spot.avgRating.toFixed(1)
                        : spot.avgRating
                      : "New"
                  }`}
                </b>
              </p>
              <p key={spot.price} className="spot-price">
                <b style={{ fontWeight: "bold" }}>{`$${spot.price}`}</b>{" "}
                <b style={{ fontSize: "9px" }}>/ night</b>
              </p>
            </NavLink>
            <div className="edit-delete-btns">
              <button className="edit-btn" onClick={() => editSpot(spot.id)}>
                Edit
              </button>
              <OpenModalButton
                modalComponent={<ConfirmDeleteModal spotId={spot.id} />}
                className="delete-btn"
                buttonText="Delete"
              />
            </div>
          </div>
        ))
      ) : (
        <button className="submit-sign-up" onClick={createNewSpot}>
          New Spot
        </button>
      )}
    </div>
  );
}

export default ManageSpots;
