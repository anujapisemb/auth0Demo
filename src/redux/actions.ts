enum APP_ACTIONS_TYPES {
  IS_LOGIN = 'IS_LOGIN',
}

enum USER_ACTION_TYPES {
  USER_PROFILE = 'USER_PROFILE',
  RESET_PROFILE = 'RESET_PROFILE',
}

const getUserProfile = async () => {
  try {
  } catch (error) {}
};

const login = () => {
  return async (dispatch) => {
    try {
      console.log('DISPATCH');

      dispatch({
        type: APP_ACTIONS_TYPES.IS_LOGIN,
        payload: 'token',
      });
    } catch (error) {
      console.log('ERROR', error);
    }
  };
};

export {APP_ACTIONS_TYPES, USER_ACTION_TYPES};
export {getUserProfile, login};
