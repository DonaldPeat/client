import { Routes } from '@ngrx/router';
import { RcvSimulatorContainer } from './components/sim.container';


export const ROUTES: Routes = [
  {
    path     : '/',
    component: RcvSimulatorContainer
  }

];