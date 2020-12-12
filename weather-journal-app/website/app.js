/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// b_Url = the base url for openwathermap api
const b_Url = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// a_Key = my personal API key that I took and generate from opemwathermap
const a_Key = "&Appid=6f4557168f8b6a1862f8c1886eec1a8b&units=metric";

//Here I make an event listener as click for "generate" that exisiting in the index.html in line 21
document.getElementById('generate').addEventListener('click', doFunction);

/*doFunction is the function that I made in the event listener
e = event*/
function doFunction(e) {

  // zCode = Zip code, "zip" is an id that exist in index.html in line 16
  const zCode = document.getElementById('zip').value;
  // feeling = feelings but i didn't want to put the id name same to the variable name so i or someone get confuse, feleings is an Id that exist in index.html line 20
  const feeling = document.getElementById('feelings').value;

  // to check if the input is vaild
  if (zCode.length == 0 || feeling.length == 0){
    alert ("Please write a correct input, you should write a zip code and your wonderful feeling");
  }
  //consol.log('getWeather is here');
  //b_url = base urle for opneweather, zCode = zip code, a_Key = Api personal code + Note: I think I can set them in variable like "getWeatherInfo(w_Info)""
  getWeatherInfo(b_Url, zCode, a_Key)
  .then(function(data){
    //POST data request
    postData('/add',
    { temp: data.main.temp, // temp = tempreture
      date: newDate,        // nDate = New Date
      u_response: feeling //feel = thier feelings i mean
    })
    //To update the user interface
    .then(function(){
      u_UserInterface() // u_UserInterface = upadte user interface
    })

  })
}

//To GET web API data with async
const getWeatherInfo = async (b_Url, zCode, a_Key) => {    // refer to line 25 and 26 for more information !
  const res = await fetch(b_Url + zCode + a_Key); // res = response
  try {
    const data = await res.json();
    return data;
  }
  // if we got error hopfully not
  catch(error){
    console.log('error here 1', error);
  }
};

// To POST data with async
const postData = async (url ="", data = {}) =>{
  const res = await fetch (url, {   // res = response!
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'content-type' : 'application/json', // so we match body data with content type
    },
    body:JSON.stringify(data)
  });

  try{
    const nData = await res.json(); // nData = new data and res = respones
    return nData;
  }
  catch(error) {
    console.log('error here 2', error);
  }
};

// To GET the project data
const u_UserInterface = async () => {
  // req = request !
  const res = await fetch("/all");
  try{
    console.log("yo");

    const data = await res.json();
    document.getElementById('date').innerHTML = "The Date: " + data.date; // its data . date don't get confuse, it's an id in style sheet line 42
    document.getElementById('temp').innerHTML = "The Temperature: " + data.temp; // it's an id in style sheet line 50
    document.getElementById('content').innerHTML = "Your feelings: " +  data.u_response; // it's an id in style sheet line 57
  }
  catch (error){
    console.log('error here 3', error);
  }
};
