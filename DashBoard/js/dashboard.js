const sideMenu = document.querySelector("aside")
const menuBtn = document.querySelector("#menu-btn")
const closeBtn = document.querySelector("#close-btn")
const themeToggler = document.querySelector(".theme-toggler")

//Constantes SideBAr
const sideBar = document.querySelector(".sidebar")
const dash = document.querySelector("#btndashboard")
const customers = document.querySelector("#customers")
const orders = document.querySelector("#orders")
const product = document.querySelector("#products")
const report = document.querySelector("#reports")
const settings = document.querySelector("#settings")
const addProduct = document.querySelector("#add-product")

//Constantes Templates
const main = document.getElementById('dashboard')
const templateMain = document.getElementById('template-dashboard').content
const mainRight = document.getElementById('dashboard-right')
const templateMainRight = document.getElementById('template-dashboard-right').content
const templateOrders = document.getElementById('template-orders').content
const templateProducts = document.getElementById('template-products').content
const templateReports = document.getElementById('template-reports').content
const templateAddProducts = document.getElementById('template-add-product').content
const fragment = document.createDocumentFragment()


//Constantes Datos

let carro = {}



document.addEventListener('DOMContentLoaded', e => { fetchData() });

// Traer productos
const fetchData = async () => {
	if(localStorage.getItem('themetoggler').includes('false')){
		themeToggler.querySelector('span:nth-child(1)').classList.remove('active')
		themeToggler.querySelector('span:nth-child(2)').classList.add('active')
		document.body.classList.toggle('dark-theme-variables')
	}
	paintDashbord()
	/*
	const res = await fetch('orders.json');
    data = await res.json()
	localStorage.setItem('ordenes', JSON.stringify(data))
	carro = localStorage.getItem('ordenes')
	carro = JSON.parse(carro)
	*/
}
/*}}
//show sidebar/*
menuBtn.addEventListener('click',() =>{
	sideMenu.style.display = 'block';
})

//close sidebar
closeBtn.addEventListener('click',() =>{
	sideMenu.style.display = 'none';
})
*/
themeToggler.addEventListener('click',() =>{
	document.body.classList.toggle('dark-theme-variables')

	themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
	themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')
	localStorage.setItem('themetoggler', JSON.stringify(themeToggler.querySelector('span:nth-child(1)').classList.contains('active')))
})


dash.addEventListener('click',() =>{
    unActive()
	sideBar.querySelector('a:nth-child(1)').classList.add('active')
	unPaint()
	paintDashbord()
})
customers.addEventListener('click',() =>{
    unActive()
	sideBar.querySelector('a:nth-child(2)').classList.add('active')
	unPaint()
})
orders.addEventListener('click',() =>{
    unActive()
	sideBar.querySelector('a:nth-child(3)').classList.add('active')
	unPaint()
	paintOrders()
})
product.addEventListener('click',() =>{
    unActive()
	sideBar.querySelector('a:nth-child(3)').classList.add('active')
	unPaint()
	paintProducts()
})
report.addEventListener('click',() =>{
    unActive()
	sideBar.querySelector('a:nth-child(5)').classList.add('active')
	unPaint()
	paintReports()
})
settings.addEventListener('click',() =>{
    unActive()
	sideBar.querySelector('a:nth-child(6)').classList.add('active')
	unPaint()
})
addProduct.addEventListener('click',() =>{
    unActive()
	sideBar.querySelector('a:nth-child(7)').classList.add('active')
	unPaint()
	paintAddProducts()
})

const unActive = () => {
	sideBar.querySelector('a:nth-child(1)').classList.remove('active')
	sideBar.querySelector('a:nth-child(2)').classList.remove('active')
	sideBar.querySelector('a:nth-child(3)').classList.remove('active')
	sideBar.querySelector('a:nth-child(4)').classList.remove('active')
	sideBar.querySelector('a:nth-child(5)').classList.remove('active')
	sideBar.querySelector('a:nth-child(6)').classList.remove('active')
	sideBar.querySelector('a:nth-child(7)').classList.remove('active')
	sideBar.querySelector('a:nth-child(8)').classList.remove('active')
}

