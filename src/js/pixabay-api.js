
import axios from 'axios';

export async function fetchImages(query, page) {
  const apiKey = '39588460-df52399cf23d63ffd2a80219a';
  const perPage = 15;
  const url = 'https://pixabay.com/api/';

  try {
    const response = await axios.get(url, {
      params: {
        key: apiKey,
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
