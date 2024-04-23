import { csrfFetch } from "./csrf"

const LOAD_SPOTS = "LOAD_SPOTS"
const LOAD_SPOT_BY_ID = "LOAD_SPOT_BY_ID"
const ADD_SPOT = "ADD_SPOT"

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    payload: spots
})

export const loadSpotById = (spot) => ({
    type: LOAD_SPOT_BY_ID,
    payload: spot
})

export const addSpot = (spot, previewImageUrl, image2Url, image3Url, image4Url, image5Url) => ({
    type: ADD_SPOT,
    payload: spot,
    previewImageUrl,
    image2Url,
    image3Url,
    image4Url,
    image5Url
})


export const fetchSpots = (spotId) => async (dispatch) => {
    if(!spotId){
        const res = await fetch("/api/spots");
        const spots = await res.json();
        dispatch(loadSpots(spots));
        return res;
    } else {
        const res = await fetch(`/api/spots/${spotId}`);
        const spot = await res.json();
        dispatch(loadSpotById(spot));
        return res;
    }
}

export const createSpot = (spot) => async (dispatch) => {
        const { country, address, city, state, description, name, price, previewImageUrl, image2Url, image3Url, image4Url, image5Url } = spot;
        const res = await csrfFetch('/api/spots', {
            method: 'POST',
            body: JSON.stringify({
                country,
                address,
                city,
                state,
                description,
                name,
                price,
                previewImageUrl,
                image2Url,
                image3Url,
                image4Url,
                image5Url,
                lat: 1,
                lng: 1
            })
        });
        const newSpot = await res.json();
        dispatch(addSpot(newSpot, previewImageUrl, image2Url, image3Url, image4Url, image5Url))
        return res;
  };


const spotsReducer = (state = {}, action) => {
    switch (action.type){
        case LOAD_SPOTS: {
            const newState = {...state};
            action.payload.Spots.forEach((spot) => {
                newState[spot.id] = spot
                });
            return newState;
        }
        case LOAD_SPOT_BY_ID: {
            const newState = {...state};
                newState.spotById = action.payload
            return newState;
        }
        case ADD_SPOT: {
            const newState = {...state};
                newState[action.payload.id] = action.payload
                newState[action.payload.id].SpotImages = [{spotId: action.payload.id, url: action.previewImageUrl, preview: true}]
                if (action.image2Url) {
                    newState[action.payload.id].SpotImages = [
                        ...newState[action.payload.id].SpotImages,
                        { spotId: action.payload.id, url: action.image2Url, preview: false }
                    ];
                }
                if (action.image3Url) {
                    newState[action.payload.id].SpotImages = [
                        ...newState[action.payload.id].SpotImages,
                        { spotId: action.payload.id, url: action.image3Url, preview: false }
                    ];
                }
                if (action.image4Url) {
                    newState[action.payload.id].SpotImages = [
                        ...newState[action.payload.id].SpotImages,
                        { spotId: action.payload.id, url: action.image4Url, preview: false }
                    ];
                }
                if (action.image5Url) {
                    newState[action.payload.id].SpotImages = [
                        ...newState[action.payload.id].SpotImages,
                        { spotId: action.payload.id, url: action.image5Url, preview: false }
                    ];
                }
            return newState
        }
        default:
        return state
    }
};

export default spotsReducer
