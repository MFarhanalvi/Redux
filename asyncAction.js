const redux = require('redux')
const createStore = redux.createStore()
const applyMiddleware =  redux.applyMiddleware
const thunkMiddlware =  require('redux-thunk').default
const axios = require('axios')
  
initalState = {
    loading : 'false',
    user : [],
    error : ''
}

const FETCH_USERS_REQUEST= "FETCH_USERS_REQUEST"
const FETCH_USERS_SUCCESS= "FETCH_USERS_SUCCESS"
const FETCH_USERS_FAILURE= "FETCH_USERS_FAILURE"

const fetchUsersRequest = () => {
 return{
    type:'FETCH_USERS_REQUEST'
 }
}
const fetchUsersSuccess = user => {
    return{
       type:'FETCH_USERS_SUCCESS',
       payload: user
    }
   }
   const fetchUsersFailure = error => {
    return{
       type:'FETCH_USERS_FAILURE',
       payload : error
    }
   }

   const reducer = (state = initalState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST :{
            return {
                ...state,
        loading: true
            }
        }

        case FETCH_USERS_SUCCESS :{
            return {
        loading: false,
        user : action.payload
            }
        }

        case FETCH_USERS_FAILURE :{
            return {
        loading: false,
        user : [],
        error : action.payload
            }
        }


    }

   }

   const fetchUsers = () => {
      return function(dispatch){
        dispatch(fetchUsersRequest())
        axios.get('https://jsonplaceholder.typicode.com/users')
        .then (response =>{
        const users = response.data.map(user=>{user.id})
        dispatch(fetchUsersSuccess(users))
        })
        .catch(error=>{
        dispatch(fetchUsersFailure(error.message))
        })
      }
   }

   const store = createStore(reducer,applyMiddleware(thunkMiddlware) )

   store.subscribe(()=>{console.log(store.getState())})

   store.dispatch(fetchUsers())