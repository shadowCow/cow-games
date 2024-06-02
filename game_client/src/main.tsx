import React, { Dispatch } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { GameCreationAction } from '@cow-sunday/game-protocol-ts';

// TODO - this is part of the server interface
const createGameDispatch: Dispatch<GameCreationAction> = (a) => {
    console.log('dispatching create game', a);
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App createGameDispatch={createGameDispatch} />
    </React.StrictMode>,
);
