import {Middleware} from "@ngrx/store";
import * as _ from "lodash";








export const actionLog : Middleware = actions => {
  return actions.do(val => {
    if (val.payload){
      console.info(`DISPATCHED ACTION: ${val.type}`); console.log("payload:"); console.log(val.payload);
    } else {
      console.info(`DISPATCHED ACTION: ${val.type}`);
    }
  });
};


export const stateLog : Middleware = states => {
  return states.do(val => {
    console.info("RESULTANT STATE: ");
    console.info(
      _.keys(val).reduce((obj, key) => {
        let x = val[key];
        obj[key] = val[key].toJSON ? val[key].toJSON() : val[key];
        return obj;
      }, {})
    );
  });
};
