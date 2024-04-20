
const LOAD_SPOTS = "LOAD_SPOTS"

export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    payload: spots
})

export const fetchSpots = () => async (dispatch) => {
    const res = await fetch("api/spots");
    const spots = await res.json()
    dispatch(loadSpots(spots))
    return res;
}

const initialState = {
    spots: {}
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD_SPOTS: {
            const newState = {...state};
            action.payload.Spots.forEach((spot) => {
                newState[spot.id] = spot
                });
            return newState
        }
        default:
        return state
    }
};

export default spotsReducer
