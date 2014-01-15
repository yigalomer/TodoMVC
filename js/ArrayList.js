/*
 * ArrayList
 *
 * Simple wrapper of array that provides CRUD methods
 *
 * Created by Yigal Omer
 * Date: 10-1-2013
 */

function ArrayList() {
    this.mList = []; //initialize with an empty array
}

ArrayList.prototype.count = function () {
    return this.mList.length;
}

ArrayList.prototype.add = function (object) {
    //Object are placed at the end of the array
    return this.mList.push(object);
}

ArrayList.prototype.getAt = function (index) //Index must be a number
{
    if (index > -1 && index < this.mList.length)
        return this.mList[index];
    else
        return undefined; //Out of bound array, return undefined
}

ArrayList.prototype.clear = function () {
    this.mList = [];
}

ArrayList.prototype.removeAt = function (index) // index must be a number
{
    var count = this.mList.length;

    if (count > 0 && index > -1 && index < this.mList.length) {
        switch (index) {
            case 0:
                this.mList.shift();
                break;
            case count - 1:
                this.mList.pop();
                break;
            default:
                var head = this.mList.slice(0, index);
                var tail = this.mList.slice(index + 1);
                this.mList = head.concat(tail);
                break;
        }
    }
}

ArrayList.prototype.insert = function (object, index) {
    var count = this.mList.length;
    var returnValue = -1;

    if (index > -1 && index <= count) {
        switch (index) {
            case 0:
                this.mList.unshift(object);
                returnValue = 0;
                break;
            case count:
                this.mList.push(object);
                returnValue = count;
                break;
            default:
                var head = this.mList.slice(0, index - 1);
                var tail = this.mList.slice(index);
                this.mList = this.mList.concat(tail.unshift(object));
                returnValue = index;
                break;
        }
    }
    return returnValue;
}

ArrayList.prototype.indexOf = function (object, startIndex) {
    var count = this.mList.length;
    var returnValue = -1;

    if (startIndex > -1 && startIndex < count) {
        var i = startIndex;

        while (i < count) {
            if (this.mList[i] == object) {
                returnValue = i;
                break;
            }

            i++;
        }
    }
    return returnValue;
}


ArrayList.prototype.lastIndexOf = function (object, startIndex) {
    var count = this.mList.length;
    var returnValue = -1;

    if (startIndex > -1 && startIndex < count) {
        var i = count - 1;

        while (i >= startIndex) {
            if (this.mList[i] == object) {
                returnValue = i;
                break;
            }

            i--;
        }
    }
    return returnValue;
}
