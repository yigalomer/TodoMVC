
/**
 * View
 * Receives references to Model and DOM UI elements and presents the model tasks.
 * provides the UI events and notify the controller about these user action events
 *
 * Created by Yigal Omer
 * Date: 10-1-2013
 */


function View(model, elements) {

    this.mModel = model;
    this.domElements = elements;
    var _this = this;



    this.domElements.newTodoInputText.onkeyup = function () {

        var windowEvent = window.event;
        var newTaskText= _this.domElements.newTodoInputText.value ;

        // if ENTER KEY pressed
        if(windowEvent.keyCode == 13 && newTaskText != "") {

            // get the new task text from the UI input text and notify
            // the controller that a new task was added by the user
            _this.notify(_this.createAddTaskEvent() ) ;

            // Clear the input text
            _this.domElements.newTodoInputText.value = '';
        }

    };



}

View.prototype = {

    show: function () {
        this.rebuildList();
    },


    // Get the task items from the Model and render the list
    rebuildList: function () {

        var list  ; // The DOM list element
        var taskItems ; // array of task items which is retrieved from the model
        var key;
        var _this = this ;

        list = this.domElements.todoList;

        // Clear the HTML list items first
        list.innerHTML = '';

        taskItems = this.mModel.getItems();

        for (key in taskItems) {

            if (taskItems.hasOwnProperty(key)) {

                // create the list item
                var li = document.createElement('li');
                // Add the task item text
                li.innerHTML = taskItems[key].text  ;

                // Add line through if task is done
                if (taskItems[key].isDone ) {
                    li.style.textDecoration = "line-through" ;
                }
                list.appendChild(li);

                // Add Remove and Done buttons
                _this.addRemoveButton(li) ;
                _this.addDoneButton(li) ;
            }
        }

    },




    // Create the Remove button for the list item and attache a listener
    addRemoveButton: function (li) {

        var _this = this ;

        var removeButton = document.createElement('button');
        var removeButtonStyle =  "<button style=\"color:#669991;  font-size: 16px;  background: rgba(0, 0, 0, 0.07);\">Remove</button>" ;
        removeButton.innerHTML= " <span style=\"display:inline-block; width:200px; \"></span>" +removeButtonStyle  ;

        li.appendChild(removeButton);

        // Attach a listener to the Remove click
        removeButton.onclick = function () {

            // Get the list item index
            var itemIndex = getIndex(this.parentNode) ;
            if (itemIndex != -1) {
                var event = new ObserverEvent(EVENT_DELETE_TASK_CLICKED,itemIndex);
                // notify the controller that Delete Task was selected by the user
                _this.notify(event) ;
            }

        };

    },


    // Create the DOne button for the list item and attache a listener
    addDoneButton: function (li) {

        var _this = this ;
        var doneButton = document.createElement('button');
        var doneButtonStyle =  "<button style=\"color:#669991;  font-size: 16px;  background: rgba(0, 0, 0, 0.07);\">Done</button>" ;
        doneButton.innerHTML= " <span style=\"display:inline-block; width:10px; \"></span>" +doneButtonStyle  ;

        li.appendChild(doneButton);

        // Attach a listener to the doneButton click
        doneButton.onclick = function () {
            // Get the list item index
            var itemIndex = getIndex(this.parentNode) ;
            if (itemIndex != -1) {
                var event = new ObserverEvent(EVENT_TASK_DONE_CLICKED,itemIndex);
                // notify the controller that Delete Task was selected by the user
                _this.notify(event) ;
            }


        };
    },


    // Get the new task text from the input text and create new add-task event
    createAddTaskEvent: function () {

        var newTaskText= this.domElements.newTodoInputText.value ;
        var isTaskDone = false

        return  new ObserverEvent(EVENT_ADD_TASK_CLICKED,new TaskItem(newTaskText,isTaskDone) );

    }


};

