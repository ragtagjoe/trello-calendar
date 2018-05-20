const dayNames = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

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
            taskDate: taskDate.value
        }

        // Save taskObject to local storage
        saveToLocalStorage(taskObject);

        // Reset form
        clearForm(task, category, priority, taskDate);
    }
}

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
    // Test if taskObjects is null
    if (localStorage.getItem('taskObjects') === null) {
        var taskObjects = [];
        taskObjects.push(taskObject);
        localStorage.setItem('taskObjects', JSON.stringify(taskObjects));
    }
    else {
        // Get taskObjects from local storage
        var taskObjects = JSON.parse(localStorage.getItem('taskObjects'));
        // Add taskObject to array
        taskObjects.push(taskObject);
        // Re-se back to local storage
        localStorage.setItem('taskObjects', JSON.stringify(taskObjects));
    }
}

// Functions to execute on page load
function onLoadExecution() {
    // Display the calendar
    var dateToday = new Date();
    displayCalendar(dateToday);
}

// Functions to execute on date change
function onChangeExecution() {
    // Display the calendar
    var newMonth = parseInt(document.getElementById('chooseMonth').value);
    var dateToday = new Date();
    var newDate = new Date(dateToday.getFullYear(), newMonth, 1);
    displayCalendar(newDate);
}

// Display the calendar on load
function displayCalendar(dateToday) {
    var calendar = document.getElementById('calendar');
    calendar.innerHTML = "";

    var daysInThisMonth = daysInMonth(dateToday.getMonth() + 1, dateToday.getFullYear());
    document.getElementById('chooseMonth').value = dateToday.getMonth();
    document.getElementById('chooseMonth').text = monthNames[dateToday.getMonth()]

    for (var i = 0; i < daysInThisMonth; i++) {
        var strMonth = document.getElementById('chooseMonth').text;
        var numDate = i + 1;
        var dateI = new Date(dateToday.getFullYear(), dateToday.getMonth(), i + 2);
        var strDay = dayNames[dateI.getDay()];
        calendar.innerHTML += '<div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12">' +
                                '<h6 id="' + numDate + '">' + strDay + '</h6>' + 
                                '<h5 id="' + numDate + 'h5' + '">' + strMonth + ' ' + numDate + '</h5>' + 
                              '</div>'
    }

    // Change styling of the day if day = today
    var d = new Date();
    if (dateToday.getMonth() === d.getMonth()) {
        var dayToday = dateToday.getDate();
        var todayH5 = document.getElementById(dayToday.toString());
        todayH5.style.fontWeight = '700';
        todayH5.style.color = 'palevioletred';
        var todayH6 = document.getElementById(dayToday.toString() + 'h5');
        todayH6.style.fontWeight = '800';
        todayH6.style.color = 'palevioletred';

    }
}

function fetchLocalTaskObjects() {
    var taskObjects = JSON.parse(localStorage.getItem('taskObjects'));
}

// Get Days in the Month
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Reset form
function clearForm(task, category, priority, taskDate) {
    task.value = "";
    category.value = "";
    priority.value = "priority";
    taskDate.value = "";
    // Clear any alert messages that may have existed
    document.getElementById('formAlert').style.display = 'none';
}