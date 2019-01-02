const obj = {};
const baseUrl = 'https://hacker-news.firebaseio.com/v0';
const getNewStories = async() => {
	const newstoriesURL = await fetch(baseUrl+'/newstories.json');
	const stories_id = await newstoriesURL.json();
	return stories_id;
}
getNewStories().then((storiesId) =>{
	let storieItems = storiesId.slice(1,20);
	storieItems.map((value,key) =>{
		const storieUrl = async () => {
			let itemData = await fetch(baseUrl + '/item/' + value + '.json');
			const sampleData =  await itemData.json();
			obj['title'] = sampleData.title;
			obj['url'] = sampleData.url;
			return obj;
		}
		storieUrl().then((storiesDetail)=>{
				 $('#content').append('<a  target="_blank" href="' + storiesDetail.url + '" >' + storiesDetail.title + '</a><br />');
		});
	});
	
});


 