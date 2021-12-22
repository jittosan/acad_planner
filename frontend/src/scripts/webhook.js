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

export {loadWebHook}