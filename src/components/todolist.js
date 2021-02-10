import View from '../core/view';
import ViewCollection from '../core/collection';
import Block from './block';

export default class TodoList extends View {
    get html() {
        return `
            <div class="todolist">
                <button class="todolist__btn">Add Task</button>
                <div class="todolist__blocks"></div>
            </div>
        `;
    }

    afterRender() {
        const $blocks = this.$html.find('.todolist__blocks');

        this.blocks = new ViewCollection({
            View: Block,
            $container: $blocks,
            models: this.props.blocks
        });
    }

    save() {
        localStorage.setItem('todolist_data', JSON.stringify({ blocks: this.blocks.models }));
    }

    // initSortable() {
    //     const $lists = this.$html.find('.todolist__block-tasks');

    //     $lists.sortable({
    //         connectWith: '.todolist__block-tasks',
    //         stop: this.sort.bind(this)
    //     }).disableSelection();
    // }

    // sort(event, ui) {
    //     const from = this.findBlockByUUID(event.target.id);
    //     const to = this.findBlockByUUID(this.$el.find(ui.item).closest('.todolist__block-tasks').attr('id'));
    // }
}