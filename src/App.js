import React, { useState, useReducer } from 'react';
import Routes from './routes';

// Highest Component should define the context
import Context from './utils/context';
import * as Reducer from './store/hooks_state/hooks_reducer';
import * as ACTIONS from './store/actions/actions';

const App = () => {

  const [ gState, setGState ] = useState(0);
  const [ globalReduxState, globalDispatch ] = useReducer(Reducer.HooksReducer, Reducer.initialState);


  const inrmentNumber = () => {
    setGState(gState + 1);
  }

  const decrementNumber = () => {
    setGState(gState - 1);
  }

  const handleGlobalContextDispatchTrue = () => {
    globalDispatch(ACTIONS.success());
  }

  const handleGlobalContextDispatchFalse = () => {
    globalDispatch(ACTIONS.failure());
  }

  return(
    <div>
      React
      {/* Wrapping up the the childrens to use "contex read" (one-way) or "update" (two-way) */}
      <Context.Provider value={{ 
          gState,
          inrmentNumber,
          decrementNumber,
          // Redux state and actions
          globalReduxState: globalReduxState.stateprop2,
          handleGlobalContextDispatchTrue,
          handleGlobalContextDispatchFalse

       }}>
       {/* So every single routing component is able to get value above!!! 
          and then read and update the context
      */}
        <Routes />
      </Context.Provider>
    </div>
  );

}
export default App;
