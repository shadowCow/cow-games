import { adt } from '@cow-sunday/fp-ts';

export type RemoteCollectionState<T> = {
    collectionSize: number;
    page: Page<T>;
};

export type Page<T> = PageRange & {
    items: Array<T>;
};

export type PageRange = {
    startIndex: number; // inclusive
    endIndex: number; // exclusive
};

export type RemoteCollectionRequest = typeof LoadPage;

export const LoadPage = adt<'LoadPage', { range: PageRange }>('LoadPage');

export type RemoteCollectionEvent<T> = PageLoaded<T>;

export type PageLoaded<T> = {
    kind: 'PageLoaded';
    page: Page<T>;
};
