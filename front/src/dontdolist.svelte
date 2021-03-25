<script>
    import { get } from "svelte/store";
    import {onMount} from 'svelte';
    import { text } from "svelte/internal";
    $: allTasks = [];

    onMount(async () => {
        fetchAllTasks();
    });

    async function fetchAllTasks() {
        const data = {
            "parentTask": -1,
            "tasks": "all"
        }

        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        console.log("sending request");
        let unsorted_tasks = await fetch("http://localhost:8080/tasks", options)
                .then(response => {
                    return response.json();
                })
        allTasks = unsorted_tasks.sort((a, b) => {return a.id - b.id})
    }

    async function updatePriority(task) {
        if (task.priority == "low")
            task.priority = "medium"
        else if (task.priority == "medium")
            task.priority = "high"
        else
            task.priority = "low"

            const data = {
            "taskId": task.id,
            "update": "priority",
            "priority": task.priority
        }

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        await fetch("http://localhost:8080/tasks", options)
        fetchAllTasks();
    }

    async function addTask () {
        console.log("adding task")
        const data = {
            "parentTask": -1,
            "add": "true"
        }

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        await fetch("http://localhost:8080/tasks", options)
            .then(response => {
                return response.json();
            })
        fetchAllTasks();
    }

    async function updateChecked(task) {
        task.checked = !task.checked
        const data = {
            "taskId": task.id,
            "update": "check",
            "checked": task.checked
        }

        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        await fetch("http://localhost:8080/tasks", options)
        fetchAllTasks();
    }

    async function updateContent(task) {
        const data = {
            "taskId": task.id,
            "update": "content",
            "content": task.content
        }
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        await fetch("http://localhost:8080/tasks", options)
        fetchAllTasks();
    }

    async function deleteTask(task) {
        const data = {
            "taskId": task.id
        }
        const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };
        await fetch("http://localhost:8080/tasks", options)
        fetchAllTasks();
    }

    function changeContentColor(taskContent) {
        if (taskContent == "new task")
            return "contentGrey"
        else
            return "contentBlack"
    }

</script>

<!-- HTML  -->
<span class="todolist">
    <div id="addTask">
        <button on:click={addTask}>Add a task</button>
    </div>

    <div class="allTasks">

        {#each allTasks as task}
            <div class="task" parentTask={task.parentTask} id={task.id}}>
                <input type="image" class="delete" on:click={() => deleteTask(task)} alt="trash can" src="images/delete_icon.png">
                <input style="text-align: center" class="text" type="text" bind:value={task.content} on:change={() => {updateContent(task)}}/>
                {#if task.priority == "low"}
                    <span class="greenCircle" on:click={() => updatePriority(task)}>low</span>
                {:else if task.priority == "medium"}
                    <span class="orangeCircle" on:click={() => updatePriority(task)}>medium</span>
                {:else}
                    <span class="redCircle" on:click={() => updatePriority(task)}>high</span>
                {/if}
                {#if task.checked == false}
                    <input type="image" alt="./" src="images/unchecked.png"  on:click={() => updateChecked(task)}/>
                {:else}
                    <input type="image" alt="./" src="images/checked.png"  on:click={() => updateChecked(task)}/>
                {/if}
            </div>
        {/each}
        {#if allTasks.length == 0}
            <div>
                <p>No tasks!</p>
            </div>
        {/if}

    </div>
</span>


<style>
button {
    width: inherit;
    height: inherit;
    background-color:orangered;
    color:white;
    border:none;
    border-radius: 5px;
    transition: 0.2s;
    font-size: 2em;
}

button:hover {
    background-color:tomato;
    cursor:pointer;
}
/*
.allTasks {
    height: 40em;
    overflow: scroll;
} */

#addTask {
    display:flex;
    justify-content: center;
    position: relative;
    padding: 12px 40px 12px 40px;
    list-style-type: none;
    font-size: 18px;
    transition: 0.2s;
}

input[type=image] {
    width: 15px;
    height: 15px;
    margin: 12px 10px 10px 10px;
}

/* .delete {
    height: 20px;
    width: 20px;
    padding: 10px 10px 10px 10px;
} */

.text {
    color:navy;
    font-size: 1em;
    width: 20em;
    border: none;
    background-color: inherit;
    padding: 10px 10px 10px 10px;
}


.task {
    display:flex;
    justify-content: center;
    position: relative;
    padding: 12px 40px 12px 40 px;
    list-style-type: none;
    background: #f9f9f9;
    font-size: 18px;
    transition: 0.2s;
    margin: 0;
    border: 0;
}



/* Set all odd list items to a different color (zebra-stripes) */
.task:nth-child(odd) {
  background: #eee;
}

.task:hover {
  background: #ddd;
}

.allTasks {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    border: black;
    border-width: 3px;
    border-style: solid;
}

p{
    display: flex;
    justify-content: center;
    padding: 12px 40px 12px 40px;
    font-size: 18px;
}

.todolist {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    align-content: center;
    margin: 0px 10em 0px 10em;
}

.redCircle {
    color: white;
    text-align: center;
    margin: 10px;
    height: 20px;
    width: 70px;
    background-color:orangered;
    border-radius: 20px;
}

.redCircle:hover {
    cursor: pointer;
}

.orangeCircle {
    color: white;
    text-align: center;
    margin: 10px;
    height: 20px;
    width: 70px;
    background-color:coral;
    border-radius: 20px;
}

.orangeCircle:hover {
    cursor: pointer;
}

.greenCircle {
    color: #FFF;
    text-align: center;
    margin: 10px;
    height: 20px;
    width: 70px;
    background-color: lightgreen;
    border-radius: 20px;
}

.greenCircle:hover {
    cursor: pointer;
}

</style>