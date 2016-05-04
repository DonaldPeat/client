

import * as _ from 'lodash'; 
/** 
 *
 *
 **/
 
export interface ResultsStateAttrs {
  pollId: string; 
  currRound: number; 
  forceRemoved: string[]; 
  winnerDeclared: boolean; 
}
 
  
export interface ResultsStateFunctions { 
  withPollId(pollId:string): this;
  withCurrRound(currRound:number): this;
  withForceRemoved(forceRemoved:string[]): this;
  withWinnerDeclared(winnerDeclared:boolean): this;
}

export interface ResultsState extends ResultsStateAttrs, ResultsStateFunctions {}
  
  

const DEFAULTS: ResultsStateAttrs = {
 pollId:  null, currRound:  null, forceRemoved:  null, winnerDeclared:  false };


export class ResultsStateRecord extends Record<ResultsStateAttrs>(DEFAULTS) implements ResultsState {
  public pollId: string; 
  public currRound: number; 
  public forceRemoved: string[]; 
  public winnerDeclared: boolean; 

  public static forInput(input?:ResultsStateAttrs): ResultsState {
    return input && input instanceof ResultsStateRecord ? input : new ResultsStateRecord(input);
  }

  constructor(input?: ResultsStateAttrs){
    let pass = input ? _.clone(input) : undefined;
    super(pass);
  }
  
  public withPollId(pollId: string): this { 
     return <this>this.set('pollId', pollId);
  }

  public withCurrRound(currRound: number): this { 
     return <this>this.set('currRound', currRound);
  }

  public withForceRemoved(forceRemoved: string[]): this { 
     return <this>this.set('forceRemoved', forceRemoved);
  }

  public withWinnerDeclared(winnerDeclared: boolean): this { 
     return <this>this.set('winnerDeclared', winnerDeclared);
  }




}