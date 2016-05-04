import * as SI from 'seamless-immutable';


export interface IVote {
  choices: string[]
}

export class Vote implements IVote, SeamlessImmutable.ImmutableObjectMethods<IVote> {

  constructor(public choices: string[]){}
  
  public static mutable(input?:  Vote | IVote): Vote {

    if (input && input instanceof Vote) {
      if (SI.isImmutable(input)){
        let imm: SeamlessImmutable.ImmutableObjectMethods<Vote> = <SeamlessImmutable.ImmutableObjectMethods<Vote>> input;
        return <Vote> imm.asMutable({deep:true});
      } else return <Vote> input;
    } else if (!input || !input.choices){
      throw Error("Tried to create vote without choices")
    }

    //now we know we have an input with choices
    return new Vote(input.choices);
  }

  public static immutable(input?: Vote | IVote): Vote {
    return SI<Vote>(Vote.mutable(input), {prototype: Vote.prototype});
  }
}
