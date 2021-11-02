var defaultParams = {
    var obj = { 
        name: 1
    },
    getName () {
        return obj.name;
    },
    setName() {
        name = obj.name;
        return name;
    }
}

module.export =  {
    defaultParams.getName(),
    defaultParams.setName();
}