/**
 * Controller
 *
 * Controller holds references to View and Model and interacts with both.
 * Derived from Observer and observes the Model and View changes.
 * Responds to user actions from the View and Model changes and updates both
 */
function Controller(model, view) {

    this.mModel = model;
    this.mView = view;
    //var _this = this;
}


Controller.prototype = {

    // Handles the events sent from the View or the Model
    handelEvents: function(event) {

        var index ;

        if ( event.mEventType == EVENT_ADD_TASK_CLICKED ) {

            if (event && event.mContextData) {
                this.mModel.addItem(event.mContextData);
            }

        }
        else if ( event.mEventType == EVENT_TASK_ADDED ) {

            this.mView.rebuildList();
        }


        else if ( event.mEventType == EVENT_DELETE_TASK_CLICKED ) {

            index = event.mContextData;
            this.mModel.removeItemAtIndex(index);

        }
        else if ( event.mEventType == EVENT_TASK_DELETED ) {

            this.mView.rebuildList();
        }


        else if ( event.mEventType == EVENT_TASK_DONE_CLICKED ) {

            index = event.mContextData;
            this.mModel.setItemDoneAtIndex(index);

        }
        else if ( event.mEventType == EVENT_TASK_DONE ) {

            this.mView.rebuildList();
        }


    }

};


