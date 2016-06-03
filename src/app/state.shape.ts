import { PollData } from './models/poll';

export interface SimulationState {

  /**
   * The number of the current round
   */
  round: number,

  /**
   * Set of ID's of candidates the user has manually removed
   */
  removed: string[];

  /**
   * Raw (static) data for the active poll
   */
  poll: PollData;
  

  /**
   * the ID of the candidate the user is currently hovering on (if any) 
   */
  hovered: string;
}