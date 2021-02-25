import $ from 'jquery';

import App from '@components/app';
import './styles/app.scss';

function getData() {
    // имитируем данные с бэка
    const model = JSON.parse(localStorage.getItem('todolist_data')) || {
        blocks: [
            {
                name: 'Backlog',
                is_default: true,
                tasks: [
                    { text: 'Тестовое задание 1', color: '#F85AAF' },
                    { text: 'Тестовое задание 2', color: '#F85AAF' },
                    { text: 'Тестовое задание 3', color: '#F85AAF' }
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

    return model;
}

new App({
    $el: $('#app'),
    props: getData()
});