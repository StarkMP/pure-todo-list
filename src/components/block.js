import Task from './task';
import View from '../core/view';

export default class Block extends View {
    get html() {
        const tasks = this.mapHTML(Task, this.props.tasks);

        return `
            <div class="todolist__block">
                <div class="todolist__block-name">${this.props.name}</div>
                <span class="todolist__block-name-divider"></span>
                <div id="${this.uuid}" class="todolist__block-tasks">${tasks}</div>
            </div>
        `;
    }
}