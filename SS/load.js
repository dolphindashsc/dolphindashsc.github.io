const datapath = "https://raw.githubusercontent.com/dolphindashsc/data/refs/heads/main/data.json";
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
    
    //updatePbar();

    for (let i = 0; i < data.upcomingevents.length; i++) {
        var ev = data.upcomingevents[i];
        addEventRow(ev.time, ev.title, ev.description);
    }
}

function updatePbar() {
    var totalraised = 0;
    for (let i = 0; i < data.earnings.length; i++) {
        totalraised += data.earnings[i].amount;

        addBreakdownEntry(data.earnings[i].amount, data.earnings[i].source);
    }

    document.getElementsByClassName("progressbartext")[0].textContent = `$${totalraised} raised / $${data.goal}`;
    document.body.style.setProperty("--progressbarprogress", ((totalraised / data.goal) * 100) + "%");
}

function addBreakdownEntry(amount, source) {
    const entryDiv = document.createElement('div');
    entryDiv.className = 'breakdownentry';
  
    const amountDiv = document.createElement('div');
    amountDiv.className = 'breakdownamount';
    amountDiv.textContent = "$"+amount;
    entryDiv.appendChild(amountDiv);
  
    const sourceDiv = document.createElement('div');
    sourceDiv.className = 'breakdownsource';
    sourceDiv.textContent = source;
    entryDiv.appendChild(sourceDiv);
  
    const targetDiv = document.getElementsByClassName('breakdown')[0];
    targetDiv.appendChild(entryDiv);
}

function addEventRow(time, title, description) {
    const tr = document.createElement('tr');
    tr.className = 'eventcontainer';

    const td = document.createElement('td');

    const eventDiv = document.createElement('div');
    eventDiv.className = 'event';

    const eventHeader = document.createElement('div');
    eventHeader.className = 'eventitemheader';

    const titleSpan = document.createElement('span');
    titleSpan.className = 'eventtitle';
    titleSpan.textContent = title;
    eventHeader.appendChild(titleSpan);

    const timeSpan = document.createElement('span');
    timeSpan.className = 'eventtime';
    timeSpan.textContent = time;
    eventHeader.appendChild(timeSpan);

    eventDiv.appendChild(eventHeader);

    const descSpan = document.createElement('span');
    descSpan.className = 'eventdescription';
    descSpan.innerHTML = '° ' + description;
    eventDiv.appendChild(descSpan);

    td.appendChild(eventDiv);

    tr.appendChild(td);

    const containerDiv = document.querySelector('.upcomingevents');
    const table = containerDiv.querySelector('table');
    const tbody = table.querySelector('tbody');

    tbody.appendChild(tr);
}
