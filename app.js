const form = document.querySelector('form');
const imgUrl = document.querySelector('#img-url');
const topText = document.querySelector('#top-text');
const fontSize = document.querySelector('#font-size');
let fontDisplay = document.querySelector('#font-size-display')
const bottomText = document.querySelector('#bottom-text');

const memes = document.querySelector('#memes');

fontSize.addEventListener('input', function () {
    fontDisplay.textContent = fontSize.value;
})

form.addEventListener('submit', function (e) {
    e.preventDefault();
    console.log(imgUrl.value);
    createMeme();
})

memes.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        e.target.parentElement.remove();
    }
})


function createMeme() {
    if (!imgUrl.value) return;
    const newMemeDiv = document.createElement('div'); // first create div because we can not attach buttons to canvas
    const newMeme = document.createElement('canvas'); // then we create a canvas that we'll attach to div
    const removeButton = document.createElement('button'); // and a button that will be attached to div
    // specify canvas dimensions
    newMeme.width = '500';
    newMeme.height = '250';
    // update classes for newMemeDiv so we could control it's style with CSS
    newMemeDiv.className = 'meme';
    removeButton.className = 'remove-meme'; //add class to removeButton so we could style it wih CSS
    removeButton.textContent = 'X'; 
    newMemeDiv.append(newMeme); // attaching canvas to a div
    newMemeDiv.append(removeButton); // attaching removeButton to a div
    memes.append(newMemeDiv); // adding newMemeDiv to memes div on a page
    draw(newMeme); // create image function
}

function draw(canvas) {
    const newImg = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
        newImg.drawImage(img, 0, 0, img.width = 500, img.height = 250);
        // newImg.font = "30px Comic Sans MS";
        if (Number(fontSize.value) !== 20) {
            newImg.font = `${fontSize.value}px Impact`;
        } else newImg.font = "20px Impact";
        newImg.fillStyle = "white";
        newImg.textAlign = "center";
        // Top text and coordinates
        newImg.fillText(`${topText.value}`, 250, 40); // x = 250, y = 40
        // text outline
        newImg.strokeText(`${topText.value}`, 250, 40);
        // Bottom text
        newImg.fillText(`${bottomText.value}`, 250, 200);
        // text outline
        newImg.strokeText(`${bottomText.value}`, 250, 200);
    };
    img.src = imgUrl.value;
}