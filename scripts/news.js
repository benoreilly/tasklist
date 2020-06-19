
// let newsTitle = document.getElementById('news-title');
// let newsDesc = document.getElementById('news-description');
// let newsUrl = document.getElementById('news-url');
// let newsImg = document.getElementById('news-img');
// const newsData = document.getElementById('news-data');


var newsSettings = {
	"async": true,
	"crossDomain": true,
	"url": "https://newsapi.org/v2/top-headlines?country=us&apiKey=bd75295462f64e8c93b7d33b9c9895fd",
	"method": "Get",
	"headers": "{Access-Control-Allow-Origin: *}",
	"data": "{}"
  }
  
  $.ajax(newsSettings).done(function (responseText) {
	  var articleArr = responseText.articles;
	  var newsSection = document.getElementById('news-results');
	

	  newsSection.innerHTML = `
	  <div class="container">
		  <div class="row">
			  <div class="col s12">
				  <div class="card-panel news-card">
					  <div class="news-data">
					  	
						  <div class="news-data-content">
						  
					  </div>  
					</div>
				</div>
			</div>
		</div>
	
	  `;
	 
	  for (let i = 0; i < articleArr.length; i++){
		var newsData = document.getElementById('news-data');
		var newsDataContent = document.querySelector('.news-data-content');
		

		var newsHeader = document.createElement('h5');
		newsHeader.className = "news-title";
		let dataTitle = articleArr[i].title;

		var newsLink = document.createElement('a');
		newsLink.setAttribute('href', articleArr[i].url);
		newsLink.setAttribute('target', '_blank');
		newsLink.innerText = dataTitle;

		newsHeader.appendChild(newsLink);
		newsDataContent.appendChild(newsHeader);

		var newsDescription = document.createElement('h6');
		newsDescription.ClassName = "news-description";
		let dataDesc = articleArr[i].description;
		newsDescription.innerText = dataDesc;
		newsDataContent.appendChild(newsDescription);


		var newsImgContainer = document.createElement('div');
		newsImgContainer.className = "news-data-content-img";

		var newsImg = document.createElement('img');
		newsImg.ClassName = "news-img";
		let dataImg = articleArr[i].urlToImage;
		newsImg.setAttribute('src', dataImg)

		newsImgContainer.appendChild(newsImg);
		newsDataContent.appendChild(newsImgContainer);
	  }	
});




