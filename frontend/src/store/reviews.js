
const LOAD_REVIEWS = "LOAD_REVIEWS"

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews
})


export const fetchReviews = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);
    const reviews = await res.json();
    dispatch(loadReviews(reviews))
    return res
}

const reviewsReducer = (state = {}, action) => {
    switch (action.type){
        case LOAD_REVIEWS: {
            const newState = {...state, reviews: {}};
            action.payload.Reviews.forEach((review) => {
                newState.reviews[review.id] = review
                });
            return newState
        }
        default:
        return state
    }
};

export default reviewsReducer
