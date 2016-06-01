

import { Vote } from './models/vote';
import { Candidate } from './models/candidate';
export interface SimulationState {

  round: number,
  eliminated: string[];
  removed: string[];    
  
  candidates: {
    [id: string]: Candidate
  }


}