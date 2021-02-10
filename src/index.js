import $ from 'jquery';

import TodoList from './components/todolist';
import './styles/app.scss';

const data = JSON.parse(localStorage.getItem('todolist_data')) || {
    blocks: [
        {
            name: 'Backlog',
            is_default: true,
            tasks: [
                { text: 'Тестовое задание' }
            ]
        },
        {
            name: 'In Progress',
            tasks: []
        },
        {
            name: 'Done',
            tasks: []
        },
    ]
};

const todolist = new TodoList({
    $container: $('.app'),
    props: data
});

if (!localStorage.getItem('todolist_data')) {
    todolist.save();
}