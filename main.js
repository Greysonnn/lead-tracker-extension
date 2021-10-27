// js
let myLeads = []
const inputEl = document.querySelector("#input-el")
const inputBtn = document.getElementById('input-btn')
const ulEl = document.querySelector('#ul-el')
const clearBtn = document.querySelector('#clear-btn')
const leadsFromLocalStorage = JSON.parse (localStorage.getItem("myLeads"))
const saveBtn = document.querySelector('#save-btn')

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

saveBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${leads[i]}'>
                    ${leads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

clearBtn.addEventListener("dblclick", function() {
    console.log("doubleclick")
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log( localStorage.getItem("myLeads"))
})
