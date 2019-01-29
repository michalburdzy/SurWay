const initialState = { user: false };
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER':
      const { user } = action;
      return { user };
    default:
      return state;
  }
};
export default reducer;
