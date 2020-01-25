console.log('GO BUCS!');

// Firebase config
var firebaseConfig = {
  apiKey: 'AIzaSyDPzCd7zDYbSlvfty4LxtBW7YE3Rmx9IKY',
  authDomain: 'compsci-club-5c2e0.firebaseapp.com',
  databaseURL: 'https://compsci-club-5c2e0.firebaseio.com',
  projectId: 'compsci-club-5c2e0',
  storageBucket: 'compsci-club-5c2e0.appspot.com',
  messagingSenderId: '407637857342',
  appId: '1:407637857342:web:1b36d7433f3a5f9215ed6f',
  measurementId: 'G-0YY8DFEWF9'
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// DOM elements
const header = document.getElementById('rbr-header');
const body = document.getElementById('rbr-body');
const main = document.getElementById('rbr-main');
const footer = document.getElementById('rbr-footer');
const nav = document.getElementById('rbr-nav');

// Footer Date
const start = new Date().getFullYear();
const date = `Property of Red Bank Regional HS`;
const copy = `&copy ${start}`;
const dateDiv = document.createElement('div');
const copyDiv = document.createElement('div');
const footerDiv = document.createElement('div');
dateDiv.innerHTML = date;
copyDiv.innerHTML = copy;
footer.appendChild(dateDiv);
footer.appendChild(copyDiv);

// Program State
const state = {
  darkMode: false
};

// Counter Button
let counter = document.createElement('div');
counter.setAttribute('id', 'count-num');
firebase
  .database()
  .ref()
  .on('value', snapshot => {
    counter.innerText = snapshot.val().clicks;
  });

let renderButton = document.createElement('button');
renderButton.innerText = `👍`;
renderButton.setAttribute('id', 'click-button');
renderButton.addEventListener('click', async () => {
  await incrementCounter();
});

let incrementCounter = () => {
  let currCount = document.getElementById('count-num').textContent;
  currCount++;
  if (currCount < Number.MAX_SAFE_INTEGER) {
    firebase
      .database()
      .ref()
      .set({
        clicks: currCount
      });
  } else {
    counter.innerText = `🎉`;
    renderButton.innerText = `❌`;
    renderButton.setAttribute('id', 'dead-button');
  }
};

// Create Page Contents
let container = () => {
  let container = document.createElement('div');
  container.setAttribute('class', 'counter');
  container.appendChild(renderButton);
  container.appendChild(counter);
  return container;
};

// Dark Mode Toggle
let pressed = [];
const secretCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
window.addEventListener('keyup', e => {
  pressed.push(e.keyCode);
  pressed.splice(-secretCode.length - 1, pressed.length - secretCode.length);
  if (JSON.stringify(pressed) === JSON.stringify(secretCode)) {
    console.log('DARK MODE TOGGLE');
    toggleDarkMode();
  }
});

let toggleDarkMode = () => {
  state.darkMode = !state.darkMode;
  if (state.darkMode) {
    header.setAttribute('class', 'dark-mode');
    body.setAttribute('class', 'dark-mode');
    main.setAttribute('class', 'dark-mode');
    footer.setAttribute('class', 'dark-mode');
    nav.setAttribute('class', 'dark-mode');
  } else {
    header.removeAttribute('class', 'dark-mode');
    body.removeAttribute('class', 'dark-mode');
    main.removeAttribute('class', 'dark-mode');
    footer.removeAttribute('class', 'dark-mode');
    nav.removeAttribute('class', 'dark-mode');
  }
};

// Student Project Handler
const projectList = [
  {
    id: 'tresten',
    name: 'Tresten Simon',
    projName: 'Wave Simulator',
    img: ['./img/tresten1.jpg', './img/tresten2.jpg', './img/tresten3.jpg'],
    link: 'https://wave-simulation.trestans23.repl.co/'
  },

];

let projects = () => {
  // queue for projects based on array contents
  let projQueue = [];
  let projContainer = document.createElement('div');
  projContainer.setAttribute('id', 'proj-container');
  // create indv proj divs
  for (i in projectList) {
    let proj = document.createElement('div');
    proj.setAttribute('class', 'proj');
    proj.setAttribute('id', projectList[i].id);
    let titleDiv = document.createElement('div');
    titleDiv.setAttribute('class', 'name');
    titleDiv.innerText =
      projectList[i].name + ' "' + projectList[i].projName + '"';
    if (projectList[i].link) {
      let button = document.createElement('a');
      button.innerText = 'Visit Site';
      button.setAttribute('class', 'link-to');
      button.setAttribute('href', projectList[i].link);
      button.setAttribute('target', '_blank');
      titleDiv.appendChild(button);
    }
    let imageDiv = document.createElement('div');
    imageDiv.setAttribute('class', 'images');
    for (j in projectList[i].img) {
      let image = document.createElement('img');
      image.src = projectList[i].img[j];
      image.setAttribute(
        'alt',
        projectList[i].img[j].substring(6).split('.')[0]
      );
      imageDiv.appendChild(image);
    }
    proj.appendChild(titleDiv);
    proj.appendChild(imageDiv);
    projQueue.push(proj);
  }
  // append all of the things
  for (i in projQueue) {
    projContainer.appendChild(projQueue[i]);
  }

  return projContainer;
};

// add project links to nav
let projectNames = () => {
  navList = document.createElement('div');
  navList.setAttribute('class', 'nav-list');
  for (i in projectList) {
    let name = document.createElement('a');
    name.innerText = projectList[i].name;
    name.setAttribute('class', 'link-to');
    name.setAttribute('href', `#${projectList[i].id}`);
    navList.appendChild(name);
  }
  return navList;
};

main.appendChild(container());
main.appendChild(projects());
nav.appendChild(projectNames());
