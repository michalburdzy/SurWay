const initialState = {surveys: []}

const surveysReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'FETCH_SURVEYS': 
    console.log(action.surveys)
      return {
        surveys: action.surveys
      }
    default: return state
  }
}

export default surveysReducer;