import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchAllBreeds } from './cat-api';

const div = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');

fetchAllBreeds()
  .then(data => {
    select.innerHTML = createOptionMarkup(data);
    new SlimSelect({
      select: '#single',
    });
    loader.classList.replace('loader', 'hidden');
    select.classList.remove('hidden');
  })
  .catch(err => {
    Notiflix.Notify.failure(
      'Oops! Something went wrong! Try reloading the page!'
    );
    console.log(err);
  });

function createOptionMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', function (evnt) {
  loader.classList.replace('hidden', 'loader');
  div.classList.add('hidden');
  const selectValue = evnt.target.value;
  fetchBreeds(selectValue)
    .then(data => {
      loader.classList.replace('loader', 'hidden');
      div.classList.remove('hidden');
      div.innerHTML = createMarkup(data[0]);
    })
    .catch(err => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
      console.log(err);
    });
});

function createMarkup({ url, breeds }) {
  return `<div class="info"><img src="${url}" alt="" width="320px" />
  <div class="description">
      <h3>${breeds[0].name}</h3>
      <p>${breeds[0].description}</p>
    </div></div>`;
}
