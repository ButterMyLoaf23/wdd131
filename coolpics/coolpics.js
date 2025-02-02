document.getElementById('menu-button').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('hidden');
  });

  function handleResize() {
    const menu = document.getElementById('nav-links');
    if (window.innerWidth > 1000) {
      menu.classList.remove('hidden');
    } else {
      menu.classList.add('hidden')
    }
  }
  
function viwerTemplate(pic, alt) {
  return `<div class="viewer">
      <button class="close-viewer">X</button>
      <img src="${pic}" alt="${alt}">
  </div>`;
}

function viewHandler(event) {
  if (event.target.tagName !== 'IMG') return;
  const clickedImg=event.target;
  const imgSrc=clickedImg.src.replace('-sm','-full');
  const altText=clickedImg.alt;

  document.body.insertAdjacentHTML("afterbegin", viwerTemplate(imgSrc, altText));
  document.querySelector('.close-viewer').addEventListener('click',closeViewer);
}

document.querySelector('.gallery').addEventListener('click', viewHandler);

function closeViewer() {
  document.querySelector('.viewer').remove();
}

