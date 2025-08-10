import { createSlice } from "@reduxjs/toolkit";

const Todocart = createSlice({

    name: "cart",
    initialState: {
        count: 0 as number,
        cartItems:[] as any[],
        customerId: '' as string
    },
    reducers:{
        updatecart: (state, action) =>{
            let count = 0;
            action.payload.cartItems.map((item)=>{
                count += item.qty
            })
            state.count = count
            state.cartItems = action.payload.cartItems
        },
        updateCustomerSession: (state, action) =>{
            
            state.customerId = (action.payload.customerId != '')? action.payload.customerId:null
        }
    }

});

export const { updatecart, updateCustomerSession } = Todocart.actions;
export const tocart = Todocart.reducer;

