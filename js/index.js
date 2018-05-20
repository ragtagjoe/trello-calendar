function saveTask() {
    // Get elements
    var task = document.getElementById('task');
    var category = document.getElementById('category');
    var priority = document.getElementById('priority');
    var taskDate = document.getElementById('date');

    var taskObject = {
        task: task.value,
        category: category.value,
        priority: priority.value,
        taskDate: taskDate.value
    }

    // Validate elements
    var validateResult = validate(task.value, category.value, taskDate.value);
    if (validateResult != true) {
        console.log('ERROR:' + task.value + ' ' + category.value + ' ' + priority.value + ' ' + taskDate.value);
        document.getElementById('formAlert').style.display = 'block';
        document.getElementById('formAlert').innerHTML = validateResult;
    }

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

    // Clear the form
    clearForm(task, category, priority, taskDate);
    document.getElementById('formAlert').style.display = 'none';
}

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

function clearForm(task, category, priority, taskDate) {
    task.value = "";
    category.value = "";
    priority.value = "priority";
    taskDate.value = "";
}

/*
    // Local Storage Test
    localStorage.setItem('string', 'string');
    localStorage.getItem('string');
    localStorage.removeItem('string');
*/