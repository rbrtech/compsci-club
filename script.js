console.log('GO BUCS!');

// DOM elements //
const header = document.getElementById('rbr-header');
const body = document.getElementById('rbr-body');
const main = document.getElementById('rbr-main');
const footer = document.getElementById('rbr-footer');
const nav = document.getElementById('rbr-nav');

// Footer Date //
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

// Program State //
let state = {
  darkMode: false
};

// Counter Button Handler //
// GQL Queries
const getClicks = `
  query {
    getClicks(id: "5e3c9d9c0eed1e12afb140cf") {
      count
    }
  }
`;

// Counter DIV
let counter = document.createElement('div');
counter.setAttribute('id', 'count-num');
// HTTP Request

const url = process.env.NICE_TRY;
const options = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: getClicks })
};
let response = fetch(url, options).then(async res => {
  let data = await res.json();
  // await console.log(data.data.getClicks.count);
  counter.innerText = await data.data.getClicks.count;
});

// Update Count and Button Logic
let renderButton = document.createElement('button');
renderButton.innerText = `👍`;
renderButton.setAttribute('id', 'click-button');
renderButton.addEventListener('click', async () => {
  await incrementCounter();
});

let incrementCounter = () => {
  // check if increment will cause Integer error
  let currCount = document.getElementById('count-num').textContent;
  if (currCount + 1 < Number.MAX_SAFE_INTEGER) {
    // Get Clicks GQL Query
    const updateCount = `
      mutation {
        updateCount(id: "5e3c9d9c0eed1e12afb140cf", count:${parseInt(
          currCount
        ) + 1}) {
          count
        }
      }
    `;
    const options2 = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: updateCount })
    };

    let response2 = fetch(url, options2).then(async res => {
      let data = await res.json();
      await console.log(data.data.updateCount.count);
      counter.innerText = await data.data.updateCount.count;
    });
  } else {
    counter.innerText = `🎉`;
    renderButton.innerText = `❌`;
    renderButton.setAttribute('id', 'dead-button');
  }
};

// Create Page Contents //
let container = () => {
  let container = document.createElement('div');
  container.setAttribute('class', 'counter');
  container.appendChild(renderButton);
  container.appendChild(counter);
  return container;
};

// Dark Mode Toggle //
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

// Student Project Handler //
const projectList = [
  {
    id: 'tresten',
    name: 'Tresten Simon',
    projName: 'Wave Simulator',
    img: ['./img/tresten1.jpg', './img/tresten2.jpg', './img/tresten3.jpg'],
    link: 'https://wave-simulation.trestans23.repl.co/'
  }
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
