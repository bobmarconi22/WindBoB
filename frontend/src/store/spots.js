import { csrfFetch } from "./csrf";

const LOAD_SPOTS = "LOAD_SPOTS";
const LOAD_SPOT_BY_ID = "LOAD_SPOT_BY_ID";
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

export const addSpot = (spot) => ({
  type: ADD_SPOT,
  payload: spot,
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
    return res;
  } else {
    const res = await fetch(`/api/spots/${spotId}`);
    const spot = await res.json();
    dispatch(loadSpotById(spot));
    return res;
  }
};

export const createSpot = (spot) => async (dispatch) => {
  console.log("hello2");
  try {
    const res = await csrfFetch("/api/spots", {
      method: "POST",
      body: JSON.stringify(spot),
    });
    const newSpot = res.json();
    dispatch(addSpot(newSpot));
    return newSpot;
  } catch (e) {
    const formattedErr = await e.json();
    return formattedErr;
  }
};

export const updateSpot = (spot) => async (dispatch) => {
  console.log("hello2");
  try {
    const res = await csrfFetch("/api/spots", {
      method: "POST",
      body: JSON.stringify(spot),
    });
    const newSpot = res.json();
    dispatch(addSpot(newSpot));
    return newSpot;
  } catch (e) {
    const formattedErr = await e.json();
    return formattedErr;
  }
};

const spotsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = { ...state };
      action.payload.Spots.forEach((spot) => {
        newState[spot.id] = spot;
      });
      return newState;
    }
    case LOAD_SPOT_BY_ID: {
      const newState = { ...state };
      newState.spotById = action.payload;
      return newState;
    }
    case ADD_SPOT: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case EDIT_SPOT: {
        const newState = { ...state };
        newState[action.payload.id] = action.payload;
        return newState;
    }
    default:
      return state;
  }
};

export default spotsReducer;
