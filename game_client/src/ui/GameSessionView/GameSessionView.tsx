import { ColumnLayout } from '../../component_lib/column_layout/column_layout';
import { combineClasses } from '../../util/css';
import './GameSessionView.css';

export function GameSessionView(props: {}): JSX.Element {
    const players = ['bill', 'jane', 'phil'];
    return (
        <div className="layout">
            <PlayerList players={players} playerTurn={1} />
            <GameSurface />
        </div>
    );
}

function PlayerList(props: {
    players: Array<string>;
    playerTurn: number;
}): JSX.Element {
    return (
        <div className="player-list">
            {props.players.map((p, i) => (
                <PlayerBadge
                    key={p}
                    playerId={p}
                    playerIndex={i}
                    isTurn={i === props.playerTurn}
                />
            ))}
        </div>
    );
}

function PlayerBadge(props: {
    playerId: string;
    playerIndex: number;
    isTurn: boolean;
}): JSX.Element {
    const isTurnClass = props.isTurn ? 'player-turn' : undefined;
    return (
        <p
            className={combineClasses('player-badge', isTurnClass)}
            title={props.playerId}
        >
            {props.playerIndex}
        </p>
    );
}

function GameSurface(props: {}): JSX.Element {
    return <div className="game-surface">its the game</div>;
}
