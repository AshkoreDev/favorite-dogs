import { loadRandomDogs, loadFavoriteDogs } from './js/get.js';

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);


function navigator() {

	loadRandomDogs();
	loadFavoriteDogs();
}

const loadRandom = document.getElementById('loadRandom');
loadRandom.addEventListener('click', loadRandomDogs);