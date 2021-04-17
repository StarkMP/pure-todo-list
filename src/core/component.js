import $ from 'jquery';
import { uuidv4 } from '@core/utils';

export default class Component {
    static compare(left, right) {
        return left.cid === right.cid;
    }

    template() {
        return '';
    }

    events() {
        return [];
    }

    selectors() {
        return {};
    }

    constructor(params) {
        if (new.target === Component) {
            throw new Error('Cannot construct Component instances directly');
        }

        const { $el, props = {} } = params;
        this.cid = uuidv4();

        if ($el) {
            if (!$el.length) {
                throw new Error('jQuery element is not defined');
            }

            this.$el = $el;
        } else {
            const template = this.template(props);

            this.$el = $(template);

            this.template = function () {
                return template;
            };
        }

        this.init(props);
        this._initEvents();
    }

    _initEvents() {
        const events = this.events();

        if (!events.length) {
            return;
        }

        this.active_events = events.map((event) => {
            const e = {
                name: event[0],
            };

            if (!event[2]) {
                e.callback = event[1];
            } else {
                e.$selector = event[1];
                e.callback = event[2];
            }

            if (e.$selector) {
                this.$el.on(e.name, e.$selector, e.callback);
            } else {
                this.$el.on(e.name, e.callback);
            }

            return e;
        });
    }

    _destroyEvents() {
        if (!this.active_events.length) {
            return;
        }

        this.active_events.forEach((e) => {
            if (e.$selector) {
                this.$el.off(e.name, e.$selector, e.callback);
            } else {
                this.$el.off(e.name, e.callback);
            }
        });

        this.active_events = [];
    }

    $(selector) {
        return this.findEl(this.selectors()[selector]);
    }

    findEl(selector) {
        if (!this.$el || !this.$el.length) {
            return;
        }

        return this.$el.find(selector);
    }

    remove() {
        this._destroyEvents();
        this.$el.remove();
    }

    init() {}
}
