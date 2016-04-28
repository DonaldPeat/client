import {Reducer, Action} from '@ngrx/store';
import { AppState, AppStateRecord } from './app.state';

export const AppActions = {
    TOGGLE_MENU: "@epub:app::TOGGLE_MENU",
    SET_ACTIVE_POLL: "@epub:app::SET_ACTIVE_POLL",

};

export const app: Reducer<AppState> = (state: AppStateRecord = new AppStateRecord(), action: Action)=> {
 
  switch(action.type){
    case AppActions.TOGGLE_MENU:
      //TODO
      return state.withMenuOpenToggled();
    case AppActions.SET_ACTIVE_POLL:
      //TODO
      return state.withActivePoll(action.payload);
    default: 
      return state;
  }
 

};