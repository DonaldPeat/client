import { ActionReducer, Action } from '@ngrx/store';
import { RcvActions } from '../actions';
import * as SI from 'seamless-immutable';
import { PollData, poll } from '../models/poll';
import { SimulationState } from '../state.shape';


const initialState = SI<SimulationState>( {
  round  : 1,
  removed: [],
  hovered: '',
  poll   : null
} );


export const sim: ActionReducer<SimulationState & Immutable.ObjectMethods<SimulationState>> =
                 (state: SimulationState & Immutable.ObjectMethods<SimulationState> = initialState, action: Action) => {

                   switch (action.type) {
                     case RcvActions.PREV_ROUND:
                       return state.set( 'round', state.round - 1 );
                     case RcvActions.NEXT_ROUND:
                       return state.set( 'round', state.round + 1 );
                     case RcvActions.SKIP_TO_START:
                       return state.set( 'round', 1 );

                     case RcvActions.CAND_REMOVED:
                       return state.set( 'removed', [ action.payload ].concat( state.removed ) );
                     case RcvActions.CAND_UNREMOVED:
                       return state.set( 'removed', state.removed.filter( x => x !== action.payload ) );

                     case RcvActions.POLL_DATA_LOADED:
                       let data: PollData = <PollData> action.payload;
                       return state.set( 'poll', poll( data ) );

                     case RcvActions.CAND_HOVERED:
                       return state.set('hovered', <string>action.payload);

                     default:
                       return state;
                   }
                 };
