const API_URL = import.meta.env.VITE_API_URL;

export default function test() {
    fetch(`${API_URL}/pgtest/testw.json`)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error fetching data:', error));
}