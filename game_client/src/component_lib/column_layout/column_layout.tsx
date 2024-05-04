import classes from './column_layout.module.css';

export function ColumnLayout(props: {
    children: Array<React.ReactElement>;
}): JSX.Element {
    return <div className={classes.columnLayout}>{props.children}</div>;
}
