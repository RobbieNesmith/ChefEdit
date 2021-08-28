export default function MenuOption(props: {name: string, callback(): void}) {
    return (
        <li
            onClick={ props.callback }
        >
            {props.name}
        </li>
    );
}