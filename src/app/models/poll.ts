

import {Record, List} from 'immutable'; 
import * as _ from 'lodash';
import { Candidate, candidate } from './candidate';
import { Vote, vote } from './vote';
/** 
 *
 *
 **/
 
export interface PollAttrs {
  title: string; 
  candidates: List<Candidate>; 
  votes: List<Vote>; 
}
 
  
export interface PollFunctions { 
  withTitle(title:string): this;
  withCandidates(candidates:List<Candidate>): this;
  withVotes(votes:List<Vote>): this;
}

export interface Poll extends PollAttrs, PollFunctions {}
  
  

const DEFAULTS: PollAttrs = {
 title:  null, candidates:  List<Candidate>() , votes:  List<Vote>() };


export class PollRecord extends Record<PollAttrs>(DEFAULTS) implements Poll {
  public title: string; 
  public candidates: List<Candidate>; 
  public votes: List<Vote>; 

  constructor(input?: PollAttrs){
    let pass = input ? _.clone(input) : undefined;
    super(pass);
  }
  
  public withTitle(title: string): this { 
     return <this>this.set('title', title);
  }

  public withCandidates(candidates: List<Candidate>): this { 
     return <this>this.set('candidates', candidates);
  }

  public withVotes(votes: List<Vote>): this { 
     return <this>this.set('votes', votes);
  }

}
export type PollInput = {title: string, candidates: Candidate[], votes: Vote[]}
export function poll(input: PollInput | PollAttrs){
  if (input instanceof PollRecord) return input;
  let votes = input.votes.map(v => vote(v)),
      cands = input.candidates.map(c => candidate(c));

  return new PollRecord({
    title: input.title,
    votes: List.of(...votes),
    candidates: List.of(...cands)
  })
}