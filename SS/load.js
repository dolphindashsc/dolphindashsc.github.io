const datapath = "https://raw.githubusercontent.com/GesChen/clubdata/refs/heads/main/ddsc.json";
var data;
var windowloaded = false;

async function update() {
    data = await fetch(datapath);
    data = await data.text();
    
    data = JSON.parse(data);

    console.log(data);
    
    if (!windowloaded)
        window.addEventListener("load", () => { updateContent(); });
    else
        updateContent();
}

window.addEventListener("load", () => { windowloaded = true; });

update();

function updateContent() {
    //document.getElementsByClassName("nextmeeting")[0].textContent = `Next meeting: ${data.nextmeeting}`;
    
    var totalraised = 0;
    for (let i = 0; i < data.earnings.length; i++) {
        totalraised += data.earnings[i].amount;

        addBreakdownEntry(data.earnings[i].amount, data.earnings[i].source);
    }

    document.getElementsByClassName("progressbartext")[0].textContent = `$${totalraised} raised / $${data.goal}`;
    document.body.style.setProperty("--progressbarprogress", ((totalraised / data.goal) * 100) + "%")

    for (let i = 0; i < data.upcomingevents.length; i++) {
        var ev = data.upcomingevents[i];
        addEventRow(ev.time, ev.title, ev.description);
    }
}

function addBreakdownEntry(amount, source) {
    // Create the main div
    const entryDiv = document.createElement('div');
    entryDiv.className = 'breakdownentry';
  
    // Create and append the amount div
    const amountDiv = document.createElement('div');
    amountDiv.className = 'breakdownamount';
    amountDiv.textContent = "$"+amount;
    entryDiv.appendChild(amountDiv);
  
    // Create and append the source div
    const sourceDiv = document.createElement('div');
    sourceDiv.className = 'breakdownsource';
    sourceDiv.textContent = source;
    entryDiv.appendChild(sourceDiv);
  
    // Append the entry div to the target div
    const targetDiv = document.getElementsByClassName('breakdown')[0];
    targetDiv.appendChild(entryDiv);
}

function addEventRow(time, title, description) {
    // Create the main tr element
    const tr = document.createElement('tr');
    tr.className = 'eventcontainer';

    // Create the td element
    const td = document.createElement('td');

    // Create the event div
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event';

    // Create and append the event time span
    const timeSpan = document.createElement('span');
    timeSpan.className = 'eventtime';
    timeSpan.textContent = time;
    eventDiv.appendChild(timeSpan);

    // Create and append the event title span
    const titleSpan = document.createElement('span');
    titleSpan.className = 'eventtitle';
    titleSpan.textContent = title;
    eventDiv.appendChild(titleSpan);

    // Create and append the event description span
    const descSpan = document.createElement('span');
    descSpan.className = 'eventdescription';
    descSpan.innerHTML = description;
    eventDiv.appendChild(descSpan);

    // Append the event div to the td
    td.appendChild(eventDiv);

    // Append the td to the tr
    tr.appendChild(td);

    // Find the container div by class name
    const containerDiv = document.querySelector('.upcomingevents');

    // Find the table inside the container div
    const table = containerDiv.querySelector('table');

    // Find the tbody of the table
    const tbody = table.querySelector('tbody');

    // Append the new tr to the tbody
    tbody.appendChild(tr);
}
