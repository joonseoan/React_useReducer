import React, { useState, useReducer } from 'react';
import Routes from './routes';

// Highest Component should define the context
import Context from './utils/context';
import * as Reducer from './store/hooks_state/hooks_reducer';
import * as userReducer from './store/hooks_state/user_input_hooks_reducer';
import * as ACTIONS from './store/actions/actions';

const App = () => {

  const [ gState, setGState ] = useState(0);
  const [ globalReduxState, globalDispatch ] = useReducer(Reducer.HooksReducer, Reducer.initialState);
  const [ globalUserReducer, globalUserDispatch ] = useReducer(userReducer.UserReducer, userReducer.initialState);


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

  const globalUserReducerChange = e => {
    globalUserDispatch(ACTIONS.user_input_change(e.target.value));
}

  const globalUserReducerSubmit = e => {
      e.preventDefault();
      e.persist();
      globalUserDispatch(ACTIONS.user_input_submit(e.target.useContext.value));
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
          handleGlobalContextDispatchFalse,

          useContextChange: globalUserReducer.user_text_change,
          useContextSubmit: globalUserReducer.user_text_submit,
          dispatchChange: globalUserReducerChange,
          dispatchSubmit: globalUserReducerSubmit

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
