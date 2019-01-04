const obj = {};
const pageCount = 20;

const baseUrl = 'https://hacker-news.firebaseio.com/v0';
const getNewStories = async() => {
	const newstoriesURL = await fetch(baseUrl+'/showstories.json');
	const stories_id = await newstoriesURL.json();
	return stories_id;
}
getNewStories().then((storiesId) =>{
	let minPage = 1;
	let maxPage = ((storiesId.length)/pageCount);
	pagination(0,20);
	document.getElementById("pageCount").innerHTML = '<button id="prev" class="button">Prev</button><button id="next" class="button">Next</button>';
	$('.button').click((e)=>{
		let button_value = e.target.id;
		if(button_value == 'next'){
			if((minPage*pageCount)<=storiesId.length){
				minPage = minPage+1;
				pagination(((minPage*pageCount)-20),(minPage*pageCount))
			}
		}else{
			if(minPage !=1){
				minPage = minPage-1;
				// console.log(minPage);
				pagination(((minPage*pageCount)-20),((minPage*pageCount)));
			}
			
		}
	})

	function pagination(from,to){
		console.log(from +'----------'+to);
		let storieItems = storiesId.slice(from,to);
		$('#content').html('');
		storieItems.map(async (value,key) =>{
			async function storieUrl() {
				let itemData = await fetch(baseUrl + '/item/' + value + '.json');
				const sampleData =  await itemData.json();
				obj['title'] = sampleData.title;
				obj['url'] = sampleData.url;
				console.log('am called inside storieUrl');
				return obj;
			}
			const storiesDetail = await storieUrl();
			$('#content').append('<a  target="_blank" href="' + storiesDetail.url + '" >' + storiesDetail.title + '</a><br />');
			console.log('am called');

			// .then((storiesDetail)=>{

			// 	$('#content').append('<a  target="_blank" href="' + storiesDetail.url + '" >' + storiesDetail.title + '</a><br />');
			// });
		});
	}
});


 