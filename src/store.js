import { legacy_createStore as createStore } from 'redux'
import { loadState, saveState } from './localstorage.js' // Ensure correct import

const initialState = {
  sidebarShow: true,
  theme: 'light',
  isLoggedIn: false,
  //new Additions
  // role: ''
  // new additions
  roleRights: [], // Add roleRights to the initial state
  colorModes: 'light',  // Add colorMode to the initial state


}
// earlier correct code
// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
   
//     // new additions
//     case 'setRoleRights': // Action to set role rights
//     return { ...state, roleRights: rest.roleRights }

//     case 'LOGIN_SUCCESS':
//       // return { ...state, isLoggedIn: true ,role: 'admin'}
//       return { ...state, isLoggedIn: true }
//     case 'LOGOUT':
//       // return { ...state, isLoggedIn: false ,role: ''}
//       return { ...state, isLoggedIn: false}
//     default:
//       return state
//   }
// }

const changeState = (state = initialState, action) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action }
      case 'setColorModes': // Action to set color mode
      return { ...state, colorModes: action.colorMode }
      case 'setRoleRights': // Action to set role rights
      return { ...state, roleRights: action.roleRights }
    case 'LOGIN_SUCCESS':
      return { ...state, isLoggedIn: true }
    case 'LOGOUT':
      return { ...state, isLoggedIn: false }
    default:
      return state
  }
}





// const store = createStore(changeState)

// Load the state from local storage
const persistedState = loadState()
console.log("Persistent state value:", persistedState)

// Create the Redux store with persisted state
const store = createStore(changeState, persistedState)

// Subscribe to store updates and save the state to local storage
store.subscribe(() => {
  saveState(store.getState())
})



export default store
