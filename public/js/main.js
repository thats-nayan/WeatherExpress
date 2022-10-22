
const submitBtn = document.querySelector("#submitBtn");
const day = document.querySelector("#day");
const today_date = document.querySelector("#today_date");
const cityName = document.querySelector("#cityName");
const output = document.querySelector("#city_name");
const temp = document.querySelector("#temp");
let temp_status = document.querySelector("#temp_status");

const currTime = new Date();
const days = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
day.textContent = days[currTime.getDay()-1];
today_date.textContent = currTime.getDate()+" "+month[currTime.getMonth()];

const getinfo = (event) =>{
    event.preventDefault();
    if(cityName.value == "")
    {
        output.innerHTML = "City Name cannot be empty";
        return ;
    }
    // alert(cityName.value);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=1d93013ec716cec2da388b4db11d135d`)
            .then((res) => res.json())
            .then((data) => {
                output.innerHTML = data.weather[0].main ;
                temp.innerHTML = Math.floor(data.main.temp - 273)+ "&deg;"+"C";
                
                if(data.weather[0].main == "Clear")
                temp_status.innerHTML = '<i class="fa-solid fa-sun"></i>';
                else if(data.weather[0].main == "Clouds")
                temp_status.innerHTML = '<i class="fa-solid fa-cloud"></i>';
                else
                {
                    output.innerHTML = "Cloud Rain";
                    temp_status.innerHTML = '<i class="fa-solid fa-cloud-rain"></i>';
                }
            })
            .catch((error) => {
                temp.innerHTML = "";
                    output.innerHTML = "City does not exists";
                    temp_status = '<i class="fa-regular fa-face-sad-sweat"></i>';
            })
}
submitBtn.addEventListener("click",getinfo);