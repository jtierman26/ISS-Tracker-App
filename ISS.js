let xshow = 0;

//map and tiles
var map = L.map('map').setView([0,0], 1);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//Show the marker with icon 
const myIcon = L.icon({
    iconUrl: 'iss.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
});

let marker = L.marker([0, 0], {icon: myIcon}).addTo(map)
.bindPopup('The ISS')
.openPopup();

let t = 0
let firstTime = true;

let url = "https://api.wheretheiss.at/v1/satellites/25544";

let lat = document.getElementById("lat");
let long = document.getElementById("long");
let myLoader = document.querySelector(".load");
let ShowLat = document.querySelector(".latitude");
let ShowLong = document.querySelector(".longitude");

async function getISS() {
    const response = await fetch(url);
    const data = await response.json();
    const {latitude, longitude} = data;
    
    marker.setLatLng([latitude, longitude]);
    
    if(firstTime){
    map.setView([latitude, longitude], 1);
    firstTime = false;
    }

    lat.textContent = latitude;
    long.textContent = longitude;
    t++;
}

function load(){
    const issInterval = setInterval(() => {
        getISS();
    }, 2000);

    setTimeout(() => {
        load();
    myLoader.style.display = "none"
    ShowLat.style.display = "block";
    ShowLong.style.display = "block";
    xshow = 5;
    }, 3500);
}

load();
