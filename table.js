async function populate() {
    // If you dont have local server remove lines 18 - 28 and uncomment line below
    // const data = [{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Australija","drzava_iso":"AUS","sifra_valute":"036","valuta":"AUD","jedinica":1,"kupovni_tecaj":"4,828113","srednji_tecaj":"4,842641","prodajni_tecaj":"4,857169"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Kanada","drzava_iso":"CAN","sifra_valute":"124","valuta":"CAD","jedinica":1,"kupovni_tecaj":"4,920785","srednji_tecaj":"4,935592","prodajni_tecaj":"4,950399"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Češka","drzava_iso":"CZE","sifra_valute":"203","valuta":"CZK","jedinica":1,"kupovni_tecaj":"0,288869","srednji_tecaj":"0,289738","prodajni_tecaj":"0,290607"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Danska","drzava_iso":"DNK","sifra_valute":"208","valuta":"DKK","jedinica":1,"kupovni_tecaj":"1,013047","srednji_tecaj":"1,016095","prodajni_tecaj":"1,019143"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Mađarska","drzava_iso":"HUN","sifra_valute":"348","valuta":"HUF","jedinica":100,"kupovni_tecaj":"2,109833","srednji_tecaj":"2,116182","prodajni_tecaj":"2,122531"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Japan","drzava_iso":"JPN","sifra_valute":"392","valuta":"JPY","jedinica":100,"kupovni_tecaj":"6,005233","srednji_tecaj":"6,023303","prodajni_tecaj":"6,041373"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Norveška","drzava_iso":"NOR","sifra_valute":"578","valuta":"NOK","jedinica":1,"kupovni_tecaj":"0,736606","srednji_tecaj":"0,738822","prodajni_tecaj":"0,741038"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Švedska","drzava_iso":"SWE","sifra_valute":"752","valuta":"SEK","jedinica":1,"kupovni_tecaj":"0,746580","srednji_tecaj":"0,748826","prodajni_tecaj":"0,751072"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Švicarska","drzava_iso":"CHE","sifra_valute":"756","valuta":"CHF","jedinica":1,"kupovni_tecaj":"6,996350","srednji_tecaj":"7,017402","prodajni_tecaj":"7,038454"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Velika Britanija","drzava_iso":"GBR","sifra_valute":"826","valuta":"GBP","jedinica":1,"kupovni_tecaj":"8,527173","srednji_tecaj":"8,552831","prodajni_tecaj":"8,578489"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"SAD","drzava_iso":"USA","sifra_valute":"840","valuta":"USD","jedinica":1,"kupovni_tecaj":"6,209563","srednji_tecaj":"6,228248","prodajni_tecaj":"6,246933"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Bosna i Hercegovina","drzava_iso":"BIH","sifra_valute":"977","valuta":"BAM","jedinica":1,"kupovni_tecaj":"3,853692","srednji_tecaj":"3,865288","prodajni_tecaj":"3,876884"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"EMU","drzava_iso":"EMU","sifra_valute":"978","valuta":"EUR","jedinica":1,"kupovni_tecaj":"7,537167","srednji_tecaj":"7,559847","prodajni_tecaj":"7,582527"},{"broj_tecajnice":"14","datum_primjene":"2021-01-22","drzava":"Poljska","drzava_iso":"POL","sifra_valute":"985","valuta":"PLN","jedinica":1,"kupovni_tecaj":"1,663944","srednji_tecaj":"1,668951","prodajni_tecaj":"1,673958"}]
    let options = {
        method: "GET",
        headers: {
            "Access-Control-Request-Headers": "*",
            "Access-Control-Request-Method": "*",
            'Content-Type':'application/json'
        },
    };
    const request = new Request('./exchangerates.json',options);
    const response = await fetch(request);
    const data = await response.json();
    populateHeader()
    populateInput(data)
    populateTable(data)

}
function populateHeader() {
    const header = document.querySelector('header');
    const title = document.createElement('h1');
    title.textContent = "Exchange rates";
    header.appendChild(title);
}
function populateInput(obj){
    const inputs = document.querySelector('div');
    const numberInput = document.createElement('input')
    numberInput.setAttribute("type", "number");
    const selectInput = document.createElement('select')
    const iterator = obj.values()
    const selectValues=[]
    for (const value of iterator) {
        selectValues.push(value['valuta'])
    }
    for (let i = 0; i < selectValues.length; i++) {
        const option = document.createElement("option");
        option.value = selectValues[i];
        option.text = selectValues[i];
        selectInput.appendChild(option);
    }
    const conversionButton = document.createElement("button")
    conversionButton.setAttribute("type","submit")
    conversionButton.innerHTML = 'Convert';
    conversionButton.onclick = function(){
        let newArray = []
        if (numberInput.value !== '') {
            let vrijednosti = srednjiTecaj(obj).values
            let broj = parseInt(numberInput.value)
            // console.log(vrijednosti.tecaj, vrijednosti.jedinica, broj)
            for (let i = 0; i < obj.length; i++) {
                let tecaj = obj[i].srednji_tecaj
                let tecaj2 = parseFloat(tecaj.replace(/,/g, ".")).toFixed(6);
                let jedinica2 = obj[i].jedinica
                let newObject = {}
                newObject = ( broj * vrijednosti.tecaj * jedinica2) / (tecaj2 * vrijednosti.jedinica)
                newArray.push(newObject)
            }
            const formattedTableData = (obj, newArray) => obj.map((obj, i) => (
                {
                    ...obj,
                    conversion: newArray[i].toFixed(2)
                }
            ));
            const destroyTable = document.querySelector('table')
            destroyTable.remove()
            populateTable(formattedTableData(obj,newArray))
        } else alert('Please enter the number for conversion')
    }
    let srednjiTecaj = function (array){
        const findTecaj = array.find(i => i.valuta === selectInput.value)
        let tecaj1 =parseFloat(findTecaj.srednji_tecaj.replace(/,/g, ".")).toFixed(6);
        return {
            values:{
                tecaj : tecaj1,
                jedinica : findTecaj.jedinica,
            }
        }
    }
    inputs.appendChild(numberInput)
    inputs.appendChild(selectInput)
    inputs.appendChild(conversionButton)
}

function populateTable(obj){
    const section  = document.querySelector("section")
    let col = [];
    for (let i = 0; i < obj.length; i++) {
        for(let key in obj[i]){
            if (col.indexOf(key)===-1){
                col.push(key)
            }
        }
    }
    const table = document.createElement('table')
    let tr = table.insertRow(-1)
    for (let i = 0; i <col.length ; i++) {
        const th = document.createElement("th");    // Headers
        th.innerHTML = col[i].replace("_"," ").toUpperCase();
        tr.appendChild(th);
    }
    table.insertRow(-1);
    const th = document.createElement("th");
    for (let i = 0; i <obj.length ; i++) {
        let tr = table.insertRow(-1)
        for (let j = 0; j < col.length ; j++) {
            let tableCell = tr.insertCell(-1);
            tableCell.innerHTML = obj[i][col[j]]
        }
    }
    section.appendChild(table)
}
populate();
