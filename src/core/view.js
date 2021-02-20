import $ from 'jquery';

export default class View {
    template(props) {
        return '';
    }

    events() {
        return [];
    }

    constructor(params) {
        const { $el, props } = params;

        if ($el) {
            if (!$el.length) {
                throw new Error('jQuery element is not defined');
            }
            
            this.$el = $el;
        } else {
            const template = this.template(props);

            this.$el = $(template);

            this.template = function() {
                return template;
            }
        }

        this.init(props);
        this.initEvents();
    }

    initEvents() {
        const events = this.events();

        if (!events.length) {
            return;
        }

        this.active_events = events.map(event => {
            return this.findEl(event[1]).on(event[0], event[2]);
        });
    }

    destroyEvents() {
        if (!this.active_events.length) {
            return;
        }

        this.active_events.forEach(event => {
            event.off();
        });

        this.active_events = [];
    }

    findEl(selector) {
        if (!this.$el || !this.$el.length) {
            return;
        }

        return this.$el.find(selector);
    }

    remove() {
        this.destroyEvents();
        this.$el.remove();
    }

    init(props) {}
}