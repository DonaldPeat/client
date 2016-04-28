
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Poll, poll, PollInput } from './poll';


@Injectable()
export class Polls {


  private BACKEND_BASE_URI = "http://localhost:3000";
  constructor(private http: Http){
    console.log("POLLS INIT!!");
  }




  public load(id: string): Observable<Poll> {
    let uri = `${this.BACKEND_BASE_URI}/polls/${id}`;
    return this.http.get(uri)
               .map(response => response.json())
               .do(json => {
                  console.log("GOT"); console.log(poll(json));
               }).map(json => poll(<PollInput>json));
  }







}