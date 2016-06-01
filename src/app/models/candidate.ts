import { Vote } from './vote';
import * as d3 from 'd3';
import { mutable } from './mutability';

/**
 *
 *
 **/

export interface CandidateData {
  id: string;
  name: string;
  photo: string;
}

export interface Candidate extends CandidateData {
  score: number;
  eliminated: boolean;
  removed: boolean;
  votes: Vote[];
  color: string;
}

export function allyVotes(candidate: Candidate): {[id: string]: number} {
  let init: {[id: string]: number} = {};
  return candidate.votes.reduce( (dict, vote)=> {
    let myChoice = vote.choices.indexOf( candidate.id );
    for (let i = 0; i < myChoice; i++) {
      if (!dict[ vote.choices[ i ] ]) dict[ vote.choices[ i ] ] = 0;
      dict[ vote.choices[ i ] ] += 1; //= dict[vote.choices[i]] + 1;
    }
    return dict;
  }, init );
}

export function candidate(data: CandidateData): Candidate {
  return {
    id        : data.id,
    name      : data.name,
    photo     : data.photo,
    score     : 0,
    eliminated: false,
    removed   : false,
    votes     : [],
    color     : ''
  }
}

export function candidates(input: CandidateData[]): Candidate[] {
  const color = d3.scale.category20b().domain( mutable( input.map( cand => cand.id ) ).sort() );

  return input.map( data => ({
    id        : data.id,
    name      : data.name,
    photo     : data.photo,
    score     : 0,
    eliminated: false,
    removed   : false,
    votes     : [],
    color     : color( data.id )
  })
}