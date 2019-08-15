import React, { useState, useEffect, useReducer, useContext } from 'react';

import * as ACTIONS from '../store/actions/actions';
import * as UserReducer from '../store/hooks_state/user_input_hooks_reducer';

import Context from '../utils/context';



export default () => {

    const context = useContext(Context);

    const [ valueChange, setValueChange ] = useState('');
    const [ valueSubmit, setValueSubmit ] = useState('');

    const [userState, userDispatch ] = useReducer(UserReducer.UserReducer, UserReducer.initialState);

    const handleOnChange = e => {
        setValueChange(e.target.value);
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        setValueSubmit(valueChange);
    }

    const handleUserReducerChange = e => {
        userDispatch(ACTIONS.user_input_change(e.target.value));
    }

    const handleUserReducerSubmit = e => {
        e.preventDefault();
        userDispatch(ACTIONS.user_input_submit(userState.user_text_change));
    }

    return (
        <div>
            <div>
                <form onSubmit={ handleOnSubmit }>
                    <label>React useState: </label>
                    <input id="useState" type="text" onChange={ handleOnChange } />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div>
                <h2>React useState: </h2>
                <p>Change: { valueChange }</p>
                <p>Submit: { valueSubmit }</p>
            </div>

            <div>
                <form onSubmit={ handleUserReducerSubmit }>
                    <label>React useReducer: </label>
                    <input id="useReducer" type="text" onChange={ handleUserReducerChange } />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div>
                <h2>React useReducer: </h2>
                <p>Change: { userState.user_text_change }</p>
                <p>Submit: { userState.user_text_submit }</p>
            </div>

            <div>
                <form onSubmit={ context.dispatchSubmit }>
                    <label>React Context: </label>
                    <input id="useContext" type="text" onChange={ context.dispatchChange } />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div>
                <h2>React Context: </h2>
                <p>Change: { context.useContextChange }</p>
                <p>Submit: { context.useContextSubmit }</p>
            </div>

        </div>
    );
};