import { configureStore } from "@reduxjs/toolkit";
import { tocart } from "../reducers/redusers";

const store = configureStore({
    reducer: {tocart:tocart}
})

export default store