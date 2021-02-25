import Task from '@components/task';
import View from '@core/view';

export default class Block extends View {
    template(props) {
        return `
            <div class="todolist__block">
                <div class="todolist__block-name">${props.name}</div>
                <span class="todolist__block-name-divider"></span>
                <div data-id=${this.view_id} class="todolist__block-tasks"></div>
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

    createTask(params = {}) {
        const task = new Task({
            props: {
                ...params,
                save: this.save
            }
        });

        this.tasks.unshift(task);
        this.$('list').prepend(task.$el);
        this.save();
    }

    initTasks(tasks) {
        this.tasks = tasks.map(props => {
            const task = new Task({
                props: {
                    ...props,
                    save: this.save
                }
            });

            this.$('list').append(task.$el);
            
            return task;
        });
    }
}