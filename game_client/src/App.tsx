import { useState } from 'react';
import classes from './App.module.css';
import { GameSessionView } from './ui/GameSessionView/GameSessionView';
import { LobbyView } from './ui/LobbyView/LobbyView';

function App() {
    const [selectedSession, setSelectedSession] = useState<string>();

    if (selectedSession === undefined) {
        return <LobbyView enterActiveSession={setSelectedSession} />;
    } else {
        return (
            <GameSessionView
                exitGameSessionView={() => setSelectedSession(undefined)}
            />
        );
    }
}

export default App;
