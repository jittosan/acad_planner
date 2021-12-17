import {ModuleCollection} from './module_content.js'

class Database extends ModuleCollection {
    constructor() {
        super()
    }

    add_module(mod_info) {
        return this.modules.add(mod_info)
    }

    find_module(mod_info) {
        return this.modules.find(mod_info)
    }

    remove_module(mod_info) {
        return this.modules.remove(mod_info)
    }
}

class Course extends ModuleCollection {
    constructor(name='') {
        super()
        this.name = name
    }

    get_name() {
        return this.name
    }

    set_name(name) {
        this.name = name
    }

    add_module(mod_info) {
        return this.modules.add(mod_info)
    }

    find_module(mod_info) {
        return this.modules.find(mod_info)
    }

    remove_module(mod_info) {
        return this.modules.remove(mod_info)
    }

    compute_cap() {
        return this.modules.compute_cap()
    }

    info() {
        console.log(`COURSE: ${this.name}`)
        this.modules.map((item) => {item.info()})
    }
}

class Semester extends ModuleCollection {
    constructor(num=0) {
        super()
        this.num = num
    }

    get_num() {
        return this.num
    }

    set_num(num) {
        this.num = num
    }

    add_module(mod_info) {
        return this.modules.add(mod_info)
    }

    find_module(mod_info) {
        return this.modules.find(mod_info)
    }

    remove_module(mod_info) {
        return this.modules.remove(mod_info)
    }

    compute_cap() {
        return this.modules.compute_cap()
    }

    info() {
        console.log(`SEMESTER: ${this.num}`)
        this.modules.map((item) => {item.info()})
    }
}

class AcademicRequirement extends ModuleCollection {
    constructor(name='') {
        super()
        this.name = name
    }

    get_name() {
        return this.name
    }

    set_name(name) {
        this.name = name
    }

    add_module(mod_info) {
        return this.modules.add(mod_info)
    }

    find_module(mod_info) {
        return this.modules.find(mod_info)
    }

    remove_module(mod_info) {
        return this.modules.remove(mod_info)
    }

    info() {
        console.log(`REQUIREMENT: ${this.name}`)
        this.modules.map((item) => {item.info()})
    }
}

//SCHEDULE CLASS


export {Database as DataStore, Semester, AcademicRequirement}