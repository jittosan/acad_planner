import { LinkedList } from './helper.js'

class ModuleInformation {
    // mod_info= (code, name, credits)
    constructor(mod_info) {
        this.code = mod_info[0]
        this.name = mod_info[1]
        this.credits = mod_info[2]
    }

    get_code() {
        return this.code
    }

    set_code(code) {
        this.code = code
    }

    get_name() {
        return this.name
    }

    set_name(name) {
        this.name = name
    }

    get_credits() {
        return this.credits
    }

    set_credits(credits) {
        this.credits = credits
    }

    info() {
        return `${this.code} - ${this.name} (${this.credits}MC)`
    }
}

class ModuleCollection {
    constructor() {
        this.modules = new LinkedList((item) => {return item.get_code()})
    }

    add(mod_info, raw_node=false) {
        if (raw_node) {
            mod_info = ModuleInformation(mod_info)
        }
        return this.modules.add(mod_info)
    }

    find(module_code) {
        return this.modules.find(module_code)
    }

    remove(module_code){
        return this.modules.delete(module_code)
    }

    cap() {
        //compute cap
        return 0
    }
    empty() {
        return this.modules.empty()
    }

    show_contents(){
        this.modules.map((item) => console.log(item.info()))
    }
}

export {ModuleInformation, ModuleCollection}