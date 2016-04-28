import { Component, OnInit, AfterContentInit, Inject } from 'angular2/core';
import { Polls } from '../models/polls';
import { AppState } from '../state/app.state';

@Component({
  selector: 'vote-input',
  directives: [],  
  template: `

    VOTE!
`
})
export class VoteInputContainer implements AfterContentInit {

  constructor(){

  }


  ngAfterContentInit(): any {

  }
}