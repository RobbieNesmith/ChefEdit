interface FileLoadFormElement extends HTMLFormElement {
    readonly elements: FileLoadFormElements;
}

interface FileLoadFormElements extends HTMLFormControlsCollection{
    readonly fileInput: HTMLInputElement;
}

export default function FileLoadModal(props: {shown: boolean, onDismiss(): void, onConfirm(fileToLoad: File): void}) {
    if (!props.shown) {
        return null;
    }

    function handleSubmit(evt: React.FormEvent<FileLoadFormElement>) {
        const files = evt.currentTarget.elements.fileInput.files;
        if (files?.length) {
            props.onConfirm(files[0]);
        }
        evt.stopPropagation();
        evt.preventDefault();
    }

    return (
        <div className="FileLoadBackdrop" onClick={props.onDismiss}>
            <div className="FileLoadModal" onClick={evt => evt.stopPropagation()}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <input name="fileInput" type="file" />
                    </div>
                    <div>
                        <button type="submit">Load into editor</button>
                        <button onClick={props.onDismiss}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}