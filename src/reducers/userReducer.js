import { USER_LOGIN, USER_EDIT_PROFILE_TOGGLE, USER_UPDATE_PROFILE, USER_LOGOUT } from '../actions/types';

const initState = null;

const userReducer = (state = initState, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return action.user;

        case USER_EDIT_PROFILE_TOGGLE:
            return { ...state, editing: !state.editing };

        case USER_UPDATE_PROFILE:
            return { ...action.user, editing: false };

        case USER_LOGOUT:
            return null;

        default:
            return state;
    }
};

export default userReducer;
