import { Component, Input } from '@angular/core';
import { Simulation } from '../services/sim.service';
import { LegendComponent } from './legend.component';
import { ControlsComponent } from './controls.component';
import { PieComponent } from './pie.component';
import { ChordComponent } from './chord.component';

@Component( {
  selector  : 'rcv-sim-container',
  directives: [ LegendComponent, ControlsComponent, PieComponent, ChordComponent ],
  providers : [ Simulation ],
  host: {'layout': 'column', 'layout-align': 'start stretch'}
  styles    : [ `.controls { align-self: center; margin: 5px 0;  }` ],
  template  : `
      <rcv-legend [cands$]="sim.candidates$"></rcv-legend>
      <rcv-controls class="controls"
                    (next)="sim.nextRound()" 
                    (prev)="sim.prevRound()" 
                    (start)="sim.skipToStart()"
                    [round]="sim.round$ | async" ></rcv-controls>
      <div layout="row" layout-align="space-around stretch">
        <rcv-pie [cands$]="sim.candidates$" [totalVotes$]="sim.totalVotes$" (removals$)="removals$.next($event)" flex></rcv-pie>
        <rcv-chord [cands$]="sim.candidates$" [totalVotes$]="sim.totalVotes$" flex></rcv-chord>
      </div>
    `
} )
export class RcvSimulatorContainer {
  @Input() id: string;

  constructor(private sim: Simulation) {

  }

  ngOnInit() {
    this.sim.load( 'asdf' );

  }

}