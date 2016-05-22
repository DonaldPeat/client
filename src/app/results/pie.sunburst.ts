/**
 * Created by Jeffrey on 5/14/2016.
 */

import {Directive, Input, AfterViewInit, OnInit, ElementRef, Renderer, HostListener} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Candidate} from '../models/candidate';
import * as d3 from 'd3';
import {Selection} from 'd3';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {mutable} from '../common/mutability';

@Directive({
    selector: 'pie-sunburst'
})
export class PieSunBurstComponent implements OnInit, AfterViewInit {

    @Input() cands$:Observable<Candidate[]>;
    @Input() totalVotes$: Observable<number>;

    private height = 100;
    private width = 350;
    private arc;
    private centerArc;
    private radius = Math.min(this.width, this.height) / 2;
    private svg:Selection<any>;
    private g:any;
    private screenWidth$:Subject<number> = BehaviorSubject.create();

    @HostListener("window:resize", ['$event'])
    private onResize(event) {
        this.screenWidth$.next(event.target.innerWidth);
    }


    constructor(private element:ElementRef, private renderer:Renderer) {
        
    }        
     

    ngOnInit() {
     
        /**
         * We want to redraw/update the graphic every time the data changes, OR the size of the screen changes.
         * Observable.combineLatest says: "Anytime either of these changes, fire a new event with the latest value of each"
         * So, we subscribe to that and run our viz update logic each time it fires.
         */
        Observable.combineLatest(this.cands$, this.screenWidth$, this.totalVotes$).subscribe(
            ([cands, width, totalVotes]) => {

                //this.svg.attr( 'width', width ); // update the screen width - if it hasn't changed, this has no effect

                let actives = mutable(cands).filter(cand => cand.isActive), // don't include eliminated candidates
                    tot = actives.reduce((sum, cand) => sum + cand.score, 0), //the total # of active votes
                    allyVotes = actives.reduce((result, cand) => {
                        result[cand.id] = cand.getInboundAllyVotes();
                        return result
                    },{}),
                    wid = d3.scale.linear()
                        .domain([0, tot]) // scale from 0 to 100% of the votes
                        .range([0, width || 0]), //mapped to 0 to full width of screen
                    scores = actives.map(cand => +cand.score).sort((x, y)=> y - x),
                    ids = mutable(cands).map(cand => cand.id).sort(), // sort alphabetically so each cand's color stays the same
                    color = d3.scale.category20b().domain(ids),
                    colorInner = d3.scale.category10();

                let pie = d3.layout.pie()
                    .value(d => d);

                let numVotes = [tot,totalVotes-tot];

                let updates = this.g.selectAll('.arc').data(pie(scores)),
                    enters = updates.enter(), // elements we're drawing for the first time
                    exits = updates.exit(); // elements that are being removed

                enters.append("path")
                    .attr('class','arc')
                    .attr("d", this.arc)
                    .attr("fill", d => color(d.data))
                    .each(d => this.element.nativeElement._current = d );

                let innerCircle = this.g.selectAll('.centerArc').data(pie(numVotes)),
                    innerCirEnters = innerCircle.enter(),
                    innerCirExits = innerCircle.exit();

                innerCirEnters.append("path")
                    .attr("class", "centerArc")
                    .attr("d", this.centerArc)
                    .attr("fill", d => colorInner(d.data));

                innerCirExits.remove();
                exits.remove();

                let updateVisual = updates
                    .transition().duration(650)
                    .attrTween("d", d => {
                        let interpolate = d3.interpolate(this.element.nativeElement._current, d);
                        this.element.nativeElement._current = interpolate(0);
                        return t => this.arc(interpolate(t))
                    } );

                let innerCirUpdate = innerCircle
                    .transition().duration(650)
                    .attr("d",this.centerArc);

            });

    }

    ngAfterViewInit() {
        /**
         * This only runs once, creating
         */
        let initWidth = this.element.nativeElement.clientWidth;

        this.svg = d3.select(this.element.nativeElement)
            .append('svg')
            .attr('width', initWidth)
            .attr('height', `${this.height * 2 + 15}px`);

        this.g = this.svg.append('g')
            .attr("transform", "translate(300,100)");

        this.arc = d3.svg.arc()
            .innerRadius(this.radius * 0.9)
            .outerRadius(this.radius * 1.8);

        this.centerArc = d3.svg.arc()
            .outerRadius(this.radius*0.9);

        this.screenWidth$.next(initWidth);
    }

}