const redux = require("redux");
const combineReducers = redux.combineReducers
const applyMiddleware = redux.applyMiddleware
const createStore = redux.createStore;
const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()


const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM= "BUY_ICECREAM";

function buyCake() {
  return {
    type: BUY_CAKE,
  };
}

function buyIceCream() {
    return {
      type: BUY_ICECREAM,
    };
  }

// const initialState = {
//   numOfCake: 10,
//   numOfIceCream:20
// };

const initialCakeState = {
    numOfCake: 10,
  };
  const initialIceCreamState = {
    numOfIceCream:20
  };

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case BUY_CAKE:
//       return {
//         ...state,
//         numOfCake: state.numOfCake - 1,
//       }

//       case BUY_ICECREAM:
//       return {
//         ...state,
//         numOfIceCream: state.numOfIceCream - 1
//       }
//     default:
//       return state;
//   }   
// };

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
      case BUY_CAKE:
        return {
          ...state,
          numOfCake: state.numOfCake - 1,
        }
      default:
        return state;
    }   
  };

  const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type) {
        case BUY_ICECREAM:
        return {
          ...state,
          numOfIceCream: state.numOfIceCream - 1
        }
      default:
        return state;
    }   
  }

  const rootReducer = combineReducers({
    cake:cakeReducer,
    iceCream : iceCreamReducer
  })

const store = createStore(rootReducer, applyMiddleware(logger));
const unsubscribe = store.subscribe(() =>{});
console.log("initalState", store.getState());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIceCream());
store.dispatch(buyIceCream());
unsubscribe();
