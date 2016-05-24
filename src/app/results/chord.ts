/**
 * Created by Donald on 5/23/16.
 */


import {Directive, Input, AfterViewInit, OnInit, ElementRef, Renderer, HostListener} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Candidate} from '../models/candidate';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {mutable} from '../common/mutability';
import * as d3 from 'd3';
import {Selection} from 'd3';

@Directive({
    selector: 'chord'
})
export class ChordDiagramComponent implements OnInit/*, AfterViewInit*/ {

    @Input() cands$:Observable<Candidate[]>;
    @Input() totalVotes$:Observable<number>;

    private width = 960;
    private height = 500;
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

                let actives = mutable(cands).filter(cand => cand.isActive), // don't include eliminated candidates
                    tot = actives.reduce((sum, cand) => sum + cand.score, 0), //the total # of active votes
                    allyVotes = actives.reduce((result, cand) => {
                        result[cand.id] = cand.getInboundAllyVotes();
                        return result
                    }, {}),

                    matrix = [ //dummy data matrix for chord diagram to be replaced with candidates' votes/
                    [10000,  5555, 8888, 2222],
                    [ 3333, 11111, 2000, 6666],
                    [ 7777, 22222, 1234, 4321],
                    [ 4444,   999,  1000, 150]
                    ],

                    chord = d3.layout.chord()
                        .padding(.05)
                        .sortSubgroups(d3.descending)
                        .matrix(matrix),

                    height = 500,
                    innerRadius = Math.min(this.width, this.height) * .41,  //outer arc blocks for labels & mouse selection
                    outerRadius = this.innerRadius * 1.1,

                     fill = d3.scale.ordinal()
                        .domain([d3.range(4).toString()])          //dom & range to be changed to #candidates/votes
                        .range(["#000000", "#FFDD89", "#957244", "#F26223"]),

                    svg = d3.select(this.element.nativeElement)
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

                    svg.append("g").selectAll("path")
                        .data(chord.groups)
                        .enter().append("path")
                        .style("fill", function(d) { return fill(d.index);}) //from d.index
                        .style("stroke", function(d) { return fill(d.index); })
                        .attr("d", d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
                        .on("mouseover", fade(.1)) //fade out unselected relationships
                        .on("mouseout", fade(1));  //display all relationships when none selected

                    let ticks = svg.append("g").selectAll("g")
                        .data(chord.groups)
                        .enter().append("g").selectAll("g")
                        .data(getCandVoteAngles)
                        .enter().append("g")
                        .attr("transform", function(d) {
                            return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
                            + "translate(" + outerRadius + ",0)";

                    });

                    svg.append("g")
                        .attr("class", "chord")
                        .selectAll("path")
                        .data(chord.chords)
                        .enter().append("path")
                        .attr("d", d3.svg.chord().radius(innerRadius))
                        .style("fill", function(d) { return fill(d.target.index); })
                        .style("opacity", 1);



                // Returns an array of angles and votecount labels, given candidate
                function getCandVoteAngles(d) {
                    var k = (d.endAngle - d.startAngle) / d.value;
                    return d3.range(0, d.value, 1000).map(function(v, i) {
                        return {
                            angle: v * k + d.startAngle,
                            label: i % 5 ? null : v / 1000 + "k"
                        }
                    })
                };

                // Method for fading unselected candidates' data
                function fade(opacity) {
                    return function(g, i) {
                        svg.selectAll(".chord path")
                            .filter(function(d) { return d.source.index != i && d.target.index != i; })
                            .transition()
                            .style("opacity", opacity);
                    }
                };
            })
    }}



