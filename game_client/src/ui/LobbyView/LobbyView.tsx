import { Dispatch, useState } from 'react';
import { assertNever } from '@cow-sunday/fp-ts';
import { CreateGameView } from '../CreateGameView/CreateGameView';
import { JoinGameView } from '../JoinGameView/JoinGameView';
import classes from './LobbyView.module.css';
import { combineClasses } from '../../util/css';
import { ActiveSessionsView } from '../ActiveSessionsView/ActiveSessionsView';
import {
    Game,
    GameCreationAction,
    RemoteCollectionState,
} from '@cow-sunday/game-protocol-ts';

export function LobbyView(props: {
    enterActiveSession: (sessionId: string) => void;
    createGameDispatch: Dispatch<GameCreationAction>;
}): JSX.Element {
    const [navOption, setNavOption] = useState<NavOption>('join');

    return (
        <Layout
            nav={<Nav selected={navOption} onSelect={setNavOption} />}
            main={
                <MainArea
                    navOption={navOption}
                    createGameDispatch={props.createGameDispatch}
                    enterActiveSession={props.enterActiveSession}
                />
            }
        />
    );
}

function Layout(props: { nav: JSX.Element; main: JSX.Element }): JSX.Element {
    return (
        <div className={classes.layout}>
            {props.nav}
            {props.main}
        </div>
    );
}

function Nav(props: {
    selected: NavOption;
    onSelect: (choice: NavOption) => void;
}): JSX.Element {
    const getSelectedClass = (option: NavOption, selected: NavOption) => {
        if (option === selected) {
            return classes.selectedNavItem;
        } else {
            return undefined;
        }
    };
    return (
        <div className={classes.nav}>
            <button
                className={combineClasses(
                    classes.navItem,
                    getSelectedClass('active_sessions', props.selected),
                )}
                onClick={() => props.onSelect('active_sessions')}
            >
                Active
            </button>
            <button
                className={combineClasses(
                    classes.navItem,
                    getSelectedClass('join', props.selected),
                )}
                onClick={() => props.onSelect('join')}
            >
                Join
            </button>
            <button
                className={combineClasses(
                    classes.navItem,
                    getSelectedClass('create', props.selected),
                )}
                onClick={() => props.onSelect('create')}
            >
                Create
            </button>
        </div>
    );
}

function MainArea(props: {
    navOption: NavOption;
    createGameDispatch: Dispatch<GameCreationAction>;
    enterActiveSession: (sessionId: string) => void;
}): JSX.Element {
    switch (props.navOption) {
        case 'create':
            return <CreateGameView dispatch={props.createGameDispatch} />;
        case 'join':
            return <JoinGameView />;
        case 'active_sessions':
            return (
                <ActiveSessionsView
                    enterActiveSession={props.enterActiveSession}
                />
            );
        default:
            return assertNever(props.navOption);
    }
}

type NavOption = 'create' | 'join' | 'active_sessions';
