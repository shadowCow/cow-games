import { useState } from 'react';
import { List } from '../../component_lib/list/list';
import { WithId } from '../../util/with_id';
import './ActiveSessionsView.css';

export function ActiveSessionsView(props: {}): JSX.Element {
    const sessions: Array<GameSession> = [
        {
            id: 'session1',
            description: 'chess with bill',
        },
        {
            id: 'session2',
            description: 'checkers with phil',
        },
    ];
    const [selectedSessionId, setSelectedSessionId] = useState<string>();
    return (
        <div className="layout">
            <List<GameSession>
                items={sessions}
                selectedItemId={selectedSessionId}
                onSelect={setSelectedSessionId}
                renderer={(s) => <SessionRenderer session={s} />}
            />
        </div>
    );
}

type GameSession = {
    description: string;
} & WithId;

function SessionRenderer(props: { session: GameSession }): JSX.Element {
    return <p>{props.session.description}</p>;
}
