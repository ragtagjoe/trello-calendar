const dayNames = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Function to execute on page load
function onLoadExecution() {
    var dateToday = new Date();
    displayCalendar(dateToday);
}

// Display the calendar
function displayCalendar(dateToday) {
    var calendar = document.getElementById('calendar');
    calendar.innerHTML = "";

    var daysInThisMonth = daysInMonth(dateToday.getMonth() + 1, dateToday.getFullYear());
    document.getElementById('chooseMonth').value = dateToday.getMonth();
    document.getElementById('chooseMonth').text = monthNames[dateToday.getMonth()]

    var taskObjects = JSON.parse(localStorage.getItem('taskObjects'));

    for (var i = 0; i < daysInThisMonth; i++) {
        var strMonth = document.getElementById('chooseMonth').text;
        var numDate = i + 1;
        var dateI = new Date(dateToday.getFullYear(), dateToday.getMonth(), i + 2);
        var strDay = dayNames[dateI.getDay()];
        calendar.innerHTML += '<div class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-xs-12">' +
                                '<h6 id="' + numDate + '">' + strDay + '</h6>' + 
                                '<h5 id="' + numDate + 'h5' + '">' + strMonth + ' ' + numDate + '</h5>' +
                                '<div id="taskResults' + numDate + '"></div>' +
                              '</div>';

        if (taskObjects != null) {
            for (var c = 0; c < taskObjects.length; c++) {
                var taskResults = document.getElementById('taskResults');
                var task = taskObjects[c].task;
                var category = taskObjects[c].category;
                var priority = taskObjects[c].priority;
                var tDate = taskObjects[c].taskDate;
                var taskDate = new Date(tDate);

                // If date on calendar = date on task, then output it
                if (dateI.getFullYear() === taskDate.getFullYear()) {
                    if (dateI.getMonth() === taskDate.getMonth()) {
                        if (dateI.getDate() === taskDate.getDate()) {
                            var result = document.getElementById('taskResults' + numDate.toString());
                            result.innerHTML += '<div class="task" id="task' + c + '" >' +
                                                    '<h6>' + task + '</h6>' +
                                                    '<div class="row">' +
                                                        '<div class="col-6 button-labels">' +
                                                            '<label class="label-category">' + category + '</label>' +
                                                            '<label id="priorityLabel' + c  + '" class="label-priority">' + priority + '</label>' +
                                                        '</div>' +
                                                        '<div class="col-6 button-actions">' +
                                                            '<button onclick="editObject(\'' + task + '\')" type="button" class="btn btn-round btn-edit" data-toggle="modal" data-target="#modal">' + '<i class="far fa-edit"></i>' + '</button>' +
                                                            '<label onclick="completeObject(\'' + task + '\', \'' + c + '\')" class="btn btn-round btn-complete" id="completeBox' + c.toString() + '">' + '<i class="fas fa-check"></i></label>' +
                                                            '<input type="checkbox" class="checkbox" id="checkbox' + c.toString() + '">' +
                                                            '<button onclick="deleteObject(\'' + task + '\')" type="button" class="btn btn-round btn-delete">' + '<i class="far fa-trash-alt"></i>' + '</button>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>'
                        }
                    }
                }
            }
        }
    }

    // Change styling of the day if day = today
    styleToday(dateToday);
}

// Function to execute on data change
function onChangeExecution() {
    var newMonth = parseInt(document.getElementById('chooseMonth').value);
    var dateToday = new Date();
    var newDate = new Date(dateToday.getFullYear(), newMonth, 1);
    displayCalendar(newDate);
}

/*
 *
 * CRUD FUNCTIONS ----------------------------------------------------------------------------------------------
 * 
 */
// Create and save a object to the calendar
function saveTask() {
    // Get elements
    var task = document.getElementById('task');
    var category = document.getElementById('category');
    var priority = document.getElementById('priority');
    var taskDate = document.getElementById('date');

    // Validate form elements
    var validateResult = validate(task.value, category.value, taskDate.value);
    if (validateResult != true) {
        console.log('ERROR: ' + task.value + ' ' + category.value + ' ' + priority.value + ' ' + taskDate.value);
        document.getElementById('formAlert').style.display = 'block';
        document.getElementById('formAlert').innerHTML = validateResult;
        return;
    }
    else {
        // Save form elements to object
        var taskObject = {
            task: task.value,
            category: category.value,
            priority: priority.value,
            taskDate: taskDate.value,
        }

        // Save taskObject to local storage
        saveToLocalStorage(taskObject);
        
        // Re-update calendar
        onChangeExecution();

        // Reset form
        clearForm(task, category, priority, taskDate);
    }
}

// Edit object
function editObject(task, c) {
    
}

// Complete object
function completeObject(task, c) {
    var checkBox = document.getElementById('checkbox' + c.toString());
    var completBox = document.getElementById('completeBox' + c.toString());
    var checkedDiv = document.getElementById('task' + c.toString());
    if (checkBox.checked) {
        checkedDiv.style.opacity = "1";
        checkBox.checked = false;
        completBox.style.borderColor = "rgb(180, 180, 180)";
        completBox.style.borderWidth = "1px";
        completBox.style.color = "rgb(180, 180, 180)";
    }
    else {
        checkedDiv.style.opacity = "0.5";
        checkBox.checked = true;
        completBox.style.borderColor = "#4DCD7D";
        completBox.style.borderWidth = "2px";
        completBox.style.color = "#4DCD7D";
    }
}

// Delete object
function deleteObject(task) {
    // Get object
    var taskObjects = JSON.parse(localStorage.getItem('taskObjects'));

    for (var i = 0; i < taskObjects.length; i++) {
        if (taskObjects[i].task == task) {
            taskObjects.splice(i, 1);
        }
    }

    // Re-set back to local storage
    localStorage.setItem('taskObjects', JSON.stringify(taskObjects));

    onChangeExecution();
}

/*
 *
 * UTILITY FUNCTIONS --------------------------------------------------------------------------------------------
 * 
 */
// Validate form elements
function validate(task, category, taskDate) {
    if (!task) {
        if (!category) {
            if (!taskDate) {
                return "Add a task, add a category and choose a date";
            }
            return "Add a task and add a category";
        }
        return "Add a task";
    }
    return true;
}

// Save taskObject to local storage
function saveToLocalStorage(taskObject) {
    if (localStorage.getItem('taskObjects') === null) {
        var taskObjects = [];
        taskObjects.push(taskObject);
        localStorage.setItem('taskObjects', JSON.stringify(taskObjects));
    }
    else {
        var taskObjects = JSON.parse(localStorage.getItem('taskObjects'));
        taskObjects.push(taskObject);
        localStorage.setItem('taskObjects', JSON.stringify(taskObjects));
    }
}

// Get number of days in a specified month
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Change styling of the day if day = today
function styleToday(dateToday) {
    var d = new Date();
    if (dateToday.getMonth() === d.getMonth() && dateToday.getFullYear() === d.getFullYear()) {
        var dayToday = d.getDate();
        var todayH5 = document.getElementById(dayToday.toString());
        todayH5.style.fontWeight = '700';
        todayH5.style.color = 'palevioletred';
        var todayH6 = document.getElementById(dayToday.toString() + 'h5');
        todayH6.style.fontWeight = '800';
        todayH6.style.color = 'palevioletred';
    }
}

// Reset form on submition
function clearForm(task, category, priority, taskDate) {
    task.value = "";
    category.value = "";
    priority.value = "priority";
    taskDate.value = "";
    // Clear any alert messages that may have existed
    document.getElementById('formAlert').style.display = 'none';
}