class ItemContext{

    #items;

    constructor(){
        this.#items = [];
    }
    get items(){
        return this.#items;
    }
    set items(s){
        this.#items = s;
    }

}

export default new ItemContext();
