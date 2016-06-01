import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { PollData } from './models/poll';


@Injectable()
export class RcvActions {


  static LOAD_POLL_DATA = "LOAD_POLL_DATA";

  public loadPollData(id: string): Action {
    return {
      type   : RcvActions.LOAD_POLL_DATA,
      payload: id
    }
  }

  static POLL_DATA_LOADED = "POLL_DATA_LOADED";

  public pollDataLoaded(data: PollData): Action {
    return {
      type   : RcvActions.POLL_DATA_LOADED,
      payload: data
    }
  }

  static NEXT_ROUND = "NEXT_ROUND";

  public nextRound(): Action {
    return {
      type: RcvActions.NEXT_ROUND
    }
  }

  static PREV_ROUND = "PREV_ROUND";

  public prevRound(): Action {
    return {
      type: RcvActions.PREV_ROUND
    }
  }

  static SKIP_TO_START = "SKIP_TO_START";

  public skipToStart(): Action {
    return {
      type: RcvActions.SKIP_TO_START
    }
  }

  static SKIP_TO_END = "SKIP_TO_END";

  public skipToEnd(): Action {
    return {
      type: RcvActions.SKIP_TO_END
    }
  }

  static CAND_REMOVED = "CAND_REMOVED";

  public candRemoved(id: string): Action {
    return {
      type   : RcvActions.CAND_REMOVED,
      payload: id
    }
  }

  static CAND_UNREMOVED = "CAND_UNREMOVED";

  public candUnremoved(id: string): Action {
    return {
      type   : RcvActions.CAND_UNREMOVED,
      payload: id
    }
  }


}