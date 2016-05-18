

import { Candidate  } from './candidate';
import { Vote } from './vote';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Poll } from './poll';


/**
 * This file provides mock poll data for testing purposes. We give it its own file like this because we'll use it in 
 * multiple test classes. 
 */

const now: Moment = moment();

const candidates: Candidate[] = [
    new Candidate("id-0", "Joe Fooey", "TODO"),
    new Candidate("id-1", "Ima Huzenhousen", "TODO"),
    new Candidate("id-2", "Nigel Ettelsworth", "TODO"),
];

const votes: Vote[] = [
    new Vote(["0", "1", "2"]),
    new Vote(["1", "0", "2"]),
    new Vote(["2", "1", "0"]),
    new Vote(["2", "0", "1"])
];

export const mockPoll: Poll =

                 Poll.mutable({
  title: "Dummy Poll",
  candidates: candidates,
  votes: votes 
                                   });