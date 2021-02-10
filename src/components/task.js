import View from '../core/view';

export default class Task extends View {
    get html() {
        return `
            <div id="${this.uuid}" class="todolist__task">
                <div class="todolist__task-text">${this.props.text}</div>
            </div>
        `;
    }
}