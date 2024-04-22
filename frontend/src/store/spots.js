
const LOAD_SPOTS = "LOAD_SPOTS"
const LOAD_SPOT_BY_ID = "LOAD_SPOT_BY_ID"
const LOAD_REVIEWS = "LOAD_REVIEWS"

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    payload: spots
})

export const loadSpotById = (spot) => ({
    type: LOAD_SPOT_BY_ID,
    payload: spot
})

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews
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

export const fetchReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await res.json();
    dispatch(loadReviews(reviews))
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
        default:
        return state
    }
};

export default spotsReducer
