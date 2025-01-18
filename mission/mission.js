const themeSelector = document.querySelector('#theme-select');

function changeTheme() {
    const theme = themeSelector.value;

    const body = document.body;

    const logo = document.querySelector('.footer img');

    if (theme === 'dark') {

        body.classList.add('dark');

        logo.src = 'images/byui-logo_white.png';
    } else {

        body.classList.remove('dark');

        logo.src = 'images/byui-logo_blue.webp';
    }
}

themeSelector.addEventListener('change', changeTheme);
