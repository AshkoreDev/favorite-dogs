import { API_KEY } from './key.js';


// API CONFIG
const queryString = ['?', 'limit=3', '&'].join('');
const API_URL = 'https://api.thedogapi.com/v1/';


// HTML ELEMENTS
const messageNode = document.getElementById('message');



// FUNCTIONS
function error(status, data) {

	if (status !== 200) {

		throw new Error (`Error ${status}: ${data.message}`);
	}
}

async function loadRandomDogs() {

	try {

		const res = await fetch(API_URL + `images/search${queryString}`);
		const data = await res.json();
		const status = res.status;

		error(status, data);

		const titles = document.getElementsByClassName('card--name');
		const favBtn = document.getElementsByClassName('card--favBtn');
		const images = document.getElementsByTagName('img');

		for (let i = 0; i < 3; i++) {

      images[i].src = data[i].url;

      if (data[i].breeds[0]) {

      	titles[i].textContent = data[i].breeds[0].name;
      	images[i].alt = `Profile picture of a puppy ${data[i].breeds[0].name}`;

      } else {

      	titles[i].textContent = 'No information';
      	images[i].alt = 'No information';
      }
    }

    for (let j = 0; j < favBtn.length; j++) {

      favBtn[j].onclick = () => saveFavoriteDog(data[j].id);
    }

	} catch(error) {

		messageNode.textContent = `${error.message}`;
		messageNode.className = 'message error';
	}
}



async function saveFavoriteDog(id) {

	try {

		const res = await fetch(API_URL  + 'favourites?', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-API-KEY': API_KEY 
			},
			body: JSON.stringify({
				image_id: id
			})
		});

		const data = await res.json();
		const status = res.status;

		error(status, data);

		loadFavoriteDogs();

	} catch(error) {

		messageNode.textContent = `${error.message}`;
		messageNode.className = 'message error';
	}
}


export { loadRandomDogs  };