import { Injectable } from '@angular/core';
import { Polls } from './models/polls';
import { Effect, StateUpdates } from '@ngrx/effects';
import { SimulationState } from './state.shape';
import { RcvActions } from './actions';


@Injectable()
export class SimulationEffects {

  @Effect() loads = this.updates$
                        .whenAction( RcvActions.LOAD_POLL_DATA )
                        .map( update => <string> update.action.payload )
                        .flatMap( id => this.polls.load( id ) )
                        .map( data => this.actions.pollDataLoaded( data ) );


  constructor(private updates$: StateUpdates<SimulationState>, private polls: Polls, private actions: RcvActions) {}


}