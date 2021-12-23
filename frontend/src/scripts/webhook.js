import modData from '../data/modData.json'

async function loadWebHook(callback) {
    let moduleList = []
    let acadYear = '2020-2021'
    moduleList = await fetch('https://api.nusmods.com/v2/' + acadYear +'/moduleList.json')
    .then(item => item.json()).then(data => callback(data))
    // console.log(moduleList)
    return moduleList

    // call API to retrieve raw data
    // parse raw data
    // load into collections
    // return collection through callback(data)





}

async function initialiseData(callback) {
    let acadYear = '2020-2021'
    let output = {}
    // get list of modules in AY
    fetch('https://api.nusmods.com/v2/' + acadYear +'/moduleList.json')
    .then((response) => response.json())
    .then((response) => response.map(
        (item) => fetch('https://api.nusmods.com/v2/' + acadYear + '/modules/' + item.moduleCode + '.json').then((response) => response.json()).then((response) => output[item.moduleCode] = response)
    ))
    .then((data) => callback(data))
}

const loadData = () => {
    return modData
}

export {loadWebHook, initialiseData, loadData}