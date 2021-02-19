import Task from './task';
import View from '../core/view';

export default class Block extends View {
    template(props) {
        return `
            <div class="todolist__block" data-name="${props.name}" data-is-default="${props.is_default ? 1 : 0}">
                <div class="todolist__block-name">${props.name}</div>
                <span class="todolist__block-name-divider"></span>
                <div class="todolist__block-tasks"></div>
            </div>
        `;
    }

    init(props) {
        this.renderTasks(props.tasks);
    }

    renderTasks(tasks) {
        tasks.forEach(props => {
            const tasks = new Task({ props });
            this.findEl('.todolist__block-tasks').append(tasks.$el);
        });
    }
}