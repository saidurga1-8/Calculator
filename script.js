let display = document.getElementById("display")
let historyList = document.getElementById("history-list");
let history = []

function addToDisplay(pvalue) {
    display.value += pvalue;
}

function clearDisplay(){
    display.value ="";
}

function deleteLast(){
    display.value = display.value.slice(0,-1);
}

function sqrt()
{
    let value = parseFloat(display.value);
    if(!isNaN(value))
    {
        let result = Math.sqrt(value);
        addToHistory(`√${value} = ${result}`);
        display.value = result;
    }
}


function calculate()
{
    let expression= display.value.replace(/\^/g,"**");
    let result = eval(expression);
    addToHistory(`${display.value} = ${result}`); // "2+3 = 5"
    display.value = result;
}

function addToHistory(entry)// "2+3 = 5"
{
    if(history.length ==10 )
        history.pop(); //keep only 10 value
    history.unshift(entry);//["2+3 = 5","6*5 = 30"]
    updateHistoryUI();
}
function updateHistoryUI(){
    historyList.innerHTML ="";
    history.forEach(
        //"2+3 = 5"
        (item,index) =>{
        let li = document.createElement("li");
        li.textContent = item;
        let equation = item.split(" = ")[0];//["2+3","5"]
        li.onclick = ()=>{
            display.value = equation;
        };
        let deletebtn = document.createElement('button');
        deletebtn.textContent = 'x';
        deletebtn.onclick =() =>{
            history.splice(index,1);
            updateHistoryUI();
        }

        li.appendChild(deletebtn);
        historyList.appendChild(li);
    });

}