import { getRubyGems } from '/src/components/api.js';
import list from '/src/components/list.js';

const RUBY_GEMS_API = "http://localhost:3000/api/v1/search.json\?query\=rails";

function bind(element, method, data) {
  document.addEventListener('click', function (event) {

    // delegation of events via selector
    if (!event.target.matches(element)) return;

    // Don't follow the link
    event.preventDefault();    

    return method(event.target);

  }, false)
}

function bindToApiCall(element) {
  return bind(element, callAPI);
}

function bindToDataStore(element, data) {
  bind(element, setToDataStore, data);
}

function callAPI() {
  getRubyGems(RUBY_GEMS_API).then(function(gemList){      
      return list.renderList(gemList);
  });  
}

function setToDataStore(targetElement) {
  let storedData = localStorage.getItem(targetElement.dataset.name);  
  list.renderToDOM(list.createListTemplate(storedData));
}

export default { bindToApiCall, bindToDataStore };