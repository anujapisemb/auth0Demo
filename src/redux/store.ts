import {configureStore} from '@reduxjs/toolkit';
import {appReducer, userReducer} from './reducers';

const reducers = {
    appReducer,
    userReducer,
};

const store = configureStore({
    reducer: reducers,
});

export type ReduxStateType = ReturnType<typeof store.getState>;
export {store};
