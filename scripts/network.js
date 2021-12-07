class NetworkNode {
    constructor(item, inflows=[], outflows=[], preclusions=[]) {
        this.item = item
        // copy inputs?
        this.inflows = inflows
        this.outflows = outflows
        this.preclusions = preclusions
    }

    get_code() {
        return this.item.get_code()
    }

    get_item() {
        return this.item
    }

    set_item(item) {
        this.item = item
    }

    get_outflows(){
        return self.outflows
    }

    add_outflow(link) {
        return this.#add(link, this.outflows)
    }

    del_outflow(link) {
        return this.#del(link, this.outflows)
    }

    get_inflows(){
        return self.inflows
    }

    add_inflow(link) {
        return this.#add(link, this.inflows)
    }

    del_inflow(link) {
        return this.#del(link, this.inflows)
    }

    get_preclusions(){
        return self.preclusions
    }

    add_preclusion(link) {
        return this.#add(link, this.preclusions)
    }

    del_preclusion(link) {
        return this.#del(link, this.preclusions)
    }

    #add(item, collection) {
        //check duplicate
        if (!collection.includes(item)) {
            collection.push(item)
            return true
        } else{
            return false
        }
    }

    #del(item, collection) {
        //check duplicate
        if (collection.includes(item)) {
            collection.splice(collection.indexOf(item), 1)
            return true
        } else{
            return false
        }
    }
}

class NetworkLink {
    // logic:True = &&, logic:False = ||
    constructor(item, inputs, output, logic=false) {
        this.logic = logic
        this.item = item
        this.inputs = inputs
        this.output = output
    }

    get_logic() {
        return this.logic
    }

    set_logic(logic) {
        this.logic = logic
    }

    get_outflow() {
        return this.outflows
    }

    set_outflow(outflow){
        this.outflow = outflow
    }

    get_inflows(){
        return this.inflows
    }

    // add in inputs one at a time, possible to extend to multiple one-shot
    add_inflow(link) {
        // check duplicate
        if (!this.inputs.includes(link)) {
            this.inputs.push(link)
            return true
        } else {
            return false
        }
    }

    del_inflow(link){
        if (this.inputs.includes(link)) {
            this.inputs.splice(this.inputs.indexOf(link), 1)
            return true
        } else {
            return false
        }
    }
}