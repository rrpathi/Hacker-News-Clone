var baseUrl = 'https://hacker-news.firebaseio.com/v0';
var showstoriesData = function (){
        return  fetch(baseUrl+'/showstories.json');
}

var topstoriesData = function (){
        return  fetch(baseUrl+'/topstories.json');
}

showstoriesData().then(function(result){
    result.json().then(function(data){
         var showstoriesFilterData = data.slice(2,3);
         showstoriesFilterData.map(function(value,key){
        console.log(value);
        var showstoriesReport = fetch(baseUrl + '/item/' + value + '.json');
        showstoriesReport.then(function(response){
        response.json().then(function(data){
            var title = data.title;
            var url = data.url;
            $('#content').append('<a  target="_blank" href="' + url + '" >' + title + '</a><br />');
            console.log('am called');
        });
        });
    });

       
    });

   
return topstoriesData();
}).then(function(top){
    top.json().then(function(data){
         var topstoriesFilterData = data.slice(2,3);
        topstoriesFilterData.map(function(value,key){
        console.log(value);
        var showTopstoriesReport = fetch(baseUrl + '/item/' + value + '.json');
        showTopstoriesReport.then(function(response){
        response.json().then(function(data){
            var title = data.title;
            var url = data.url;
            $('#content').append('<a  target="_blank" href="' + url + '" >' + title + '</a><br />');
            console.log('am called');
        });
        });
    });
    });
  

});