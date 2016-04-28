import { Injectable } from "angular2/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/subject/BehaviorSubject";
import { Observable } from 'rxjs/Observable';
import { Store, Action } from '@ngrx/store';
import { RouteParams } from '@ngrx/router';

import { AppActions } from './app.reducer';
import { AppState } from './app.state';
import { Poll } from '../models/poll';


@Injectable()
export class AppService
{
  public menuOpen$: Observable<boolean>;
  public activePoll$: Observable<Poll>;
  private _actions$: Subject<Action> = BehaviorSubject.create();

  constructor( private _store: Store<any>, private _params: RouteParams ) {
    const state$: Observable<AppState> = this._store.select( 'app' );

    //observable public fields 
    this.menuOpen$   = state$.map( state => state.menuOpen );
    this.activePoll$ = state$.map( state => state.activePoll );

    let pollChanges = this._params.filter(params => params.pollId !== undefined)
                                  .map(params => ({type: AppActions.SET_ACTIVE_POLL, payload:params.pollId})),

        menuToggles = this._actions$.filter(action => action.type === AppActions.TOGGLE_MENU );

    Observable.merge( menuToggles, pollChanges )
              .subscribe( action => this._store.dispatch( action ) );

    Object.freeze( this );
  }

  public toggleMenu(): void {
    this._actions$.next( { type: AppActions.TOGGLE_MENU} );
  }


}