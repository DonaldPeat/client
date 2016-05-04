

import * as _ from 'lodash';
import { Candidate, ICandidate } from './candidate';
import * as SI from 'seamless-immutable';
import { ImmutableArray } from '../common/interfaces';
import { Vote, IVote } from './vote';

/** 
 *
 *
 **/


export interface IPoll {
  title: string;
  id: string;
  candidates: Candidate[];
  votes: Vote[];
}


export class Poll implements IPoll {


  public static mutable(input:  Poll | PollInput): Poll {

    if (input && input instanceof Poll)
    {
      console.log( 'is instanceof poll' );
      if (SI.isImmutable( input ))
      {
        console.log( 'is immutable' );
        let imm: SeamlessImmutable.ImmutableObjectMethods<Poll> = <SeamlessImmutable.ImmutableObjectMethods<Poll>> input;
        return <Poll> imm.asMutable({deep:true});
      } else {
        console.log('is not immutable');
        return <Poll> input;
      }
    }
    console.log('elssssssssssse');
    if (!input) input = <PollInput>{};

    let title = input && input.title ? input.title : 'Untitled poll',
        id = input && input.id ? input.id : 'NULL_ID',
        votes: Vote[] = input && input.votes ?  input.votes.map(vote => Vote.mutable(vote)) : [],
        candidates: Candidate[] = input && input.candidates ? input.candidates.map(cand => Candidate.mutable(cand)) : [];

    return new Poll(id, title, votes, candidates);
  }

  public static immutable(input: Poll | PollInput): ImmutablePoll {
    return SI<Poll>(Poll.mutable(input), {prototype: Poll.prototype});
  }

  constructor(public id: string, public title: string, public votes: Vote[], public candidates: Candidate[]){ }
  
}

export type ImmutablePoll = Poll & SeamlessImmutable.ImmutableObjectMethods<Poll>;

export interface PollInput {
  title: string;
  id: string;
  candidates?: ICandidate[];
  votes?: IVote[];
}

