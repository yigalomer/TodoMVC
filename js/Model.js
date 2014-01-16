
/**
 * Model
 * Stores task items and notifies the controller about data changes.
 *  Implements CRUD methods
 *
 * Created by Yigal Omer
 * Date: 10-1-2013
 */

function Model(items) {

    this.mItems = items; // Array of TaskItem objects
    //this.mItems = new ArrayList();

}

Model.prototype = {

    getItems: function () {
        return [].concat(this.mItems);
    },

    // Add an item to the list and notify the controller about the new added item
    addItem: function (item) {

        this.mItems.push(item);
        var event = new ObserverEvent(EVENT_TASK_ADDED,item);
        this.notify(event) ;

    },


    // Update an item in the list and notify the controller
    updateItem: function (index,text) {

        this.mItems[index].text = text;
        var event = new ObserverEvent(EVENT_TASK_ADDED);
        this.notify(event) ;
    },

    // Delete an item from the list and notify the controller about the deleted index
    removeItemAtIndex: function (index) {

        var item = this.mItems[index];
        this.mItems.splice(index, 1);
        //this.mItems.removeAt(index);
        var event = new ObserverEvent(EVENT_TASK_DELETED,item);
        this.notify(event) ;
    },

    // Set item as done or undone and notify controller
    setItemDoneAtIndex: function (index,doneStatus) {

        var item = this.mItems[index];
        item.isCompleted = doneStatus ;
        var event = new ObserverEvent(doneStatus?EVENT_TASK_DONE:EVENT_TASK_UNDONE,item);
        this.notify(event) ;

    },

    // Get item is done for a given item's index
    getItemIsDoneAtIndex: function (index) {

        var item = this.mItems[index];
        return item.isCompleted ;

    }




};
