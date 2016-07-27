window.onload = function(){
  console.log('app started');
  var getAnimals = function(){
    var request = new XMLHttpRequest();
    request.open( "GET", '/animals');
    request.onload = function(){
      console.log(request.responseText)
    }
    request.send(null);
  }

  var form = document.getElementById('addAnimal');
  form.onsubmit = function(e){
    e.preventDefault();
    var input = document.getElementById('name');
    var name = input.value; 

    var request = new XMLHttpRequest();
    request.open("POST", '/animals');
    request.setRequestHeader("Content_Type", "application/json")
    request.onload = function() {
      if( request.status === 200 ) {
        console.log("woohoo!")
        getAnimals();
      }
    }
    request.send( JSON.stringify({name: name}) )
  }
}