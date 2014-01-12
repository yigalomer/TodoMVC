
/*
*  Utils
*
*
* Created by Yigal Omer
* Date: 10-1-2013
*/

// Global function that implement inheritance by copying all
// properties and method from the base
function inherits(base, derived) {

    for ( var property in base ){
        try {
            derived[property] = base[property];
        }
        catch( warning ){}
    }
}

//
//function inherits2(cls, superCls) {
//    var construct = function () {};
//    construct.prototype = superCls.prototype;
//    cls.prototype = new construct;
//    cls.prototype.constructor = cls;
//    cls.super = superCls;
//}


// Get a node index when a node is part of a list
function getIndex(node){

    var childNodes ;
    if (node == null  || node.parentNode == null){
        return -1 ;
    }

    childNodes = node.parentNode.childNodes;
    for (var i=0; i < childNodes.length; i++  ){
        if (node == childNodes[i])
            return i;
    }
    return -1;
}
