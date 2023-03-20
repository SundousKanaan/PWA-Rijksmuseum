
import { ul, h2, main ,toTop } from './variables.js';


export async function searchResultaten(searchQuery,data) {
    var mijnData = data.artObjects;
    const imageURLs = mijnData.map(artObject => artObject.webImage?.url || 'https://via.placeholder.com/150' ); //placeholder image
    const imageTitels =  mijnData.map(artObject => artObject.title);
    const longTitels =  mijnData.map(artObject => artObject.longTitle);
    const makersnamen = mijnData.map(artObject => artObject.principalOrFirstMaker);
    const objectNumbers = mijnData.map(artObject => artObject.objectNumber);

    let array = imageTitels.map((item, index) => {
        return {
            "image": imageURLs[index],
            "name": makersnamen[index],
            "title": imageTitels[index],
            "longTitel": longTitels[index],
            "objectNumber": objectNumbers[index]
        }
    })

    console.log("mijn Array:" , array);

    h2.innerHTML=`
    "${searchQuery}" Resultaten:
    `
    ul.innerHTML = '';

    const liHTML = array.map((item) => `
    <li>
        <a href="#object/${item.objectNumber}">
            <div>
                <h3>${item.title}</h3>
            </div>
            <img src="${item.image}"
            alt="${item.longTitel}">
        </a>
    </li>
    `
).join('');

    ul.innerHTML = liHTML;

    toTop.style.display="block";
    main.style="grid-template-rows:auto;";
}