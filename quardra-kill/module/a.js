var defaultParams = {
    name: 1,
    getName: function() {
        return defaultParams.name;
    },
    setName: function(name) {
        defaultParams.name = name;
        return defaultParams.name;
    }
}

module.export =  {
    getName: defaultParams.getName,
    setName: defaultParams.setName
}
