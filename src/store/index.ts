import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

interface MainState {
  query: string | undefined;
  movieId: number | undefined;
}

const initialMainState = {
  query: undefined,
  movieId: undefined,
} as MainState;

const mainSlice = createSlice({
  name: 'main',
  initialState: initialMainState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setMovieId: (state, action) => {
      state.movieId = action.payload;
    },
  },
});

const { setQuery, setMovieId } = mainSlice.actions;
const mainReducer = mainSlice.reducer;

const store = configureStore({
  reducer: {
    main: mainReducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export {
  store,
  setQuery,
  setMovieId,
  // queryReducer,
  // movieReducer,
  mainReducer,
  useAppDispatch,
  useAppSelector,
};
