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