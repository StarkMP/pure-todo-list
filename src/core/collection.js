import { randomUUID } from "../utils";

export default class ViewCollection {
    constructor(params) {
        this.uuid = randomUUID();

        this.views = params.models.map(model => {
            return new params.View({
                $container: params.$container,
                model
            });
        });
    }

    get models() {
        return this.views.map(view => view.model);
    }
}