import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    USER : [],
    TOKEN:null,
    currentUser:{},
    loader:false
}

 const userSlice = createSlice({
    name:"authUser",
    initialState,
    reducers:{
        setUser:(state,action) => {
            return { ...state, 
                USER: action.payload }
        },
        setToken:(state,action) => {
            return {
                ...state,
                TOKEN: action.payload
            }
        },
        setCurrentUser:(state,action) => {
           return{
            ...state,
            currentUser: action.payload
           }
            
        },
        setLoader:(state,action) => {
            state.loader = action.payload
        }
    }
    
})
export const {setUser,setToken,setCurrentUser,setLoader} = userSlice.actions
export default userSlice.reducer