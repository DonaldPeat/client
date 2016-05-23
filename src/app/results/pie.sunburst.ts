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
    @Input() totalVotes$:Observable<number>;

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
                    }, {}),
                    wid = d3.scale.linear()
                        .domain([0, tot]) // scale from 0 to 100% of the votes
                        .range([0, width || 0]), //mapped to 0 to full width of screen
                    numVotes = [tot, totalVotes - tot],
                    scores = actives.map(cand => +cand.score).sort((x, y)=> y - x),
                    ids = mutable(cands).map(cand => cand.id).sort(), // sort alphabetically so each cand's color stays the same
                    color = d3.scale.category20b().domain(ids),
                    colorInner = d3.scale.category10(),
                    percentFormat = d3.format(".0%"),
                    outerPie = d3.layout.pie().value(d => d.score), // Jeff/donald disregard this warning - inaccuracy in the typedef
                    innerPie = d3.layout.pie(),
                    angle = (d) => {
                        let i = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                        return i > 90 ? i - 180 : i;
                    };

                //Outer Circle
                let outerCircle = this.g.selectAll('.arc').data(outerPie(cands)),
                    outerCirEnters = outerCircle.enter(), // elements we're drawing for the first time
                    outerCirExits = outerCircle.exit(); // elements that are being removed

                //Outer Arcs
                outerCirEnters.append("path")
                    .attr('class', 'arc')
                    .attr("d", this.arc)
                    .attr("fill", d => {
                      debugger;
                      return color( d.data.score )
                    })
                    .each(d => this.element.nativeElement._current = d); //stores the current angles in ._current

                //Outer Circle Labels
                let outerCirText = this.g.selectAll('.txt').data(outerPie(cands)),
                    outerCirTextEnters = outerCirText.enter(),
                    outerCirTextExits = outerCirText.exit();

                //Draws Outer Circle Labels for the first time
                outerCirTextEnters
                    .append("text")
                    .attr("class", "txt")
                    .attr("dy", ".35em")
                    .attr("text-anchor", "middle")
                    .attr("transform", d => {
                        d.outerRadius = this.radius * 1.8;
                        d.innerRadius = this.radius * 0.9;
                        return `translate(${this.arc.centroid(d)}) rotate(${angle(d)})`;
                    })
                    .style("fill", "white")
                    .text(d => percentFormat(d.value / tot))
                    .each(d => this.element.nativeElement._text = d.value); //stores the current value in ._text

                //removes label in slices that have less than 2 degrees.
                this.g.selectAll('.txt')
                    .filter(d => d.endAngle - d.startAngle < .2)
                    .remove();

                //Draws inner circle
                let innerCircle = this.g.selectAll('.centerArc').data(innerPie(numVotes)),
                    innerCirEnters = innerCircle.enter(),
                    innerCirExits = innerCircle.exit();

                //Draws inner arcs
                innerCirEnters.append("path")
                    .attr("class", "centerArc")
                    .attr("d", this.centerArc)
                    .attr("fill", d => colorInner(d.data))
                    .each(d => this.element.nativeElement._currentAng = d);//stores current angles in ._currentAng

                //Inner Circle Labels
                let innerCirText = this.g.selectAll('.innerTxt').data(innerPie(numVotes)),
                    innerCirTextEnters = innerCirText.enter(),
                    innerCirTextExits = innerCirText.exit();

                //Draws Inner Circle Labels for the first time
                innerCirTextEnters
                    .append("text")
                    .attr("class", "innerTxt")
                    .attr("dy", "-0.10em")
                    .attr("text-anchor", "middle")
                    .attr("transform", d => {
                        d.outerRadius = this.radius * 0.9;
                        return `translate(${this.centerArc.centroid(d)}) rotate(${0})`;
                    })
                    .style("fill", "white")
                    .style("font-size", "18px")
                    .text(d => percentFormat(d.value / totalVotes));

                //removes label in slices that have less than 2 degrees.
                this.g.selectAll('.innerTxt')
                    .filter(d => d.endAngle - d.startAngle < .2)
                    .remove();

                //Removes a eliminated candidate from our visualization elements
                innerCirExits.remove();
                innerCirTextExits.remove();
                outerCirExits.remove();
                outerCirTextExits.remove();

                //Updates the outerCircle with one less candidate
                outerCircle
                    .transition().duration(650)
                    .attrTween("d", d => {
                        let interpolate = d3.interpolate(this.element.nativeElement._current, d);
                        this.element.nativeElement._current = interpolate(0);
                        return t => this.arc(interpolate(t))
                    });

                //Updates the inner Circle with one less candidate
                innerCircle
                    .transition().duration(650)
                    .attrTween("d", d => {
                        let interpolate = d3.interpolate(this.element.nativeElement._currentAng, d);
                        this.element.nativeElement._currentAng = interpolate(0);
                        return t => this.centerArc(interpolate(t))
                    });

                //Updates the outer circle labels with one less candidate
                outerCirText
                    .transition().duration(650)
                    .attr("transform", d => {
                        d.outerRadius = this.radius * 1.8;
                        d.innerRadius = this.radius * 0.9;
                        return `translate(${this.arc.centroid(d)}) rotate(${angle(d)})`;
                    })
                    .text(d => percentFormat(d.value / tot));

                //Updates the inner circle labels with one less candidate.
                innerCirText
                    .transition().duration(650)
                    .attr("transform", d => {
                        d.outerRadius = this.radius * 0.9;
                        return `translate(${this.centerArc.centroid(d)}) rotate(${0})`;
                    })
                    .text(d => percentFormat(d.value / totalVotes));

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
            .innerRadius(0)
            .outerRadius(this.radius * 0.9);

        this.screenWidth$.next(initWidth);
    }

}