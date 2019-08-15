import React, { useState, useEffect, useReducer, useContext } from 'react';
// [ IMPORTANT : WE DO NOT NEED TO USE combinedReducer]
import * as Reducer from '../store/hooks_state/hooks_reducer';
import * as Actions from '../store/actions/actions';
import Context from '../utils/context';

const hooksContainer1 = () => {

    // implementing Context
    const context = useContext(Context);
    console.log('context ============> ', context)


    // [ ORIGINAL SYNTAX ]
    // const stateValue = useState(0)[0];
    // const setValue = useState(0)[1];

    const [ stateValue, setValue ] = useState(0);
    const [ effectValue, setEffectValue ] = useState('');
    const [ state, dispatch ] = useReducer(Reducer.HooksReducer, Reducer.initialState);

    useEffect(() => {
        timer();
    }, [ stateValue ]);

    const timer = () => {
        setTimeout(() => {
            setEffectValue('useEffect Worked');
        }, 3000);
    };
    
    const incrementValue = () => {
        setValue(stateValue + 1);
    };

    const decrementValue = () => {
        setValue(stateValue - 1);
    };

    const changeuseEffectValue = () => {
        setEffectValue('Some STRING');
    }

    const handleDispatchTrue = () => {
        // dispatch(Actions.SUCCESS);
        // dispatch(type: "SUCCESS")

        // use React's dispatch method...
        dispatch(Actions.success());
    };

    const handleDispatchFalse = () => {
        dispatch(Actions.failure());
    }

    return(
      <div>
        React Hooks
        <br />
        <button onClick={ incrementValue }>+</button>
        <button onClick={ decrementValue }>-</button>
        <button onClick={ changeuseEffectValue }>Change Use Effect</button>
        <button onClick={ handleDispatchTrue }>Handle True</button>
        <button onClick={ handleDispatchFalse }>Handle False</button>
        <button onClick={ context.inrmentNumber }>Global +</button>
        <button onClick={ context.decrementNumber }>Global -</button>
        <button onClick={ context.handleGlobalContextDispatchTrue }>GlobalRedux_Context_True</button>
        <button onClick={ context.handleGlobalContextDispatchFalse}>GlobalRedux_Context_False</button>
        <br />
        <div>
            <p>UseEffect Value: { effectValue || 'No Value' } </p>
            <p>Redux Control: { !state.stateprop1 ? 'Redux State is false' : 'Redux State is true' }</p>
            <p>Local State: { stateValue }</p>
            <p>Global State: { context.gState }</p>
            <p>GlobalRedux_State: { context.globalReduxState ? 'true' : 'false' }</p>
        </div>

        <div>
            <h2>Testing userContext from hooks_form.js</h2>     
            <p>{ context.useContextChange }</p>
            <p>{ context.useContextSubmit }</p>
        </div>
      </div>

     
    );  
}

export default hooksContainer1;
