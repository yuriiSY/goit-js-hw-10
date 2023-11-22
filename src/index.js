import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import { fetchBreeds, fetchAllBreeds } from './cat-api';

const div = document.querySelector('.cat-info');
const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorMessage = document.querySelector('.error');

fetchAllBreeds()
  .then(data => {
    console.log(data);
    errorMessage.classList.add('hidden');
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
    loader.classList.replace('loader', 'hidden');
    errorMessage.classList.remove('hidden');
    select.innerHTML = '';
  });

function createOptionMarkup(arr) {
  return arr
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
}

select.addEventListener('change', function (evnt) {
  errorMessage.classList.add('hidden');
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
      div.innerHTML = '';
      loader.classList.replace('loader', 'hidden');
      errorMessage.classList.remove('hidden');
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
