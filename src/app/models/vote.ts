/**
 * Created by moore on 4/24/2016.
 */

class Vote { 
  
  choices: string[];
  pollId: string;
  userId: string;


  constructor( choices: string[], pollId: string, userId: string ) {
    this.choices = choices;
    this.pollId  = pollId;
    this.userId  = userId;
  }
  
  
  
  
}