import { createSlice } from "@reduxjs/toolkit"

export const profile = createSlice({
    name: "Profile Token",
    initialState: {
        token: ""
    },
    reducers: {
        addToken: (state, action) => {
            const tokenNum = action.payload;
            state.token = tokenNum;
        },
        removeToken: (state) => {
            state.token = "";
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }

    }
})
export const {
    addToken, removeToken,setToken
} = profile.actions;
export default profile.reducer;