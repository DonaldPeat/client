import * as _ from 'lodash';
import { Vote } from './vote';
import * as SI from 'seamless-immutable';

/**
 *
 *
 **/




export interface ICandidate {
  id: string;
  name: string;
  photo: string;
  score: number;
  eliminated: boolean;
  removed: boolean;
  votes?: Vote[];
}


export class Candidate implements ICandidate {
  public eliminated: boolean = false;
  public removed: boolean = false;
  public score: number;
  public votes: Vote[];

  constructor(public id: string, public name: string, public photo: string){}
  
  public static mutable(input?:  Candidate | ICandidate): Candidate {

    if (input && input instanceof Candidate) {
      if (SI.isImmutable(input)){
        let imm: SeamlessImmutable.ImmutableObjectMethods<Candidate> = <SeamlessImmutable.ImmutableObjectMethods<Candidate>> input;
        return <Candidate> imm.asMutable({deep:true});
      } else return <Candidate> input;
    }

    if (!input) input = <ICandidate>{};

    let id = input && input.id ? input.id : '',
        name = input && input.name ? input.name : '',
        photo = input && input.photo ? input.photo : '';

    return new Candidate(id, name, photo);
  }

  public static immutable(input?: Candidate | ICandidate): ImmutableCandidate {
    return SI<Candidate>(Candidate.mutable(input), {prototype: Candidate.prototype});
  }
  
  public get isActive(){
    return ! ( this.eliminated || this.removed);
  }

 /* public getVotesTo(){
    return this.votes.reduce((returnVal, vote) => {
      
    }, {});
  }*/
  

}

export type ImmutableCandidate = Candidate & SeamlessImmutable.ImmutableObjectMethods<ICandidate>;