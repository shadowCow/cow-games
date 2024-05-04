import classes from './row_layout.module.css';

export function RowLayout(props: {
    children: Array<React.ReactElement>;
}): JSX.Element {
    return <div className={classes.rowLayout}>{props.children}</div>;
}
