const selectedLangs = []
let mapLevel = new Map()

function addSquare(){
    
    let e = document.getElementById("lang")
    let dropValue = e.options[e.selectedIndex].value
    
    if(selectedLangs.indexOf(dropValue) == -1){

        let newSquare = document.createElement("DIV")
        newSquare.setAttribute('class','square-lan')
        newSquare.setAttribute('id', 'Square'+String(dropValue))
        selectedLangs.push(dropValue)
        mapLevel.set("lvl"+String(dropValue),'Principiante')

        newSquare.innerHTML = `
        <button type="button" class="but-x" onclick="removeSquare('Square','${String(dropValue)}')">X</button>
        <div class="square-text">
            <p>${dropValue}<br>
               Elija nivel:
            </p>
        </div>
        <select id="lvl${String(dropValue)}" name="disp-lvl" class="list-lvl" onchange="selectLevel('lvl${String(dropValue)}')">
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
        </select>`
        document.getElementById("mid").appendChild(newSquare)
    }
}

function selectLevel(keylvl){

    let e = document.getElementById(keylvl)
    let dropValueLvl = e.options[e.selectedIndex].value
    mapLevel.set(keylvl, String(dropValueLvl))
}

function removeSquare(idSquare,lang){
    let e = document.getElementById(idSquare+lang)
    document.getElementById("mid").removeChild(e)
    const index = selectedLangs.indexOf(lang)
    selectedLangs.splice(index,1)
    mapLevel.delete('lvl'+lang)
}

function aceptar(){

    if(selectedLangs.length > 0){

        let res = document.getElementById("resumen")
        if(res==null){
            let newDIV = document.createElement("DIV")
            newDIV.setAttribute('id','resumen')
            let txt = "Idiomas: ";
            selectedLangs.forEach(generateResults);
            function generateResults(value, index, array) {
                txt = txt + value + ": " + mapLevel.get('lvl'+ value) + "<br>"; 
            }

            newDIV.innerHTML = txt;
            document.getElementById("mid-res").appendChild(newDIV)
        }
        else{
            document.getElementById("mid-res").removeChild(res)

            let newDIV = document.createElement("DIV")
            newDIV.setAttribute('id','resumen')
            let txt = "Idiomas: ";
            selectedLangs.forEach(generateResults);
            function generateResults(value, index, array) {
                txt = txt + value + ": " + mapLevel.get('lvl'+ value) + "<br>"; 
            }

            newDIV.innerHTML = txt;
            document.getElementById("mid-res").appendChild(newDIV)
        }
        getWeather()
    }
    
}

function getWeather(){

    switch(selectedLangs[0]) {
        case "Inglés":
            //we(2643743)
            async function weLondon(){
                let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=2643743&appid=9bdedc0dd764e4bbf3e0e871ea6df339`)
                let weather = await response.json()
                return weather
            }
        
            weLondon().then(weather => {
                console.log(weather.main.temp)
                document.getElementById("weather").innerHTML = `Weather at London: 
                ${weather.weather[0].description} at ${parseInt(weather.main.temp-273.15,10)}C°`
            })
          break;
        case "Francés":
            //we(2968815)
            async function weParis(){
                let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=2968815&appid=9bdedc0dd764e4bbf3e0e871ea6df339`)
                let weather = await response.json()
                return weather
            }
        
            weParis().then(weather => {
                console.log(weather.main.temp)
                document.getElementById("weather").innerHTML = `Weather at Paris: 
                ${weather.weather[0].description} at ${parseInt(weather.main.temp-273.15,10)}C°`
            })
          break;
        case "Español":
            //we(3117735)
            async function weMadrid(){
                let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=3117735&appid=9bdedc0dd764e4bbf3e0e871ea6df339`)
                let weather = await response.json()
                return weather
            }
        
            weMadrid().then(weather => {
                console.log(weather.main.temp)
                document.getElementById("weather").innerHTML = `Weather at Madrid: 
                ${weather.weather[0].description} at ${parseInt(weather.main.temp-273.15,10)}C°`
            })
            break;
        default:
      }

    /*async function we(id){
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?id=${id}&appid=9bdedc0dd764e4bbf3e0e871ea6df339`)
        let weather = await response.json()
        return weather
    }

    we().then(weather => {
        console.log(weather.main.temp)
        document.getElementById("weather").innerHTML = `Weather at London: 
        ${weather.weather[0].description} at ${parseInt(weather.main.temp-273.15,10)}C°`
    })*/    
  
}

