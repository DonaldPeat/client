import * as SI from 'seamless-immutable';

export function immutable<T>( it: T, asType?: Prototyped ): T & SeamlessImmutable.ImmutableObjectMethods<T> {

  if (asType) {
    let itt: {prototype?: any} = <{prototype?: any}> asType,
        proto = itt.prototype ? itt.prototype : itt;
    return SI<T>(it, {prototype: proto});
  }
  
  return SI<T>( it )
}

export function mutable<T>( it: T, deep: boolean = true ): T {
  if (SI.isImmutable( it )) {
    let imm: SeamlessImmutable.ImmutableObjectMethods<T> = <SeamlessImmutable.ImmutableObjectMethods<T>> it; // #TypescriptProblems
    return imm.asMutable( { deep: deep } );
  }
  else return it;
}

export function mutate<T>( input: T, mutation: ( input: T ) => T, asType?: Prototyped): T {
  return immutable<T>( mutation( mutable( input ) ), asType );
}

export function mutateAll<T>( input: Array<T>, mutation: ( input: T ) => T, elemType: Prototyped): Array<T> {
  // pass elem type to the inner immutable all -- we make it just so we can. Assumption, outer immutable call does almost nothing, wraps but doesnt touch inner outputs
  
  let ret = mutable( input ).map( elem => immutable( mutation( elem ), elemType ) );
  
  return SI.isImmutable(input) ? immutable(ret) : ret;
  
}

export type Prototyped = { prototype?: any};