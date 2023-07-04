async function OverdueToToday(token) {
    const now = new Date();
    const nowInRFC3339 = now.toISOString();
    const daysSinceSunday = now.getDay();
    const lastSundayPlusOneDay = new Date(now.getTime() - (daysSinceSunday-2) * 24 * 60 * 60 * 1000);
    const setTime = new Date(lastSundayPlusOneDay.setHours(23, 59));
    const rfc3339Date = setTime.toISOString();
    const date = rfc3339Date;
    console.log(date);
    let get = {
        method: 'GET',
        async: true,
        headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
        },
    };
    let patch = {
        method: 'PATCH',
        headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({due: nowInRFC3339}),
    }
    try {
        const taskListResponse = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', get);
        const data = await taskListResponse.json();
        const idsOfTaskLists = data.items.map(item => item.id);
        for(idTaskList of idsOfTaskLists){
            const tasksResponse = await fetch(
            `https://tasks.googleapis.com/tasks/v1/lists/${idTaskList}/tasks?dueMax=${date}&showCompleted=false&showHidden=false&maxResults=100`, get
            );
            const tasks = await tasksResponse.json();
            const idsOfTasks = tasks.items.map(item => item.id);
            for(idTask of idsOfTasks){
                const patchResponse = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${idTaskList}/tasks/${idTask}`, patch);
                const patchResult = await patchResponse.json();
                console.log('updated ',patchResult.title);
            }
        }
    } catch (error) {
        alert('You are not connected, please click on the extension icon and connect to your Google account.');
    }
}

function addButtonOverdueToToday() {
    const targetDiv = document.querySelector("div.gb_pd.gb_zd.gb_Ue.gb_Ee.gb_Te.gb_Re.gb_We");
    if (targetDiv) {
        const cssPath = chrome.runtime.getURL('styles.css');
        const buttonItem = `
        <style>
            @import url(${cssPath});
        </style>
        <border-button class="overdue-to-today-button-GtaskEnhancer">
            Overdue to today
        </border-button>`;
        targetDiv.insertAdjacentHTML('afterend', buttonItem);
        const button = document.getElementsByClassName("overdue-to-today-button-GtaskEnhancer")[0]
        button.addEventListener('click', async function() {
            chrome.storage.local.get(["GtaskEnhancerToken"], async function(result) {
                const token = result.GtaskEnhancerToken;
                OverdueToToday(token);
            });
        });
    } else {
        console.error(`<div> undefined, button "Overdue to today" not added`);
    }
}

function addFeatures() {
    addButtonOverdueToToday();
}

window.addEventListener('load', addFeatures);