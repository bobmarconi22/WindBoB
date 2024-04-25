import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "LOAD_SPOTS";
const LOAD_SPOT_BY_ID = "LOAD_SPOT_BY_ID";
const LOAD_SPOTS_CURRENT = "LOAD_SPOTS_CURRENT";
const ADD_SPOT = "ADD_SPOT";
const EDIT_SPOT = "EDIT_SPOT";

export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  payload: spots,
});

export const loadSpotById = (spot) => ({
  type: LOAD_SPOT_BY_ID,
  payload: spot,
});

export const loadSpotsCurrent = (spots) => ({
  type: LOAD_SPOTS_CURRENT,
  payload: spots,
});

export const addSpot = (spot, spotImgs, prevImg) => ({
  type: ADD_SPOT,
  payload: spot,
  imgPayload: spotImgs,
  prevImg: prevImg
});

export const editSpot = (spot) => ({
    type: EDIT_SPOT,
    payload: spot,
  });

export const fetchSpots = (spotId) => async (dispatch) => {
  if (!spotId) {
    const res = await fetch("/api/spots");
    const spots = await res.json();
    dispatch(loadSpots(spots));
    return spots;
  } else {
    const res = await fetch(`/api/spots/${spotId}`);
    const spot = await res.json();
    dispatch(loadSpotById(spot));
    return spot;
  }
};

export const fetchSpotsCurrent = () => async (dispatch) => {
    const res = await fetch("/api/spots/current");
    const spots = await res.json();
    dispatch(loadSpotsCurrent(spots));
    return res;
}

export const createSpot = (spot, imgUrls, prevImg) => async (dispatch) => {
    const res = await csrfFetch("/api/spots", {
      method: "POST",
      body: JSON.stringify(spot),
    });
    const newSpot = await res.json();
    let count = 1
    const spotImgs = await Promise.all(Object.values(imgUrls).map(async(spotUrl) => {
      const spot = {url: spotUrl, preview: false}
      if (count === 1) spot.preview = true
      count++
      const res = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: 'POST',
        body: JSON.stringify(spot)
      });
      return res.json();
    }))

    dispatch(addSpot(newSpot, spotImgs, prevImg));
    return newSpot;
};

export const updateSpot = (spot) => async (dispatch) => {
    await dispatch(fetchSpots());

    const res = await csrfFetch(`/api/spots/${spot.id}`, {
      method: "PUT",
      body: JSON.stringify(spot),
    });
    const updatedSpot = res.json();
    dispatch(editSpot(updatedSpot));
    return updatedSpot;
};

export const deleteSpot = (spotId) => async (dispatch) => {
  await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE"
  })
    await dispatch(fetchSpots());
  return
};

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = { ...state };
      newState.allSpots = {}
      action.payload.Spots.forEach((spot) => {
        newState.allSpots[spot.id] = spot;
      });
      return newState;
    }
    case LOAD_SPOT_BY_ID: {
      return { ...state, ['spotById']: action.payload};
    }
    case LOAD_SPOTS_CURRENT: {
      return { ...state, ['current']: action.payload};
    }
    case ADD_SPOT: {
        const newState = {...state};
        newState.allSpots[action.payload.id] = action.payload
        return newState
    }
    case EDIT_SPOT: {
        const newState = { ...state};
        newState.allSpots[action.payload.id] = action.payload;
        return newState
    }
    default:
      return state;
  }
};

export default spotsReducer;
