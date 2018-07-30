// you can register settings like this before require.js is loaded
var require = {
    baseUrl: '/js/',
    //防止模块化js缓存的版本号，每次上线前修改此版本号
    paths: {
        //第三方框架
        "jquery": "lib/jquery-1.11.1.min",
        "bootstrap": "lib/bootstrap-3.3.0.min",
        "echarts":"lib/echarts.min",
        
        "tree":"views/common/tree",
    },
    shim:{
        "select": {
            deps: ["jquery"]
        },
        "bootstrap": {
            deps: ["jquery"]
        },
        "bootbox": {
            deps: ["jquery", "bootstrap"]
        }
    }
};