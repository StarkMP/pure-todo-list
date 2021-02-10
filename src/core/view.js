import $ from 'jquery';

import { randomUUID } from '../utils';
import Model from './model';

export default class View {
    get html() {
        throw new Error('Redeclare this method');
    }

    constructor(params) {
        this.uuid = randomUUID();
        this.props = params.props || {};
        this.model = new Model(params.model || {});
        this.$html = $(this.html);

        if (params.$container && params.$container.length) {
            this.render(params.$container);
        }

        if (!this.$html || !this.$html.length) {
            throw new Error('Please declare `html`');
        }
    }

    render($container) {
        $container.append(this.$html);

        this.afterRender();
    }

    afterRender() {}
}