import { Fst, FstFactory } from '@cow-sunday/fp-ts';

export type Client<S, R, E> = {
    sync: () => Promise<void>;
    try: (e: E) => Promise<void>;
    tryOptimistic: (e: E) => Promise<void>;
    request: (r: R) => Promise<void>;
    getState: () => S;
};

export function createClient<S, R, E>(
    fstFactory: FstFactory<E, void, S>,
    owner: Owner<S, R, E>,
): Promise<Client<S, R, E>> {
    return owner.sync().then(({ state, events }) => {
        let fst = fstFactory(state);
        events.forEach((e) => {
            fst.onInput(e);
        });

        const client: Client<S, R, E> = {
            sync() {
                return owner.sync().then(({ state, events }) => {});
            },
            try(e) {
                throw 'not implemented';
            },
            tryOptimistic(e) {
                throw 'not implemented';
            },
            request(r) {
                throw 'not implemented';
            },
            getState() {
                return fst.getState();
            },
        };

        return client;
    });
}

export type Owner<S, R, E> = {
    apply: (e: E) => Promise<void>;
    request: (r: R) => Promise<E>;
    sync: () => Promise<Sync<S, E>>;
};

export type Sync<S, E> = {
    state: S;
    events: Array<E>;
};

export function createOwner<S, R, E>(fst: Fst<S, E, void>): Owner<S, R, E> {
    const owner: Owner<S, R, E> = {
        apply: function (e: E): Promise<void> {
            throw new Error('Function not implemented.');
        },
        request: function (r: R): Promise<E> {
            throw new Error('Function not implemented.');
        },
        sync: function (): Promise<Sync<S, E>> {
            throw new Error('Function not implemented.');
        },
    };

    return owner;
}
