import {it, describe, expect, TestComponentBuilder, beforeEachProviders, injectAsync} from "angular2/testing";


describe('Vote', ()=>{
  let choices: string[] = ['donald', 'sucks', 'cock'],
      poll: 'sadf',
      user: '234',
      vote: Vote;
  
  beforeEach(()=>{
    vote = new Vote(choices, poll, user);    
  });
  
  
  it('should have expected pollId', ()=>{
    expect(vote.pollId) = poll;
    expect(true).toBeFalsy();
  });
  
  
  
  
  
  
});


