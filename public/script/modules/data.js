import { fetchData, fetchObjectDetails, fetchZoekURL} from "./fetch.js";
import { displayLoading, searchLoading, errorscreen } from "./display.js";
import { API_KEY,API_URL,article, ul } from './variables.js';
import { searchResultaten } from "./searchData.js";

export async function headerfotos(data) {
    const API_URL = `https://www.rijksmuseum.nl/api/nl/collection?&key=${API_KEY}&ps=100&&type=schilderij&imgonly=true`;
    var data = await fetchData(API_URL, API_KEY);
    const top5ArtObjects = data.artObjects.slice(0, 5);
    const listElement = document.createElement('ul');

    top5ArtObjects.forEach((top5ArtObject) => {
        const itemElement = document.createElement('li');
        const imageElement = document.createElement('img');

        imageElement.src = top5ArtObject.webImage.url; //img
        imageElement.alt = top5ArtObject.longTitle;

        itemElement.appendChild(imageElement); //li
        listElement.appendChild(itemElement); //ul

        const headerElement = document.querySelector('header');
        headerElement.appendChild(listElement);
    });
}

headerfotos();


export async function TOP10(data) {
    var data = await fetchData(API_URL, API_KEY);
    const top10ArtObjects = data.artObjects.slice(0, 10);
    const imageURLs = top10ArtObjects.map(artObject => artObject.webImage.url);
    const makernaamen = top10ArtObjects.map(artObject => artObject.principalOrFirstMaker);
    const imageTitels = top10ArtObjects.map(artObject => artObject.title);
    const objectNumber = data.artObjects.map(artObject => artObject.objectNumber);


    let array = imageURLs.map((item, index) => {
        return {
            "image": imageURLs[index],
            "name": makernaamen[index],
            "title": imageTitels[index],
            "objectNumber": objectNumber[index]
        }
    })


    const listElement = document.createElement('ul');

    array.forEach((item) => {
        const aElement = document.createElement('a');
        const itemElement = document.createElement('li');
        const imageElement = document.createElement('img');
        const divElement = document.createElement('div');
        const h3Element = document.createElement('h3');

        itemElement.dataset.objectNumber = item.objectNumber;
        imageElement.src = item.image; //img
        imageElement.alt = item.title + "van" + item.name;

        aElement.href = "#object/" + item.objectNumber;


        h3Element.innerText = item.title;

        divElement.appendChild(h3Element);      // div h3
        aElement.appendChild(divElement);       // li a div
        aElement.appendChild(imageElement);     //a img
        itemElement.appendChild(aElement);      //li a
        listElement.appendChild(itemElement);       //ul li
    })

    const Top10section = document.querySelector('main > section:first-of-type');
    Top10section.appendChild(listElement);

}

TOP10();


export async function get_details(objectNumber) {
        displayLoading();
        const obj_data = await fetchObjectDetails(objectNumber)
        let objDetails = obj_data.artObject;
        let description = objDetails.description;
        if (description === null) {
            description = "Er is momenteel geen beschrijving beschikbaar voor dit werk, informatie zal worden bijgewerkt zodra deze beschikbaar is.";
        }
    
    
        if(objDetails.webImage.url == null){
            console.log("none foto")
        }
        article.style.display = "grid";
    
        article.innerHTML =
        `
           <a href="#object/zoeken_page"></a>
            <a href="#object/open_image"></a>
            <a href="#object/details_page"></a>
    
            <img src="${objDetails.webImage.url}" alt="${objDetails.longTitle}">
    
            <section>
                <div>
                    <h2>${obj_data.artObject.title}</h2>
                    <p> Kunstenaar: ${obj_data.artObject.principalMaker}</p>
                </div>
    
                <h3>Description:</h3>
                <p>${description}</p>
    
                <div>
                    <p>Type:</p>
                    <p>${objDetails.objectTypes}</p>
                </div>
    
                <div>
                    <p>Techniques:</p>
                    <p>${objDetails.techniques}</p>
                </div>
                <div>
                    <p>Kunst id: </p>
                    <p> ${objDetails.id}</p>
                </div>
                <div>
                    <p>Materials:</p>
                    <p> ${objDetails.materials}</p>
                </div>
                <div>
                    <p>PresentingDate:</p>
                    <p>${objDetails.dating.presentingDate}</p>
                </div>
    
                <div>
                    <p>ProductionPlaces:</p>
                    <p>${objDetails.dating.productionPlaces}</p>
                </div>
                
            </section>
       `
    
        return article;
}


export async function getZoekenData(searchQuery){
    const Alldata = await fetchData(API_URL, API_KEY);

    // Array maken van alle makers namen en een Array van alle titles
    const AllMakersArray = Alldata.artObjects.map(artObject => artObject.principalOrFirstMaker)
    const AllTitlesArray = Alldata.artObjects.map(artObject => artObject.title)
    const AllobjectsNummbers = Alldata.artObjects.map(artObject => artObject.objectNumber)
    let Alltypes = [];
    let Allmaterials = [];

    for (const objectNumber of AllobjectsNummbers) {
        try {
          searchLoading();
          const objectDetails = await fetchObjectDetails(objectNumber);
          Alltypes = Alltypes.concat(objectDetails.artObject.objectTypes);
          Allmaterials = Allmaterials.concat(objectDetails.artObject.materials);
        } catch (error) {
          console.error(error);
        }
      }
    
    const MakersArray = [...new Set(AllMakersArray)];
    const TitlesArray = [...new Set(AllTitlesArray)];
    const typesArray = [...new Set(Alltypes)];
    const materialsArray = [...new Set(Allmaterials)];

    let zoeken = '';

    if(MakersArray.includes(searchQuery)){
        searchLoading();
        zoeken = 'involvedMaker=' + searchQuery;
        const data = await fetchZoekURL(API_URL,zoeken);
        searchResultaten(searchQuery,data);
    }

    else if(TitlesArray.includes(searchQuery)){
        searchLoading();
        zoeken = 'title=' + searchQuery;
        var data = await fetchZoekURL(API_URL,zoeken);
        searchResultaten(searchQuery,data);
    }

    else if(typesArray.includes(searchQuery)){
        searchLoading();
        zoeken = 'type=' + searchQuery;
        var data = await fetchZoekURL(API_URL,zoeken);
        searchResultaten(searchQuery,data);
    }

    else if(materialsArray.includes(searchQuery)){
        searchLoading();
        zoeken = 'type=' + searchQuery;
        var data = await fetchZoekURL(API_URL,zoeken);
        searchResultaten(searchQuery,data);
    }

    else {
        searchLoading();
        ul.innerHTML = '';
        ul.innerHTML = `
          <li class="geenResulteten">
            <img src="./images/error.svg" alt="geenResulteten image">
            <p> Sorry! </p>
            <p> Er is geen resultaten.
            probeer andere zoekwoorden </p>
          </li>
        `;
    }
}

























































