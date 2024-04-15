export function fetchData(searchQuery) {
    const API_KEY = '43227181-d0d7712551e06c0c43f074b98';
    const params = new URLSearchParams({
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
  
    return fetch(`https://pixabay.com/api/?${params}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      });
  }
  
