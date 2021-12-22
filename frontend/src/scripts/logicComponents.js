import { LinkedList } from "./helper.js"

class Node{
    constructor(modInfo) {
        this.module = modInfo
        this.outflows = []
        this.inflows = []
        this.preclusions = []
    }

    // Define getter/setter methods
    getModule() {
        return this.module
    }

    setModule(modInfo) {
        this.module = modInfo
        return true
    }

    getOutflows() {
        return this.outflows
    }

    setOutflows(outflowsCollection) {
        this.outflows = outflowsCollection
    }

    getInflows() {
        return this.inflows
    }

    setInflows(inflowsCollection) {
        this.inflows = inflowsCollection
    }

    getPreclusions() {
        return this.preclusions
    }

    setPreclusions(preclusionsCollection) {
        this.preclusions = preclusionsCollection
    }

    // Link Manipulation Methods
    appendCollection(item, collection) {
        collection.push(item)
    }

    addInflow(newInflow) {
        this.appendCollection(newInflow, this.inflows)
    }

    addOutflow(newOutflow) {
        this.appendCollection(newOutflow, this.outflows)
    }

    addPreclusion(newPreclusion) {
        this.appendCollection(newPreclusion, this.preclusions)
    }

    // Data Methods
    getCode() {
        return this.module
    }
}

class Link {
    // logic:True = &&, logic:False = ||
    constructor(inputs, output, logic=false) {
        this.logic = logic
        this.inputs = inputs
        this.output = output
    }

    getLogic() {
        return this.logic
    }

    setLogic(logic) {
        this.logic = logic
    }

    getOutflow() {
        return this.outflows
    }

    setOutflow(outflow){
        this.outflow = outflow
    }

    getInflow(){
        return this.inflows
    }

    // add in inputs one at a time, possible to extend to multiple one-shot
    addInflow(link) {
        // check duplicate
        if (!this.inputs.includes(link)) {
            this.inputs.push(link)
            return true
        } else {
            return false
        }
    }

    delInflow(link){
        if (this.inputs.includes(link)) {
            this.inputs.splice(this.inputs.indexOf(link), 1)
            return true
        } else {
            return false
        }
    }
}

class DataStore {
    constructor() {
        this.nodes = new LinkedList((item) => {return item.getCode()})
        this.links = []
    }

    // Link Methods
    addLink(inflows, outflow, logic) {
        //check all inputs are valid
        let link = new Link(inflows, outflow, logic)
        this.get_node(outflow).add_inflow(link)
        let i = 0
        for (i=0;i++;i<this.links.length) {
            this.get_node(inflows[i]).add_outflow(link)
        }
        this.links.push(link)
        return true
    }
}

export {DataStore}