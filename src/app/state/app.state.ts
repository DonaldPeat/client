import * as SI from 'seamless-immutable';
import * as _ from 'lodash'; 
/** 
 *
 *
 **/
 
export interface IAppState {
  menuOpen: boolean;
  activePoll: string;
}

export class AppState implements IAppState {

  constructor(public menuOpen: boolean, public activePoll: string){ }

  public static mutable(input?:  AppState | IAppState): AppState {

    if (input && input instanceof AppState) {
      if (SI.isImmutable(input)){
        let imm: SeamlessImmutable.ImmutableObjectMethods<AppState> = <SeamlessImmutable.ImmutableObjectMethods<AppState>> input;
        return <AppState> imm.asMutable({deep:true});
      } else return <AppState> input;
    }

    if (!input) input = <IAppState>{};

    let menuOpen = input && input.menuOpen ? input.menuOpen : false;
    let activePoll = input && input.activePoll ? input.activePoll : '';

    return new AppState(menuOpen, activePoll);
  }

  public static immutable(input? : AppState | IAppState): ImmutableAppState {
    return SI<AppState>(AppState.mutable(input));
  }
}

export type ImmutableAppState = AppState & SeamlessImmutable.ImmutableObjectMethods<AppState>;