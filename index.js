import handlers from '/src/components/handlers.js';

const SEARCH_BTN_CLASS = '.search-button';

// bind button to API call
handlers.bindToApiCall(SEARCH_BTN_CLASS);
handlers.bindToEnter(SEARCH_BTN_CLASS);


