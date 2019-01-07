var baseUrl = 'https://hacker-news.firebaseio.com/v0';
	async function test(){
		var hackerNews = async function(url,filename){
			try{
				var responseData =  await fetch(url+'/'+filename);
				return await responseData.json();
			}catch(error){
				console.log('error');
			}
		}
		var showstories = await Promise.all([hackerNews(baseUrl,'showstories.json'), hackerNews(baseUrl,'topstories.json')]);
		try{
			showstories.forEach(function(value,key){
				var showstoriesReport = value.splice(0,1);
				showstoriesReport.forEach(async function(value,key){
					var reportData = await fetch(baseUrl + '/item/' + value + '.json');
					var reportResponse = await reportData.json();
					var title = reportResponse.title;
					var url = reportResponse.url;
					$('#content').append('<a  target="_blank" href="' + url + '" >' + title + '</a><br />');		
				});
			})
		}catch(error){
		console.log('error');
		}
	};
test();