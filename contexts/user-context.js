import React from "react";

const defaults = {
  userLoggedIn: () => {},
  isUserTokenValid: () => {},
  invalidateUserToken: () => {},
  getUserInfo: () => {}
};

const UserContext = React.createContext(defaults);
UserContext.displayName = "User Context";

export default UserContext;
