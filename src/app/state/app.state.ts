

import {Record, List} from 'immutable'; 
import * as _ from 'lodash'; 
/** 
 *
 *
 **/
 
export interface AppStateAttrs {
  menuOpen: boolean; 
  activePoll: string; 
}
 
  
export interface AppStateFunctions { 
  withMenuOpenToggled(): this;
  withActivePoll(activePoll:string): this;
}

export interface AppState extends AppStateAttrs, AppStateFunctions { }
  
  

const DEFAULTS: AppStateAttrs = {
 menuOpen:  false , activePoll:  null
};


export class AppStateRecord extends Record<AppStateAttrs>(DEFAULTS) implements AppState {
  public menuOpen: boolean; 
  public activePoll: string; 

  public static forInput(input?:AppStateAttrs): AppState {
    return input && input instanceof AppStateRecord ? input : new AppStateRecord(input);
  }

  constructor(input?: AppStateAttrs){
    let pass = input ? _.clone(input) : undefined;
    super(pass);
  }
  
  public withMenuOpenToggled(): this { 
     return <this>this.set('menuOpen', !this.menuOpen);
  }

  public withActivePoll(activePoll: string): this { 
     return <this>this.set('activePoll', activePoll);
  }






}