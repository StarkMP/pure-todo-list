import $ from 'jquery';

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export default class View {
    template(props) {
        return '';
    }

    events() {
        return [];
    }

    selectors() {
        return {};
    }

    constructor(params) {
        if (new.target === View) {
            throw new Error('Cannot construct View instances directly')
        }

        const { $el, props = {} } = params;
        this.view_id = uuidv4();

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
            const e = {
                $selector: event[1],
                name: event[0],
                callback: event[2]
            };

            if (e.$selector) {
                this.$el.on(e.name, e.$selector, e.callback);
            } else {
                this.$el.on(e.name, e.callback);
            }

            return e;
        });
    }

    destroyEvents() {
        if (!this.active_events.length) {
            return;
        }

        this.active_events.forEach(e => {
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
        this.destroyEvents();
        this.$el.remove();
    }

    init(props) {}
}