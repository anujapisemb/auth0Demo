import {APP_ACTIONS_TYPES, USER_ACTION_TYPES} from './actions';

const initialAppState = {
    accessToken: null,
};

const initialUserState = {userProfile: null};

interface AppReducerType {
    type: string;
    payload?: {accessToken: string};
}

interface UserReducerType {
    type: string;
    payload?: {userProfile: object};
}

const appReducer = (state = initialAppState, action: AppReducerType) => {
    switch (action.type) {
        case APP_ACTIONS_TYPES.IS_LOGIN:
            return Object.assign({}, state, {
                accessToken: action.payload,
            });

        default:
            return {...state};
    }
};

const userReducer = (state = initialUserState, action: UserReducerType) => {
    switch (action.type) {
        case USER_ACTION_TYPES.USER_PROFILE:
            return Object.assign({}, state, {
                userProfile: action.payload,
            });
        case USER_ACTION_TYPES.RESET_PROFILE:
            return {...initialUserState};

        default:
            return {...state};
    }
};

export {appReducer, userReducer};
