let ul = document.querySelector(".slide-box").querySelectorAll("a");

let arr = [];
ul.forEach(a => {  
  let obj = {};
  obj.src = a.style.backgroundImage;
  obj.title=a.title
  arr.push(obj);
})
