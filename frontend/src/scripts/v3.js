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
    constructor(reqData, modData) {
        this.data = reqData 
        this.db = modData
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
                // if XX present in code, loop to keep matching untill null/criteria met
                // attach to endpoint and drop from modList once matched
                if (matchedCodeIndex !== null) {
                    currentNode['match'].push(modList[matchedCodeIndex])
                    modList.splice(matchedCodeIndex, 1)
                }
            } else {
                // recurse through structure if not endpoint
                // process criteria if present and pass down
                for (let i=0;i<currentNode.modules.length;i++) {
                    matchHelper(currentNode.modules[i])
                }
            }
        }

        // execute direct matching
        matchHelper(this.data)
        // execute preclusion checks
    }

    verify(modList) {
        // is repeated
        const checkCanRepeat = (item) => {
            return item.includes('X')
        }
        // find a corresponding module match in modlist based of item requirement
        const findMatch = (item) => {
            for (let i=0;i<modList.length;i++) {
                if (this.compare(item, modList[i])) {
                    return i
                }
            }
            return null
        }
        // function to find corresponidng preclusion module in modlist based off item requirement
        // FUNCTION TO BE IMPLEMENTED
        // recurse through nodes to check whether conditions are met or not
        const verifyHelper = (currentNode, checkFn) => {
            console.log('BP', checkFn)
            let tracker = {
                completed:false,
                number:0,
                credit:0
            }
            // if endpoint
            if (currentNode.type ==="node" && currentNode.logic===".") {
                // MATCH CODE WITH MODLIST, REPEAT IF XX IN CODE UNTIL NULL / CRITERIA MET
                do {
                    console.log('LOG', checkCanRepeat(currentNode.modules[0]), checkFn!==undefined)
                    let matchIndex = findMatch(currentNode.modules[0])
                    if (matchIndex!==null) {
                        currentNode['match'].push(modList[matchIndex])
                        modList.splice(matchIndex, 1)
                        tracker.number++
                        if (this.db!==undefined && this.db[currentNode.match]!==undefined) {
                            tracker.credit += parseInt(this.db[currentNode.match]["moduleCredit"])
                        }
                    }
                } while (checkCanRepeat(currentNode.modules[0]) && checkFn!==undefined && checkFn(tracker.number, tracker.credit))
                console.log('END LOG')
                tracker.completed = currentNode.match.length!==0
                console.log('ENDPOINT', currentNode.match, tracker, checkFn)
                return tracker
            // if and/or node
            } else if (currentNode.type==="node") {
                if (currentNode.logic==="and") {
                    // if AND node, check all children are true
                    let testLogic = true
                    for (let i=0;i<currentNode.modules.length;i++) {
                        // if checkFn satsfied, exit loop
                        if (checkFn!==undefined && checkFn(tracker.number, tracker.credit)) {
                            break
                        }
                        let result = verifyHelper(currentNode.modules[i])
                        testLogic = testLogic && result.completed
                        tracker.number += result.number
                        tracker.credit += result.credit
                    }
                    tracker.completed = testLogic
                    console.log('AND NODE', tracker, currentNode.modules, checkFn)
                    return tracker
                } else {
                    // if OR node, check any children is true
                    let testLogic = false
                    for (let i=0;i<currentNode.modules.length;i++) {
                        // if checkFn satsfied, exit loop
                        if (checkFn!==undefined && checkFn(tracker.number, tracker.credit)) {
                            break
                        }
                        let result = verifyHelper(currentNode.modules[i])
                        testLogic = testLogic || result.completed
                        tracker.number += result.number
                        tracker.credit += result.credit
                        
                    }
                    tracker.completed = testLogic
                    console.log('OR NODE', tracker, currentNode.modules, checkFn)
                    return tracker
                }
            // if category/main/group
            } else {
                let currCheckFn
                // check for criteria for category/main/group
                if (currentNode.criteria!==undefined) {
                    if (currentNode.criteria.number!==undefined) {
                        // compare number
                        currCheckFn = (number, credit) => {return number>=currentNode.criteria.number}
                    } else if (currentNode.criteria.credit!==undefined) {
                        //compare credits
                        currCheckFn = (number, credit) => {return credit>=currentNode.criteria.credit}
                    }
                } else {
                    // if criteria not defined for current layer, pass on from previous layer
                    currCheckFn = checkFn
                }
                // return directly because category/main/group should only have 1 node going out
                // return verifyHelper(currentNode.modules[0], currCheckFn)
                // if categpry/main/group node, treat as OR node to check any children is true
                console.log('START GRP', currCheckFn)
                let testLogic = false
                for (let i=0;i<currentNode.modules.length;i++) {
                    // if checkFn satsfied, exit loop
                    if (currCheckFn!==undefined && currCheckFn(tracker.number, tracker.credit)) {
                        break
                    }
                    let result = verifyHelper(currentNode.modules[i])
                    testLogic = testLogic || result.completed
                    tracker.number += result.number
                    tracker.credit += result.credit
                    
                }
                if (currCheckFn!==undefined) {
                    tracker.completed = currCheckFn(tracker.number, tracker.credit)
                } else {
                    tracker.completed = testLogic
                }
                console.log('GRP NODE', tracker, currentNode.modules, currCheckFn)
                return tracker
            }
        }

        // execute direct matching
        return verifyHelper(this.data).completed
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