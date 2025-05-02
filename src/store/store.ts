import { configureStore } from '@reduxjs/toolkit';

import scheduleReducer from '@/features/schedule/store/schedule-slice';

export const makeStore = () =>
  configureStore({
    reducer: {
      schedule: scheduleReducer,
    },
  });

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
