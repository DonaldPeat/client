import { CandidateData } from './candidate';
import { Vote } from './vote';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Poll } from './poll';


/**
 * This file provides mock poll data for testing purposes. We give it its own file like this because we'll use it in
 * multiple test classes.
 */

const now: Moment = moment();

const candidates: CandidateData[] = [
  { id: "id-0", name: "Joe Fooey", photo: "TODO" },
  { id: "id-1", name: "Jane Booey", photo: "TODO" },
  { id: "id-3", name: "Nigel Ett", photo: "TODO" },

];

const votes: Vote[] = [
  { choices: [ "0", "1", "2" ] },
  { choices: [ "1", "0", "2" ] },
  { choices: [ "2", "1", "0" ] },
  { choices: [ "2", "0", "1" ] }
];

export const mockPoll: Poll = {
  id        : 'id-mock-poll',
  title     : "Dummy Poll",
  candidates: candidates,
  votes     : votes,
  hovered: ''
};