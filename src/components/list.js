import handlers from '/src/components/handlers.js';

const SEARCH_INPUT = ".search-input";
const LISTITEM = ".listitem";
const SAVE_BTN_CLASS = '.save-btn';

function createListTemplate(listItem) {  

  return `
  <div class="listitem-gem">
    <div class="listitem-gem-name">${listItem.name}</div>
    <div class="listitem-gem-downloads">${listItem.downloads}</div>
    <span class="listitem-gem-info">${listItem.info}</span>
    <a href="${listItem.projectUri}">${listItem.projectUri}</a>
    <div class="listitem-save save-btn" data-name=${listItem.name}>Save</a>
  </div>  
  `;
}

function renderNoResults() {
    let markup = `<div class="no-results">No Results Found</div>`
    let container = document.createElement('div');
    container.classList.add("listitem-no-results");      
    container.innerHTML += markup;
    document.body.appendChild(container);  
}

function createList (list) {
  let formattedList;
  let results;
  let searchInput = document.querySelector(SEARCH_INPUT);

  if (!searchInput && searchInput.value) return;

  formattedList = formatList(list); 

  //bind save/unsave button
  handlers.bindToDataStore(SAVE_BTN_CLASS, formattedList);

  // list should render in dom
  results = formattedList.map(function(listItem) {
    let regex = new RegExp('('+listItem.name+')+', 'g');

    if(regex.exec(searchInput.value)) {
      renderToDOM(listItem);      
    }

    return regex.exec(searchInput.value);
  });

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

function renderToDOM (listItem) {
    document.querySelector(LISTITEM) && document.querySelector(LISTITEM).remove();

    let markup = createListTemplate(listItem);
    let container = document.createElement('div');
    container.classList.add("listitem");      
    container.innerHTML += markup;
    document.body.appendChild(container);  
}

export default { renderList, createListTemplate, renderToDOM };