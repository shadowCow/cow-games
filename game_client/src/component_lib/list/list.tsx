import { combineClasses } from '../../util/css';
import { WithId } from '../../util/with_id';
import './list.css';

export function List<T extends WithId>(props: {
    items: Array<T>;
    selectedItemId: string | undefined;
    onSelect: (id: string) => void;
    renderer?: ListItemRenderer<T>;
}): JSX.Element {
    return (
        <ul className="list">
            {props.items.map((item) => (
                <li
                    key={item.id}
                    onClick={() => props.onSelect(item.id)}
                    className={combineClasses(
                        'item',
                        getSelectedClass(item.id, props.selectedItemId),
                    )}
                >
                    {props.renderer !== undefined ? (
                        props.renderer(item)
                    ) : (
                        <p>{item.id}</p>
                    )}
                </li>
            ))}
        </ul>
    );
}

function getSelectedClass(
    itemId: string,
    selectedItemId: string | undefined,
): string | undefined {
    return selectedItemId === itemId ? 'selected' : undefined;
}

type ListItemRenderer<T extends WithId> = (t: T) => JSX.Element;
