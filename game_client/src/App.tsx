import { Dispatch, useState } from 'react';
import classes from './App.module.css';
import { GameSessionView } from './ui/GameSessionView/GameSessionView';
import { LobbyView } from './ui/LobbyView/LobbyView';
import { GameCreationAction } from '@cow-sunday/game-protocol-ts';

function App(props: { createGameDispatch: Dispatch<GameCreationAction> }) {
    const [selectedSession, setSelectedSession] = useState<string>();

    if (selectedSession === undefined) {
        return (
            <LobbyView
                enterActiveSession={setSelectedSession}
                createGameDispatch={props.createGameDispatch}
            />
        );
    } else {
        return (
            <GameSessionView
                exitGameSessionView={() => setSelectedSession(undefined)}
            />
        );
    }
}

export default App;
