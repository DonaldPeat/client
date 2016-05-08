import * as SI from 'seamless-immutable';


export interface IVote {
  choices: string[]

}

export class Vote implements IVote, SeamlessImmutable.ImmutableObjectMethods<IVote> {

  constructor(public choices: string[]){}

  public isChoice(id: string): boolean {
    return this.choices.includes(id);
  }

  public choiceBefore(id: string): string {
    let idx = this.choices.indexOf(id);
    if (idx <= 0) { // <= IS intentional - if index is 0
      return undefined;
    }
    return this.choices[idx - 1];
  }

  public choiceAfter(id: string): string {
    let idx = this.choices.indexOf(id);
    if (idx < 0 || idx == this.choices.length - 1) {
      return undefined;
    }
    return this.choices[idx + 1];
  }

  public static mutable(input?:  Vote | IVote): Vote {

    if (input && input instanceof Vote) {
      if (SI.isImmutable(input)){
        let imm: SeamlessImmutable.ImmutableObjectMethods<Vote> = <SeamlessImmutable.ImmutableObjectMethods<Vote>> input;
        return <Vote> imm.asMutable();
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
