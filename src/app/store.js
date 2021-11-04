import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import characterLocationReducer from '../features/characterLocation/characterLocation.slice';
import characterDatarReducer from '../features/characterPersonalData/characterData.slice';
import globalReducer from '../features/global/global.slice';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    counter: counterReducer,
    characterData: characterDatarReducer,
    characterLocation: characterLocationReducer,
  },
});
