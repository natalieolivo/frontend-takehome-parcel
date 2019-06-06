function fetchAPI(url) { 
  return fetch(url)
		.then(function(response) {
			return response.json();
		})
}

export function getRubyGems(url) {
	return fetchAPI(url);
}