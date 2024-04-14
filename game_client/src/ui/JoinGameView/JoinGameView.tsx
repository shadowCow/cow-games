import { useState } from 'react';
import { List } from '../../component_lib/list/list';
import { WithId } from '../../util/with_id';

export function JoinGameView(props: {}): JSX.Element {
    const sessionList: Array<Session> = [
        {
            id: 'g1',
            gameId: 'chess',
            hostPlayerId: 'bill',
        },
        {
            id: 'g2',
            gameId: 'checkers',
            hostPlayerId: 'jim',
        },
    ];
    const [selectedSessionId, setSelectedSessionId] = useState<string>();

    return (
        <List<Session>
            items={sessionList}
            selectedItemId={selectedSessionId}
            onSelect={setSelectedSessionId}
            renderer={(s) => <SessionItemRenderer session={s} />}
        />
    );
}

type Session = WithId & {
    gameId: string;
    hostPlayerId: string;
};

function SessionItemRenderer(props: { session: Session }): JSX.Element {
    return (
        <p>
            <small>{props.session.gameId}</small>
            {props.session.hostPlayerId}
        </p>
    );
}
