import Task from './task';
import ViewCollection from '../core/collection';
import View from '../core/view';

export default class Block extends View {
    get html() {
        return `
            <div class="todolist__block">
                <div class="todolist__block-name">${this.model.json.name}</div>
                <span class="todolist__block-name-divider"></span>
                <div id="${this.uuid}" class="todolist__block-tasks"></div>
            </div>
        `;
    }

    afterRender() {
        const $list = this.$html.find('.todolist__block-tasks');
        
        this.tasks = new ViewCollection({
            View: Task,
            $container: $list,
            models: this.model.json.tasks
        });
    }
}