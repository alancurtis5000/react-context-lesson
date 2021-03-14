import { createContext } from "react";

// what you pass into createContext is its default state: like initial state for reducers
const CurrentUserContext = createContext(undefined);

export default CurrentUserContext;
