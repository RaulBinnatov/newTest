let pizzas = []


fetch('./test.json')
.then(resp =>resp.json())
.then(data=>{
    console.log(data);
    pizzas  = data
    container.innerHTML +=''
    data.forEach(el => {
        container.innerHTML += `
        <div class="main_card">
                <img src="${el.img}" alt="">
                <div class="card_first">
                    <p>${el.name}</p>
                    <p>${el.price}</p>
                </div>
                <div class="card_second">
                    <div class="stars">
                         <div class="star">
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1121 4.72554L8.51478 4.17806L6.90666 0.764102C6.86274 0.670629 6.79048 0.594961 6.70122 0.548967C6.47736 0.43324 6.20532 0.529679 6.09339 0.764102L4.48528 4.17806L0.88791 4.72554C0.788731 4.74038 0.698053 4.78934 0.628627 4.86352C0.544696 4.95386 0.498446 5.0754 0.50004 5.20142C0.501634 5.32745 0.550942 5.44766 0.637128 5.53563L3.23987 8.19291L2.62496 11.9452C2.61054 12.0324 2.61976 12.1222 2.65159 12.2043C2.68341 12.2864 2.73655 12.3575 2.805 12.4095C2.87344 12.4616 2.95444 12.4925 3.03882 12.4988C3.1232 12.5051 3.20757 12.4865 3.28238 12.4452L6.50003 10.6736L9.71768 12.4452C9.80553 12.4941 9.90754 12.5104 10.0053 12.4926C10.2518 12.4481 10.4176 12.2033 10.3751 11.9452L9.76019 8.19291L12.3629 5.53563C12.4338 5.46293 12.4805 5.36798 12.4947 5.26412C12.533 5.00447 12.3601 4.76412 12.1121 4.72554Z" fill="#1B1C21"/>
                        </svg>
                    <div class="numb">${el.raiting}</div>
                    </div> 
                    <p>${el.time}</p>
                    </div>
                    <button onclick="addToCart(${el.id})"><svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.59911 7.69607V13.1863M2.04956 7.69607H7.59911H2.04956ZM13.1487 7.69607H7.59911H13.1487ZM7.59911 7.69607V2.20587V7.69607Z" stroke="white" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
        </div>
        `
    });
})
console.log(pizzas);

let cart = [];

if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'))
}

let a = true;
cardIcon.addEventListener('click', () => {

    if (a) {
        cartList.style.display = 'block'
        a = false
    } else {
        cartList.style.display = 'none'
        a = true
    }
})


function addToCart(id) {
    const checkCart = cart.find(data => data.id == id)

    if (checkCart) {
        checkCart.count += 1
    } else {
        const pizza = pizzas.find(data => data.id == id);
        cart.push(pizza)
    }
    showCarts()
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(cart);
}


function showCarts() {
    cartList.innerHTML = ''
    cart.forEach(pizza => {
        console.log(pizza.name);
        cartList.innerHTML += `
        <div class="cart_card">
            <h2>${pizza.name}</h2>
            <span>${pizza.count}</span>
            <p>${pizza.price*pizza.count}$</p>
            <button onclick="changeCount('inc','${pizza.id}')">+</button>
            <button onclick="changeCount('dec','${pizza.id}')">-</button>
        </div>
        `
    })
}

showCarts()


function changeCount(type,id){
    if(type == 'inc'){
        const checkCart = cart.find(data => data.id == id);
        checkCart.count+=1
    }else {
        const checkCart = cart.find(data => data.id == id);
        checkCart.count-=1

        if(checkCart.count == 0){
            const ind = cart.findIndex(pizza => pizza.id == id)
            cart.splice(ind,1)
        }
    }

    showCarts()
    localStorage.setItem('cart',JSON.stringify(cart))

}

