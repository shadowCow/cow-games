import { adt } from '@cow-sunday/fp-ts';

export type GameCreationState = {};

export type Game = {
    id: string;
    name: string;
    description: string;
};

export type GameCreationAction = ReturnType<typeof CreateGame>;

export const CreateGame = adt<'CreateGame', { gameId: string }>('CreateGame');
