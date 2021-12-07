class Node {
    constructor(item){
        this.item = item;
        this.prev = none;
        this.next = none;
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

class LinkedList {
    constructor(ident_fn) {
        this.root = none;
        this.ident_fn = ident_fn
    }

    add(item){
        // add as root if list is empty
        if (this.empty) {
            this.root = Node(item)
            this.root.set_next(this.root)
            this.root.set_prev(this.root)
            return true
        } else {
            // check duplicate
            if (this.find(this.ident_fn(item)) != none) {
                return false
            }
            // add to end of list
            new_node = Node(item)
            last_node = this.root.get_prev()
            last_node.set_next(new_node)
            new_node.set_prev(last_node)
            new_node.set_next(this.root)
            this.root.set_prev(new_node)
            return true
        }
    }

    find(identifier, raw_node=false){
        // return none if list empty
        if (this.empty()) {
            return none;
        }   
        // check if root is the node to be found
        if (this.ident_fn(this.root.get_item()) == identifier) {
            return this.root
        }
        // loop through rest of nodes
        cur_node = this.root

        do {
            if (this.ident_fn(cur_node.get_item()) == identifier) {
                if (raw_node) {return cur_node} else {return cur_node.get_item()}
            } else {
                cur_node = cur_node.get_next();
            }
        } while (cur_node != this.root)

        // return none if identifier not found in list
        return none
    }

    delete(identifier){
        // check identifier exists in list
        del_node = this.find(identifier)
        if (del_node == none) {return false}
        // check if del_node is the last element
        if (this.size() == 1) {
            this.root = none
            return true
        }
        // remove del_node
        prev_node = del_node.get_prev()
        next_node = del_node.get_next()
        prev_node.set_next(next_node)
        next_node.set_prev(prev_node)
        return true
    }

    empty() {
        return this.root == none;
    }

    size() {
        // check empty
        if (this.empty()) {
            return 0
        } else {
            // iterate through all nodes
            count = 0
            cur_node = this.root
            do {
                count += 1
                cur_node = cur_node.get_next()
            } while (cur_node != this.root)
            return count
        }
    }

    map() {
        return 1;
    }
}