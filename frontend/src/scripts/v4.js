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

// DATA STORAGE CLASS
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

class DataStore {
    constructor(data){
        this.nodes = {}
        this.links  = []
        if (data!==undefined) {this.initialise(data)}
    }

    initialise(moduleData) {
        Object.keys(moduleData).map((item) => this.addNode(item, moduleData[item]))
        // link preclusions, etc.
    }

    // data methods for Node
    addNode(code, item) {
        if (!this.checkNode(code)) {
            this.nodes[code] = new Node(item)
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
        return this.nodes[code] !== undefined
    }

    // data methods for Link


    // graph methods
}

// SCHEDULING CLASS
class Schedule {
    constructor(rawData) {
        this.name = rawData.name
        this.data = rawData.semesters
    }

    addSemester(name) {
        // check duplicate name?
        let newSem = {
            name:name, 
            modules:[]
        }
        this.data.push(newSem)
        return true
    }

    removeSemester(index) {
        this.data.splice(index, 1)
        return true
    }

    addModule(code, semIndex) {
        let semObj = this.data[semIndex]
        semObj.modules.push(code)
        return true
    }

    removeModule(code, semIndex) {
        let semObj = this.data[semIndex]
        semObj.modules.splice(semObj.modules.indexOf(code),1)
        return true
    }

    getData() {
        return this.data
    }

    flatten() {
        let output = []
        this.data.map((item) => {return output = output.concat(item.modules)})
        return output
    }
}


// ACADEMIC REQUIREMENT CLASS
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
            // console.log('BP', checkFn)
            let tracker = {
                completed:false,
                number:0,
                credit:0
            }
            // if endpoint
            if (currentNode.type ==="node" && currentNode.logic===".") {
                // MATCH CODE WITH MODLIST, REPEAT IF XX IN CODE UNTIL NULL / CRITERIA MET
                let matchIndex = null
                do {
                    // console.log('LOG', checkCanRepeat(currentNode.modules[0]), checkFn!==undefined)
                    matchIndex = findMatch(currentNode.modules[0])
                    if (matchIndex!==null) {
                        // check current addition will not overload maximum limits
                        let moduleCode = modList[matchIndex]
                        currentNode['match'].push(moduleCode)
                        modList.splice(matchIndex, 1)
                        tracker.number++
                        if (this.db!==undefined && this.db[moduleCode]!==undefined) {
                            // console.log('CREDITS FOUND', )
                            tracker.credit += parseInt(this.db[moduleCode]["moduleCredit"])
                        }
                    }
                } while (checkCanRepeat(currentNode.modules[0]) && matchIndex!==null && (checkFn!==undefined && !checkFn(tracker.number, tracker.credit)))
                tracker.completed = currentNode.match.length!==0
                // console.log('ENDPOINT', currentNode.match, tracker, checkFn)
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
                        let result = verifyHelper(currentNode.modules[i], checkFn)
                        testLogic = testLogic && result.completed
                        tracker.number += result.number
                        tracker.credit += result.credit
                    }
                    tracker.completed = testLogic
                    // console.log('AND NODE', tracker, currentNode.modules)
                    return tracker
                } else {
                    // if OR node, check any children is true
                    let testLogic = false
                    for (let i=0;i<currentNode.modules.length;i++) {
                        // if checkFn satsfied, exit loop
                        if (checkFn!==undefined && checkFn(tracker.number, tracker.credit)) {
                            break
                        }
                        let result = verifyHelper(currentNode.modules[i], checkFn)
                        testLogic = testLogic || result.completed
                        tracker.number += result.number
                        tracker.credit += result.credit
                        
                    }
                    tracker.completed = testLogic
                    // console.log('OR NODE', tracker, currentNode.modules)
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
                // if categpry/main/group node, treat as OR node to check any children is true (CONSIDER SWITCHING TO AND)
                // console.log('START GRP')
                let testLogic = true
                for (let i=0;i<currentNode.modules.length;i++) {
                    // if checkFn satsfied, exit loop
                    if (currCheckFn!==undefined && currCheckFn(tracker.number, tracker.credit)) {
                        break
                    }
                    let result = verifyHelper(currentNode.modules[i], currCheckFn)
                    testLogic = testLogic && result.completed
                    tracker.number += result.number
                    tracker.credit += result.credit
                    
                }
                if (currCheckFn!==undefined) {
                    tracker.completed = currCheckFn(tracker.number, tracker.credit)
                } else {
                    tracker.completed = testLogic
                }
                // console.log('GRP NODE', tracker, currentNode.modules)
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

// MAIN PLANNER CLASS
class Planner {
    constructor(modData, scheduleList, acadList, selectIndex) {
        this.db = new DataStore(modData) // DataStore
        this.schedules = scheduleList.map((item) => new Schedule(item)) // Array of Schedule
        this.selectedSchedule = selectIndex
        this.acad = acadList.map((item) => new AcademicRequirement(item, this.db.data))  // Array of AcademicRequirement
        this.moduleMap = {}
    }

    // == Database Methods ==
    getModuleInfo(code) {
        return this.db.getData(code)
    }

    // == Scheduling Methods == 
    selectSchedule(index) {
        // check valid index first
        this.selectedSchedule = index
    }

    getSchedule() {
        return this.schedules[this.selectedSchedule]
    }

    getAllSchedules() {
        return this.schedules
    }

    getScheduleData(semIndex) {
        if (semIndex===undefined) {
            semIndex= this.selectedSchedule
        }
        return this.schedules[semIndex].getData()
    }

    // SEMESTER MANIPULATION METHODS

    addSemester(name) {
        return this.getSchedule().addSemester(name)
    }

    removeSemester(index) {
        return this.getSchedule().removeSemester(index)
    }

    addModule(code, semIndex) {
        return this.getSchedule().addModule(code, semIndex)
    }

    removeModule(code, semIndex) {
        return this.getSchedule().removeModule(code, semIndex)
    }

    // == Academic Requirement Methods ==

    refresh(){
        let moduleMap = {}
        this.schedules[this.selectedSchedule].flatten().map((item) => moduleMap[item]=[])
        return moduleMap
    }

    verify() {
        return this.acad.map((item) => item.verify(this.getSchedule().flatten()))
    }

}

export default Planner