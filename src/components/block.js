import Task from '@components/task';
import Component from '@core/component';
import { componentsCompare } from '@core/utils';

export default class Block extends Component {
    template(props) {
        return `
            <div class="todolist__block">
                <div class="todolist__block-name">${props.name}</div>
                <span class="todolist__block-name-divider"></span>
                <div data-id=${this.cid} class="todolist__block-tasks"></div>
            </div>
        `;
    }

    init(props) {
        this.name = props.name;
        this.is_default = props.is_default ?? false;
        this.save = props.save;

        this.initTasks(props.tasks);
    }

    selectors() {
        return {
            list: '.todolist__block-tasks'
        };
    }

    newTask(props = {}) {
        return new Task({
            props: {
                ...props,
                save: this.save,
                remove: this.removeTask.bind(this)
            }
        });
    }

    createTask(props = {}) {
        const task = this.newTask(props);

        this.tasks.unshift(task);
        this.$('list').prepend(task.$el);
        this.save();
    }

    removeTask(task) {
        const index = this.tasks.findIndex(t => componentsCompare(t, task));

        if (index === -1) {
            return;
        }

        task.remove();
        this.tasks.splice(index, 1);
        this.save();
    }

    initTasks(tasks) {
        this.tasks = tasks.map(props => {
            const task = this.newTask(props);

            this.$('list').append(task.$el);
            
            return task;
        });
    }
}