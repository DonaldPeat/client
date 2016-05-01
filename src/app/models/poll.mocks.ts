

import { Candidate, candidate } from './candidate';
import { Vote, vote } from './vote';
import * as moment from 'moment';
import { Moment } from 'moment';
import { Poll, poll } from './poll';


/**
 * This file provides mock poll data for testing purposes. We give it its own file like this because we'll use it in 
 * multiple test classes. 
 */

const now: Moment = moment();

const candidates: Candidate[] = [
  candidate({
    name: "Joe Fooey",
    id: "0",
    photo: ""
            }),
  candidate({
              name: "Ima Huzenhousen",
              id: "1",
              photo: ""
            }),
  candidate({
              name: "Nigel Ett",
              id: "2",
              photo: ""
            }),
];

const votes: Vote[] = [
    vote({
      timestamp: now,
      choices: ["0", "1", "2"] 
    }),
    vote({
           timestamp: now,
           choices: ["0", "1", "2"]
         }),
    vote({
           timestamp: now,
           choices: ["1", "0", "2"]
         }),
    vote({
           timestamp: now,
           choices: ["2", "1", "0"]
         }),
    vote({
           timestamp: now,
           choices: ["2", "1", "0"]
         })
];

export const mockPoll: Poll = poll({
  title: "Dummy Poll",
  candidates: candidates,
  votes: votes 
                                   })