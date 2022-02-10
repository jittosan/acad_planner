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
        this.semesters = rawData.semesters
    }

    addSemester(name) {
        // check duplicate name?
        let newSem = {
            name:name, 
            modules:[]
        }
        this.semesters.push(newSem)
        return true
    }

    removeSemester(index) {
        this.semesters.splice(index, 1)
        return true
    }

    addModule(code, semIndex) {
        let semObj = this.semesters[semIndex]
        semObj.modules.push(code)
        return true
    }

    removeModule(code, semIndex) {
        let semObj = this.semesters[semIndex]
        semObj.modules.splice(semObj.modules.indexOf(code),1)
        return true
    }

    getSemester(index) {
        return this.semesters[index]
    }

    flatten() {
        let output = []
        this.semesters.map((item) => {return output = output.concat(item.modules)})
        return output
    }
}


// ACADEMIC REQUIREMENT CLASS
// { 'group' / 'node' / 'category' } if node: logic : 'and' / 'or' / '.'

class AcademicRequirement {
    constructor(reqData, modData) {
        this.data = reqData 
        this.db = modData
        this.initialise()
    }

    // getter/setter methods
    getData() { 
        return this.data
    }

    setData(data) {
        this.data = data
    }

    getName() {
        return this.getData().name
    }

    // PREPROCESSING METHODS
    initialise() {
        //define helper function
        const initialiseHelper = (currentNode) => {
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
                    initialiseHelper(currentNode.modules[i])
                }
            }
        }
        
        initialiseHelper(this.data)
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

    // PROCESSING METHODS
    verify(moduleMap) {
        // tracking double counting
        let doubleCountTracker = 0
        const withinDoubleCount = (credits) => {
            return (doubleCountTracker+credits) <= this.data.doubleCount
        }
        const updateDoubleCount = (credits) => {
            doubleCountTracker += credits
        }
        const checkDoubleCount = (code) => {
            // check if other requirements used
            return (moduleMap[code].length-checkModuleUsed(code))>0
        }
        // track if module already accounted for in current requirement
        const checkModuleUsed = (code) => {
            // check current req not alr used
            // console.log('CHECKING ', code)
            let currentReq = false
            moduleMap[code].map((item) => currentReq=currentReq||(item!==undefined && item===this))
            return currentReq
        }
        // is repeated
        const checkCanRepeat = (item) => {
            return item.includes('X')
        }
        // get MCs of module, else default to 0
        const getModuleCredits = (code) =>{
            if (this.db!==undefined && this.db.getData(code)!==null && this.db.getData(code)["moduleCredit"]!==undefined) {
                return parseInt(this.db.getData(code)["moduleCredit"])
            } else {
                return 0
            }
        }
        // find a corresponding module match in modlist based of item requirement
        const findMatch = (item) => {
            // console.log('MATCHING', item)
            let keys = Object.keys(moduleMap)
            for (let i=0;i<keys.length;i++) {
                // if module not already use to satisfy current req, and matches requirement
                if (!checkModuleUsed(keys[i]) && this.compare(item, keys[i])) {
                    return keys[i]
                }
            }
            // console.log('NULL FOUND')
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
                // reset match on first entering node
                currentNode.match.length = 0
                let moduleCode = null
                do {
                    // console.log('LOG', checkCanRepeat(currentNode.modules[0]), checkFn!==undefined)
                    moduleCode = findMatch(currentNode.modules[0])
                    if (moduleCode!==null) {
                        // get no of MCs of module, if defined
                        let moduleCredits = getModuleCredits(moduleCode)
                        // console.log('FOUND', moduleCode, moduleCredits)
                        if (checkDoubleCount(moduleCode)) {
                            if (withinDoubleCount(moduleCredits)) {
                                updateDoubleCount(moduleCredits)
                                // match
                                currentNode['match'].push(moduleCode)
                                moduleMap[moduleCode].push(this)
                                tracker.number++
                                tracker.credit+=moduleCredits
                            }
                        } else {
                            //match
                            currentNode['match'].push(moduleCode)
                            moduleMap[moduleCode].push(this)
                            tracker.number++
                            tracker.credit+=moduleCredits
                        }
                    }
                } while (checkCanRepeat(currentNode.modules[0]) && moduleCode!==null && (checkFn!==undefined && !checkFn(tracker.number, tracker.credit)))
                tracker.completed = currentNode.match.length!==0
                currentNode.completed = tracker.completed
                // console.log('ENDPOINT', currentNode.match, tracker, checkFn)
                return tracker
            // if branching node
            } else {
                let currCheckFn
                // check for criteria to define checkFn
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
                let testLogic
                // AND logic as default, OR logic for or-nodes
                if (currentNode.type==="node" && currentNode.logic==="or") {
                    testLogic = false
                } else {
                    testLogic = true
                }
                for (let i=0;i<currentNode.modules.length;i++) {
                    // if checkFn satsfied, exit loop
                    if (currCheckFn!==undefined && currCheckFn(tracker.number, tracker.credit)) {
                        break
                    }
                    let result = verifyHelper(currentNode.modules[i], currCheckFn)
                    // AND logic as default, OR logic for or-nodes
                    if (currentNode.type==="node" && currentNode.logic==="or") {
                        testLogic = testLogic || result.completed
                    } else {
                        testLogic = testLogic && result.completed
                    }
                    tracker.number += result.number
                    tracker.credit += result.credit
                    
                }
                if (currCheckFn!==undefined) {
                    tracker.completed = currCheckFn(tracker.number, tracker.credit) && testLogic
                } else {
                    tracker.completed = testLogic
                }
                currentNode.completed = tracker.completed
                // console.log('GRP NODE', tracker, currentNode.modules)
                return tracker
            }
        }

        // execute direct matching
        let o = verifyHelper(this.data).completed
        // console.log(doubleCountTracker, this.data.name)
        return o
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
    constructor(modData, scheduleList, acadList, selectIndex, callback) {
        this.db = new DataStore(modData) // DataStore
        this.schedules = scheduleList.map((item) => new Schedule(item)) // Array of Schedule
        this.selectedSchedule = selectIndex
        this.acad = acadList.map((item) => new AcademicRequirement(item, this.db))  // Array of AcademicRequirement
        this.moduleMap = {}
        this.acadMap = []
        if (callback!==undefined) {
            this.callbacks = [callback]
        } else {
            this.callbacks = []
        }
        this.refresh()
        this.attachCallback(()=>this.refresh())
    }

    // Callback methods
    attachCallback(fn) {
        this.callbacks.push(fn)
    }

    runCallback() {
        this.callbacks.map((item) => {if (item!==undefined) {return item()} else {return null}})
    }

    // == Database Methods ==
    getModuleInfo(code) {
        return this.db.getData(code)
    }

    // == Scheduling Methods == 
    selectSchedule(index) {
        // check valid index first
        this.selectedSchedule = index
        this.runCallback()
    }

    getSelectedScheduleIndex() {
        return this.selectedSchedule
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

    getSemester(index) {
        return this.getSchedule().getSemester(index)
    }

    addSemester(name) {
        let output = this.getSchedule().addSemester(name)
        this.runCallback()
        return output
    }

    removeSemester(index) {
        let output = this.getSchedule().removeSemester(index)
        this.runCallback()
        return output
    }

    addModule(code, semIndex) {
        let output = this.getSchedule().addModule(code, semIndex)
        this.runCallback()
        return output
    }

    removeModule(code, semIndex) {
        let output = this.getSchedule().removeModule(code, semIndex)
        this.runCallback()
        return output
    }

    // == Academic Requirement Methods ==

    getRequirement(index) {
        if (index>=0 && index<=this.acad.length) {
            return this.acad[index]
        } else {
            return null
        }
    }

    getAllRequirements() {
        return this.acad
    }

    refresh(){
        this.schedules[this.selectedSchedule].flatten().map((item) => this.moduleMap[item]=[])
        this.acadMap = this.acad.map((item) => item.verify(this.moduleMap))
        console.log('CURRENT STATE')
        console.log(this.moduleMap)
    }

    verify(index) {
        return this.acadMap[index]
    }

    getModuleMap(code) {
        if (code===undefined) {
            return this.moduleMap
        } else if (this.moduleMap[code]!==undefined) {
            return this.moduleMap[code]
        }
    }

}

export default Planner