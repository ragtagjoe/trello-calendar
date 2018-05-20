// Listen for form submit
function saveTask() {
    // Get elements
    var task = document.getElementById('task');
    var category = document.getElementById('category');
    var priority = document.getElementById('priority');
    var taskDate = document.getElementById('date');

    // Validate elements
    var validateResult = validate(task.value, category.value, taskDate.value);
    if (validateResult != true) {
        document.getElementById('formAlert').style.display = 'block';
        document.getElementById('formAlert').innerHTML = validateResult;
    }
    else {
        
        clearForm(task, category, priority, taskDate);
        document.getElementById('formAlert').style.display = 'none';
    }

    // alert(task + ' ' + category + ' ' + priority + ' ' + taskDate);
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

function clearForm() {
    task.value = "";
    category.value = "";
    priority.value = "priority";
    taskDate.value = "";
}