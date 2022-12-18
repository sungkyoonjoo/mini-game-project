class ItemContext{
    constructor(){
        this.#items = [];
    }
    get items(){
        return this.#items;
    }
    set items(i){
        this.#items = i;
    }
    
    #items;
}

export default new ItemContext();



