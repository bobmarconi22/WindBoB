import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./SpotForm.css";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSpots, createSpot, updateSpot } from "../../store/spots";

function SpotForm() {
  const { spotId } = useParams();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageUrls, setImageUrls] = useState({ previewImageUrl: "" });
  const [isLoaded, setIsLoaded] = useState(false);
  const [errors, setErrors] = useState({});
  const [formType, setFormType] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (spotId) {
      dispatch(fetchSpots(spotId)).then((spot) => {
        setAddress(spot.address);
        setCity(spot.city);
        setState(spot.state);
        setCountry(spot.country);
        setName(spot.name);
        setDescription(spot.description);
        setPrice(spot.price);
        setFormType("update");
        setIsLoaded(true);
      });
    } else {
      dispatch(fetchSpots()).then(() => {
        setAddress("");
        setCity("");
        setState("");
        setCountry("");
        setName("");
        setDescription("");
        setPrice(0);
        setFormType("create");
        setIsLoaded(true);
      });
    }
  }, [dispatch, spotId, formType]);

  function setErrorsFunc() {
    setErrors({});
    const errObj = {};
    if (name === "") errObj.name = "Name is required";
    if (city === "") errObj.city = "City is required";
    if (state === "") errObj.state = "State is required";
    if (country === "") errObj.country = "Country is required";
    if (address === "") errObj.address = "Street address is required";
    if (description.length < 30)
      errObj.description = "Description must be at least 30 characters";
    if (price <= 0) errObj.price = "Price per day must be a positive number";
    if (imageUrls.previewImageUrl === "")
      errObj.spotImages = "At least one image is required";
    setErrors(errObj);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitted(true);
    setErrorsFunc();
    if (
      name !== "" &&
      city !== "" &&
      state !== "" &&
      country !== "" &&
      address !== ""
    ) {
      if (formType === "create") {
        const spot = {
          country,
          address,
          city,
          state,
          description,
          name,
          lat: 1,
          lng: 1,
          price: parseInt(price),
          SpotImages: imageUrls,
        };
        const data = await dispatch(
          createSpot(spot, imageUrls, imageUrls.previewImageUrl)
        );
        navigate(`/spots/${data.id}`);
      } else if (formType === "update") {
        const spot = {
          id: spotId,
          country,
          address,
          city,
          state,
          description,
          name,
          lat: 1,
          lng: 1,
          price: parseInt(price),
          SpotImages: imageUrls,
        };
        const data = await dispatch(updateSpot(spot));
        navigate(`/spots/${data.id}`);
      }
    }
  };

  return (
    <>
      {formType === "update" ? (
        <h1>Update Spot</h1>
      ) : (
        <h1>Create a New Spot</h1>
      )}
      {isLoaded && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form-section">
            <h2 className="form-title">Where&apos;s your place located?</h2>
            <p className="subtitle">
              Guests will only get your exact address once they booked a
              reservation.
            </p>
            <label className="form-label" htmlFor="country">
              Country
            </label>{" "}
            <p className="form-errors">{isSubmitted && errors.country}</p>
            <input
              className="form-input"
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <label className="form-label" htmlFor="address">
              Street Address
            </label>
            <p className="form-errors">{isSubmitted && errors.address}</p>
            <input
              className="form-input"
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="form-label" htmlFor="city">
              City
            </label>
            <p className="form-errors">{isSubmitted && errors.city}</p>
            <input
              className="form-input"
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <label className="form-label" htmlFor="state">
              State
            </label>
            <p className="form-errors">{isSubmitted && errors.state}</p>
            <input
              className="form-input"
              id="state"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>
          <div className="form-section">
            <h2 className="form-title">Describe your place to guests</h2>
            <p className="subtitle">
              Mention the best features of your space, any special amenities
              like fast wifi or parking, and what you love about the
              neighborhood.
            </p>
            <p className="form-errors">{isSubmitted && errors.description}</p>
            <input
              id="description"
              className="form-input"
              type="textarea"
              placeholder="Please write at least 30 characters"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-section">
            <h2 className="form-title">Create a title for your spot</h2>
            <p className="subtitle">
              Catch guests&apos; attention with a spot title that highlights
              what makes your place special.
            </p>
            <label className="form-label" htmlFor="name">
              Name
            </label>
            <p className="form-errors">{isSubmitted && errors.name}</p>
            <input
              className="form-input"
              id="name"
              type="text"
              placeholder="Name of your spot"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-section">
            <h2 className="form-title">Set a base price for your spot</h2>
            <p className="subtitle">
              Competitive pricing can help your listing stand out and rank
              higher in search results.
            </p>
            <p className="form-errors">{isSubmitted && errors.price}</p>
            <input
              className="form-input"
              id="number"
              type="number"
              placeholder="Price per night (USD)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          {formType === "create" ? (
            <>
              <div className="form-section">
                <h2 className="form-title">Liven up your spot with photos</h2>
                <p className="subtitle">
                  Submit a link to at least one photo to publish your spot.
                </p>
                <label className="form-label" htmlFor="prev-img">
                  Preview Image
                </label>
                <p className="form-errors">
                  {isSubmitted && errors.spotImages}
                </p>
                <input
                  className="form-input"
                  id="prev-img"
                  type="text"
                  placeholder="Preview Image URL"
                  value={imageUrls.previewImageUrl}
                  onChange={(e) =>
                    setImageUrls((prevState) => ({
                      ...prevState,
                      previewImageUrl: e.target.value,
                    }))
                  }
                />
                <label className="form-label" htmlFor="img2">
                  Image
                </label>
                <input
                  className="form-input"
                  id="img2"
                  type="text"
                  placeholder="Image URL"
                  value={imageUrls.image2Url}
                  onChange={(e) =>
                    setImageUrls((prevState) => ({
                      ...prevState,
                      image2Url: e.target.value,
                    }))
                  }
                />
                <label className="form-label" htmlFor="img3">
                  Image
                </label>
                <input
                  className="form-input"
                  id="img3"
                  type="text"
                  placeholder="Image URL"
                  value={imageUrls.image3Url}
                  onChange={(e) =>
                    setImageUrls((prevState) => ({
                      ...prevState,
                      image3Url: e.target.value,
                    }))
                  }
                />
                <label className="form-label" htmlFor="img4">
                  Image
                </label>
                <input
                  className="form-input"
                  id="img4"
                  type="text"
                  placeholder="Image URL"
                  value={imageUrls.image4Url}
                  onChange={(e) =>
                    setImageUrls((prevState) => ({
                      ...prevState,
                      image4Url: e.target.value,
                    }))
                  }
                />
                <label className="form-label" htmlFor="img5">
                  Image
                </label>
                <input
                  className="form-input"
                  id="img5"
                  type="text"
                  placeholder="Image URL"
                  value={imageUrls.image5Url}
                  onChange={(e) =>
                    setImageUrls((prevState) => ({
                      ...prevState,
                      image5Url: e.target.value,
                    }))
                  }
                />
              </div>
              <button id="create-spot-btn" type="submit">
                Create Spot
              </button>
            </>
          ) : (
            <button id="create-spot-btn" type="submit">
              Update Your Spot
            </button>
          )}
        </form>
      )}
    </>
  );
}
export default SpotForm;

// ownerId: 1,
// address: "123 Disney Lane",
// city: "San Francisco",
// state: "California",
// country: "United States of America",
// lat: 37.7645358,
// lng: -122.4730327,
// name: "App Academy",
// description: "Place where web developers are created",
// price: 123,
