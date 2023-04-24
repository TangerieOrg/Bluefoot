export default class BluefootInstance {
    private instance : any;

    constructor(instance : any) {
        this.instance = instance;
    }

    start() {
        return this.instance._start();
    }

    end() {
        return this.instance._end();
    }
}