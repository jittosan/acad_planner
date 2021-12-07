class Node {
    constructor(item){
        this.item = item;
        this.prev = null;
        this.next = null;
    }

    get_item(){
        return this.item
    }

    set_item(item){
        this.item = item
    }

    get_prev() {
        return this.prev
    }

    set_prev(prev){
        this.prev = prev
    }

    get_next() {
        return this.next
    }

    set_next(next){
        this.next = next
    }
}

export class LinkedList {
    constructor(ident_fn) {
        this.root = null;
        this.ident_fn = ident_fn
    }

    add(item){
        // add as root if list is empty
        if (this.empty()) {
            this.root = new Node(item)
            this.root.set_next(this.root)
            this.root.set_prev(this.root)
            return true
        } else {
            // check duplicate
            if (this.find(this.ident_fn(item)) != null) {
                return false
            }
            // add to end of list
            let new_node = new Node(item)
            let last_node = this.root.get_prev()
            last_node.set_next(new_node)
            new_node.set_prev(last_node)
            new_node.set_next(this.root)
            this.root.set_prev(new_node)
            return true
        }
    }

    find(identifier, raw_node=false){
        // return null if list empty
        if (this.empty()) {
            return null;
        }   
        // check if root is the node to be found
        if (this.ident_fn(this.root.get_item()) == identifier) {
            return this.root
        }
        // loop through rest of nodes
        let cur_node = this.root
        do {
            if (this.ident_fn(cur_node.get_item()) == identifier) {
                if (raw_node) {return cur_node} else {return cur_node.get_item()}
            } else {
                cur_node = cur_node.get_next();
            }
        } while (cur_node != this.root)

        // return null if identifier not found in list
        return null
    }

    delete(identifier){
        // check identifier exists in list
        let del_node = this.find(identifier)
        if (del_node == null) {return false}
        // check if del_node is the last element
        if (this.single()) {
            this.root = null
            return true
        }
        // remove del_node
        let prev_node = del_node.get_prev()
        let next_node = del_node.get_next()
        prev_node.set_next(next_node)
        next_node.set_prev(prev_node)
        // update root if del_node is the root
        if (del_node == this.root) {
            this.root = del_node.get_next()
        }
        return true
    }


    empty(){
        return (this.root == null)
    }

    single() {
        return (this.root.get_next() == this.root)
    }

    size(){
        // check empty
        if (this.empty()) {
            return 0
        } else {
            // iterate through all nodes
            let count = 0
            let cur_node = this.root
            do {
                count += 1
                cur_node = cur_node.get_next()
            } while (cur_node != this.root)
            return count
        }
    }

    map(fn) {
        let output = []
        //check list empty
        if (this.empty()) {
            return output
        }
        //map through nodes and store output
        let cur_node = this.root
        do {
            output += [fn(cur_node.get_item())]
            cur_node = cur_node.get_next()
        } while (cur_node != this.root)
        return output
    }
}

// let a = new LinkedList((item) => {return item})
// a.add(1)
// console.log(a.size())
// a.add(3)
// console.log(a.size())
// a.delete(1)
// console.log(a.size())
// console.log('find 1')
// console.log(a.find(1))
// console.log('find 3')
// console.log(a.find(3))
// console.log('test')
// a.add(4)
// a.add(7)
// a.add(97)
// a.map((item) => {console.log(item)})