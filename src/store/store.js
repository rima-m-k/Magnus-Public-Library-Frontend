import {configureStore, createSlice} from '@reduxjs/toolkit' 

  
  const bookSlice = createSlice({
    name: "book",
    initialState: null,
    reducers: {
      setBooks (state, action) {
        console.log(action.payload);
        return action.payload;
      },
    },
  });
  
  const store=configureStore({
    reducer:{
        book:bookSlice.reducer,
    }
  })

export default store;
export const { setBooks } = bookSlice.actions

