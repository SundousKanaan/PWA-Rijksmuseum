
import { fetchData } from './modules/fetch.js';
import { onRouteChanged } from './router.js';
import { displayLoading } from './modules/display.js';
import { getZoekenData, headerfotos } from './modules/data.js';



let Alldata;                             // Declare a variable named "Alldata" to store fetched data.

// Eventlisteners
window.addEventListener('hashchange', function () {
  onRouteChanged(Alldata);               // De functie onRouteChanged wordt aangeroepen en de Alldata wordt meegegeven
}, false);

displayLoading();

async function dataDisplay() {
  try {
    const data = await fetchData();     // Call the fetchData function to fetch data from the API.
    Alldata = data;                     // Assign the fetched data to the Alldata variable.
    console.log(Alldata);
    headerfotos();
  }
  catch (error) {                     // Add error handling for any errors that occur during the fetch operation.
    console.log(error);

  }
}



// variables

// Grab HTML elements we're using to search
let input = document.querySelector('main form label input');
let zoekenButton = document.querySelector('main form label button');


// Listen to the click of the button to initialize the search
zoekenButton.addEventListener('click', e => {
  e.preventDefault()
  // Grab the value of the input
  const searchQuery = input.value;
  console.log(searchQuery);

  // Start the chain using the input value
  getZoekenData(searchQuery);
})