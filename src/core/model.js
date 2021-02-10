import { randomUUID } from "../utils";

export default class Model {
    constructor(params) {
        this.uuid = randomUUID();
        this.attributes = params;
    }

    set(params) {
        Object.keys(params).forEach(k => {
            this.attributes[k] = params[k];
        });
    }

    get json() {
        return this.attributes;
    }
}