let ul = document.querySelector(".feed-list").querySelectorAll(".feed-item");

let arr = [];
ul.forEach(a => {  
  let obj = {};
  obj.src = a.querySelector("img").src;
  obj.name =a.querySelector(".name").innerText;
  obj.price=a.querySelector(".price").innerText;
  if(a.querySelector(".label")!=null){
      obj.label=a.querySelector(".label").innerText;
  }
  else{
      obj.label=""
  }
  arr.push(obj);
})