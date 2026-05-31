const city = document.querySelector('#city'),
form = document.querySelector('form'),
container = document.querySelector('.container'),
display = document.querySelector('.display'),
temp = document.querySelector('#temp'),
humidity = document.querySelector('#humidity'),
pressure = document.querySelector('#pressure'),
wind = document.querySelector('#wind'),
long = document.querySelector('#lon'),
lati = document.querySelector('#lat'),
timezone = document.querySelector('#time'),
country = document.querySelector('#country'),
province = document.querySelector('#province'),
submit= document.querySelector('#submit');


submit.addEventListener('click', async ()=>{
    const res = await fetch(`http://localhost:3000/weather?city=${city.value}`);
    const data = await res.json();

    temp.innerHTML =`${data.temp}°C`
    humidity.innerHTML =`${ data.humidity}%`
    pressure.innerHTML = `${data.pressure}Pa`
    wind.innerHTML = `${data.wind}m/s`
    long.innerHTML = `${data.long}°`
    lati.innerHTML = `${data.lati}°`
    timezone.innerHTML =  `+${data.timezone}`
    country.innerHTML = data.country
    province.innerHTML = data.city

    container.style.display = 'block'

})




form.addEventListener('submit',(e)=>{
    e.preventDefault()
})

city.addEventListener('input', ()=>{
    display.innerHTML = city.value
})