import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { PollData } from './poll';

@Injectable()
export class Polls {


  private BACKEND_BASE_URI = "http://localhost:3000";

  constructor(private http: Http) { }


  public load(id: string): Observable<PollData> {
    let uri = `${this.BACKEND_BASE_URI}/polls/${id}`;
    return Observable.of( DUMMY_DATA )
                     .map( json => <PollData> json );

    /*return this.http.get('assets/data/oakland.json')
        .map(res => res.json())
        .map(json => <PollData> json)*/;

  }


}


//TODO delete this and replace with data retriected from real backend call //public getter ex: getVotes copy json into file JClass:objectmapper; collection votes = objectmapper - file c
const DUMMY_DATA = {
  "votes": [ {
    "choices": [ "id-john-kasich", "id-ted-cruz", "id-marco-rubio", "id-jeb-bush", "id-ben-carson", "id-donald-trump" ]
  }, { "choices": [ "id-ted-cruz", "id-john-kasich", "id-marco-rubio", "id-donald-trump", "id-ben-carson", "id-jeb-bush" ] }, {
    "choices": [ "id-ted-cruz", "id-marco-rubio", "id-donald-trump", "id-ben-carson", "id-john-kasich", "id-jeb-bush" ]
  }, { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-donald-trump", "id-ted-cruz", "id-ben-carson" ] },
             { "choices": [ "id-ben-carson", "id-john-kasich", "id-jeb-bush" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-donald-trump", "id-ted-cruz", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ben-carson" ] }, {
      "choices": [ "id-donald-trump", "id-ted-cruz", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ben-carson" ]
    }, { "choices": [ "id-jeb-bush", "id-marco-rubio", "id-john-kasich", "id-ted-cruz", "id-donald-trump", "id-ben-carson" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-donald-trump", "id-ben-carson", "id-jeb-bush", "id-ted-cruz" ]
    }, { "choices": [ "id-jeb-bush", "id-marco-rubio", "id-john-kasich" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-donald-trump", "id-ted-cruz", "id-ben-carson" ]
    }, { "choices": [ "id-jeb-bush", "id-donald-trump", "id-marco-rubio", "id-john-kasich", "id-ben-carson", "id-ted-cruz" ] }, {
      "choices": [ "id-jeb-bush", "id-john-kasich", "id-marco-rubio", "id-ted-cruz", "id-donald-trump", "id-ben-carson" ]
    }, { "choices": [ "id-jeb-bush", "id-john-kasich", "id-marco-rubio", "id-donald-trump", "id-ben-carson", "id-ted-cruz" ] },
             { "choices": [ "id-donald-trump", "id-ben-carson" ] }, { "choices": [ "id-john-kasich" ] },
             { "choices": [ "id-ted-cruz", "id-marco-rubio", "id-john-kasich" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-donald-trump" ] }, {
      "choices": [ "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-ben-carson", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-donald-trump", "id-ben-carson", "id-marco-rubio", "id-ted-cruz", "id-jeb-bush" ] },
             { "choices": [ "id-john-kasich", "id-donald-trump" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-ben-carson", "id-jeb-bush", "id-ted-cruz", "id-donald-trump", "id-marco-rubio" ] },
             { "choices": [ "id-donald-trump", "id-ben-carson", "id-jeb-bush" ] }, {
      "choices": [ "id-marco-rubio", "id-john-kasich", "id-ted-cruz", "id-jeb-bush", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-donald-trump", "id-ted-cruz", "id-ben-carson" ] }, {
      "choices": [ "id-donald-trump", "id-marco-rubio", "id-jeb-bush", "id-john-kasich", "id-ben-carson", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-donald-trump", "id-ben-carson", "id-ted-cruz" ] }, {
      "choices": [ "id-jeb-bush", "id-donald-trump", "id-marco-rubio", "id-john-kasich", "id-ben-carson", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-ben-carson", "id-marco-rubio", "id-jeb-bush", "id-ted-cruz", "id-donald-trump" ] },
             { "choices": [ "id-john-kasich" ] }, { "choices": [ "id-donald-trump" ] }, {
      "choices": [ "id-donald-trump", "id-john-kasich", "id-ted-cruz", "id-ben-carson", "id-marco-rubio", "id-jeb-bush" ]
    }, { "choices": [ "id-donald-trump", "id-ted-cruz", "id-marco-rubio" ] },
             { "choices": [ "id-donald-trump", "id-marco-rubio", "id-ted-cruz" ] }, { "choices": [ "id-ted-cruz" ] },
             { "choices": [ "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ] }, {
      "choices": [ "id-jeb-bush", "id-marco-rubio", "id-john-kasich", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-jeb-bush", "id-marco-rubio", "id-john-kasich" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio" ] }, {
      "choices": [ "id-jeb-bush", "id-john-kasich", "id-marco-rubio", "id-donald-trump", "id-ben-carson", "id-ted-cruz" ]
    }, { "choices": [ "id-jeb-bush", "id-john-kasich", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-donald-trump" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-donald-trump", "id-ben-carson", "id-ted-cruz" ]
    }, { "choices": [ "id-donald-trump", "id-ted-cruz", "id-ben-carson", "id-john-kasich", "id-marco-rubio", "id-jeb-bush" ] }, {
      "choices": [ "id-donald-trump", "id-ted-cruz", "id-ben-carson", "id-john-kasich", "id-marco-rubio", "id-jeb-bush" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-ted-cruz", "id-ben-carson", "id-marco-rubio", "id-jeb-bush", "id-john-kasich" ] },
             { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ted-cruz" ] },
             { "choices": [ "id-ben-carson" ] }, {
      "choices": [ "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-ted-cruz", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-donald-trump", "id-ben-carson" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-donald-trump", "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-ben-carson", "id-ted-cruz", "id-marco-rubio", "id-donald-trump" ] },
             { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-ben-carson", "id-donald-trump" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-donald-trump", "id-ted-cruz" ]
    }, { "choices": [ "id-jeb-bush", "id-john-kasich", "id-marco-rubio", "id-donald-trump", "id-ted-cruz", "id-ben-carson" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-jeb-bush", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-jeb-bush", "id-donald-trump" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-donald-trump", "id-marco-rubio", "id-ben-carson", "id-ted-cruz" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush" ] }, {
      "choices": [ "id-donald-trump", "id-ben-carson", "id-jeb-bush", "id-marco-rubio", "id-john-kasich", "id-ted-cruz" ]
    }, { "choices": [ "id-ted-cruz", "id-ben-carson", "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-donald-trump" ] },
             { "choices": [ "id-jeb-bush", "id-john-kasich" ] }, { "choices": [ "id-marco-rubio", "id-john-kasich" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-donald-trump", "id-ted-cruz" ]
    }, { "choices": [ "id-ted-cruz", "id-marco-rubio", "id-john-kasich", "id-ben-carson", "id-jeb-bush" ] }, {
      "choices": [ "id-donald-trump", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ben-carson", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-donald-trump", "id-ben-carson", "id-ted-cruz" ] },
             { "choices": [ "id-donald-trump", "id-ben-carson", "id-jeb-bush", "id-marco-rubio" ] },
             { "choices": [ "id-ted-cruz", "id-john-kasich", "id-jeb-bush", "id-donald-trump" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-donald-trump", "id-ben-carson", "id-jeb-bush" ] }, {
      "choices": [ "id-john-kasich", "id-donald-trump", "id-ben-carson", "id-marco-rubio", "id-ted-cruz", "id-jeb-bush" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson" ] }, {
      "choices": [ "id-john-kasich", "id-ben-carson", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-donald-trump", "id-ben-carson" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-ben-carson", "id-ted-cruz", "id-jeb-bush", "id-donald-trump" ]
    }, { "choices": [ "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-ted-cruz" ] }, {
      "choices": [ "id-ben-carson", "id-john-kasich", "id-donald-trump", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-ted-cruz" ] },
             { "choices": [ "id-donald-trump", "id-john-kasich", "id-jeb-bush" ] },
             { "choices": [ "id-ben-carson", "id-john-kasich", "id-marco-rubio" ] }, { "choices": [ "id-john-kasich" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ted-cruz", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-donald-trump", "id-ted-cruz", "id-ben-carson" ]
    }, { "choices": [ "id-john-kasich", "id-marco-rubio", "id-ted-cruz", "id-jeb-bush", "id-ben-carson", "id-donald-trump" ] },
             { "choices": [ "id-john-kasich", "id-donald-trump" ] }, { "choices": [ "id-marco-rubio" ] }, {
      "choices": [ "id-marco-rubio", "id-john-kasich", "id-ben-carson", "id-jeb-bush", "id-donald-trump", "id-ted-cruz" ]
    }, { "choices": [ "id-donald-trump" ] }, { "choices": [ "id-jeb-bush", "id-john-kasich", "id-ted-cruz", "id-donald-trump" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-donald-trump" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush" ] }, {
      "choices": [ "id-john-kasich", "id-ben-carson", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-ben-carson", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ted-cruz", "id-donald-trump" ] }, {
      "choices": [ "id-ted-cruz", "id-ben-carson", "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-marco-rubio", "id-ted-cruz", "id-jeb-bush", "id-donald-trump", "id-ben-carson" ] },
             { "choices": [ "id-john-kasich" ] }, { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush" ] }, {
      "choices": [ "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-donald-trump", "id-ben-carson", "id-marco-rubio", "id-jeb-bush", "id-ted-cruz" ] }, {
      "choices": [ "id-ted-cruz", "id-marco-rubio", "id-ben-carson", "id-donald-trump", "id-jeb-bush", "id-john-kasich" ]
    }, { "choices": [ "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-john-kasich", "id-ted-cruz", "id-donald-trump" ] }, {
      "choices": [ "id-marco-rubio", "id-john-kasich", "id-donald-trump", "id-jeb-bush", "id-ben-carson", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-ben-carson", "id-ted-cruz" ] }, {
      "choices": [ "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-john-kasich", "id-donald-trump", "id-jeb-bush" ]
    }, { "choices": [ "id-john-kasich", "id-ted-cruz", "id-ben-carson", "id-donald-trump", "id-marco-rubio", "id-jeb-bush" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-marco-rubio", "id-jeb-bush", "id-john-kasich", "id-ted-cruz", "id-ben-carson", "id-donald-trump" ] }, {
      "choices": [ "id-ted-cruz", "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-donald-trump", "id-marco-rubio", "id-ben-carson", "id-jeb-bush", "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush" ] }, {
      "choices": [ "id-donald-trump", "id-john-kasich", "id-marco-rubio", "id-ben-carson", "id-jeb-bush", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ted-cruz", "id-donald-trump", "id-ben-carson" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ben-carson" ] }, {
      "choices": [ "id-john-kasich", "id-ben-carson", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-donald-trump", "id-marco-rubio", "id-ted-cruz", "id-ben-carson" ] },
             { "choices": [ "id-john-kasich", "id-marco-rubio" ] }, {
      "choices": [ "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-john-kasich", "id-jeb-bush", "id-donald-trump" ]
    }, { "choices": [ "id-donald-trump", "id-ben-carson", "id-ted-cruz", "id-john-kasich", "id-marco-rubio", "id-jeb-bush" ] }, {
      "choices": [ "id-donald-trump", "id-ben-carson", "id-ted-cruz", "id-john-kasich", "id-marco-rubio" ]
    }, { "choices": [ "id-ted-cruz", "id-donald-trump", "id-john-kasich", "id-ben-carson", "id-marco-rubio", "id-jeb-bush" ] }, {
      "choices": [ "id-ted-cruz", "id-ben-carson", "id-marco-rubio", "id-donald-trump", "id-john-kasich", "id-jeb-bush" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-donald-trump", "id-ted-cruz", "id-ben-carson" ] }, {
      "choices": [ "id-donald-trump", "id-ben-carson", "id-ted-cruz", "id-marco-rubio", "id-john-kasich", "id-jeb-bush" ]
    }, { "choices": [ "id-ted-cruz", "id-jeb-bush", "id-donald-trump", "id-ben-carson", "id-john-kasich", "id-marco-rubio" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ben-carson", "id-donald-trump", "id-ted-cruz" ] }, {
      "choices": [ "id-donald-trump", "id-ted-cruz", "id-marco-rubio", "id-ben-carson", "id-jeb-bush", "id-john-kasich" ]
    }, { "choices": [ "id-ted-cruz", "id-john-kasich", "id-ben-carson", "id-marco-rubio", "id-jeb-bush" ] }, {
      "choices": [ "id-jeb-bush", "id-john-kasich", "id-ted-cruz", "id-marco-rubio", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-marco-rubio", "id-jeb-bush" ] }, { "choices": [ "id-donald-trump" ] }, {
      "choices": [ "id-donald-trump", "id-jeb-bush", "id-john-kasich", "id-ted-cruz", "id-ben-carson", "id-marco-rubio" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-donald-trump", "id-ted-cruz", "id-ben-carson" ] },
             { "choices": [ "id-john-kasich", "id-marco-rubio" ] }, { "choices": [ "id-john-kasich", "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-ted-cruz", "id-ben-carson", "id-marco-rubio", "id-donald-trump" ]
    }, { "choices": [ "id-jeb-bush", "id-john-kasich", "id-ben-carson", "id-marco-rubio", "id-ted-cruz", "id-donald-trump" ] },
             { "choices": [ "id-john-kasich", "id-marco-rubio", "id-ted-cruz", "id-ben-carson" ] },
             { "choices": [ "id-donald-trump", "id-ben-carson", "id-john-kasich" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ted-cruz", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-jeb-bush", "id-marco-rubio", "id-john-kasich", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ] },
             { "choices": [ "id-marco-rubio" ] }, { "choices": [ "id-john-kasich" ] },
             { "choices": [ "id-donald-trump", "id-marco-rubio", "id-john-kasich" ] }, {
      "choices": [ "id-ben-carson", "id-ted-cruz", "id-donald-trump", "id-jeb-bush", "id-marco-rubio", "id-john-kasich" ]
    }, { "choices": [ "id-donald-trump", "id-ted-cruz", "id-jeb-bush", "id-john-kasich", "id-ben-carson", "id-marco-rubio" ] },
             { "choices": [ "id-ted-cruz", "id-john-kasich", "id-ben-carson" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-donald-trump", "id-ted-cruz", "id-ben-carson" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush" ] }, {
      "choices": [ "id-jeb-bush", "id-ben-carson", "id-john-kasich", "id-ted-cruz", "id-marco-rubio", "id-donald-trump" ]
    }, { "choices": [ "id-marco-rubio", "id-ben-carson", "id-john-kasich", "id-jeb-bush", "id-ted-cruz", "id-donald-trump" ] },
             { "choices": [ "id-john-kasich" ] }, { "choices": [ "id-marco-rubio", "id-ted-cruz", "id-jeb-bush" ] },
             { "choices": [ "id-ted-cruz" ] }, {
      "choices": [ "id-ted-cruz", "id-jeb-bush", "id-john-kasich", "id-marco-rubio", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-donald-trump" ] }, {
      "choices": [ "id-marco-rubio", "id-jeb-bush", "id-donald-trump", "id-ted-cruz", "id-ben-carson", "id-john-kasich" ]
    }, { "choices": [ "id-donald-trump", "id-ted-cruz", "id-marco-rubio" ] },
             { "choices": [ "id-marco-rubio", "id-ted-cruz", "id-donald-trump" ] }, { "choices": [ "id-donald-trump" ] }, {
      "choices": [ "id-donald-trump", "id-marco-rubio", "id-jeb-bush", "id-john-kasich", "id-ted-cruz", "id-ben-carson" ]
    }, { "choices": [ "id-marco-rubio", "id-donald-trump", "id-john-kasich", "id-jeb-bush", "id-ted-cruz", "id-ben-carson" ] },
             { "choices": [ "id-ted-cruz", "id-marco-rubio" ] }, { "choices": [ "id-marco-rubio" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-ted-cruz", "id-jeb-bush", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-ted-cruz", "id-donald-trump" ] }, { "choices": [ "id-marco-rubio" ] }, {
      "choices": [ "id-ted-cruz", "id-marco-rubio", "id-jeb-bush", "id-donald-trump", "id-ben-carson", "id-john-kasich" ]
    }, { "choices": [ "id-marco-rubio", "id-ted-cruz" ] }, { "choices": [ "id-ted-cruz", "id-marco-rubio" ] },
             { "choices": [ "id-marco-rubio", "id-ted-cruz" ] },
             { "choices": [ "id-donald-trump", "id-marco-rubio", "id-ted-cruz" ] }, { "choices": [ "id-marco-rubio" ] },
             { "choices": [ "id-marco-rubio", "id-ted-cruz" ] }, { "choices": [ "id-ted-cruz", "id-marco-rubio" ] }, {
      "choices": [ "id-marco-rubio", "id-jeb-bush", "id-ted-cruz", "id-ben-carson", "id-donald-trump", "id-john-kasich" ]
    }, { "choices": [ "id-donald-trump", "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-ben-carson", "id-ted-cruz" ] },
             { "choices": [ "id-donald-trump", "id-ted-cruz", "id-marco-rubio", "id-ben-carson" ] },
             { "choices": [ "id-ted-cruz", "id-marco-rubio", "id-ben-carson" ] }, {
      "choices": [ "id-donald-trump", "id-marco-rubio", "id-ben-carson", "id-jeb-bush", "id-ted-cruz", "id-john-kasich" ]
    }, { "choices": [ "id-marco-rubio", "id-john-kasich", "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-ben-carson", "id-jeb-bush", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-donald-trump", "id-john-kasich", "id-jeb-bush", "id-ben-carson", "id-marco-rubio", "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-ben-carson", "id-marco-rubio", "id-donald-trump", "id-ted-cruz" ]
    }, { "choices": [ "id-marco-rubio", "id-donald-trump", "id-ted-cruz", "id-ben-carson", "id-jeb-bush", "id-john-kasich" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-donald-trump", "id-ben-carson", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich" ] }, { "choices": [ "id-john-kasich" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-ben-carson", "id-jeb-bush", "id-donald-trump", "id-marco-rubio", "id-ted-cruz" ] },
             { "choices": [ "id-donald-trump" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-donald-trump", "id-ben-carson", "id-marco-rubio", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-donald-trump", "id-ben-carson", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz" ] }, {
      "choices": [ "id-jeb-bush", "id-john-kasich", "id-donald-trump", "id-marco-rubio", "id-ben-carson", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-donald-trump", "id-ben-carson", "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-donald-trump", "id-ben-carson" ]
    }, { "choices": [ "id-john-kasich", "id-donald-trump", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-ted-cruz" ] }, {
      "choices": [ "id-donald-trump", "id-jeb-bush", "id-john-kasich", "id-marco-rubio", "id-ben-carson", "id-ted-cruz" ]
    }, { "choices": [ "id-jeb-bush" ] }, { "choices": [ "id-john-kasich", "id-jeb-bush" ] }, {
      "choices": [ "id-donald-trump", "id-jeb-bush", "id-john-kasich", "id-marco-rubio", "id-ted-cruz", "id-ben-carson" ]
    }, { "choices": [ "id-ben-carson", "id-marco-rubio", "id-john-kasich" ] }, {
      "choices": [ "id-marco-rubio", "id-jeb-bush", "id-chris-christie", "id-john-kasich", "id-rand-paul", "id-ted-cruz" ]
    }, {
      "choices": [ "id-john-kasich", "id-chris-christie", "id-rand-paul", "id-jeb-bush", "id-marco-rubio", "id-carly-fiorina",
                   "id-jim-gilmore", "id-rick-santorum", "id-ben-carson", "id-mike-huckabee", "id-donald-trump", "id-ted-cruz" ]
    }, {
      "choices": [ "id-jeb-bush", "id-john-kasich", "id-donald-trump", "id-marco-rubio", "id-carly-fiorina", "id-mike-huckabee",
                   "id-chris-christie", "id-rand-paul", "id-ben-carson", "id-jim-gilmore", "id-ted-cruz", "id-rick-santorum" ]
    }, { "choices": [ "id-marco-rubio", "id-mike-huckabee", "id-rick-santorum", "id-rand-paul", "id-carly-fiorina" ] },
             { "choices": [ "id-rand-paul", "id-john-kasich", "id-mike-huckabee", "id-jeb-bush" ] },
             { "choices": [ "id-ben-carson", "id-rand-paul", "id-jeb-bush" ] },
             { "choices": [ "id-john-kasich", "id-rand-paul", "id-donald-trump" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush" ] }, {
      "choices": [ "id-ben-carson", "id-ted-cruz", "id-marco-rubio", "id-john-kasich", "id-donald-trump", "id-jeb-bush" ]
    }, {
      "choices": [ "id-mike-huckabee", "id-rand-paul", "id-carly-fiorina", "id-ben-carson", "id-ted-cruz", "id-rick-santorum",
                   "id-marco-rubio", "id-john-kasich", "id-chris-christie", "id-jim-gilmore", "id-donald-trump", "id-jeb-bush" ]
    }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-marco-rubio", "id-rand-paul", "id-donald-trump",
                   "id-carly-fiorina", "id-mike-huckabee", "id-jim-gilmore", "id-ted-cruz", "id-rick-santorum", "id-ben-carson" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-jim-gilmore", "id-marco-rubio",
                   "id-donald-trump", "id-mike-huckabee", "id-rick-santorum", "id-ted-cruz", "id-carly-fiorina", "id-ben-carson" ]
    }, { "choices": [ "id-ted-cruz", "id-john-kasich", "id-jeb-bush", "id-marco-rubio" ] },
             { "choices": [ "id-rand-paul", "id-carly-fiorina" ] }, {
      "choices": [ "id-donald-trump", "id-ted-cruz", "id-rand-paul", "id-ben-carson", "id-rick-santorum", "id-mike-huckabee",
                   "id-john-kasich", "id-chris-christie", "id-jim-gilmore", "id-carly-fiorina", "id-jeb-bush", "id-marco-rubio" ]
    }, { "choices": [ "id-donald-trump" ] }, { "choices": [ "id-donald-trump", "id-jeb-bush", "id-john-kasich" ] },
             { "choices": [ "id-john-kasich", "id-rand-paul", "id-chris-christie" ] }, {
      "choices": [ "id-chris-christie", "id-john-kasich", "id-rand-paul", "id-jeb-bush", "id-marco-rubio", "id-carly-fiorina",
                   "id-jim-gilmore", "id-rick-santorum", "id-ben-carson", "id-mike-huckabee", "id-ted-cruz", "id-donald-trump" ]
    }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-rand-paul", "id-chris-christie", "id-marco-rubio", "id-donald-trump",
                   "id-carly-fiorina", "id-rick-santorum", "id-jim-gilmore", "id-mike-huckabee", "id-ted-cruz", "id-ben-carson" ]
    }, {
      "choices": [ "id-ted-cruz", "id-rand-paul", "id-ben-carson", "id-carly-fiorina", "id-marco-rubio", "id-rick-santorum",
                   "id-jeb-bush", "id-john-kasich", "id-jim-gilmore", "id-chris-christie", "id-mike-huckabee", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-ben-carson", "id-carly-fiorina", "id-john-kasich", "id-ted-cruz", "id-marco-rubio",
                   "id-jeb-bush", "id-jim-gilmore", "id-mike-huckabee", "id-rick-santorum", "id-chris-christie",
                   "id-donald-trump" ]
    }, {
      "choices": [ "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-rand-paul", "id-carly-fiorina",
                   "id-ted-cruz", "id-ben-carson", "id-donald-trump", "id-jim-gilmore", "id-rick-santorum", "id-mike-huckabee" ]
    }, { "choices": [ "id-chris-christie", "id-john-kasich", "id-jim-gilmore" ] }, {
      "choices": [ "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-rand-paul", "id-jim-gilmore", "id-chris-christie",
                   "id-donald-trump", "id-ted-cruz", "id-carly-fiorina", "id-ben-carson", "id-mike-huckabee", "id-rick-santorum" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio" ] }, {
      "choices": [ "id-rick-santorum", "id-ted-cruz", "id-carly-fiorina", "id-jim-gilmore", "id-rand-paul", "id-marco-rubio",
                   "id-mike-huckabee", "id-jeb-bush", "id-chris-christie", "id-john-kasich", "id-ben-carson", "id-donald-trump" ]
    }, {
      "choices": [ "id-john-kasich", "id-ben-carson", "id-chris-christie", "id-jeb-bush", "id-donald-trump", "id-marco-rubio",
                   "id-ted-cruz" ]
    }, { "choices": [ "id-chris-christie" ] }, { "choices": [ "id-rand-paul" ] }, {
      "choices": [ "id-ted-cruz", "id-chris-christie", "id-donald-trump", "id-rand-paul", "id-mike-huckabee", "id-ben-carson",
                   "id-rick-santorum", "id-jeb-bush", "id-marco-rubio", "id-john-kasich", "id-jim-gilmore", "id-carly-fiorina" ]
    }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rand-paul", "id-ben-carson", "id-chris-christie",
                   "id-jim-gilmore", "id-carly-fiorina", "id-rick-santorum", "id-mike-huckabee", "id-donald-trump",
                   "id-ted-cruz" ]
    }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-jim-gilmore", "id-rand-paul", "id-marco-rubio",
                   "id-carly-fiorina", "id-ben-carson", "id-mike-huckabee", "id-rick-santorum", "id-ted-cruz", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-carly-fiorina", "id-jim-gilmore", "id-john-kasich", "id-rick-santorum", "id-mike-huckabee",
                   "id-marco-rubio", "id-ben-carson", "id-jeb-bush", "id-chris-christie", "id-donald-trump", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-donald-trump", "id-jeb-bush", "id-marco-rubio", "id-rand-paul", "id-chris-christie" ]
    }, { "choices": [ "id-john-kasich", "id-chris-christie", "id-jeb-bush", "id-rand-paul" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-chris-christie" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-chris-christie" ] },
             { "choices": [ "id-chris-christie", "id-marco-rubio", "id-jeb-bush" ] }, {
      "choices": [ "id-marco-rubio", "id-carly-fiorina", "id-rick-santorum", "id-jeb-bush", "id-chris-christie", "id-ben-carson",
                   "id-rand-paul", "id-ted-cruz", "id-mike-huckabee", "id-john-kasich", "id-jim-gilmore", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-rand-paul", "id-jeb-bush", "id-chris-christie" ] }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-ben-carson",
                   "id-chris-christie", "id-jim-gilmore", "id-mike-huckabee", "id-ted-cruz", "id-carly-fiorina",
                   "id-donald-trump" ]
    }, { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul", "id-john-kasich", "id-jeb-bush", "id-chris-christie" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-carly-fiorina", "id-marco-rubio", "id-ben-carson", "id-rand-paul",
                   "id-ted-cruz", "id-jim-gilmore", "id-chris-christie", "id-rick-santorum", "id-mike-huckabee",
                   "id-donald-trump" ]
    }, {
      "choices": [ "id-donald-trump", "id-rand-paul", "id-ted-cruz", "id-carly-fiorina", "id-mike-huckabee", "id-ben-carson",
                   "id-jim-gilmore", "id-john-kasich", "id-chris-christie", "id-rick-santorum", "id-jeb-bush", "id-marco-rubio" ]
    }, {
      "choices": [ "id-rand-paul", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-jim-gilmore", "id-rick-santorum",
                   "id-carly-fiorina", "id-mike-huckabee", "id-john-kasich", "id-jeb-bush", "id-chris-christie",
                   "id-donald-trump" ]
    }, {
      "choices": [ "id-john-kasich", "id-rand-paul", "id-chris-christie", "id-jeb-bush", "id-jim-gilmore", "id-mike-huckabee",
                   "id-carly-fiorina", "id-ben-carson", "id-rick-santorum", "id-marco-rubio", "id-donald-trump", "id-ted-cruz" ]
    }, { "choices": [ "id-mike-huckabee", "id-marco-rubio" ] }, { "choices": [ "id-rand-paul", "id-john-kasich" ] },
             { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-john-kasich", "id-rand-paul", "id-marco-rubio" ] },
             { "choices": [ "id-chris-christie", "id-john-kasich", "id-rand-paul" ] }, {
      "choices": [ "id-rand-paul", "id-ted-cruz", "id-ben-carson", "id-carly-fiorina", "id-mike-huckabee", "id-jim-gilmore",
                   "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-rick-santorum", "id-chris-christie", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-ben-carson", "id-chris-christie",
                   "id-rick-santorum", "id-mike-huckabee", "id-carly-fiorina", "id-ted-cruz", "id-jim-gilmore",
                   "id-donald-trump" ]
    }, { "choices": [ "id-donald-trump", "id-jeb-bush", "id-chris-christie" ] }, {
      "choices": [ "id-marco-rubio", "id-rand-paul", "id-rick-santorum", "id-jim-gilmore", "id-john-kasich", "id-jeb-bush",
                   "id-carly-fiorina", "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson",
                   "id-donald-trump" ]
    }, { "choices": [ "id-rand-paul", "id-john-kasich", "id-jeb-bush", "id-marco-rubio" ] },
             { "choices": [ "id-marco-rubio", "id-ted-cruz" ] }, { "choices": [ "id-rand-paul" ] },
             { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul" ] }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-donald-trump", "id-jeb-bush", "id-marco-rubio", "id-jim-gilmore",
                   "id-rick-santorum", "id-mike-huckabee", "id-ben-carson", "id-ted-cruz", "id-carly-fiorina",
                   "id-chris-christie" ]
    }, { "choices": [ "id-marco-rubio", "id-chris-christie", "id-ted-cruz" ] },
             { "choices": [ "id-chris-christie", "id-jeb-bush", "id-marco-rubio", "id-carly-fiorina" ] },
             { "choices": [ "id-marco-rubio", "id-ted-cruz", "id-carly-fiorina" ] }, {
      "choices": [ "id-rand-paul", "id-donald-trump", "id-marco-rubio", "id-ted-cruz", "id-chris-christie", "id-ben-carson",
                   "id-john-kasich", "id-jeb-bush", "id-carly-fiorina", "id-rick-santorum", "id-jim-gilmore", "id-mike-huckabee" ]
    }, {
      "choices": [ "id-rand-paul", "id-ted-cruz", "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-jim-gilmore",
                   "id-carly-fiorina", "id-ben-carson", "id-chris-christie", "id-mike-huckabee", "id-donald-trump",
                   "id-rick-santorum" ]
    }, { "choices": [ "id-rand-paul" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-marco-rubio", "id-carly-fiorina", "id-rand-paul",
                   "id-mike-huckabee", "id-ben-carson", "id-ted-cruz", "id-rick-santorum", "id-jim-gilmore", "id-donald-trump" ]
    }, { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-john-kasich", "id-chris-christie" ] }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-jim-gilmore", "id-ted-cruz",
                   "id-marco-rubio", "id-rick-santorum", "id-mike-huckabee", "id-ben-carson", "id-carly-fiorina",
                   "id-donald-trump" ]
    }, { "choices": [ "id-ted-cruz", "id-mike-huckabee", "id-marco-rubio" ] }, { "choices": [ "id-donald-trump" ] },
             { "choices": [ "id-donald-trump" ] }, {
      "choices": [ "id-marco-rubio", "id-rand-paul", "id-chris-christie", "id-john-kasich", "id-jim-gilmore", "id-mike-huckabee",
                   "id-rick-santorum", "id-donald-trump", "id-carly-fiorina", "id-ben-carson", "id-jeb-bush", "id-ted-cruz" ]
    }, { "choices": [ "id-marco-rubio", "id-jeb-bush", "id-rand-paul", "id-john-kasich" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-rand-paul", "id-carly-fiorina", "id-marco-rubio",
                   "id-ted-cruz", "id-rick-santorum", "id-mike-huckabee", "id-jim-gilmore", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-ted-cruz" ] }, { "choices": [ "id-rand-paul" ] }, {
      "choices": [ "id-rand-paul", "id-ted-cruz", "id-carly-fiorina", "id-john-kasich", "id-jeb-bush", "id-marco-rubio" ]
    }, { "choices": [ "id-carly-fiorina" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-rand-paul", "id-jeb-bush", "id-chris-christie", "id-jim-gilmore",
                   "id-carly-fiorina", "id-ben-carson", "id-mike-huckabee", "id-donald-trump", "id-ted-cruz", "id-rick-santorum" ]
    }, { "choices": [ "id-john-kasich", "id-rand-paul", "id-jeb-bush", "id-marco-rubio" ] }, {
      "choices": [ "id-rand-paul", "id-mike-huckabee", "id-ted-cruz", "id-rick-santorum", "id-jim-gilmore", "id-marco-rubio",
                   "id-ben-carson", "id-jeb-bush", "id-john-kasich", "id-chris-christie", "id-carly-fiorina", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-rand-paul" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-chris-christie" ] }, {
      "choices": [ "id-marco-rubio", "id-ted-cruz", "id-john-kasich", "id-ben-carson", "id-carly-fiorina", "id-chris-christie",
                   "id-rand-paul", "id-rick-santorum", "id-mike-huckabee", "id-jim-gilmore", "id-jeb-bush", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ben-carson", "id-mike-huckabee" ]
    }, { "choices": [ "id-donald-trump" ] }, {
      "choices": [ "id-ben-carson", "id-carly-fiorina", "id-jeb-bush", "id-rand-paul", "id-chris-christie" ]
    }, { "choices": [ "id-john-kasich", "id-rand-paul", "id-chris-christie" ] }, {
      "choices": [ "id-ted-cruz", "id-jeb-bush", "id-ben-carson", "id-john-kasich", "id-rand-paul", "id-chris-christie",
                   "id-rick-santorum", "id-carly-fiorina", "id-marco-rubio", "id-mike-huckabee", "id-jim-gilmore",
                   "id-donald-trump" ]
    }, { "choices": [ "id-donald-trump", "id-john-kasich", "id-chris-christie", "id-mike-huckabee", "id-rand-paul" ] },
             { "choices": [ "id-john-kasich", "id-chris-christie", "id-marco-rubio", "id-jeb-bush" ] }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ben-carson", "id-mike-huckabee" ]
    }, {
      "choices": [ "id-rand-paul", "id-chris-christie", "id-john-kasich", "id-jim-gilmore", "id-jeb-bush", "id-ben-carson",
                   "id-carly-fiorina", "id-marco-rubio", "id-donald-trump", "id-mike-huckabee", "id-rick-santorum",
                   "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-chris-christie", "id-jeb-bush" ] }, {
      "choices": [ "id-rand-paul", "id-marco-rubio", "id-jim-gilmore", "id-john-kasich", "id-carly-fiorina", "id-jeb-bush",
                   "id-rick-santorum", "id-ben-carson", "id-mike-huckabee", "id-chris-christie", "id-donald-trump",
                   "id-ted-cruz" ]
    }, {
      "choices": [ "id-john-kasich", "id-rand-paul", "id-jim-gilmore", "id-chris-christie", "id-marco-rubio", "id-jeb-bush",
                   "id-rick-santorum", "id-mike-huckabee", "id-carly-fiorina", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ]
    }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-carly-fiorina", "id-chris-christie", "id-rand-paul",
                   "id-jim-gilmore", "id-mike-huckabee", "id-rick-santorum", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ]
    }, {
      "choices": [ "id-marco-rubio", "id-rand-paul", "id-chris-christie", "id-carly-fiorina", "id-jeb-bush", "id-mike-huckabee",
                   "id-ben-carson", "id-ted-cruz", "id-john-kasich", "id-jim-gilmore", "id-rick-santorum", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-rand-paul" ] }, {
      "choices": [ "id-rand-paul", "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-ted-cruz", "id-donald-trump",
                   "id-rick-santorum", "id-jim-gilmore", "id-chris-christie", "id-carly-fiorina", "id-ben-carson",
                   "id-mike-huckabee" ]
    }, { "choices": [ "id-rand-paul" ] },
             { "choices": [ "id-john-kasich", "id-carly-fiorina", "id-jeb-bush", "id-marco-rubio" ] }, {
      "choices": [ "id-ben-carson", "id-rick-santorum", "id-marco-rubio", "id-carly-fiorina", "id-jeb-bush", "id-jim-gilmore",
                   "id-mike-huckabee", "id-rand-paul", "id-john-kasich", "id-chris-christie", "id-ted-cruz", "id-donald-trump" ]
    }, {
      "choices": [ "id-ted-cruz", "id-marco-rubio", "id-donald-trump", "id-jeb-bush", "id-ben-carson", "id-rick-santorum",
                   "id-rand-paul", "id-carly-fiorina", "id-mike-huckabee", "id-john-kasich", "id-jim-gilmore",
                   "id-chris-christie" ]
    }, { "choices": [ "id-ted-cruz" ] }, { "choices": [ "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-rand-paul", "id-marco-rubio", "id-donald-trump", "id-ben-carson",
                   "id-rick-santorum", "id-ted-cruz", "id-carly-fiorina", "id-jim-gilmore", "id-chris-christie",
                   "id-mike-huckabee" ]
    }, { "choices": [ "id-rand-paul", "id-john-kasich" ] }, {
      "choices": [ "id-john-kasich", "id-carly-fiorina", "id-mike-huckabee", "id-rand-paul", "id-chris-christie",
                   "id-jim-gilmore", "id-rick-santorum", "id-jeb-bush", "id-marco-rubio", "id-ted-cruz", "id-ben-carson",
                   "id-donald-trump" ]
    }, {
      "choices": [ "id-john-kasich", "id-mike-huckabee", "id-chris-christie", "id-marco-rubio", "id-rick-santorum", "id-jeb-bush",
                   "id-jim-gilmore", "id-ben-carson", "id-carly-fiorina", "id-rand-paul", "id-ted-cruz", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-donald-trump", "id-jim-gilmore", "id-jeb-bush", "id-chris-christie",
                   "id-ben-carson", "id-marco-rubio", "id-ted-cruz", "id-mike-huckabee", "id-carly-fiorina", "id-rick-santorum" ]
    }, { "choices": [ "id-john-kasich", "id-rand-paul", "id-jeb-bush" ] }, {
      "choices": [ "id-donald-trump", "id-john-kasich", "id-rand-paul", "id-chris-christie", "id-marco-rubio" ]
    }, { "choices": [ "id-donald-trump" ] }, { "choices": [ "id-rand-paul", "id-john-kasich" ] },
             { "choices": [ "id-donald-trump", "id-ted-cruz", "id-rand-paul" ] },
             { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush" ] },
             { "choices": [ "id-ted-cruz", "id-marco-rubio" ] }, { "choices": [ "id-rand-paul" ] },
             { "choices": [ "id-john-kasich", "id-chris-christie", "id-jeb-bush" ] },
             { "choices": [ "id-jeb-bush", "id-chris-christie", "id-john-kasich", "id-marco-rubio" ] }, {
      "choices": [ "id-rand-paul", "id-ted-cruz", "id-marco-rubio", "id-john-kasich", "id-carly-fiorina", "id-jim-gilmore",
                   "id-ben-carson", "id-donald-trump", "id-mike-huckabee", "id-chris-christie", "id-jeb-bush",
                   "id-rick-santorum" ]
    }, { "choices": [ "id-rand-paul" ] }, {
      "choices": [ "id-john-kasich", "id-rand-paul", "id-marco-rubio", "id-jeb-bush", "id-donald-trump", "id-chris-christie",
                   "id-jim-gilmore", "id-carly-fiorina", "id-mike-huckabee", "id-ben-carson", "id-ted-cruz", "id-rick-santorum" ]
    }, {
      "choices": [ "id-rand-paul", "id-jeb-bush", "id-marco-rubio", "id-ben-carson", "id-chris-christie", "id-john-kasich",
                   "id-ted-cruz", "id-donald-trump", "id-carly-fiorina", "id-jim-gilmore", "id-rick-santorum",
                   "id-mike-huckabee" ]
    }, { "choices": [ "id-ben-carson" ] }, { "choices": [ "id-chris-christie", "id-john-kasich" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-rand-paul", "id-chris-christie" ] }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-ben-carson", "id-jim-gilmore", "id-ted-cruz", "id-jeb-bush",
                   "id-carly-fiorina", "id-mike-huckabee", "id-rick-santorum", "id-chris-christie", "id-donald-trump",
                   "id-marco-rubio" ]
    }, { "choices": [ "id-john-kasich", "id-jim-gilmore", "id-rand-paul", "id-jeb-bush" ] }, {
      "choices": [ "id-rand-paul", "id-ted-cruz", "id-marco-rubio", "id-jim-gilmore", "id-jeb-bush", "id-chris-christie",
                   "id-john-kasich" ]
    }, { "choices": [ "id-rand-paul" ] }, {
      "choices": [ "id-rand-paul", "id-jim-gilmore", "id-chris-christie", "id-jeb-bush", "id-john-kasich", "id-marco-rubio",
                   "id-carly-fiorina", "id-rick-santorum", "id-mike-huckabee", "id-ben-carson", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-rand-paul", "id-marco-rubio", "id-jeb-bush", "id-carly-fiorina", "id-ted-cruz", "id-ben-carson" ] },
             { "choices": [ "id-rand-paul", "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-rand-paul", "id-jim-gilmore", "id-jeb-bush", "id-marco-rubio", "id-carly-fiorina",
                   "id-chris-christie", "id-mike-huckabee", "id-ben-carson", "id-ted-cruz", "id-donald-trump",
                   "id-rick-santorum" ]
    }, {
      "choices": [ "id-john-kasich", "id-rand-paul", "id-marco-rubio", "id-jeb-bush", "id-jim-gilmore", "id-chris-christie" ]
    }, {
      "choices": [ "id-john-kasich", "id-rand-paul", "id-jeb-bush", "id-marco-rubio", "id-chris-christie", "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-chris-christie", "id-marco-rubio" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-rand-paul", "id-chris-christie", "id-carly-fiorina", "id-marco-rubio",
                   "id-jim-gilmore", "id-ben-carson", "id-rick-santorum", "id-mike-huckabee", "id-ted-cruz", "id-donald-trump" ]
    }, {
      "choices": [ "id-chris-christie", "id-jim-gilmore", "id-rand-paul", "id-jeb-bush", "id-john-kasich", "id-marco-rubio",
                   "id-donald-trump", "id-carly-fiorina", "id-ted-cruz", "id-rick-santorum", "id-mike-huckabee", "id-ben-carson" ]
    }, { "choices": [ "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-marco-rubio" ] },
             { "choices": [ "id-rand-paul", "id-marco-rubio", "id-jim-gilmore", "id-carly-fiorina" ] },
             { "choices": [ "id-rand-paul", "id-ted-cruz" ] }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-chris-christie", "id-carly-fiorina", "id-jim-gilmore",
                   "id-jeb-bush", "id-ted-cruz", "id-ben-carson", "id-rick-santorum", "id-mike-huckabee", "id-donald-trump" ]
    }, { "choices": [ "id-ben-carson" ] }, { "choices": [ "id-jeb-bush", "id-chris-christie", "id-john-kasich" ] }, {
      "choices": [ "id-jeb-bush", "id-john-kasich", "id-chris-christie", "id-marco-rubio", "id-jim-gilmore", "id-rand-paul" ]
    }, { "choices": [ "id-ted-cruz", "id-jeb-bush" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-rand-paul", "id-marco-rubio", "id-jim-gilmore",
                   "id-donald-trump", "id-carly-fiorina", "id-ben-carson", "id-ted-cruz", "id-rick-santorum", "id-mike-huckabee" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-jim-gilmore", "id-jeb-bush", "id-mike-huckabee", "id-rick-santorum",
                   "id-marco-rubio", "id-chris-christie", "id-ted-cruz", "id-ben-carson", "id-carly-fiorina", "id-donald-trump" ]
    }, {
      "choices": [ "id-john-kasich", "id-rand-paul", "id-carly-fiorina", "id-jeb-bush", "id-chris-christie", "id-jim-gilmore",
                   "id-donald-trump", "id-marco-rubio", "id-rick-santorum", "id-ben-carson", "id-mike-huckabee", "id-ted-cruz" ]
    }, {
      "choices": [ "id-donald-trump", "id-rand-paul", "id-john-kasich", "id-ben-carson", "id-jim-gilmore", "id-rick-santorum",
                   "id-marco-rubio", "id-mike-huckabee", "id-jeb-bush", "id-ted-cruz", "id-carly-fiorina", "id-chris-christie" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-jim-gilmore", "id-donald-trump", "id-rick-santorum", "id-chris-christie",
                   "id-jeb-bush", "id-mike-huckabee", "id-ted-cruz", "id-marco-rubio", "id-ben-carson", "id-carly-fiorina" ]
    }, { "choices": [ "id-donald-trump", "id-rand-paul", "id-john-kasich" ] }, {
      "choices": [ "id-rand-paul", "id-ben-carson", "id-john-kasich", "id-rick-santorum", "id-jeb-bush", "id-mike-huckabee",
                   "id-jim-gilmore", "id-carly-fiorina", "id-chris-christie", "id-marco-rubio", "id-ted-cruz", "id-donald-trump" ]
    }, {
      "choices": [ "id-donald-trump", "id-rick-santorum", "id-mike-huckabee", "id-ted-cruz", "id-rand-paul", "id-chris-christie",
                   "id-ben-carson", "id-john-kasich", "id-carly-fiorina", "id-jim-gilmore", "id-marco-rubio", "id-jeb-bush" ]
    }, {
      "choices": [ "id-donald-trump", "id-chris-christie", "id-rand-paul", "id-marco-rubio", "id-mike-huckabee", "id-ben-carson",
                   "id-john-kasich", "id-rick-santorum", "id-carly-fiorina", "id-jim-gilmore", "id-ted-cruz", "id-jeb-bush" ]
    }, { "choices": [ "id-rand-paul" ] }, {
      "choices": [ "id-donald-trump", "id-rand-paul", "id-chris-christie", "id-mike-huckabee", "id-rick-santorum",
                   "id-marco-rubio", "id-jim-gilmore", "id-jeb-bush", "id-john-kasich", "id-ben-carson", "id-ted-cruz",
                   "id-carly-fiorina" ]
    }, {
      "choices": [ "id-john-kasich", "id-jim-gilmore", "id-carly-fiorina", "id-rand-paul", "id-chris-christie", "id-ben-carson",
                   "id-rick-santorum", "id-mike-huckabee", "id-marco-rubio", "id-jeb-bush", "id-ted-cruz", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-jim-gilmore", "id-john-kasich", "id-carly-fiorina", "id-jeb-bush", "id-chris-christie",
                   "id-marco-rubio" ]
    }, { "choices": [ "id-carly-fiorina", "id-ted-cruz", "id-marco-rubio" ] },
             { "choices": [ "id-rand-paul", "id-john-kasich", "id-ben-carson" ] }, { "choices": [ "id-rand-paul" ] },
             { "choices": [ "id-jeb-bush", "id-marco-rubio", "id-john-kasich" ] }, {
      "choices": [ "id-rand-paul", "id-carly-fiorina", "id-marco-rubio", "id-rick-santorum", "id-ted-cruz", "id-ben-carson",
                   "id-john-kasich", "id-jim-gilmore", "id-donald-trump", "id-chris-christie", "id-jeb-bush", "id-mike-huckabee" ]
    }, {
      "choices": [ "id-rand-paul", "id-marco-rubio", "id-jeb-bush", "id-chris-christie", "id-rick-santorum", "id-john-kasich",
                   "id-carly-fiorina", "id-jim-gilmore", "id-ben-carson", "id-ted-cruz", "id-mike-huckabee", "id-donald-trump" ]
    }, { "choices": [ "id-marco-rubio", "id-rick-santorum", "id-rand-paul", "id-mike-huckabee" ] }, {
      "choices": [ "id-donald-trump", "id-marco-rubio", "id-ted-cruz", "id-jeb-bush", "id-rand-paul", "id-chris-christie",
                   "id-rick-santorum", "id-mike-huckabee", "id-john-kasich", "id-jim-gilmore", "id-ben-carson",
                   "id-carly-fiorina" ]
    }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-carly-fiorina", "id-marco-rubio", "id-rand-paul", "id-ben-carson",
                   "id-jim-gilmore", "id-chris-christie", "id-mike-huckabee", "id-ted-cruz", "id-donald-trump",
                   "id-rick-santorum" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-jeb-bush", "id-jim-gilmore", "id-marco-rubio", "id-chris-christie" ]
    }, { "choices": [ "id-john-kasich", "id-rand-paul" ] }, {
      "choices": [ "id-john-kasich", "id-chris-christie", "id-marco-rubio", "id-jeb-bush", "id-rand-paul" ]
    }, {
      "choices": [ "id-marco-rubio", "id-john-kasich", "id-donald-trump", "id-jeb-bush", "id-chris-christie", "id-jim-gilmore",
                   "id-rand-paul", "id-carly-fiorina", "id-ben-carson", "id-mike-huckabee", "id-ted-cruz", "id-rick-santorum" ]
    }, { "choices": [ "id-rand-paul", "id-donald-trump", "id-ben-carson" ] }, { "choices": [ "id-carly-fiorina" ] }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-ted-cruz", "id-jeb-bush", "id-marco-rubio", "id-donald-trump" ]
    }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-rand-paul", "id-marco-rubio", "id-chris-christie", "id-carly-fiorina",
                   "id-jim-gilmore", "id-donald-trump", "id-ted-cruz", "id-ben-carson", "id-mike-huckabee", "id-rick-santorum" ]
    }, {
      "choices": [ "id-ted-cruz", "id-marco-rubio", "id-rand-paul", "id-mike-huckabee", "id-rick-santorum", "id-carly-fiorina",
                   "id-ben-carson", "id-jeb-bush", "id-john-kasich", "id-chris-christie", "id-jim-gilmore", "id-donald-trump" ]
    }, {
      "choices": [ "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-rand-paul", "id-mike-huckabee", "id-carly-fiorina",
                   "id-jeb-bush", "id-jim-gilmore", "id-john-kasich", "id-rick-santorum", "id-donald-trump", "id-chris-christie" ]
    }, {
      "choices": [ "id-marco-rubio", "id-jeb-bush", "id-ted-cruz", "id-rand-paul", "id-mike-huckabee", "id-ben-carson",
                   "id-carly-fiorina", "id-rick-santorum", "id-john-kasich", "id-chris-christie", "id-jim-gilmore",
                   "id-donald-trump" ]
    }, { "choices": [ "id-rand-paul" ] }, {
      "choices": [ "id-rand-paul", "id-ted-cruz", "id-marco-rubio", "id-chris-christie", "id-carly-fiorina" ]
    }, {
      "choices": [ "id-ted-cruz", "id-rand-paul", "id-ben-carson", "id-rick-santorum", "id-marco-rubio", "id-john-kasich",
                   "id-mike-huckabee", "id-carly-fiorina", "id-chris-christie", "id-jim-gilmore", "id-jeb-bush",
                   "id-donald-trump" ]
    }, {
      "choices": [ "id-john-kasich", "id-rand-paul", "id-ben-carson", "id-mike-huckabee", "id-ted-cruz", "id-marco-rubio",
                   "id-jeb-bush", "id-jim-gilmore", "id-chris-christie", "id-carly-fiorina", "id-rick-santorum",
                   "id-donald-trump" ]
    }, { "choices": [ "id-marco-rubio" ] }, { "choices": [ "id-donald-trump", "id-rand-paul", "id-john-kasich", "id-ted-cruz" ] },
             {
               "choices": [ "id-rand-paul", "id-ted-cruz", "id-ben-carson", "id-marco-rubio", "id-donald-trump",
                            "id-carly-fiorina", "id-mike-huckabee", "id-rick-santorum", "id-jeb-bush", "id-john-kasich",
                            "id-jim-gilmore", "id-chris-christie" ]
             }, {
      "choices": [ "id-rand-paul", "id-ted-cruz", "id-ben-carson", "id-marco-rubio", "id-carly-fiorina", "id-donald-trump",
                   "id-rick-santorum", "id-mike-huckabee", "id-john-kasich", "id-jeb-bush", "id-chris-christie",
                   "id-jim-gilmore" ]
    }, {
      "choices": [ "id-marco-rubio", "id-carly-fiorina", "id-ted-cruz", "id-rand-paul", "id-ben-carson", "id-chris-christie",
                   "id-donald-trump", "id-john-kasich", "id-jeb-bush", "id-mike-huckabee", "id-rick-santorum", "id-jim-gilmore" ]
    }, { "choices": [ "id-john-kasich", "id-chris-christie" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-chris-christie", "id-jeb-bush", "id-carly-fiorina", "id-rand-paul",
                   "id-mike-huckabee", "id-ted-cruz", "id-donald-trump", "id-ben-carson", "id-rick-santorum" ]
    }, {
      "choices": [ "id-jeb-bush", "id-marco-rubio", "id-rand-paul", "id-ben-carson", "id-carly-fiorina", "id-ted-cruz",
                   "id-donald-trump", "id-mike-huckabee", "id-chris-christie", "id-john-kasich", "id-jim-gilmore",
                   "id-rick-santorum" ]
    }, {
      "choices": [ "id-donald-trump", "id-carly-fiorina", "id-marco-rubio", "id-john-kasich", "id-ben-carson",
                   "id-chris-christie", "id-rand-paul", "id-jeb-bush", "id-mike-huckabee", "id-rick-santorum", "id-jim-gilmore",
                   "id-ted-cruz" ]
    }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio", "id-chris-christie", "id-rand-paul", "id-jim-gilmore",
                   "id-carly-fiorina", "id-mike-huckabee", "id-rick-santorum", "id-ben-carson", "id-donald-trump", "id-ted-cruz" ]
    }, {
      "choices": [ "id-chris-christie", "id-jim-gilmore", "id-john-kasich", "id-jeb-bush", "id-mike-huckabee", "id-ted-cruz" ]
    }, { "choices": [ "id-rand-paul", "id-john-kasich" ] }, { "choices": [ "id-donald-trump" ] }, {
      "choices": [ "id-chris-christie", "id-jeb-bush", "id-ben-carson", "id-rand-paul", "id-rick-santorum", "id-marco-rubio" ]
    }, { "choices": [ "id-marco-rubio", "id-jeb-bush" ] }, { "choices": [ "id-ted-cruz", "id-rand-paul" ] }, {
      "choices": [ "id-donald-trump", "id-carly-fiorina", "id-ben-carson", "id-jim-gilmore", "id-jeb-bush", "id-rick-santorum",
                   "id-mike-huckabee", "id-chris-christie", "id-ted-cruz", "id-john-kasich", "id-marco-rubio", "id-rand-paul" ]
    }, {
      "choices": [ "id-rand-paul", "id-marco-rubio", "id-john-kasich", "id-chris-christie", "id-jim-gilmore", "id-carly-fiorina",
                   "id-jeb-bush", "id-rick-santorum", "id-ben-carson", "id-donald-trump", "id-mike-huckabee", "id-ted-cruz" ]
    }, {
      "choices": [ "id-chris-christie", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-ted-cruz", "id-carly-fiorina",
                   "id-rand-paul", "id-rick-santorum", "id-mike-huckabee", "id-jim-gilmore", "id-ben-carson", "id-donald-trump" ]
    }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-chris-christie", "id-jeb-bush", "id-rand-paul", "id-jim-gilmore",
                   "id-donald-trump", "id-ben-carson", "id-carly-fiorina", "id-rick-santorum", "id-mike-huckabee", "id-ted-cruz" ]
    }, { "choices": [ "id-marco-rubio", "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-chris-christie", "id-marco-rubio", "id-ted-cruz", "id-carly-fiorina", "id-jeb-bush",
                   "id-donald-trump" ]
    }, {
      "choices": [ "id-john-kasich", "id-rand-paul", "id-marco-rubio", "id-jim-gilmore", "id-jeb-bush", "id-carly-fiorina",
                   "id-chris-christie", "id-mike-huckabee", "id-rick-santorum", "id-ben-carson", "id-donald-trump",
                   "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-rand-paul", "id-jeb-bush" ] }, {
      "choices": [ "id-ben-carson", "id-donald-trump", "id-ted-cruz", "id-mike-huckabee", "id-marco-rubio", "id-rand-paul",
                   "id-jeb-bush", "id-chris-christie", "id-carly-fiorina", "id-john-kasich", "id-rick-santorum",
                   "id-jim-gilmore" ]
    }, { "choices": [ "id-donald-trump", "id-rand-paul" ] }, {
      "choices": [ "id-jeb-bush", "id-john-kasich", "id-carly-fiorina", "id-jim-gilmore", "id-chris-christie" ]
    }, { "choices": [ "id-ted-cruz", "id-rick-santorum", "id-jim-gilmore" ] }, { "choices": [ "id-rand-paul" ] },
             { "choices": [ "id-rand-paul" ] }, {
      "choices": [ "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-ted-cruz", "id-mike-huckabee",
                   "id-rick-santorum", "id-ben-carson", "id-rand-paul", "id-carly-fiorina", "id-donald-trump", "id-jim-gilmore" ]
    }, { "choices": [ "id-marco-rubio", "id-ted-cruz", "id-jeb-bush", "id-donald-trump", "id-ben-carson" ] },
             { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-john-kasich" ] }, {
      "choices": [ "id-john-kasich", "id-jim-gilmore", "id-rand-paul", "id-jeb-bush", "id-carly-fiorina", "id-marco-rubio",
                   "id-mike-huckabee", "id-rick-santorum", "id-ted-cruz", "id-chris-christie", "id-donald-trump",
                   "id-ben-carson" ]
    }, { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-chris-christie" ] },
             { "choices": [ "id-john-kasich", "id-rand-paul" ] }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson", "id-carly-fiorina",
                   "id-george-pataki", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson", "id-carly-fiorina",
                   "id-george-pataki", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson", "id-carly-fiorina",
                   "id-george-pataki", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson", "id-carly-fiorina",
                   "id-george-pataki", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson", "id-carly-fiorina",
                   "id-george-pataki", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson", "id-carly-fiorina",
                   "id-george-pataki", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson", "id-carly-fiorina",
                   "id-george-pataki", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson", "id-carly-fiorina",
                   "id-george-pataki", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson", "id-carly-fiorina",
                   "id-george-pataki", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson", "id-carly-fiorina",
                   "id-george-pataki", "id-donald-trump" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson" ]
    }, {
      "choices": [ "id-rand-paul", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-rick-santorum", "id-jim-gilmore",
                   "id-chris-christie", "id-ted-cruz", "id-mike-huckabee", "id-ben-carson" ]
    }, {
      "choices": [ "id-chris-christie", "id-john-kasich", "id-jeb-bush", "id-rand-paul", "id-marco-rubio", "id-donald-trump",
                   "id-ted-cruz" ]
    }, { "choices": [ "id-john-kasich", "id-rand-paul", "id-chris-christie", "id-jeb-bush" ] }, {
      "choices": [ "id-rand-paul", "id-ted-cruz", "id-ben-carson", "id-jim-gilmore", "id-carly-fiorina", "id-john-kasich",
                   "id-jeb-bush", "id-marco-rubio", "id-rick-santorum", "id-mike-huckabee", "id-donald-trump",
                   "id-chris-christie" ]
    }, {
      "choices": [ "id-rand-paul", "id-carly-fiorina", "id-ted-cruz", "id-john-kasich", "id-ben-carson", "id-jim-gilmore",
                   "id-jeb-bush", "id-marco-rubio", "id-rick-santorum", "id-mike-huckabee", "id-donald-trump",
                   "id-chris-christie" ]
    }, { "choices": [ "id-ted-cruz" ] }, {
      "choices": [ "id-donald-trump", "id-ben-carson", "id-carly-fiorina", "id-ted-cruz", "id-mike-huckabee", "id-marco-rubio",
                   "id-john-kasich", "id-chris-christie", "id-rand-paul", "id-jim-gilmore", "id-rick-santorum", "id-jeb-bush" ]
    }, {
      "choices": [ "id-marco-rubio", "id-rand-paul", "id-chris-christie", "id-carly-fiorina", "id-jeb-bush", "id-mike-huckabee",
                   "id-rick-santorum", "id-ted-cruz", "id-jim-gilmore", "id-john-kasich", "id-ben-carson", "id-donald-trump" ]
    }, { "choices": [ "id-marco-rubio", "id-ted-cruz" ] }, {
      "choices": [ "id-john-kasich", "id-carly-fiorina", "id-mike-huckabee", "id-chris-christie", "id-marco-rubio" ]
    }, { "choices": [ "id-john-kasich", "id-carly-fiorina", "id-chris-christie", "id-marco-rubio" ] }, {
      "choices": [ "id-john-kasich", "id-rand-paul", "id-marco-rubio", "id-ted-cruz", "id-mike-huckabee", "id-jim-gilmore",
                   "id-jeb-bush", "id-chris-christie", "id-rick-santorum", "id-carly-fiorina", "id-ben-carson",
                   "id-donald-trump" ]
    }, { "choices": [ "id-jeb-bush" ] }, {
      "choices": [ "id-john-kasich", "id-chris-christie", "id-rand-paul", "id-jeb-bush", "id-carly-fiorina", "id-jim-gilmore",
                   "id-marco-rubio", "id-ted-cruz", "id-donald-trump", "id-rick-santorum", "id-mike-huckabee", "id-ben-carson" ]
    }, { "choices": [ "id-rand-paul" ] }, {
      "choices": [ "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-chris-christie", "id-carly-fiorina", "id-rick-santorum",
                   "id-donald-trump", "id-ben-carson", "id-mike-huckabee", "id-ted-cruz", "id-rand-paul", "id-jim-gilmore" ]
    }, {
      "choices": [ "id-rand-paul", "id-donald-trump", "id-jeb-bush", "id-chris-christie", "id-john-kasich", "id-carly-fiorina",
                   "id-jim-gilmore", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-rick-santorum", "id-mike-huckabee" ]
    }, { "choices": [ "id-ted-cruz" ] }, { "choices": [ "id-rand-paul" ] }, {
      "choices": [ "id-carly-fiorina", "id-ted-cruz", "id-ben-carson", "id-marco-rubio", "id-rick-santorum" ]
    }, { "choices": [ "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-ted-cruz" ] },
             { "choices": [ "id-marco-rubio", "id-john-kasich", "id-jeb-bush", "id-ted-cruz" ] }, {
      "choices": [ "id-marco-rubio", "id-ben-carson", "id-ted-cruz", "id-donald-trump", "id-carly-fiorina", "id-jeb-bush",
                   "id-john-kasich", "id-rand-paul", "id-mike-huckabee", "id-jim-gilmore", "id-rick-santorum",
                   "id-chris-christie" ]
    }, {
      "choices": [ "id-donald-trump", "id-ted-cruz", "id-rand-paul", "id-carly-fiorina", "id-mike-huckabee", "id-rick-santorum",
                   "id-ben-carson", "id-chris-christie", "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-jim-gilmore" ]
    }, { "choices": [ "id-donald-trump", "id-ted-cruz", "id-rand-paul", "id-carly-fiorina", "id-mike-huckabee" ] },
             { "choices": [ "id-jeb-bush", "id-john-kasich", "id-marco-rubio" ] }, {
      "choices": [ "id-marco-rubio", "id-chris-christie", "id-carly-fiorina", "id-ted-cruz", "id-rick-santorum",
                   "id-mike-huckabee", "id-donald-trump", "id-jim-gilmore", "id-ben-carson", "id-john-kasich", "id-rand-paul",
                   "id-jeb-bush" ]
    }, {
      "choices": [ "id-marco-rubio", "id-chris-christie", "id-carly-fiorina", "id-ted-cruz", "id-rick-santorum",
                   "id-mike-huckabee", "id-donald-trump", "id-jim-gilmore", "id-ben-carson", "id-john-kasich", "id-rand-paul",
                   "id-jeb-bush" ]
    }, {
      "choices": [ "id-marco-rubio", "id-chris-christie", "id-carly-fiorina", "id-ted-cruz", "id-rick-santorum",
                   "id-mike-huckabee", "id-donald-trump", "id-jim-gilmore", "id-ben-carson", "id-john-kasich", "id-rand-paul",
                   "id-jeb-bush" ]
    }, {
      "choices": [ "id-marco-rubio", "id-chris-christie", "id-carly-fiorina", "id-ted-cruz", "id-rick-santorum",
                   "id-mike-huckabee", "id-donald-trump", "id-jim-gilmore", "id-ben-carson", "id-john-kasich", "id-rand-paul",
                   "id-jeb-bush" ]
    }, {
      "choices": [ "id-marco-rubio", "id-chris-christie", "id-carly-fiorina", "id-ted-cruz", "id-rick-santorum",
                   "id-mike-huckabee", "id-donald-trump", "id-jim-gilmore", "id-ben-carson", "id-john-kasich", "id-rand-paul",
                   "id-jeb-bush" ]
    }, {
      "choices": [ "id-marco-rubio", "id-chris-christie", "id-carly-fiorina", "id-ted-cruz", "id-rick-santorum",
                   "id-mike-huckabee", "id-donald-trump", "id-jim-gilmore", "id-ben-carson", "id-john-kasich", "id-rand-paul",
                   "id-jeb-bush" ]
    }, { "choices": [ "id-jeb-bush" ] }, {
      "choices": [ "id-donald-trump", "id-rand-paul", "id-jeb-bush", "id-jim-gilmore", "id-rick-santorum", "id-marco-rubio",
                   "id-john-kasich", "id-mike-huckabee", "id-chris-christie", "id-carly-fiorina", "id-ted-cruz", "id-ben-carson" ]
    }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush", "id-chris-christie", "id-ted-cruz", "id-rand-paul",
                   "id-carly-fiorina", "id-ben-carson", "id-rick-santorum", "id-mike-huckabee", "id-jim-gilmore",
                   "id-donald-trump" ]
    }, {
      "choices": [ "id-john-kasich", "id-rand-paul", "id-marco-rubio", "id-chris-christie", "id-carly-fiorina",
                   "id-mike-huckabee", "id-ted-cruz", "id-jim-gilmore", "id-jeb-bush", "id-rick-santorum", "id-ben-carson",
                   "id-donald-trump" ]
    }, { "choices": [ "id-jeb-bush", "id-john-kasich", "id-chris-christie", "id-marco-rubio" ] },
             { "choices": [ "id-rand-paul", "id-john-kasich", "id-donald-trump" ] },
             { "choices": [ "id-rand-paul", "id-john-kasich", "id-donald-trump" ] }, {
      "choices": [ "id-jeb-bush", "id-ted-cruz", "id-ben-carson", "id-marco-rubio", "id-john-kasich", "id-chris-christie",
                   "id-rick-santorum", "id-jim-gilmore", "id-mike-huckabee", "id-rand-paul", "id-carly-fiorina",
                   "id-donald-trump" ]
    }, { "choices": [ "id-rand-paul", "id-john-kasich", "id-carly-fiorina", "id-jim-gilmore", "id-marco-rubio" ] }, {
      "choices": [ "id-jeb-bush", "id-marco-rubio", "id-mike-huckabee", "id-john-kasich", "id-chris-christie", "id-carly-fiorina",
                   "id-rand-paul", "id-ted-cruz", "id-ben-carson", "id-donald-trump", "id-rick-santorum", "id-jim-gilmore" ]
    }, { "choices": [ "id-chris-christie" ] }, {
      "choices": [ "id-rand-paul", "id-carly-fiorina", "id-ben-carson", "id-ted-cruz", "id-marco-rubio" ]
    }, {
      "choices": [ "id-rand-paul", "id-rick-santorum", "id-chris-christie", "id-carly-fiorina", "id-donald-trump", "id-jeb-bush",
                   "id-john-kasich", "id-mike-huckabee", "id-marco-rubio", "id-ted-cruz", "id-ben-carson", "id-jim-gilmore" ]
    }, { "choices": [ "id-john-kasich", "id-rand-paul", "id-jim-gilmore" ] }, {
      "choices": [ "id-rand-paul", "id-ted-cruz", "id-carly-fiorina", "id-john-kasich", "id-marco-rubio", "id-ben-carson",
                   "id-jeb-bush", "id-mike-huckabee", "id-jim-gilmore", "id-chris-christie", "id-donald-trump",
                   "id-rick-santorum" ]
    }, { "choices": [ "id-marco-rubio", "id-jeb-bush", "id-rand-paul" ] }, {
      "choices": [ "id-ben-carson", "id-marco-rubio", "id-donald-trump", "id-chris-christie", "id-john-kasich",
                   "id-carly-fiorina", "id-jim-gilmore", "id-rick-santorum", "id-ted-cruz", "id-george-pataki", "id-rand-paul",
                   "id-jeb-bush" ]
    }, {
      "choices": [ "id-ben-carson", "id-rand-paul", "id-carly-fiorina", "id-john-kasich", "id-ted-cruz", "id-rick-santorum",
                   "id-marco-rubio", "id-jim-gilmore", "id-chris-christie", "id-donald-trump", "id-jeb-bush", "id-george-pataki" ]
    }, { "choices": [ "id-carly-fiorina", "id-rand-paul", "id-marco-rubio" ] },
             { "choices": [ "id-rand-paul", "id-donald-trump", "id-john-kasich" ] }, {
      "choices": [ "id-john-kasich", "id-george-pataki", "id-jeb-bush", "id-marco-rubio", "id-chris-christie", "id-rand-paul",
                   "id-jim-gilmore", "id-carly-fiorina", "id-rick-santorum", "id-donald-trump", "id-ted-cruz" ]
    }, { "choices": [ "id-jeb-bush", "id-marco-rubio", "id-george-pataki" ] },
             { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush" ] },
             { "choices": [ "id-john-kasich", "id-marco-rubio", "id-jeb-bush" ] }, { "choices": [ "id-rand-paul" ] },
             { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul" ] },
             { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul" ] },
             { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul" ] },
             { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul" ] },
             { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-donald-trump", "id-ted-cruz", "id-carly-fiorina" ] }, {
      "choices": [ "id-john-kasich", "id-jeb-bush", "id-rand-paul", "id-chris-christie", "id-marco-rubio" ]
    }, {
      "choices": [ "id-chris-christie", "id-george-pataki", "id-john-kasich", "id-jim-gilmore", "id-carly-fiorina",
                   "id-marco-rubio", "id-rand-paul", "id-jeb-bush", "id-rick-santorum", "id-ted-cruz", "id-donald-trump" ]
    }, { "choices": [ "id-john-kasich", "id-rand-paul", "id-donald-trump", "id-marco-rubio", "id-rick-santorum" ] }, {
      "choices": [ "id-john-kasich", "id-jim-gilmore", "id-jeb-bush", "id-george-pataki", "id-rand-paul", "id-chris-christie",
                   "id-marco-rubio", "id-donald-trump", "id-rick-santorum", "id-ted-cruz", "id-carly-fiorina" ]
    }, { "choices": [ "id-jeb-bush", "id-george-pataki", "id-chris-christie", "id-john-kasich" ] }, {
      "choices": [ "id-marco-rubio", "id-carly-fiorina", "id-donald-trump", "id-chris-christie", "id-rick-santorum",
                   "id-rand-paul", "id-jim-gilmore", "id-john-kasich", "id-ted-cruz", "id-george-pataki", "id-jeb-bush" ]
    }, { "choices": [ "id-chris-christie", "id-marco-rubio", "id-john-kasich" ] }, { "choices": [ "id-donald-trump" ] },
             { "choices": [ "id-carly-fiorina", "id-john-kasich", "id-marco-rubio" ] }, { "choices": [ "id-rand-paul" ] },
             { "choices": [ "id-john-kasich", "id-rand-paul", "id-george-pataki", "id-chris-christie" ] },
             { "choices": [ "id-rand-paul", "id-john-kasich", "id-george-pataki", "id-jim-gilmore" ] },
             { "choices": [ "id-john-kasich" ] }, { "choices": [ "id-john-kasich", "id-george-pataki", "id-rand-paul" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-chris-christie" ] }, { "choices": [ "id-donald-trump" ] },
             { "choices": [ "id-jeb-bush", "id-donald-trump", "id-marco-rubio" ] }, { "choices": [ "id-chris-christie" ] }, {
      "choices": [ "id-donald-trump", "id-marco-rubio", "id-ted-cruz", "id-chris-christie", "id-jeb-bush", "id-john-kasich",
                   "id-rick-santorum", "id-carly-fiorina", "id-george-pataki", "id-rand-paul", "id-jim-gilmore" ]
    }, {
      "choices": [ "id-donald-trump", "id-marco-rubio", "id-ted-cruz", "id-chris-christie", "id-jeb-bush", "id-john-kasich",
                   "id-rick-santorum", "id-carly-fiorina", "id-george-pataki", "id-rand-paul", "id-jim-gilmore" ]
    }, {
      "choices": [ "id-donald-trump", "id-marco-rubio", "id-ted-cruz", "id-chris-christie", "id-jeb-bush", "id-john-kasich",
                   "id-rick-santorum", "id-carly-fiorina", "id-george-pataki", "id-rand-paul", "id-jim-gilmore" ]
    }, { "choices": [ "id-john-kasich", "id-rand-paul", "id-donald-trump" ] }, {
      "choices": [ "id-john-kasich", "id-marco-rubio", "id-ted-cruz", "id-chris-christie", "id-rand-paul" ]
    }, { "choices": [ "id-donald-trump" ] }, { "choices": [ "id-marco-rubio", "id-jeb-bush", "id-carly-fiorina" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio" ] },
             { "choices": [ "id-john-kasich", "id-jeb-bush", "id-marco-rubio" ] }, { "choices": [ "id-donald-trump" ] },
             { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul" ] }, { "choices": [ "id-rand-paul" ] } ],
  "candidates": [ {
    "photo": "https://civinomics.com/images/469px-Mike_Huckabee_speaking_at_HealthierUS_Summit.jpg",
    "id"   : "id-mike-huckabee",
    "name" : "Mike Huckabee"
  }, { "photo": "https://civinomics.com/images/imgres_N7j5DVB.jpg", "id": "id-ben-carson", "name": "Ben Carson" },
                  { "photo": "https://civinomics.com/images/rubio.jpg", "id": "id-marco-rubio", "name": "Marco Rubio" },
                  { "photo": "https://civinomics.com/images/cruz.jpg", "id": "id-ted-cruz", "name": "Ted Cruz" },
                  { "photo": "https://civinomics.com/images/gilmore.jpg", "id": "id-jim-gilmore", "name": "Jim Gilmore" },
                  { "photo": "https://civinomics.com/images/santorum.jpg", "id": "id-rick-santorum", "name": "Rick Santorum" },
                  { "photo": "https://civinomics.com/images/pataki.jpg", "id": "id-george-pataki", "name": "George Pataki" },
                  { "photo": "https://civinomics.com/images/kasich.jpg", "id": "id-john-kasich", "name": "John Kasich" },
                  { "photo": "https://civinomics.com/images/bush.jpg", "id": "id-jeb-bush", "name": "Jeb Bush" },
                  { "photo": "https://civinomics.com/images/christie.jpeg", "id": "id-chris-christie", "name": "Chris Christie" },
                  { "photo": "https://civinomics.com/images/paul.jpeg", "id": "id-rand-paul", "name": "Rand Paul" },
                  { "photo": "https://civinomics.com/images/fiorina.jpg", "id": "id-carly-fiorina", "name": "Carly Fiorina" }, {
      "photo": "https://civinomics.com/images/Donald_Trump.png",
      "id"   : "id-donald-trump",
      "name" : "Donald Trump"
    } ],
  "id": "gop2016",
  "title": "GOP 2016"
}