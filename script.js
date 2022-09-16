
const form = document.querySelector('form')

let todos = []

const createTask = () =>{
    const message = document.querySelector('#message')
    if(message.value){
        let task = {
            id:todos.length===0?1:todos[todos.length-1].id+1,
            message:message.value,
            status:false,
            date:new Date()
        }
        todos.push(task)
        renderTodos()
        console.log(todos)
    }else{
        alert('Field is empty')
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    createTask()
})


const renderTodos = () =>{
    const output = document.querySelector('#output')
    output.innerHTML=''

    todos.forEach(el=>{
        const block = document.createElement('div')
        const message = document.createElement('h2')
        const dateDom = document.createElement('p')
        const doneMessage = document.createElement('p')

        const wrapForText = document.createElement('div')
        const wrapForButtons = document.createElement('div')

        wrapForButtons.className='wrapForButtons'
        wrapForText.className='wrapForText'

        block.className='block'

        let date = el.date
        let currentDate = `Todo is created: ${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()} ${date.getHours()}:${+date.getMinutes()<10
        ?'0'+date.getMinutes()
        :date.getMinutes()}:${+date.getSeconds()<10
            ?'0'+date.getSeconds()
            :date.getSeconds()}`

        message.textContent=el.message
        dateDom.textContent=currentDate
        doneMessage.textContent = el.status?'todo is done':'todo is not done'


        block.style.background = el.status?'lightgreen':'coral'

        const done = document.createElement('button')
        done.textContent=!el.status?'DONE':'NOT DONE'

        const del = document.createElement('button')
        del.textContent='DELETE'

        const edit = document.createElement('button')
        edit.textContent='EDIT'

        done.addEventListener('click',()=>{
            doneTodo(el.id)
        })

        del.addEventListener('click',()=>{
            el.status?deleteTodo(el.id):alert('Todo is not done')
        })

        edit.addEventListener('click',()=>{
            !el.status?editTodo(el.id):alert('Todo is done')
        })


        wrapForButtons.append(done,del,edit)
        wrapForText.append(message,dateDom,doneMessage)
        block.append(wrapForText,wrapForButtons)
        output.append(block)
    })
}

const doneTodo = (id) =>{
    todos.forEach(el=>{
        if(el.id===id){
            el.status = !el.status
        }
    })
    renderTodos()
}


const deleteTodo = (id) =>{
    todos = todos.filter(el=> el.id!==id)
    renderTodos()
}


const editTodo = (id) =>{
    let messageForEdit = prompt('EDIT TODO')
    if(!messageForEdit){
        alert('Try Again')
    }else{
        todos.forEach(el=>{
            if(id===el.id){
                el.message = messageForEdit
                console.log('RENDER')
                renderTodos()
            }
        })
    }
}



