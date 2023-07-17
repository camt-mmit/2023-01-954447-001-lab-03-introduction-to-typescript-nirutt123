export function createComponent(componentElement: HTMLElement){
    const tmpInput = componentElement.querySelector<HTMLTemplateElement>('template.app-tmp-input');

    if(tmpInput === null){
        throw new Error('cannot find input template')
    }

    const inputsList = tmpInput.parentElement;

    if(inputsList === null){
        throw new Error('cannot find list container')
    }

    const updateResult = () => {
        const children= [...inputsList.children].filter(
            (elem) => elem !== tmpInput,
            );

        const result = children.reduce(
            (carry, element) => 
            carry + 
            (element.querySelector<HTMLInputElement>('input[type="number"].app-cmp-input')?.valueAsNumber ?? 0), 
            0,
        );

        [...componentElement.querySelectorAll<HTMLOutputElement>('output.app-cmp-result')].forEach(
            (elem) => (elem.value = `${result.toLocaleString()}`),
        );
    };

    const updateList = () => {
        updateResult();
    
        const children= [...inputsList.children].filter(
            (elem) => elem !== tmpInput,
            );

            children.forEach((element, i) => {
                [...element.querySelectorAll('.app-cmp-input-no')].forEach(
                    (elem) => (elem.textContent = `${i+1}`),
                );
            });

            [...inputsList.querySelectorAll<HTMLElement & {disabled: boolean}> ('.app-cmd-remove-input')].forEach(
                (elem) => (elem.disabled = children.length === 1),
            ); 
    };

    const createElement = () => {
        const container = (tmpInput.content.cloneNode(true) as DocumentFragment).firstElementChild;


if(container === null) {
    throw new Error('Cannot find template Container')
}

        container.addEventListener('click', (ev) => {
            //const target = ev.target.matches;
            //if(ev.target && (ev.target as Element).matches?.('.app-cmd-remove-input')){
            if((ev.target as Element | null)?.matches?.('.app-cmd-remove-input')){
                container.remove();

                updateList();
            }
        });

        inputsList.append(container);
        updateList();
    };

    componentElement.addEventListener('click', (ev) => {
        if((ev.target as Element | null)?.matches?.('.app-cmd-add-input')) {
            createElement();
        }
    });

    inputsList.addEventListener('change',(ev) => {
        if((ev.target as Element | null)?.matches?.('input[type="number"].app-cmp-input')) {
            updateResult();
        }
    });

    createElement();
}


