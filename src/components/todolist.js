import 'jquery-ui';

import View from '../core/view';
import Block from './block';

export default class TodoList extends View {
    get html() {
        const blocks = this.mapHTML(Block, this.props.data.blocks);

        return `
            <div class="todolist">
                <button class="todolist__btn">Add Task</button>
                <div class="todolist__blocks">${blocks}</div>
            </div>
        `;
    }

    render() {
        this.props.$container.append(this.$html);

        // this.initSortable();
    }

    save() {
        localStorage.setItem('todolist_data', JSON.stringify({}));
    }

    initSortable() {
        const $lists = this.$html.find('.todolist__block-tasks');

        $lists.sortable({
            connectWith: '.todolist__block-tasks',
            stop: this.sort.bind(this)
        }).disableSelection();
    }

    sort(event, ui) {
        const from = event.target.id;
        const to = this.$html.find(ui.item).closest('.todolist__block-tasks').attr('id');

        this.save();
    }
}