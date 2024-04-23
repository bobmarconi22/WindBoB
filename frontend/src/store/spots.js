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

export const addSpot = (spot) => ({
    type: ADD_SPOT,
    payload: spot
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
    try{
        console.log('hello2')
        const res = await csrfFetch('/api/spots', {
            method: 'POST',
            body: JSON.stringify(spot)
        });
        console.log('hello3')
        // console.log('==================================>',newSpot)
        if(res.ok){
            const newSpot = await res.json();
            dispatch(addSpot(newSpot))
        }
            return res;
    }catch (e){
    console.log('hello from catch')
        return e
  };
  }


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
                if (action.payload.image2Url) {
                    newState[action.payload.id].SpotImages = [
                        ...newState[action.payload.id].SpotImages,
                        { spotId: action.payload.id, url: action.payload.image2Url, preview: false }
                    ];
                }
                if (action.payload.image3Url) {
                    newState[action.payload.id].SpotImages = [
                        ...newState[action.payload.id].SpotImages,
                        { spotId: action.payload.id, url: action.payload.image3Url, preview: false }
                    ];
                }
                if (action.payload.image4Url) {
                    newState[action.payload.id].SpotImages = [
                        ...newState[action.payload.id].SpotImages,
                        { spotId: action.payload.id, url: action.payload.image4Url, preview: false }
                    ];
                }
                if (action.payload.image5Url) {
                    newState[action.payload.id].SpotImages = [
                        ...newState[action.payload.id].SpotImages,
                        { spotId: action.payload.id, url: action.payload.image5Url, preview: false }
                    ];
                }
            return newState
        }
        default:
        return state
    }
};

export default spotsReducer
