import Sortable from 'sortablejs';
import $ from 'jquery';

import Component from '@core/component';
import Block from '@components/block';

export default class App extends Component {
    init(props) {
        this.initBlocks(props.blocks);
    }

    events() {
        return [
            ['click', '.todolist__btn', this.addTask.bind(this)]
        ];
    }

    initBlocks(blocks) {
        this.blocks = blocks.map(props => {
            const block = new Block({
                props: {
                    ...props,
                    save: this.save.bind(this)
                }
            });
            
            this.findEl('.todolist__blocks').append(block.$el);

            return block;
        });

        this.initSortable();
    }

    initSortable() {
        this.blocks.forEach(block => {
            new Sortable(block.findEl('.todolist__block-tasks').get(0), {
                handle: '.todolist__task',
                group: 'blocks',
                animation: 150,
                easing: 'cubic-bezier(1, 0, 0, 1)',
                dragClass: 'todolist__task-draggable',
                ghostClass: 'todolist__task-ghost',
                onEnd: this.onTaskSort.bind(this),
                filter: '.sortable-filtered',
                preventOnFilter: false,
            });
        });
    }

    findBlockById(id) {
        return this.blocks.find(block => {
            return block.cid === id;
        });
    }

    onTaskSort(e) {
        const block_from = this.findBlockById($(e.from).attr('data-id'));
        const block_to = this.findBlockById($(e.to).attr('data-id'));
        const task = block_from.tasks.splice(e.oldIndex, 1)[0]

        block_to.tasks.splice(e.newIndex, 0, task);
        task.removeFromBlock = block_to.removeTask.bind(block_to);

        this.save();
    }

    hasBlocks() {
        return this.blocks ? !!this.blocks.length : false;
    }

    getDefaultBlock() {
        if (!this.hasBlocks()) {
            return;
        }

        return this.blocks.find(block => block.is_default);
    }

    addTask() {
        if (!this.hasBlocks()) {
            return;
        }

        const default_block = this.getDefaultBlock();

        if (!default_block) {
            return;
        }

        default_block.createTask();
    }

    save() {
        const model = {};
        const blocks = [];

        this.blocks.forEach(block => {
            const tasks = block.tasks.map(task => {
                return {
                    text: task.text,
                    color: task.color
                };
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