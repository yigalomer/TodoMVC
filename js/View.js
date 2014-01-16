
/**
 * View
 * Receives references to the Model and presents the Model's tasks.
 * Provides the UI events and notify the controller about user action events
 *
 * Created by Yigal Omer
 * Date: 10-1-2013
 */



function View(model) {

    this.mModel = model;

    this.domElements =  {
        'todoList':  $('#todo-list'),
        'newTodoInputText': $('#new-todo')
    };

    var _this = this;

    // key up on input text - listener
    this.domElements.newTodoInputText.keyup(function() {

        var windowEvent = window.event;
        var newTaskText= $(this).val().trim() ;

        // if ENTER KEY pressed
        if(windowEvent.keyCode == 13 && newTaskText != "") {

            // Create the add-task event and notify the controller that a new task was added by the user
            _this.notify(_this.createAddTaskEvent(newTaskText) ) ;
            // Clear the input text
            $(this).val('') ;
        }
    }),




    // Delete task listener
    this.domElements.todoList.on( 'click','.destroy', function() {

        // Get the li index ( button inside a div which is inside the li)
        // TODO figure out a better way to get the li index
        var itemIndex = getIndex(this.parentNode.parentNode) ;

        if (itemIndex != -1) {
            var event = new ObserverEvent(EVENT_DELETE_TASK_CLICKED,itemIndex);
            // notify the controller about Delete Task
            _this.notify(event) ;
        }

    }),



    // Mark task as completed click listener
    this.domElements.todoList.on( 'click','.toggle', function() {

        // Get the list item index
        var itemIndex = getIndex(this.parentNode.parentNode) ;
        // Get the item done status from the Model
        var isTaskDone = _this.mModel.getItemIsDoneAtIndex(itemIndex) ;

        if (itemIndex != -1) {
            var event = new ObserverEvent(isTaskDone ? EVENT_TASK_UNDONE_CLICKED : EVENT_TASK_DONE_CLICKED,itemIndex);
            // notify the controller about task-done
            _this.notify(event) ;
        }


    }),

    // Start editing a task listener
    this.domElements.todoList.on('dblclick', 'li', function (){

        $(this).addClass('editing');
        $(this).focus();

    }),


    // Done editing a task listener
    this.domElements.todoList.on('keyup', 'li', function (){

        var windowEvent = window.event;
        // get the updated text
        var updatedTaskText = $(this).find('.edit')[0].value.trim() ;

        // if ENTER KEY pressed
        if(windowEvent.keyCode == 13 && updatedTaskText != "") {

            var itemIndex = getIndex(this) ; // get the li index
            _this.mModel.updateItem(itemIndex,updatedTaskText) ;
            $(this).removeClass('editing');
        }
    })



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
        var _this= this ;
        list = this.domElements.todoList;

        // Clear the HTML list items first
        list.empty();

        taskItems = this.mModel.getItems();

        for (key in taskItems) {

            if (taskItems.hasOwnProperty(key)) {

                // Task Item template
                var taskItemHtml = '<div class="view"> ' +
                                            '<input class="toggle" type="checkbox">' +
                                            '<label>' + taskItems[key].text +'</label> ' +
                                            '<button class="destroy"></button>'+
                                   '</div>' +
                                   '<input class="edit" value='+ taskItems[key].text +'> ' ;

                var li = document.createElement('li');

                // Add the task item html
                li.innerHTML = taskItemHtml  ;

                // Mark task as completed in the UI
                if (taskItems[key].isCompleted ) {
                    _this.markTaskAsCompleted(li) ;
                }
                list.append(li);
            }
        }

    },



    // Create new add-task event with the task title
    createAddTaskEvent: function (newTaskText) {

        //var newTaskText= this.domElements.newTodoInputText.value ;
        var isTaskDone = false ;
        return  new ObserverEvent(EVENT_ADD_TASK_CLICKED,new TaskItem(newTaskText,isTaskDone) );

    },



    markTaskAsCompleted: function (listItem) {

        // Add the style class 'completed' which puts the line-through
        $(listItem).addClass('completed');

        // Check the completed checkbox
        $(listItem).find('.toggle')[0].checked = true;

    }



};

