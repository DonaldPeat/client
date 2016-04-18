import {Reducer, Action} from "@ngrx/store";
import {CoreStateDataRecord} from "./core.state.data.ts";


export const CoreActions = {
  ToggleMenu: "@epub@core::TOGGLE_MENU"
};

export const core: Reducer<CoreStateDataRecord> = (state: CoreStateDataRecord = new CoreStateDataRecord(), action: Action )=> {

  switch (action.type) {
    case CoreActions.ToggleMenu:
      return state.toggleMenu();
    default:
      return state;
  }


};
