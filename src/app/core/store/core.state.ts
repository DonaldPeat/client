import {Injectable} from "angular2/core";
import {Subject} from "rxjs/Subject";
import {BehaviorSubject} from "rxjs/subject/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Store, Action} from "@ngrx/store";
import {CoreStateData} from "./core.state.data.ts";
import {CoreActions} from "./core.reducer.ts";

@Injectable()
export class CoreState {
  public menuOpen$: Observable<boolean>;
  private _actions$: Subject<Action> = BehaviorSubject.create();

  constructor(private _store: Store<any>) {
    const state$: Observable<CoreStateData> = this._store.select<CoreStateData>('core');

    //observable public fields
    this.menuOpen$ = state$.map(state => state.menuOpen);

    //requests
    let menuOpenSets = this._actions$.filter(action => action.type === CoreActions.ToggleMenu);


    Observable.merge(menuOpenSets)
              .subscribe(action => this._store.dispatch(action));

    Object.freeze(this);

  }


  public toggleMenu(): void {
    this._actions$.next({ type: CoreActions.ToggleMenu});
  }

}