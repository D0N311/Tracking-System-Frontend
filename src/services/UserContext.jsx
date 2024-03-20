
import React, {createContext, useState} from 'react';
const initialState = {
name: '',
verified: '',
role: '',
company_id: '',

};

export const UserContext = createContext({});

export const UserProvider = ({children}) => {
  const [state, setState] = useState(initialState);
  return <UserContext.Provider value={{state, setState}}>{children}</UserContext.Provider>;
};