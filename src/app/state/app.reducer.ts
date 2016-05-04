import {Reducer, Action} from '@ngrx/store';
import { AppState, ImmutableAppState } from './app.state';
import { ImmutableArray } from '../common/interfaces';

export const AppActions = {
    TOGGLE_MENU: "@epub:app::TOGGLE_MENU",
    SET_ACTIVE_POLL: "@epub:app::SET_ACTIVE_POLL",

};

export const app: Reducer<AppState> = (state: ImmutableAppState = AppState.immutable(), action: Action)=> {
 
  switch(action.type){
    case AppActions.TOGGLE_MENU:
      //TODO
      return state.set('menuOpen', !state.menuOpen);
    case AppActions.SET_ACTIVE_POLL:
      //TODO
      return state.set('activePoll', action.payload);
    default: 
      return state;
  }
 

};