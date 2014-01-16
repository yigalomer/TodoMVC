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

        switch (event.mEventType) {

            // View -> Controller events

            case EVENT_ADD_TASK_CLICKED :

                if (event && event.mContextData) {
                    this.mModel.addItem(event.mContextData);
                }
                break ;

            case EVENT_DELETE_TASK_CLICKED :

                index = event.mContextData;
                this.mModel.removeItemAtIndex(index);
                break ;

            case EVENT_TASK_DONE_CLICKED :

                index = event.mContextData;
                this.mModel.setItemDoneAtIndex(index,true);
                break ;

            case EVENT_TASK_UNDONE_CLICKED :
                index = event.mContextData;
                this.mModel.setItemDoneAtIndex(index,false);
                break ;


            // Model -> Controller events

            case EVENT_TASK_ADDED :
            case EVENT_TASK_DELETED :
            case EVENT_TASK_DONE :
            case EVENT_TASK_UNDONE :

                this.mView.rebuildList();
                break ;


        }



    }

};


