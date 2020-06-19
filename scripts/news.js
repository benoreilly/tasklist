
let newsTitle = document.getElementById('news-title');
let newsDesc = document.getElementById('news-description');
let newsUrl = document.getElementById('news-url');
let newsImg = document.getElementById('news-img');
const newsData = document.getElementById('news-data');



var newsSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://newsapi.org/v2/top-headlines?country=us&apiKey=bd75295462f64e8c93b7d33b9c9895fd",
	"method": "Get",
	"headers": "{Access-Control-Allow-Origin: *}",
	"data": "{}"
  }
  
  $.ajax(newsSettings).done(function (response) {
	  articleArr = response.articles;
	  console.log(articleArr);
	  articleArr.forEach(item => {
        // const element = document.createElement('div.card-panel');
		newsTitle.innerText = item.title;
		newsDesc.innerText = item.description;
		newsUrl.innerText = item.url;
		newsImg.setAttribute('src', item.urlToImage);
		newsImg.className = 'news-img';
	  })
});

result.innerHTML = `
<div class="container>
<div class="row">
<div class="col s12">
<div class="card-panel card-panel-lyrics">
<h2 class="songInfo center"><strong>${artist}</strong> - ${songTitle}</h2>
<span class="lyrics">${lyrics}</span>
<div class="container center"><a class="goBack" href="index.html"><i class="material-icons">arrow_back</i>Back</a></div>
</div>
</div>
</div>
</div>

`;

