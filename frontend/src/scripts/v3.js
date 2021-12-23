import modData from '../data/modData.json'

// define new v3.0 structures


// HELPER FUNCTIONS
const checkCollection = (item, collection) => {
    return collection.includes(item)
}

const appendCollection = (item, collection) => {
    // append if not duplicate item in collection
    if (checkCollection(item, collection)) {
        collection.push(item)
        return true
    } else {
        return false
    }
}

const removeCollection = (item, collection) => {
    // remove item if it exists in collection
    if (checkCollection(item, collection)) {
        collection.splice(collection.indexOf(item), 1)
        return true
    } else {
        return false
    }
}

// STORAGE COMPONENTS

class Node {
    constructor(item, inflow, outflow, preclusion){
        this.item = item
        this.inflow = inflow
        this.outflow = outflow
        this.preclusion = preclusion
    }

    // getter/setter methods
    getItem(){
        return this.item
    }

    setItem(item) {
        this.item = item
        return true
    }
    
    getInflow(){
        return this.inflow
    }

    setInflow(inflow) {
        this.inflow = inflow
        return true
    }

    getOutflow(){
        return this.outflow
    }

    setOutflow(outflow) {
        this.outflow = outflow
        return true
    }

    getPreclusion(){
        return this.preclusion
    }

    setPreclusion(preclusion) {
        this.preclusion = preclusion
        return true
    }

    // data entry methods
    addInflow(item) {
        return appendCollection(item, this.inflow)
    }

    removeInflow(item) {
        return removeCollection(item, this.inflow)
    }

    addOutflow(item) {
        return appendCollection(item, this.outflow)
    }

    removeOutflow(item) {
        return removeCollection(item, this.outflow)
    }

    addPreclusion(item) {
        return appendCollection(item, this.preclusion)
    }

    removePreclusion(item) {
        return removeCollection(item, this.preclusion)
    }
}

class Link {
    // inflow is an Array of items, outflow is a singular item
    constructor(logic, inflow, outflow) {
        this.logic = logic
        this.inflow=inflow
        this.outflow= outflow
    }

    // getter/setter methods
    getLogic(){
        return this.logic
    }

    setLogic(logic) {
        this.logic = logic
        return true
    }
    
    getInflow(){
        return this.inflow
    }

    setInflow(inflow) {
        this.inflow = inflow
        return true
    }
    getOutflow(){
        return this.outflow
    }

    setOutflow(outflow) {
        this.outflow = outflow
        return true
    }

    // data entry methods
    addInflow(item) {
        return appendCollection(item, this.inflow)
    }

    removeInflow(item) {
        return removeCollection(item, this.inflow)
    }

}

class DataStore {
    constructor(){
        this.nodes = modData
        this.links  = []
    }

    // data methods for Node
    addNode(code, item) {
        if (!this.checkNode(code)) {
            this.nodes[code] = Node(item)
            return true
        } else {
            return false
        }
    }
    
    removeNode(code) {
        if (this.checkNode(code)){
            delete this.nodes[code]
            return true
        } else {
            return false
        }
    }
    
    getNode(code) {
        return this.nodes[code]
    }

    getData(code){
        if (this.checkNode(code)) {
            return this.getNode(code).getItem()
        } else {
            return null
        }
    }

    checkNode(code) {
        return this.nodes[code] !== null
    }

    // data methods for Link


    // graph methods
}

export {DataStore}