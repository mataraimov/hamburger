import './App.css'
import React,{useState,useEffect} from 'react'
import cheese from './images/cheese.png'
import down from './images/down.png'
import meat from './images/meat.png'
import salad from './images/salad.png'
import tomato from './images/tomato.png'
import up from './images/up.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Cart} from './Cart'
function App() {
  let hB=[
    {text:'cheese',img:cheese,price:50},
    {text:'tomato',img:tomato,price:25},
    {text:'salad',img:salad,price:25},
    {text:'meat',img:meat,price:100}
  ]

  const [price, setprice] = useState(20)
  const [first, setfirst] = useState([])
  const [cart, setcart] = useState([])
  const [active, setactive] = useState(false)
  const templates=/(order)/
  const localitems=Object.keys(localStorage).filter((key)=>{
    return key.match(templates)})
    useEffect(() => {
      const orders=localitems.map((order)=>{JSON.parse(localStorage[order])})
      if(orders){
        setcart(orders)
      }
    }, [])
    

  function addUnit(unit){
    setfirst([...first,{id:first.length,...unit}])
    setprice((prevstate)=>{return prevstate+unit.price})
  }
  function removeUnit(id,price){
    setfirst(first.filter((unit)=>{
      return unit.id!==id
    }))
    setprice((prevstate)=>{return prevstate-price})
  }
  function addToCard(item){
    setcart([...cart,{id:cart.length,total:price,units:[...item]}])
    localStorage.setItem(`order${cart.length}`,JSON.stringify({id:cart.length,total:price,units:[...item]}))
    setfirst([])
    setprice(20)
    toast.success("Burger has been added to cart!", {
            position: "top-right",
            autoClose: 5000,
        })
  }

  
  return (
    <section className="app">
      <div className="container">
        <div className="app__price"><h2>{ price } com</h2></div>
        <div className="app__block">
          <div className="app__hamburger">
            <img width={300} src={up} alt="" />
            {first.map((unit,index)=><img key={index} onClick={()=>{removeUnit(unit.id,unit.price)}} width={300} src={unit.img}></img>)}
            <img width={300} src={down} alt="" />
          </div>
          <div className="app__buttons">
            <h2>Add</h2>
            {hB.map((el,index)=><button key={index} onClick={()=> addUnit(el)}>{el.text}</button> )}
            <div className="app__card">
            <button onClick={()=>addToCard(first)}>Add to cart</button>
            <button onClick={()=>setactive(!active)}>
              <span className='material-icons'>shopping_cart</span>
            </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      
      {
        active?<Cart setactive={setactive}/>:null
      }
    </section>
  );
}

export default App;
