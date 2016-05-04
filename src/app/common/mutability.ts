
import * as SI from 'seamless-immutable';

export function immutable<T> (it: T): T & SeamlessImmutable.ImmutableObjectMethods<T> { 
  return SI<T>(it);
}

export function mutable<T> (it: T): T {
  if (SI.isImmutable(it)){
    let imm: SeamlessImmutable.ImmutableObjectMethods<T> = <SeamlessImmutable.ImmutableObjectMethods<T>> it; // #TypescriptProblems
    return imm.asMutable({deep:true});
  }
  else return it;
}

export function mutate<T>(target: T, mutation: (input: T)=> T): T {
  return immutable(mutation(mutable(target)));
}