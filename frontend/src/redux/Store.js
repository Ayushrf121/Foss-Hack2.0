import { configureStore } from "@reduxjs/toolkit";
import profile from './Slicers/profileToken.js'
export const Store = configureStore(
    {
        reducer:{
            token : profile,
        }
    }
)