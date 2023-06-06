import { Action, configureStore, ThunkAction, combineReducers } from '@reduxjs/toolkit';
import { nextReduxCookieMiddleware, wrapMakeStore } from 'next-redux-cookie-wrapper';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import alertReducer from './alerts/alertSlice';
// import  from './auth/authSlice';
import authReducer, { authSlice } from './auth/authSlice';
import portfolioReducer from './auth/portfolioSlice';
import bannerReducer from './banner/bannerSlice';
import cryptoReducer from './crypto/cryptoSlice';
import themeReducer from './dark-mode/themeSlice';
import myNftsReducer from './my-nfts/myNftsSlice';
import newsReducer from './news/newsSlice';
import topSalesReducer from './top-sales/topSalesSlice';
import userReducer from './wallet/userSlice';

export const combinedReducer = combineReducers({
  user: userReducer,
  sales: topSalesReducer,
  isAuth: authReducer,
  news: newsReducer,
  isOpen: portfolioReducer,
  isVisible: bannerReducer,
  crypto: cryptoReducer,
  myNfts: myNftsReducer,
  theme: themeReducer,
  alert: alertReducer,
});

const reducer: typeof combinedReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducer(state, action);
};

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: [`${authSlice.name}.isAuth`, { subtree: 'theme.mode', defaultState: 'light' }],
        })
      ),
  })
);
type Store = ReturnType<typeof makeStore>;

export type AppDispatch = Store['dispatch'];
export type RootState = ReturnType<Store['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const wrapper = createWrapper(makeStore);
