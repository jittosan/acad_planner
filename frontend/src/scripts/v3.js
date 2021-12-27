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
        this.nodes = {}
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

// SCHEDULE COMPONENTS

class Schedule {
    constructor(data, update) {
        this.data = data
        this.update = update
    }

    addSemester(name) {
        // check duplicate name?
        let newSem = {
            name:name, 
            modules:[]
        }
        this.data.push(newSem)
        this.update(this.data)
        return true
    }

    removeSemester(index) {
        this.data.splice(index, 1)
        this.update(this.data)
        return true
    }

    addModule(code, semIndex) {
        let semObj = this.data[semIndex]
        semObj.modules.push(code)
        this.update(this.data)
        return true
    }

    removeModule(code, semIndex) {
        let semObj = this.data[semIndex]
        semObj.modules.splice(semObj.modules.indexOf(code),1)
        this.update(this.data)
        return true
    }

    getData() {
        return this.data
    }
}

// ACADEMIC REQUIREMENT COMPONENTS
// { 'group' / 'node' / 'category' } if node: logic : 'and' / 'or' / '.'

class AcademicRequirement {
    constructor(reqData) {
        this.data = reqData 
        this.initialise(this.data)
    }

    // getter/setter methods
    getData() { 
        return this.data
    }

    setData(data) {
        this.data = data
    }

    // PREPROCESSING METHODS
    initialise(currentNode) {
        // define match property for endpoint nodes, and end function
        if (currentNode.type ==="node" && currentNode.logic===".") {
            currentNode['match'] = []
        } else {
            // define criteria boolean for category/group nodes
            if (currentNode.type!=="node") {
                // create criteria segment if not defined
                if (!currentNode.criteria) {
                    currentNode['criteria'] = {met:false}
                } else {
                    currentNode.criteria['met'] = false
                }
            }
            // continue recursing through nodes
            for (let i=0;i<currentNode.modules.length;i++) {
                this.initialise(currentNode.modules[i])
            }
        }
    }

    // VALIDATION METHODS
    compare(requirement, module) {
        // check valid format for module codes
        if (!this.isValid(requirement) || !this.isValid(module)) {
            return false
        }
        // iterate through and match codes, with X as null char
        for (let i=0; i < Math.min(requirement.length, module.length); i++){
            if (requirement[i] !== module[i] && requirement[i] !== 'X') {
                return false
            }
        }
        return true
    }

    isValid(code) {
        //check code is valid module code
        return true
    }

    match(modList) {
        // define helper functions
        const findMatch = (item, collection) => {
            for (let i=0;i<collection.length;i++) {
                if (this.compare(item, collection[i])) {
                    return i
                }
            }
            return null
        }
        // direct match modules
        const matchHelper = (currentNode) => {
            // if endpoint
            if (currentNode.type ==="node" && currentNode.logic===".") {
                // find direct matching module
                let matchedCodeIndex = findMatch(currentNode.modules[0], modList)
                // check if criteria met for number/credits
                // attach to endpoint and drop from modList once matched
                if (matchedCodeIndex !== null) {
                    currentNode['match'].push(modList[matchedCodeIndex])
                    modList.splice(matchedCodeIndex, 1)
                }
            } else {
                // recurse through structure if not endpoint
                for (let i=0;i<currentNode.modules.length;i++) {
                    matchHelper(currentNode.modules[i])
                }
            }
        }

        // execute direct matching
        matchHelper(this.data)
        // execute preclusion checks
    }

    verify() {
        // recurse through nodes to check whether conditions are met or not
        // define verification function
        const verifyEndpoint = (endpoint) => {
            return endpoint.match!==[]
        }
        const verifyCollection = (collection) => {
            return false
        }
        const verifyNode = (node) => {
            return false
        }
        // direct match modules
        const verifyHelper = (currentNode) => {
            // CONSIDER ADDITIONAL CRITERIA OF NUMBER/CREDITS
            // if endpoint
            if (currentNode.type ==="node" && currentNode.logic===".") {
                console.log('end', currentNode.match.length !== 0, currentNode.match, currentNode.modules)
                return currentNode.match.length !== 0
            // if and/or node
            } else if (currentNode.type==="node") {
                if (currentNode.logic==="and") {
                    // if and node, check all children are true
                    let testLogic = true
                    for (let i=0;i<currentNode.modules.length;i++) {
                        testLogic = testLogic && verifyHelper(currentNode.modules[i])
                    }
                    console.log('and', testLogic, currentNode.modules)
                    return testLogic
                } else {
                    // if or node, check any children is true
                    let testLogic = false
                    for (let i=0;i<currentNode.modules.length;i++) {
                        testLogic = testLogic || verifyHelper(currentNode.modules[i])
                    }
                    console.log('or', testLogic, currentNode.modules)
                    return testLogic
                }
            } else {
                // recurse through structure if not endpoint
                for (let i=0;i<currentNode.modules.length;i++) {
                    return verifyHelper(currentNode.modules[i])
                }
            }
        }

        // execute direct matching
        return verifyHelper(this.data)
    }

    // DATA EXTRACTION METHODS

    // return list of modules used to satisfy the requirements
    flatten() {
        const flattenHelper = (currentNode) => {
            let output = []
            // if endpoint
            if (currentNode.type ==="node" && currentNode.logic===".") {
                // find direct matching module
                output = output.concat(currentNode.match)
            } else {
                // recurse through structure if not endpoint
                for (let i=0;i<currentNode.modules.length;i++) {
                    output = output.concat(flattenHelper(currentNode.modules[i]))
                }
            }
            return output
        }

        return flattenHelper(this.data)
    }

    
}


export {DataStore, Schedule, AcademicRequirement}