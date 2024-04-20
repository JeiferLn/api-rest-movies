let isSearchActive = false;

function toggleSearch(){
  const searchContainer = document.getElementById('searchContainer');

  isSearchActive = !isSearchActive;

  if(isSearchActive){
    searchContainer.classList.remove("inactive");
    searchContainer.classList.add("active");
  } else {
    searchContainer.classList.remove("active");
    searchContainer.classList.add("inactive");
  }
}

function navSelected(element) {
  const litItems = document.querySelectorAll('#navList li');

  litItems.forEach(item => {
    item.classList.remove('nav-selected');
  })

  element.classList.add('nav-selected')
}

/**
 * #######################################################
 */
function generateSections(item, containerSection){
  const movieContainer = document.createElement('div');

  const movieImg = document.createElement('img');
  movieImg.setAttribute('src' , URL_IMG + item.poster_path);
  movieImg.setAttribute('alt', item.title);

  const pContainer = document.createElement('p');
  const pText = document.createTextNode(item.title);
  pContainer.appendChild(pText);


  movieContainer.appendChild(movieImg);
  movieContainer.appendChild(pContainer)
  containerSection.appendChild(movieContainer);
}

const posterHome = async (movie) => {
  const previewImg = document.getElementById('previewImg');
  const previewRating = document.getElementById('numRating')
  const previewTitle = document.getElementById('previewTitle');
  const previewDescription = document.getElementById('previewDescription');

  previewImg.style = `background: url('${URL_IMG_PREVIEW + movie.backdrop_path}') center/cover no-repeat`;
  previewRating.innerHTML = movie.vote_average.toFixed(1);
  previewDescription.innerHTML = movie.overview
  previewTitle.innerHTML = movie.title;
}

const getTrendingPreview = async () => {
  const { data } = await api('trending/movie/day');
  const trending = data.results;
  posterHome(trending[Math.floor(Math.random()*20)])
  
  const trendingSection = document.getElementById('trendingContent')
  trending.map(item => {
    generateSections(item, trendingSection);
  })
}

const getCategoriesPreview = async () => {
  const { data } = await api('/genre/movie/list');
  const categories = data.genres;
  const categoriesSection = document.getElementById('categoriesContent')

  categories.map(item => {
    const pContainer = document.createElement('p');
    const pText = document.createTextNode(item.name);

    pContainer.appendChild(pText);
    pContainer.classList.add('category-text')
    categoriesSection.appendChild(pContainer);
  })
}

const getPopularPreview = async () => {
  const { data } = await api('/movie/popular');
  const popular = data.results;
  const popularSection = document.getElementById('popularContent')

  popular.map(item => {
    generateSections(item, popularSection);
  })
}

const getUpcomingPreview = async () => {
  const { data } = await api('movie/upcoming');
  const upcoming = data.results;
  const upcomingSection = document.getElementById('upcomingContent')

  upcoming.map(item => {
    generateSections(item, upcomingSection);
  })
}

getTrendingPreview();
getCategoriesPreview();
getPopularPreview();
getUpcomingPreview();