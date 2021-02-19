import View from '@core/view';

export default class Task extends View {
    template(props) {
        return `
            <div class="todolist__task">
                <textarea class="todolist__task-text">${props.text}</textarea>
            </div>
        `;
    }
}