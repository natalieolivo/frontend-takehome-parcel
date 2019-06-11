import handlers from '/src/components/handlers.js';

const SEARCH_INPUT = ".search-input";
const LISTITEM = ".listitems";
const SAVE_BTN_CLASS = '.save-btn';

function createListTemplate(listItem) {  

  return `
  <div class="listitem-gem">
    <div class="listitem-gem-name">${listItem.name}</div>
    <div class="listitem-gem-downloads">${listItem.downloads}</div>
    <span class="listitem-gem-info">${listItem.info}</span>
    <a href="${listItem.projectUri}">${listItem.projectUri}</a>
    <div class="listitem-save save-btn" data-name=${listItem.name}>Save</a></div>
  </div>
  `;
}

function renderNoResults() {
    let markup = `<div class="no-results">No Results Found</div>`
    let container = document.createElement('div');
    container.classList.add("listitems");      
    container.innerHTML += markup;
    document.body.appendChild(container);  
}

function createList (list) {
  let formattedList;
  let results;
  let searchInput = document.querySelector(SEARCH_INPUT);
  let listMarkup;

  if (!searchInput && searchInput.value) return;

  formattedList = formatList(list); 
  document.querySelector(LISTITEM) && document.querySelector(LISTITEM).remove();

  //bind save/unsave button
  handlers.bindToDataStore(SAVE_BTN_CLASS, formattedList);

  // list should render in dom
  results = formattedList.map(function(listItem) {    
    
    if((listItem.name.indexOf(searchInput.value) !==  -1) &&
       (searchInput.value !==  "")) {
      return listItem;        
    } else {
      return null;      
    }
  });

  results = results.filter(function(el) {    
    return el !== null;
  });

  if(results.length) {
    listMarkup = results.map(function(result){
      return createListTemplate(result);
    });
  }

  if(listMarkup){    
    renderToDOM(listMarkup.join(' '));
  } else {
    renderNoResults();
  }
};

function renderList(list) {   
  createList(list);
}

function formatList(list) {
  let fl;

  // List should have name, downloads, info, project uri
  fl = list.map(function(listItem) {
      let result = {
        name : listItem.name,
        downloads :  listItem.downloads,
        info : listItem.info,
        projectUri : listItem.project_uri
      }

      localStorage.setItem(result.name, result);

      return result;
  });

  return fl;
}

function renderToDOM (results) {    
    let container = document.createElement('div');
    container.classList.add("listitems");      
    container.innerHTML = results;
    document.body.appendChild(container);  
}

export default { renderList, createListTemplate, renderToDOM };