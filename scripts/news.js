
var newsSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://newsapi.org/v2/top-headlines?country=us&apiKey=bd75295462f64e8c93b7d33b9c9895fd",
	"method": "Get",
	"headers": "{Access-Control-Allow-Origin: *}",
	"data": "{}"
  }
  
  $.ajax(newsSettings).done(function (response) {
	  var data = response.articles;
	  console.log(data);
	  var newsSection = document.getElementById('news-results');
	  newsSection.innerHTML = `
		<div class="container">
		<div class="row">
		<div class="col s12">
		  ${data.map(article => `
			  <div class="card-panel news-card">
				  <div class="news-text-content">
					  <h5 class="news-title"><a href="${article.url}" target="_blank">${article.title}</a></h5>
					  <h6 class="news-descrip">${article.description}</h6>
					</div>
					<div class="news-img-container"><img src="${article.urlToImage}" class="news-img"></div>  
			  </div>`
			)
			.sort()
			.join('')}
		</div>
		</div>
		</div>
	  `;
});




