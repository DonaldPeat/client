

import {Record, OrderedSet} from 'immutable'; 
import * as _ from 'lodash';
import * as moment from 'moment';
import { Moment } from 'moment'; 

/** 
 *
 *
 **/


export interface VoteAttrs {
  timestamp: Moment; 
  choices: OrderedSet<string>; 
}

export interface VoteFunctions { 
  withTimestamp(timestamp:Moment): this;
  withChoices(choices:OrderedSet<string>): this;
}

export interface Vote extends VoteAttrs, VoteFunctions {}
  
  

const DEFAULTS: VoteAttrs = {
 timestamp:  null, choices:  OrderedSet<string>() };


export class VoteRecord extends Record<VoteAttrs>(DEFAULTS) implements Vote {
  public timestamp: Moment; 
  public choices: OrderedSet<string>; 

  constructor(input?: VoteAttrs){
    super(input);
  }
  
  public withTimestamp(timestamp: Moment): this { 
     return <this>this.set('timestamp', timestamp);
  }

  public withChoices(choices: OrderedSet<string>): this { 
     return <this>this.set('choices', choices);
  }

}

export type VoteInput = {timestamp: string | Moment, choices:string[]};

export function vote(input: VoteInput | VoteAttrs): Vote {
  if (input instanceof VoteRecord) return input;
  return new VoteRecord({
    choices: OrderedSet.of(...input.choices),
    timestamp:<Moment>moment(input.timestamp)
  });
}