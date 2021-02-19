import Sortable from 'sortablejs';
import $ from 'jquery';

import { numToBool } from '@core/utils';
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
        blocks = blocks.map(props => {
            const block = new Block({ props });
            this.findEl('.todolist__blocks').append(block.$el);

            return block;
        });

        this.initSortable(blocks);
    }

    initSortable(blocks) {
        blocks.forEach(block => {
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

        this.findEl('.todolist__block').each(function() {
            const $block = $(this);
            const tasks = [];

            $(this).find('.todolist__task').each(function() {
                tasks.push({ text: $(this).find('textarea').val() });
            });

            blocks.push({
                name: $block.attr('data-name'),
                is_default: numToBool($block.attr('data-is-default')),
                tasks
            });
        });

        model.blocks = blocks;

        localStorage.setItem('todolist_data', JSON.stringify(model));
    }
}