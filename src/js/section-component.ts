import { createComponent } from './input-component.js';

export function createSection(componentElement: HTMLElement){
    const tmpSection = componentElement.querySelector('template.app-tmp-section');

    if(tmpSection === null){
        throw new Error('cannot find section template')
    }

    const sectionsList = tmpSection.parentElement;

    if(sectionsList === null){
        throw new Error('cannot find list section')
    }
    const updateList = () => {


    const children = [...sectionsList.children].filter(
            (elem) => elem !== tmpSection,
            );
        children.forEach((element, i) => {
            [...element.querySelectorAll('.app-cmp-section-no')].forEach(
                (elem) => (elem.textContent = `${i+1}`),
            );
            });
        console.info(children);
            [...sectionsList.querySelectorAll<HTMLElement & {disabled: boolean}>('.app-cmd-remove-section')].forEach(
                (elem) => (elem.disabled = children.length === 1),
            );
    };
    

    const createElement = () => {
        const container = tmpSection.content.cloneNode(true)?.firstElementChild as HTMLElement;

        if (container === null) {
            throw new Error('Cannot find template Container');
        }

        container.addEventListener('click', (ev) => {
            if ((ev.target as Element | null)?.matches('.app-cmd-remove-section')) {
                container.remove();
                updateList();
            }
        });

        sectionsList.append(container);
        createComponent(container);
        updateList();
    };

    componentElement.addEventListener('click', (ev) => {
        if ((ev.target as Element | null)?.matches('.app-cmd-add-section')) {
            createElement();
        }
    });

    sectionsList.addEventListener('change', (ev) => {
        if ((ev.target as Element | null)?.matches('input[type="number"].app-cmp-input')) {
            updateList();
        }
    });

    createElement();
}