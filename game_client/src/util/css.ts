export function combineClasses(
    ...classes: Array<string | undefined>
): string | undefined {
    const classesString = classes.filter((c) => c !== undefined).join(' ');

    if (classesString.length > 0) {
        return classesString;
    } else {
        return undefined;
    }
}
