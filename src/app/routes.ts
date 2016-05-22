import { Routes } from '@ngrx/router';
import { VoteInputContainer } from './vote/vote.container';
import { ResultsContainer } from './results/results.container';


export const ROUTES: Routes = [
  {
    path: ':pollId',
    component: VoteInputContainer
  },
  {
    path: ':pollId/results',
    component: ResultsContainer
  }

];