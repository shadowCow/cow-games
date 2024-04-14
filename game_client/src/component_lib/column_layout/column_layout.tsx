import './column_layout.css';

export function ColumnLayout(props: {
    children: Array<React.ReactElement>;
}): JSX.Element {
    return <div className="column-layout">{props.children}</div>;
}
