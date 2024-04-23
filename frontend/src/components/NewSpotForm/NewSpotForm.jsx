import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import './NewSpotForm.css'
import { useNavigate } from "react-router-dom"
import { fetchSpots, createSpot } from "../../store/spots"

function NewSpotForm(){
    const [address, setAddress]= useState('')
    const [city, setCity]= useState('')
    const [state, setState]= useState('')
    const [country, setCountry]= useState('')
    const [name, setName]= useState('')
    const [description, setDescription]= useState('')
    const [price, setPrice]= useState(0)
    const [imageUrls, setImageUrls]= useState({previewImageUrl: '', image2Url: '', image3Url: '', image4Url: '', image5Url: '',})
    const [isLoaded, setIsLoaded] = useState(false)
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchSpots()).then(() => {
            setIsLoaded(true)
          });
        }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSpot ={
            country: country,
            address: address,
            city: city,
            state: state,
            description: description,
            name: name,
            lat: 1,
            lng: 1,
            price: parseInt(price),
            previewImageUrl: imageUrls.previewImageUrl,
            image2Url: imageUrls.image2Url,
            image3Url: imageUrls.image3Url,
            image4Url: imageUrls.image4Url,
            image5Url: imageUrls.image5Url
        }
        setErrors({});

        // console.log('hello')
        const data = await dispatch(createSpot(newSpot))

        // console.log('===============>', data)
        return await dispatch(createSpot(newSpot)).then(

            async (res) => {
            console.log(res)
            if (res.ok) {
                // console.log(res)
                const data = await res.json()
                navigate(`/spots/${data.id}`);
            } else {
                return res.json().then(data => {
                    if (data?.errors) {
                        setErrors(data.errors);
                    }
                });
            }

        })
    }

return (
    <>
      <h1>Create a New Spot</h1>
      {isLoaded && <form onSubmit={handleSubmit}>
        <div className="form-section">
            <h2 className="form-title">Where&apos;s your place located?</h2>
            <p className="subtitle">Guests will only get your exact address once they booked a reservation.</p>
                <label className="form-label" htmlFor="country">Country</label> <p className="form-errors">{errors.country}</p>
                    <input className="form-input" id="country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                <label className="form-label" htmlFor="address">Street Address</label><p className="form-errors">{errors.address}</p>
                    <input className="form-input" id="address" type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                <label className="form-label" htmlFor="city">City</label><p className="form-errors">{errors.city}</p>
                    <input className="form-input" id="city" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                <label className="form-label" htmlFor="state">State</label><p className="form-errors">{errors.state}</p>
                    <input className="form-input" id="state" type="text" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
        <div className="form-section">
            <h2 className="form-title">Describe your place to guests</h2>
            <p className="subtitle">Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>
            <p className="form-errors">{errors.description}</p>
                <input id="description" className="form-input" type="textarea" placeholder="Please write at least 30 characters" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div className="form-section">
            <h2 className="form-title">Create a title for your spot</h2>
            <p className="subtitle">Catch guests&apos; attention with a spot title that highlights what makes your place special.</p>
                <label className="form-label" htmlFor="name">Name</label><p className="form-errors">{errors.name}</p>
                    <input className="form-input" id="name" type="text" placeholder="Name of your spot" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-section">
            <h2 className="form-title">Set a base price for your spot</h2>
            <p className="subtitle">Competitive pricing can help your listing stand out and rank higher in search results.</p>
            <p className="form-errors">{errors.price}</p>
                <input className="form-input" id="number" type="number" placeholder="Price per night (USD)" value={price} onChange={(e) => setPrice(e.target.value)} />
        </div>
        <div className="form-section">
            <h2 className="form-title">Liven up your spot with photos</h2>
            <p className="subtitle">Submit a link to at least one photo to publish your spot.</p>
                <label className="form-label" htmlFor="prev-img">Preview Image</label><p className="form-errors">{errors.prevImg}</p>
                    <input className="form-input" id="prev-img" type="text" placeholder="Preview Image URL" value={imageUrls.previewImageUrl} onChange={(e) => setImageUrls(prevState => ({ ...prevState, previewImageUrl: e.target.value }))}/>
                <label className="form-label" htmlFor="img2">Image</label>
                    <input className="form-input" id="img2" type="text" placeholder="Image URL" value={imageUrls.image2Url} onChange={(e) => setImageUrls(prevState => ({ ...prevState, image2Url: e.target.value }))}/>
                <label className="form-label" htmlFor="img3">Image</label>
                    <input className="form-input" id="img3" type="text" placeholder="Image URL" value={imageUrls.image3Url} onChange={(e) => setImageUrls(prevState => ({ ...prevState, image3Url: e.target.value }))}/>
                <label className="form-label" htmlFor="img4">Image</label>
                    <input className="form-input" id="img4" type="text" placeholder="Image URL" value={imageUrls.image4Url} onChange={(e) => setImageUrls(prevState => ({ ...prevState, image4Url: e.target.value }))}/>
                <label className="form-label" htmlFor="img5">Image</label>
                    <input className="form-input" id="img5" type="text" placeholder="Image URL" value={imageUrls.image5Url} onChange={(e) => setImageUrls(prevState => ({ ...prevState, image5Url: e.target.value }))}/>
        </div>
            <button id="create-spot-btn" type="submit" >Create Spot</button>
      </form>}
    </>
)
}
export default NewSpotForm

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
