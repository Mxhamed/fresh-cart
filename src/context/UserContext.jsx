import { createContext, useContext, useReducer, useMemo } from "react";

// Action Types
const USER_ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

// Initial State
const initialUserState = {
  userToken: null,
  name: "",
  email: "",
};

// Reducer Function
function userReducer(state, action) {
  switch (action.type) {
    case USER_ACTIONS.LOGIN:
      return {
        ...state,
        userToken: action.payload.token,
        name: action.payload.name,
        email: action.payload.email,
      };

    case USER_ACTIONS.LOGOUT:
      return {
        ...state,
        userToken: null,
        name: "",
        email: "",
      };

    default:
      throw new Error(`Unknown Action Type: ${action.type}`);
  }
}

const UserContext = createContext();

export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialUserState);

  // Action Creators
  const actions = useMemo(
    () => ({
      login: ({ token, name, email }) => {
        dispatch({
          type: USER_ACTIONS.LOGIN,
          payload: { token, name, email },
        });
      },

      logout: () => {
        dispatch({ type: USER_ACTIONS.LOGOUT });
      },
    }),
    []
  );

  const value = useMemo(
    () => ({
      userToken: state.userToken,
      name: state.name,
      email: state.email,
      ...actions,
    }),
    [state, actions]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser MUST be Used Within a UserProvider!");
  }

  return context;
}