const paintDashbord = async () => {
	
	const res = await fetch('orders.json');
     data = await res.json()
     //console.log(data)
	 
	 let string = ""
	 let ventas = 0
	 let gastos = 0
	 let acum = 0

     data.forEach(item => {
     	if(acum < 4){
     		string +=`<tr>
		<td>${item.ProductName}</td>
		<td>${item.ProductNo}</td>
		<td>${item.Payment}</td>`
		if(item.Status == "Success"){
      		string += `<td class="success">${item.Status}</td>
					   <td class="primary"><span class="material-symbols-sharp">info</span></td>
					   </tr>`
      	}else{
      		string += `<td class="warning">${item.Status}</td>
					   <td class="primary"><span class="material-symbols-sharp">info</span></td>
					   </tr>`
      	}
     		acum++
     	}
        //console.log(item)
		 

	ventas += item.Price
	gastos += item.PriceN


    })
     
    templateMain.querySelectorAll('h1')[1].innerHTML = ventas
    templateMain.querySelectorAll('h1')[2].innerHTML = gastos
    templateMain.querySelectorAll('h1')[3].innerHTML = ventas - gastos
	templateMain.querySelector('tbody').innerHTML = string

	const clone = templateMain.cloneNode(true)
	fragment.appendChild(clone)
	main.appendChild(fragment)
    
        
     

    const clone2 = templateMainRight.cloneNode(true)
    fragment.appendChild(clone2)
    mainRight.appendChild(fragment)

}
const paintOrders = async () => {

	const res = await fetch('orders.json');
     data = await res.json()
     //console.log(data)
	 
	 let array =[]
	 let string = ""

     data.forEach(item => {
        //console.log(item)
		 string +=`<tr>
		<td>${item.OrderNo}</td>
		<td>${item.ProductName}</td>
		<td>${item.ProductNo}</td>
		<td>${item.Price}</td>
		<td>${item.PriceN}</td>
		<td>${item.Payment}</td>`
		if(item.Status == "Success"){
      		string += `<td class="success">${item.Status}</td>
					   <td class="primary"><span class="material-symbols-sharp">info</span></td>
					   </tr>`
      	}else{
      		string += `<td class="warning">${item.Status}</td>
					   <td class="primary"><span class="material-symbols-sharp">info</span></td>
					   </tr>`
      	}

        
    })

	templateOrders.querySelector('tbody').innerHTML = string
	 
     
	const clone = templateOrders.cloneNode(true)
	fragment.appendChild(clone)
	main.appendChild(fragment)

}

const paintProducts = async () => {

	const res = await fetch('products.json');
     data = await res.json()
	 
	 let string = ""

     data.forEach(item => {
		 string +=`<tr>
		<td>${item.ProductName}</td>
		<td>${item.ProductNo}</td>
		<td>${item.Price}</td>
		<td>${item.PriceN}</td>
		<td>${item.Description}</td>
		<td class="primary"><a href="#"><span class="material-symbols-sharp">info</span></a></td>
	</tr>`
    })

	templateProducts.querySelector('tbody').innerHTML = string
	 
     
	const clone = templateProducts.cloneNode(true)
	fragment.appendChild(clone)
	main.appendChild(fragment)

}

const paintAddProducts = async () => {

	
	const clone = templateAddProducts.cloneNode(true)
	fragment.appendChild(clone)
	main.appendChild(fragment)

}

const paintReports = async () => {

	
	const clone = templateReports.cloneNode(true)
	fragment.appendChild(clone)
	main.appendChild(fragment)

}


const unPaint = () =>{
	main.innerHTML = ''
	mainRight.innerHTML = ''
}

