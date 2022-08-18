import { API_KEY } from './key.js';


// API CONFIG
const queryString = ['?', 'limit=3', '&'].join('');
const API_URL = 'https://api.thedogapi.com/v1/';


// HTML ELEMENTS
const messageNode = document.getElementById('message');
const favoriteDogsContainer = document.getElementById('favoriteDogsContainer');
const favoriteDogsNode = document.createDocumentFragment();


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

		const favBtn = document.getElementsByClassName('card--favBtn');
		const images = document.getElementsByTagName('img');

		for (let i = 0; i < 3; i++) {

      images[i].src = data[i].url;
      images[i].alt = `Profile picture of a puppy.`;
      images[i].setAttribute('loading', 'lazy');
    }

    for (let j = 0; j < favBtn.length; j++) {

      favBtn[j].onclick = () => saveFavoriteDog(data[j].id);
    }

	} catch(error) {

		messageNode.textContent = `${error.message}`;
		messageNode.className = 'message error';
	}
}

async function loadFavoriteDogs() {

	favoriteDogsContainer.innerHTML = "";
	
	try {

		const res = await fetch(API_URL + 'favourites?', {
			method: 'GET',
			headers: {
				'X-API-KEY': API_KEY 
			}
		});

		const data = await res.json();
		const status = data.status;

		data.forEach(item => {

			const card = document.createElement('article');
			const cardImgContainer = document.createElement('figure');
			const cardImg = document.createElement('img');
			const cardDeleteFavBtn = document.createElement('button');

			cardImg.setAttribute('src', item.image.url);
			cardImg.setAttribute('alt', 'Profile picture of a puppy');
			cardImg.setAttribute('loading', 'lazy');
			cardDeleteFavBtn.textContent = 'No Fav';

			cardDeleteFavBtn.onclick = () => deleteFavoriteDog(item.id);

			card.className = 'card';
			cardImgContainer.className = 'card__imgContainer';
			cardDeleteFavBtn.className = 'card--favBtn';

			cardImgContainer.append(cardImg);
			cardImgContainer.append(cardDeleteFavBtn);

			card.append(cardImgContainer);

			favoriteDogsNode.append(card);
		});

		favoriteDogsContainer.appendChild(favoriteDogsNode);
		// error(status, data);

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

async function deleteFavoriteDog(id) {

	try {

		const res = await fetch(API_URL  + `favourites/${id}?`, {
			method: 'DELETE',
			headers: {
				'X-API-KEY': API_KEY 
			}
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

export { loadRandomDogs, loadFavoriteDogs };