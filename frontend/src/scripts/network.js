import { LinkedList } from "./helper.js"

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
        return this.outflows
    }

    add_outflow(link) {
        return this.add(link, this.outflows)
    }

    del_outflow(link) {
        return this.del(link, this.outflows)
    }

    get_inflows(){
        return this.inflows
    }

    add_inflow(link) {
        return this.add(link, this.inflows)
    }

    del_inflow(link) {
        return this.del(link, this.inflows)
    }

    get_preclusions(){
        return this.preclusions
    }

    add_preclusion(link) {
        return this.add(link, this.preclusions)
    }

    del_preclusion(link) {
        return this.del(link, this.preclusions)
    }

    add(item, collection) {
        //check duplicate
        if (!collection.includes(item)) {
            collection.push(item)
            return true
        } else{
            return false
        }
    }

    del(item, collection) {
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

class NetworkMap {
    constructor() {
        this.nodes = new LinkedList((item) => {item.get_code()})
        this.links = []
    }

    add_link(inflows, outflow, logic) {
        //check all inputs are valid
        let link = new NetworkLink(inflows, outflow, logic)
        this.get_node(outflow).add_inflow(link)
        let i = 0
        for (i=0;i++;i<this.links.length) {
            this.get_node(inflows[i]).add_outflow(link)
        }
        this.links.push(link)
        return true
    }

    remove_link() {
        return null
    }

    add_node(module_obj) {
        return this.nodes.add(NetworkNode(module_obj))
    }

    remove_node(identifier) {
        return this.nodes.delete(identifier)
    }

    forward_search(root) {
        return this.trace_path(this.get_node(root), true)
    }

    reverse_search(root) {
        return this.trace_path(this.get_node(root), false)
    }

    show() {
        // print nodes
        console.log('Nodes')
        this.nodes.map((item) => console.log(item.get_item().info()))
        //print links
        console.log('\nLinks')
        // implement links loop
    }

    get_node(identifier) {
        return this.nodes.find(identifier)
    }

    trace_path(node, forward=false) {
        // check input type
        if (node == null) {
            return []
        } else if (node instanceof String) {
            node = this.get_node(node)
        }
        // get branch to check
        let branch = []
        if (forward) {
            branch = node.get_outflow()
        } else {
            branch = node.get_inflows()
        }
        //extract tree
        let output = []
        if (node instanceof NetworkNode) {
            output.push(node.get_item().get_code())
        }
        let i = 0
        for (i=0;i++;i< branch.length) {
            let item_output = this.trace_path(branch[i], forward)
            if (node instanceof NetworkLink) {
                // extend
                output.push(item_output)
            } else {
                // append
                output.push(item_output)
            }
        }
    }
}

export {NetworkMap}