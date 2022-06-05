import React, { Children, useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';

interface IUserState {
  users: any[];
  user: any;
}
const UserState = () => {
  const initialState: IUserState = {
    users: [],
    user: {},
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const getUsers = () => {};

  const getUser = () => {};

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        user: state.user,
        getUsers,
        getUser,
      }}></UserContext.Provider>
  );
};

export default UserState;
