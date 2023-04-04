
console.log("hallo script");

const article = document.querySelector('article');
const openImgButton = document.querySelector('article button:first-of-type');
const closeImgButton = document.querySelector('article button:nth-of-type(2)');

openImgButton.addEventListener('click', () => {
    article.classList.add('openimg');
})

closeImgButton.addEventListener('click', () => {
    article.classList.remove('openimg');
})
