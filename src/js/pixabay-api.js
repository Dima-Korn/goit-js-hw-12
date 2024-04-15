
import axios from 'axios';

export async function fetchImages(query, page) {
  const API_KEY = '43227181-d0d7712551e06c0c43f074b98';
  const perPage = 15;
  const url = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(url, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage
      }
    });

    if (response.status !== 200) {
      throw new Error('Failed to fetch images');
    }

    if (!response.data.hits || response.data.hits.length === 0) {
      return { data: [], error: 'No images found' };
    }

    return { data: response.data, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
}
