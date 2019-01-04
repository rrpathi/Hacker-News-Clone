const baseUrl = 'https://hacker-news.firebaseio.com/v0';

let showstoriesData = function (){
	return new Promise(function(resolve,reject){
	// let data = 'hello World';
	const showstories = fetch(baseUrl+'/showstories.json');
	showstories.then(function(){
		resolve(showstories);
		});
	});
}

showstoriesData().then(function(r){
	
	console.log(r.json());
});