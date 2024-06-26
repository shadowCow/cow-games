import { Dispatch, useCallback, useState } from 'react';
import { List } from '../../component_lib/list/list';
import { ColumnLayout } from '../../component_lib/column_layout/column_layout';
import {
    CreateGame,
    Game,
    GameCreationAction,
    RemoteCollectionState,
} from '@cow-sunday/game-protocol-ts';

export function CreateGameView(props: {
    dispatch: Dispatch<GameCreationAction>;
}): JSX.Element {
    // TODO - replace this with RemoteCollection<Game>
    const games: Array<PlayableGame> = [
        {
            id: 'tic-tac-toe',
            description: 'cat got it',
        },
        {
            id: 'chess',
            description: 'checkmate',
        },
        {
            id: 'checkers',
            description: 'king me',
        },
    ];
    const [selectedGameId, setSelectedGameId] = useState<string>();
    const onCreateCallback = useCallback(() => {
        if (selectedGameId !== undefined) {
            props.dispatch(CreateGame({ gameId: selectedGameId }));
        }
    }, [selectedGameId]);

    return (
        <ColumnLayout>
            <Controls onCreateCallback={onCreateCallback} />
            <List<PlayableGame>
                items={games}
                selectedItemId={selectedGameId}
                onSelect={setSelectedGameId}
                renderer={(g) => <GameItemRenderer game={g} />}
            />
        </ColumnLayout>
    );
}

export type PlayableGame = {
    id: string;
    description: string;
};

function Controls(props: { onCreateCallback: () => void }): JSX.Element {
    return (
        <div>
            <button onClick={props.onCreateCallback}>Create</button>
        </div>
    );
}

function GameItemRenderer(props: { game: PlayableGame }): JSX.Element {
    return <p>{props.game.description}</p>;
}
