async function loadWebHook() {
    let moduleList = []
    let acadYear = '2020-2021'
    moduleList = await fetch('https://api.nusmods.com/v2/' + acadYear +'/moduleList.json')
    .then(item => item.json())
    
    return moduleList
}

export {loadWebHook}