

import {Record, Map} from 'immutable'; 
import * as _ from 'lodash'; 
/** 
 *
 *
 **/
 
export interface CandidateAttrs {
  id: string; 
  name: string; 
  photo: string; 
  allyVotes: Map<string, number>;
  otherVotes: number[];
}
 
  
export interface CandidateFunctions { 
  withId(id:string): this;
  withName(name:string): this;
  withPhoto(photo:string): this;
  withAllyVotes(allyVotes:Map<string, number>): this;
  withOtherVotes(otherVotes:number[]): this;
}

export interface Candidate extends CandidateAttrs, CandidateFunctions {}
  
  

const DEFAULTS: CandidateAttrs = {
 id:  null, name:  null, photo:  null, allyVotes:  Map<string, number>(), otherVotes: [] };


export class CandidateRecord extends Record<CandidateAttrs>(DEFAULTS) implements Candidate {
  public id: string; 
  public name: string; 
  public photo: string; 
  public allyVotes: Map<string, number>;
  public otherVotes: number[];

  public static forInput(input?:CandidateAttrs): Candidate {
    return input && input instanceof CandidateRecord ? input : new CandidateRecord(input);
  }

  constructor(input?: CandidateAttrs){
    let pass = input ? _.clone(input) : undefined;
    super(pass);
  }
  
  public withId(id: string): this { 
     return <this>this.set('id', id);
  }

  public withName(name: string): this { 
     return <this>this.set('name', name);
  }

  public withPhoto(photo: string): this { 
     return <this>this.set('photo', photo);
  }

  public withAllyVotes(allyVotes: Map<string, number>): this { 
     return <this>this.set('allyVotes', allyVotes);
  }

  public withOtherVotes(otherVotes: number[]): this {
    return <this>this.set('otherVotes',otherVotes);
  }

}

export type CandidateInput = {id: string, name:string, photo: string};

export function candidate(input: CandidateInput | CandidateAttrs): Candidate {
  if (input instanceof  CandidateRecord) return input;
  return new CandidateRecord({
    id: input.id,
    name: input.name,
    photo: input.photo,
    allyVotes: Map<string, number>(),
    otherVotes: []
  });
}