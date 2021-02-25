import View from '@core/view';

export default class Task extends View {
    template(props) {
        return `
            <div data-id=${this.view_id} class="todolist__task">
                <div class="todolist__task-text">${props.text}</div>
                <div class="todolist__task-edit hidden">
                    <div class="todolist__task-edit-panel">
                        <div class="todolist__task-area-layout">
                            <textarea maxlength="272" class="todolist__task-area">${props.text}</textarea>
                        </div>
                        <div class="todolist__task-actions">
                            <div class="todolist__task-buttons">
                                <button class="btn btn_accept todolist__task-save">Save</button>
                                <button class="btn btn_cancel todolist__task-cancel">Cancel</button>
                            </div>
                            <div class="todolist__task-additional">
                                <div class="todolist__task-color">
                                    <input class="todolist__task-color-input" type="color" value=${props.color}>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    selectors() {
        return {
            area: '.todolist__task-area',
            edit: '.todolist__task-edit',
            text: '.todolist__task-text',
            color: '.todolist__task-color-input'
        };
    }

    init(props) {
        this.setText(props.text || 'New task');
        this.setColor(props.color || 'rgb(248, 90, 175)');
        this.saveToStorage = props.save;
        this.is_editing = false;
    }

    events() {
        return [
            ['click', '', this.edit.bind(this)],
            ['click', '.todolist__task-save', this.save.bind(this)],
            ['click', '.todolist__task-cancel', this.cancelEdit.bind(this)],
            ['change', '.todolist__task-color-input', this.onColorChange.bind(this)]
        ];
    }

    onColorChange() {
        this.findEl('.todolist__task-color').css({
            'background-color': this.$('color').val()
        });
    }

    setText(text) {
        this.text = text;
        this.$('text').text(text);
        this.$('area').val(text);
    }

    setColor(color) {
        const css = {
            'background-color': color
        };

        this.color = color;
        this.findEl('.todolist__task-color').css(css);
        this.$('color').val(color);
        this.$el.css(css);
    }

    edit() {
        if (this.is_editing) {
            return;
        }

        const pos = this.$el.position();

        this.findEl('.todolist__task-edit-panel').css({
           top: pos.top + 'px',
           left: pos.left + 'px'
        });

        this.findEl('.todolist__task-color').css({
            'background-color': this.color
        });

        this.$('edit').removeClass('hidden');
        this.is_editing = true;
    }

    save(e) {
        e.stopPropagation();

        const text = this.$('area').val();
        const color = this.$('color').val();

        this.setText(text);
        this.setColor(color)
        this.cancelEdit();
        this.saveToStorage();
    }

    cancelEdit(e) {
        if (e) {
            e.stopPropagation();
        }

        this.$('edit').addClass('hidden');
        this.$('area').val(this.text);
        this.is_editing = false;
    }
}