import { Routes } from '@ngrx/router';
import { VoteInputContainer } from './vote/vote.container';
import { RcvSimContainer } from './results/sim.container';


export const ROUTES: Routes = [
  {
    path: '/',
    component: RcvSimContainer
  }

];