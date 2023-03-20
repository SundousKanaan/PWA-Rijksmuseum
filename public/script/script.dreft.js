// ps = The number of results per page.
// involvedMaker	 = Object needs to be made by this agent.
// toppieces = Only give works that are top pieces.
// material = The material of the object.
// artist = Sort results on artist (a-z).
// objecttype = Sort results on type.

// const API_URL = `https://www.rijksmuseum.nl/api/nl/collection?&key=${API_KEY}&ps=10&toppieces=${toppieces}`;


const API_KEY = 'BI5yOkPW';
const toppieces = 'true';

const type = '';
const artist = '';
const title = '';
// type=schilderij
const API_URL = `https://www.rijksmuseum.nl/api/nl/collection?&key=${API_KEY}&ps=1000&${type}&${artist}&${title}`;
const API_schilderijen_URL = `https://www.rijksmuseum.nl/api/nl/collection?&key=${API_KEY}&ps=100&&type=schilderij`;



// const APIsubURL = `https://www.rijksmuseum.nl/api/nl/collection?&key=${API_KEY}&${artist}&${artist}&${artist}`;

async function fetchData() {
  const data = fetch(API_URL)
    .then(response => response.json())
    .then(data => {

      const artObjectsCount = data.artObjects.length;
      console.log("data artObjects length is", artObjectsCount, data.artObjects);

      const API_schilderijen_URL = `https://www.rijksmuseum.nl/api/nl/collection?&key=${API_KEY}&ps=100&&type=schilderij`;
      fetch(API_schilderijen_URL)
        .then(response => response.json())
        .then(data => {
          console.log(data.artObjects);

          headerfotos(data);
        })

      TOP10(data);
    })

    .catch((err) => { console.error('Error:', err); })

}




// function typeFilter(){

//   console.log("raaaaaaaaaaaatr");
//   const go = input.value;
//   h2.innerText = "Resultaten:" + go ;
//   console.log("hai" + go);

//   // if(input.value === "schilderijen"){
//   //   type='schilderij';

//   //   const go = input.value;
//   //   h2.innerText = "Resultaten:" + go ;
//   //   console.log("hai" + go);
//   // }

// }








async function headerfotos(data) {
  const top5ArtObjects = data.artObjects.slice(0, 5);
  const imageURLs = top5ArtObjects.map(artObject => artObject.webImage.url);
  console.log("top5ArtObjects", imageURLs);

  const listElement = document.createElement('ul');

  imageURLs.forEach((imageURL) => {
    const itemElement = document.createElement('li');
    const imageElement = document.createElement('img');

    imageElement.src = imageURL; //img


    itemElement.appendChild(imageElement); //li
    listElement.appendChild(itemElement); //ul

    const headerElement = document.querySelector('header');
    headerElement.appendChild(listElement);
  });
  console.log(listElement);

  const imageTitels = top5ArtObjects.map(artObject => artObject.title);
  const makernaamen = data.artObjects.map(artObject => artObject.principalOrFirstMaker);
  console.log("makersnaamen", makernaamen);
  console.log("imageTitels", imageTitels);

  var headerimgs = document.querySelectorAll("header ul li img")

  imageTitels.forEach((imagetitel) => {
    for (let i = 0; i < headerimgs.length; i++) {
      headerimgs[i].alt = imagetitel;
    }
  })
}


function TOP10(data) {
  const top10ArtObjects = data.artObjects.slice(0, 10);
  const imageURLs = top10ArtObjects.map(artObject => artObject.webImage.url);
  const makernaamen = data.artObjects.map(artObject => artObject.principalOrFirstMaker);
  const imageTitels = top10ArtObjects.map(artObject => artObject.title);

  let array = imageURLs.map((item, index) => {
    return {"image": imageURLs[index], "name": makernaamen[index], "title": imageTitels[index]}
  })

  console.log(array)

  const listElement = document.createElement('ul');

  array.forEach((item) => {
    const buttonElement = document.createElement('button');
    const itemElement = document.createElement('li');
    const imageElement = document.createElement('img');
    const sectionElement = document.createElement('section');
    const h3Element = document.createElement('h3');

    imageElement.src = item.image; //img
    imageElement.alt = item.title + "van" + item.name;

    h3Element.innerText = item.title;

    sectionElement.appendChild(h3Element); //h3
    buttonElement.appendChild(sectionElement); // li button section
    buttonElement.appendChild(imageElement); //img
    itemElement.appendChild(buttonElement); //button
    listElement.appendChild(itemElement); //ul
  })

  // imageURLs.forEach((imageURL) => {
  //   makernaamen.forEach((makernaam) => {
  //     imageTitels.forEach((imageTitel) => {
  //       const buttonElement = document.createElement('button');
  //       const itemElement = document.createElement('li');
  //       const imageElement = document.createElement('img');
  //       const sectionElement = document.createElement('section');
  //       const h3Element = document.createElement('h3');

  //       imageElement.src = imageURL; //img
  //       imageElement.alt = imageTitel + "van" + makernaam;

  //       h3Element.innerText = imageTitel;

  //       sectionElement.appendChild(h3Element); //h3
  //       buttonElement.appendChild(sectionElement); // li button section
  //       buttonElement.appendChild(imageElement); //img
  //       itemElement.appendChild(buttonElement); //button
  //       listElement.appendChild(itemElement); //ul
  //     })
  //   })
  // });

  const Top10section = document.querySelector('main > section:first-of-type');
  Top10section.appendChild(listElement);
}


// console.log(listElement);

// const imageTitels = top10ArtObjects.map(artObject => artObject.title);
// // makers namen
// const makernaamen = data.artObjects.map(artObject => artObject.principalOrFirstMaker);
// console.log("makersnaamen" , makernaamen);
// console.log("imageTitels" , imageTitels);

// var headerimgs = document.querySelectorAll ("header ul li img")

// imageTitels.forEach((imagetitel)=> {
//     for(let i=0; i< headerimgs.length; i++){
//       headerimgs[i].alt = imagetitel;
//     }
// })
// }


fetchData();

