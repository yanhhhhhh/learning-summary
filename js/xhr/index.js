const xhr = new XMLHttpRequest()
xhr.open('get','http://jsonplaceholder.typicode.com/posts')
xhr.send()
xhr.onreadystatechange= function(){
  if(xhr.readyState===4){
    if(xhr.status>=200&&xhr.status<300){

      console.log(JSON.parse(xhr.responseText))

    }
  }
}