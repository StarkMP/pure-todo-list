import $ from 'jquery';

import { randomUUID } from '../utils';

export default class View {
    get html() {
        throw new Error('Redeclare this getter');
    }

    constructor(props) {
        this.uuid = randomUUID();
        this.props = props || {};
        this.$html = $(this.html);

        if (!this.$html || !this.$html.length) {
            throw new Error('Please declare `html`');
        }

        this.render();
    }

    mapHTML(view, model_arr) {
        return model_arr.map(props => {
            return new view(props).html;
        }).join('');
    }

    render() {}
}