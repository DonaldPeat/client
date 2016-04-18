
import {Record} from "immutable";
import * as _ from "lodash";
/** 
 *
 *
 **/
 
export interface CoreStateDataAttrs {
  menuOpen: boolean; 
}
 
  
export interface CoreStateDataFunctions { 
  toggleMenu(menuOpen:boolean): this;
}

export interface CoreStateData extends CoreStateDataAttrs, CoreStateDataFunctions, Record.Base {}

const DEFAULTS: CoreStateDataAttrs = {menuOpen: false};


export class CoreStateDataRecord extends Record<CoreStateDataAttrs>(DEFAULTS) implements CoreStateData {
  public menuOpen: boolean;

  public static forInput(input?:CoreStateDataAttrs): CoreStateData {
    return input && input instanceof CoreStateDataRecord ? input : new CoreStateDataRecord(input);
  }

  constructor(input?: CoreStateDataAttrs){
    let pass = input ? _.clone(input) : undefined;
    super(pass);
  }
  
  public toggleMenu(): this {
    return this.set('menuOpen', !this.menuOpen);
  }

}
