
// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");
const header = document.querySelector('.todoapp');


const user = localStorage.getItem('user');

console.log(user, "user");
if (user == null) {
    let username = prompt("Enter username");
    let password = prompt("Enter password");
    let data = async () => {
        let response = await fetch("http://192.168.1.64:8080/users/login/", {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            },

            body: JSON.stringify({
                "username": username,
                "password": password
            })
        }).then(res => res.json())
            .then(json => {
                console.log(json, 'json');
                return json
            })
            .catch(err => console.error(err));

        console.log(response, 'user response');
        if (response != null) {
            localStorage.setItem('user', JSON.stringify(response));

            console.log(localStorage.getItem('user'));
            location.reload();
        } else {
            header.innerHTML = `User not exist`;
            alert('User not exist');

        }

    }

    data();

}

let userLocalStorage = localStorage.getItem('user');
if (userLocalStorage == null) { //if localstorage has no data
    var userData = {}; //create a blank array
} else {
    var userData = JSON.parse(userLocalStorage);
    header.innerHTML = `Hello, ${userData.username}`

    localStorage.setItem("New Todo", JSON.stringify(userData.todos)); //transforming json string into a js object
}



// onkeyup event
inputBox.onkeyup = () => {
    let userEnteredValue = inputBox.value; //getting user entered value
    if (userEnteredValue.trim() != 0) { //if the user value isn't only spaces
        addBtn.classList.add("active"); //active the add button
    } else {
        addBtn.classList.remove("active"); //unactive the add button
    }
}



showTasks(); //calling showTask function

async function getData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        // mode: 'no-cors', // no-cors, *cors, same-origin
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        // redirect: 'follow', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
    }).then(response => {
        // console.log(response.json(), "sdfasdfsdaf");
        return response;
    }).then((data) => {
        console.log(data, 'dasd');
        return

    });
    // return response; // parses JSON response into native JavaScript objects
}

addBtn.onclick = async () => { //when user click on plus icon button
    let userEnteredValue = inputBox.value; //getting input field value
    let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
    console.log(getLocalStorageData);
    if (getLocalStorageData == null) { //if localstorage has no data
        var listArray = []; //create a blank array
    } else {
        var listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    }
    let response = await fetch(`http://192.168.1.64:8080/todos/?userId=${userData.id}`, {
        method: "POST",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(
            {
                "title": userEnteredValue,
                "description": userEnteredValue,
                "isCompleted": false
            }
        )
    })
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error(err));
    console.log(listArray);
    console.log(response, 'dfsasdfsad');

    // listArray.push(userEnteredValue); //pushing or adding new value in array
    // localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTask function
    // addBtn.classList.remove("active"); //unactive the add button once the task added
}

async function showTasks() {
    let response = await fetch(`http://192.168.1.64:8080/users/?id=${userData.id}`,
        {
            method: "GET"
        }
    ).then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error(err));

    console.log(response.todos, 'response');
    // let getLocalStorageData = localStorage.getItem("New Todo");
    // if (getLocalStorageData == null) {
    //     listArray = [];
    // } else {
    //     listArray = JSON.parse(getLocalStorageData);
    // }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
    pendingTasksNumb.textContent = response.todos.length; //passing the array length in pendingtask
    if (response.todos.length > 0) { //if array length is greater than 0
        deleteAllBtn.classList.add("active"); //active the delete button
    } else {
        deleteAllBtn.classList.remove("active"); //unactive the delete button
    }
    let newLiTag = "";
    response.todos.forEach((element, index) => {
        console.log(element.title, 'title');
        newLiTag += `<li>${element.title}<span class="icon" onclick="deleteTask(${element.id})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
async function deleteTask(index) {
    await fetch(`http://192.168.1.64:8080/todos/${index}`, {
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true
        }
    })
        .then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error(err));

    showTasks(); //call the showTasks function
}

// delete all tasks function
deleteAllBtn.onclick = async () => {
    let response = await fetch(`http://192.168.1.64:8080/users/?id=${userData.id}`,
        {
            method: "GET"
        }
    ).then(res => res.json())
        .then(json => { return json })
        .catch(err => console.error(err));

    response.todos.forEach(async (element) => {
        await fetch(`http://192.168.1.64:8080/todos/${element.id}`, {
            method: "DELETE",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
            .then(res => res.json())
            .then(json => { return json })
            .catch(err => console.error(err));
    })

    showTasks();
    location.reload();
    // listArray = []; //empty the array
    // localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
    // showTasks(); //call the showTasks function
}