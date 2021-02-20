import Sortable from 'sortablejs';
import $ from 'jquery';

import View from '@core/view';
import Block from '@components/block';

export default class App extends View {
    events() {
        return [
            ['input', '.todolist__task-text', this.onChangeTaskText.bind(this)]
        ];
    }

    onChangeTaskText() {
        this.save();
    }

    init(props) {
        this.renderBlocks(props.blocks);
    }

    renderBlocks(blocks) {
        this.blocks = blocks.map(props => {
            const block = new Block({ props });
            this.findEl('.todolist__blocks').append(block.$el);

            return block;
        });

        this.initSortable();
    }

    initSortable() {
        this.blocks.forEach(block => {
            new Sortable(block.findEl('.todolist__block-tasks').get(0), {
                group: 'blocks',
                dragClass: 'todolist__task-draggable',
                ghostClass: 'todolist__task-ghost',
                onEnd: this.save.bind(this)
            });
        });
    }

    save() {
        const model = {};
        const blocks = [];

        this.blocks.forEach(block => {
            const tasks = [];

            block.findEl('.todolist__task').each(function() {
                tasks.push({ text: $(this).find('textarea').val() });
            });

            blocks.push({
                name: block.name,
                is_default: block.is_default,
                tasks
            });
        });

        model.blocks = blocks;

        localStorage.setItem('todolist_data', JSON.stringify(model));
    }
}