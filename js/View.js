
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

    this.domElements.newTodoInputText.keyup(function() {

        var windowEvent = window.event;
        var newTaskText= $(this).val() ;

        // if ENTER KEY pressed
        if(windowEvent.keyCode == 13 && newTaskText != "") {

            // get the new task text from the UI input text and notify
            // the controller that a new task was added by the user
            _this.notify(_this.createAddTaskEvent(newTaskText) ) ;

            // Clear the input text
            //_this.domElements.newTodoInputText.value = '';
            $(this).val('') ;
        }

    }),



    // Delete task
    this.domElements.todoList.on( 'click','.destroy', function() {

        // Get the li index - button inside a div which inside a li -
        // todo figure out a better way to get the li index
        var itemIndex = getIndex(this.parentNode.parentNode) ;

        //var itemIndex = (this.parentNode.parentNode).index ;

        if (itemIndex != -1) {
            var event = new ObserverEvent(EVENT_DELETE_TASK_CLICKED,itemIndex);
            // notify the controller that Delete Task was selected by the user
            _this.notify(event) ;
        }

    }),



//    this.domElements.todoList.on( 'keypress','.edit', function() {
//
//        // Get the list item index
//        var itemIndex = getIndex(this.parentNode) ;
//
//
//    }),

    // Mark task as completed
    this.domElements.todoList.on( 'click','.toggle', function() {


        // Get the list item index
        var itemIndex = getIndex(this.parentNode.parentNode) ;
        // Get the item done status
        var isTaskDone = _this.mModel.getItemIsDoneAtIndex(itemIndex) ;

        if (itemIndex != -1) {
            var event = new ObserverEvent(isTaskDone ? EVENT_TASK_UNDONE_CLICKED : EVENT_TASK_DONE_CLICKED,itemIndex);
            // notify the controller that task-done  was selected by the user
            _this.notify(event) ;
        }


    });





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

                // Add the task item text
                li.innerHTML = taskItemHtml  ;

                // Add a line through and mark the checkbox if task is done
                if (taskItems[key].isDone ) {

                    li.style.textDecoration = "line-through" ;

                    // Check the checkbox.
                    var children=li.firstChild.children;
                    for (var i = 0; i < children.length; i++){
                        if (children[i].type == 'checkbox'){
                            children[i].checked = true;
                        }
                    }

                }
                list.append(li);
            }
        }

    },



    // Get the new task text from the input text and create new add-task event
    createAddTaskEvent: function (newTaskText) {

        //var newTaskText= this.domElements.newTodoInputText.value ;
        var isTaskDone = false

        return  new ObserverEvent(EVENT_ADD_TASK_CLICKED,new TaskItem(newTaskText,isTaskDone) );

    }






};

