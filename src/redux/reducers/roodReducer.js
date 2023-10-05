import { USER_MODAL, USER_STATE_CHANGE } from "../types/user";

const initialState = {
  users: [],
  loading: false,
  error: null,
  total: 0,
  activePage: 1,
  isModalOpen: false,
  btnLoading: false,
  selected: null,
};


const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case USER_STATE_CHANGE:
      return { ...state, ...payload };
    case USER_MODAL:
      return { ...state, isModalOpen: !state.isModalOpen };
    default:
      return state;
  }
};

export default userReducer;