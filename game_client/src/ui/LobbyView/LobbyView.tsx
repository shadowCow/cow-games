import { useState } from 'react';
import { ColumnLayout } from '../../component_lib/column_layout/column_layout';
import { assertNever } from '@cow-sunday/fp-ts';
import { CreateGameView } from '../CreateGameView/CreateGameView';
import { JoinGameView } from '../JoinGameView/JoinGameView';
import './LobbyView.css';

export function LobbyView(props: {}): JSX.Element {
    const [createOrJoin, setCreateOrJoin] = useState<CreateOrJoin>('join');

    return (
        <ColumnLayout>
            <Nav selected={createOrJoin} onSelect={setCreateOrJoin} />
            <MainArea createOrJoin={createOrJoin} />
        </ColumnLayout>
    );
}

function Nav(props: {
    selected: CreateOrJoin;
    onSelect: (choice: CreateOrJoin) => void;
}): JSX.Element {
    const getSelectedClass = (option: CreateOrJoin, selected: CreateOrJoin) => {
        if (option === selected) {
            return 'selected-nav-item';
        } else {
            return undefined;
        }
    };
    return (
        <div>
            <button
                className={getSelectedClass('join', props.selected)}
                onClick={() => props.onSelect('join')}
            >
                Join
            </button>
            <button
                className={getSelectedClass('create', props.selected)}
                onClick={() => props.onSelect('create')}
            >
                Create
            </button>
        </div>
    );
}

function MainArea(props: { createOrJoin: CreateOrJoin }): JSX.Element {
    switch (props.createOrJoin) {
        case 'create':
            return <CreateGameView />;
        case 'join':
            return <JoinGameView />;
        default:
            return assertNever(props.createOrJoin);
    }
}

type CreateOrJoin = 'create' | 'join';
