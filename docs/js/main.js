const n=document.querySelector(".js_products-center"),d=document.querySelector(".js_products-basket"),p=document.querySelector(".js_button-search"),g=document.querySelector(".js_input-search");let c=[],e=[];function m(t){d.innerHTML+=`
  <li id="${t.id}">
        <div class="product">
        <p id="${t.id}" class="delete-from-basket">X</p>
          <img class="image" src="${t.image}" alt="">
          <p class="name-product">${t.title}</p>
          <p class="price-product">${t.price} €</p>
        </div>
  </li>`}function f(t){n.innerHTML+=`
  <li id="${t.id}">
        <div class="product">
          <img class="image" src="${t.image}" alt="">
          <p class="name-product">${t.title}</p>
          <p class="price-product">${t.price} €</p>
          <button class="buy js_buy" id="${t.id}">Comprar</button>
        </div>
  </li>`}function u(t){n.innerHTML="";for(let s of t)f(s)}function l(t){d.innerHTML="";for(let s of t)m(s)}function k(t){t.preventDefault();const s=g.value,i=c.filter(a=>a.title.toLowerCase().includes(s.toLowerCase()));console.log(i),u(i)}function S(t){if(t.preventDefault(),t.target.tagName==="BUTTON"){t.target.innerText="Eliminar",t.target.classList.toggle("inBasket"),t.target.classList.contains("inBasket")?t.target.innerText="Eliminar":t.target.innerText="Comprar";const s=t.target.id,i=c.find(r=>r.id===Number(s)),a=e.findIndex(r=>r.id===Number(s));a===-1?(e.push(i),localStorage.setItem("listBasket",JSON.stringify(e)),l(e)):(e.splice(a,1),localStorage.setItem("listBasket",JSON.stringify(e)),l(e))}}function b(t){if(t.preventDefault(),t.target.classList.contains("delete-from-basket")){const s=t.target.id,i=e.findIndex(o=>o.id===Number(s));e.splice(i,1),l(e);const a=c.findIndex(o=>o.id===Number(s));console.log(a);const r=document.querySelector(`.js_buy[id="${s}"]`);r&&(r.classList.remove("inBasket"),r.innerText="Comprar")}}p.addEventListener("click",k);n.addEventListener("click",S);d.addEventListener("click",b);localStorage.getItem("products")===null&&fetch("https://fakestoreapi.com/products").then(t=>t.json()).then(t=>{c=t,u(c),l(e),localStorage.setItem("products",JSON.stringify(c))});localStorage.getItem("products")!=null&&(c=JSON.parse(localStorage.getItem("products")),u(c));localStorage.getItem("listBasket")!=null&&(e=JSON.parse(localStorage.getItem("listBasket")),l(e));
//# sourceMappingURL=main.js.map
