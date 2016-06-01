import { Candidate, CandidateData, candidate, candidates } from './candidate';

      import * as SI from 'seamless-immutable';
import { Vote } from './vote';

/**
 *
 *
 **/

export interface PollData {
  title: string;
  id: string;
  candidates: CandidateData[];
  votes: Vote[];
}

export interface Poll {
  title: string;
  id: string;
  candidates: Candidate[];
  votes: Vote[];
}


export interface PollInput {
  title: string;
  id: string;
  candidates?: Candidate[];
  votes?: Vote[];
}

export function poll(data: PollData): Poll {
  return {
    title: data.title,
    id: data.id,
    candidates: candidates(data.candidates),
    votes: data.votes
  }
}