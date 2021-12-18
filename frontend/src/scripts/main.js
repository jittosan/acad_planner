import {NetworkMap} from './network.js';
import {DataStore} from './mod_structs.js';
import { loadWebHook } from './webhook.js';

// let n = new NetworkMap()
// n.show()

let db = new DataStore()
// db.info()

console.log('WebHook Testing')
let d = loadWebHook()
console.log(d)

let a = 2
a++
console.log(a)