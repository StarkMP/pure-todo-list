import Task from '@components/task';
import View from '@core/view';

export default class Block extends View {
    template(props) {
        return `
            <div class="todolist__block">
                <div class="todolist__block-name">${props.name}</div>
                <span class="todolist__block-name-divider"></span>
                <div class="todolist__block-tasks"></div>
            </div>
        `;
    }

    init(props) {
        this.name = props.name;
        this.is_default = props.is_default;

        this.renderTasks(props.tasks);
    }

    renderTasks(tasks) {
        tasks.forEach(props => {
            const tasks = new Task({ props });
            this.findEl('.todolist__block-tasks').append(tasks.$el);
        });
    }
}