import { Component, Input } from '@angular/core';
import { Candidate } from '../models/candidate'; 

@Component({
  selector: 'candidate-bar',
  template: `
    <div>{{candidate.name}}:  <span>{{candidate.score}}</span><span *ngIf="candidate.eliminated">ELIM</span></div>
  ` })
export class CandidateBarComponent {
  @Input() candidate: Candidate;
    
}