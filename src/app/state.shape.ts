import { PollData } from './models/poll';

export interface SimulationState {

  round: number,
  removed: string[];
  poll: PollData;

}