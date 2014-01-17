/**
 * Controller
 *
 * Controller holds references to View and Model and interacts with both.
 * Derived from Observer and observes the Model and View changes.
 * Responds to user actions from the View and Model changes and updates both
 */
function Controller(model, view) {

    this._model = model;
    this.mView = view;

}


Controller.prototype = {

    // Handles the events sent from the View or the Model
    handelEvents: function(event) {

        var index ;

        switch (event.mEventType) {

            // View -> Controller events

            case EVENT_ADD_TASK_CLICKED :

                if (event && event.mContextData) {
                    this._model.addItem(event.mContextData);
                }
                break ;

            case EVENT_DELETE_TASK_CLICKED :

                if (event && event.mContextData >= 0) {
                    index = event.mContextData;
                    this._model.removeItemAtIndex(index);

                }
                break ;

            case EVENT_TASK_DONE_CLICKED :

                if (event && event.mContextData >= 0) {
                    index = event.mContextData;
                    this._model.setItemDoneAtIndex(index,true);

                }
                break ;

            case EVENT_TASK_UNDONE_CLICKED :

                if (event && event.mContextData >= 0) {
                    index = event.mContextData;
                    this._model.setItemDoneAtIndex(index,false);
                }
                break ;

            case EVENT_UPDATE_TASK_CLICKED :

                if (event && event.mContextData ) {

                    index = event.mContextData['taskIndex'];
                    var updatedTaskText = event.mContextData['text'] ;
                    this._model.updateItem(index,updatedTaskText) ;
                }
                break ;



            // Model -> Controller events

            case EVENT_TASK_ADDED :
            case EVENT_TASK_DELETED :
            case EVENT_TASK_DONE :
            case EVENT_TASK_UNDONE :
            case EVENT_TASK_UPDATED :

                this.mView.rebuildList();
                break ;


        }



    }

};


