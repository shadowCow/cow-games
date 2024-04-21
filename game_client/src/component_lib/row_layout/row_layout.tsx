import './row_layout.css';

export function RowLayout(props: {
    children: Array<React.ReactElement>;
}): JSX.Element {
    return <div className="row-layout">{props.children}</div>;
}
