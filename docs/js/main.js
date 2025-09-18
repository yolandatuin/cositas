const n=document.querySelector(".js_products-center"),d=document.querySelector(".js_products-basket"),p=document.querySelector(".js_button-search"),g=document.querySelector(".js_input-search"),m=document.querySelector(".js_button-mostrar");let c=[],s=[];function f(e){d.innerHTML+=`
  <li id="${e.id}">
        <div class="product">
        <p id="${e.id}" class="delete-from-basket">X</p>
          <img class="image" src="${e.image}" alt="">
          <p class="name-product">${e.title}</p>
          <p class="price-product">${e.price} €</p>
        </div>
  </li>`}function k(e){n.innerHTML+=`
  <li id="${e.id}">
        <div class="product">
          <img class="image" src="${e.image}" alt="">
          <p class="name-product">${e.title}</p>
          <p class="price-product">${e.category}</p>
          <p class="price-product">${e.price} €</p>
          <button class="buy js_buy" id="${e.id}">Comprar</button>
        </div>
  </li>`}function u(e){n.innerHTML="";for(let t of e)k(t)}function i(e){d.innerHTML="";for(let t of e)f(t)}function S(e){e.preventDefault();const t=g.value,a=c.filter(l=>l.title.toLowerCase().includes(t.toLowerCase()));console.log(`el número de elementos en la búsqueda es de ${a.length}`),u(a)}function b(e){if(e.preventDefault(),e.target.tagName==="BUTTON"){e.target.innerText="Eliminar",e.target.classList.toggle("inBasket"),e.target.classList.contains("inBasket")?e.target.innerText="Eliminar":e.target.innerText="Comprar";const t=e.target.id,a=c.find(r=>r.id===Number(t)),l=s.findIndex(r=>r.id===Number(t));l===-1?(s.push(a),localStorage.setItem("listBasket",JSON.stringify(s)),i(s)):(s.splice(l,1),localStorage.setItem("listBasket",JSON.stringify(s)),i(s))}}function h(e){if(e.preventDefault(),e.target.classList.contains("delete-from-basket")){const t=e.target.id,a=s.findIndex(o=>o.id===Number(t));s.splice(a,1),i(s);const l=c.findIndex(o=>o.id===Number(t));console.log(l);const r=document.querySelector(`.js_buy[id="${t}"]`);r&&(r.classList.remove("inBasket"),r.innerText="Comprar")}}function I(e){e.preventDefault();for(let t of s)console.log(t.title)}p.addEventListener("click",S);n.addEventListener("click",b);d.addEventListener("click",h);m.addEventListener("click",I);localStorage.getItem("products")!=null&&(c=JSON.parse(localStorage.getItem("products")),u(c));localStorage.getItem("listBasket")!=null&&(s=JSON.parse(localStorage.getItem("listBasket")),i(s));localStorage.getItem("products")===null&&fetch("https://fakestoreapi.com/products").then(e=>e.json()).then(e=>{c=e,u(c),i(s),localStorage.setItem("products",JSON.stringify(c))});
//# sourceMappingURL=main.js.map
