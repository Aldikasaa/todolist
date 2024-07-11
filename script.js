
const inputBox = document.getElementById('input-box')
const listContainer = document.getElementById('list-container')
const selectBtn = document.getElementById('select-btn')
const countValue = document.getElementById('counter')


showTask()

let taskCount = 0;
const displayCount = (taskCount) => {
taskCount = document.querySelectorAll('.done_text').length;
countValue.innerText = taskCount
}

function addTask() {
   
    if(inputBox.value === '') {
        alert('add task')
    }else{
        let li = document.createElement('li')
        li.innerHTML = inputBox.value
        listContainer.appendChild(li)
        displayCount(taskCount)

        let checkbox = document.createElement('input')
        checkbox.setAttribute('type','checkbox')
        checkbox.classList.add('check_btn')
        li.appendChild(checkbox)

        let deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete_btn')
        deleteBtn.innerHTML = 'delete'
        li.appendChild(deleteBtn)
        saveData()
        
        listContainer.addEventListener('change', () => {
            if(checkbox.checked == true) {
               li.classList.add('done_text')
            }else {
                li.classList.remove('done_text')
            }
            displayCount(taskCount);
            saveData()
           
        })

        listContainer.addEventListener('click', (event) => {
            if(event.target.classList.contains('delete_btn')) {
                listContainer.removeChild(event.target.parentNode)
                displayCount(taskCount);
                saveData()
            }
        })
        
        selectBtn.addEventListener('click', () => {
            if(li.classList.contains('done_text')) {
                listContainer.removeChild(li)
                saveData()
                
            }
        })
    }

        inputBox.value=''    
}



function saveData() {
    localStorage.setItem('data',listContainer.innerHTML)
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem('data');

    // Reattach event listeners after tasks are loaded
    const checkboxes = document.querySelectorAll('.check_btn');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const li = checkbox.parentNode;
            if (checkbox.checked) {
                li.classList.add('done_text');
            } else {
                li.classList.remove('done_text');
            }
            displayCount(taskCount);
            saveData();
            
        });
    });

    const deleteButtons = document.querySelectorAll('.delete_btn');
    deleteButtons.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', (event) => {
            const li = deleteBtn.parentNode;
            listContainer.removeChild(li);
            displayCount(taskCount);
            saveData();
        });
    });

    selectBtn.addEventListener('click', () => {
        const doneItems = document.querySelectorAll('.done_text');
        doneItems.forEach(item => {
            listContainer.removeChild(item);
        });
        displayCount(taskCount);
        saveData();
       
    });
}


