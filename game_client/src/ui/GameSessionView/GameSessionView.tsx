import { combineClasses } from '../../util/css';
import classes from './GameSessionView.module.css';
import { useEffect, useRef } from 'react';

export function GameSessionView(props: {
    exitGameSessionView: () => void;
}): JSX.Element {
    const players = ['bill', 'jane', 'phil'];

    // TODO - move this out to be injected by particular game.
    const gameRenderer = (ctx: CanvasRenderingContext2D) => {
        ctx.strokeStyle = 'white';
        ctx.moveTo(0, 0);
        ctx.lineTo(200, 100);
        ctx.stroke();
    };
    return (
        <div className={classes.layout}>
            <PlayerList
                players={players}
                playerTurn={1}
                exitGameSessionView={props.exitGameSessionView}
            />
            <GameSurface gameRenderer={gameRenderer} />
        </div>
    );
}

function PlayerList(props: {
    players: Array<string>;
    playerTurn: number;
    exitGameSessionView: () => void;
}): JSX.Element {
    return (
        <div className={classes.playerList}>
            <button onClick={(e) => props.exitGameSessionView()}>Back</button>
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
    const isTurnClass = props.isTurn ? classes.playerTurn : undefined;
    return (
        <p
            className={combineClasses(classes.playerBadge, isTurnClass)}
            title={props.playerId}
        >
            {props.playerIndex}
        </p>
    );
}

function GameSurface(props: {
    gameRenderer: (ctx: CanvasRenderingContext2D) => void;
}): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas !== null) {
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            const ctx = canvas.getContext('2d');
            if (ctx !== null) {
                props.gameRenderer(ctx);
            }
        }
    }, []);

    return (
        <div className={classes.gameSurface}>
            <canvas ref={canvasRef} id="game-surface"></canvas>
        </div>
    );
}
