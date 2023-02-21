import { configureStore, createSlice } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

interface QueryState {
  value: string;
}

interface MovieIdState {
  value: number | null;
}

const initialQueryState = {
  value: '',
} as QueryState;

const initialMovieIdState = {
  value: null,
} as MovieIdState;

const querySlice = createSlice({
  name: 'query',
  initialState: initialQueryState,
  reducers: {
    setQuery: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { setQuery } = querySlice.actions;

const movieSlice = createSlice({
  name: 'movie',
  initialState: initialMovieIdState,
  reducers: {
    setMovieId: (state, action) => {
      state.value = action.payload;
    },
  },
});

const { setMovieId } = movieSlice.actions;

const store = configureStore({
  reducer: {
    query: querySlice.reducer,
    movie: movieSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, setQuery, setMovieId, useAppDispatch, useAppSelector };
