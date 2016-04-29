import { Injectable } from "angular2/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/subject/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { RouteParams } from '@ngrx/router';

import { AppActions } from './app.reducer';
import { AppState } from './app.state';
import { Poll } from '../models/poll';
import { Polls } from '../models/polls';


@Injectable()
export class AppService {
  public menuOpen$: Observable<boolean>;
  public activePoll$: Observable<Poll>;
  private _actions$: Subject<Action> = BehaviorSubject.create();

  constructor( private _store: Store<any>, private _params: RouteParams, private polls: Polls ) {
    const state$: Observable<AppState> = this._store.select( 'app' );

    //observable public fields 
    this.menuOpen$   = state$.map( state => state.menuOpen );


    let menuToggles = this._actions$.filter(action => action.type === AppActions.TOGGLE_MENU );

    Observable.merge( menuToggles ).subscribe( action => this._store.dispatch( action ) );
    
   /* NOTE: For now (with just the one action type), the above line is exactly equivalent to:

    this._actions$.filter(action => action.type === AppActions.TOGGLE_MENU )
        .subscribe( action => this._store.dispatch( action ) );
    */
    
    Object.freeze( this );
  }

  public toggleMenu(): void {
    this._actions$.next( { type: AppActions.TOGGLE_MENU} );
  }


}