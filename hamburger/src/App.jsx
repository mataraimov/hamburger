import './App.css'
import React,{useState} from 'react'
import cheese from './images/cheese.png'
import down from './images/down.png'
import meat from './images/meat.png'
import salad from './images/salad.png'
import tomato from './images/tomato.png'
import up from './images/up.png'
function App() {
  let hB=[
    {text:'Add',type:'cheese',img:cheese,price:15},
    {text:'Add',type:'tomato',img:tomato,price:10},
    {text:'Add',type:'salad',img:salad,price:35},
    {text:'Add',type:'meat',img:meat,price:40}
  ]
  const [price, setprice] = useState(20)
  const [first, setfirst] = useState([])
  const [cart, setcart] = useState([])
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
    localStorage.setItem('cart',JSON.stringify([...cart,{id:cart.length,total:price,units:[...item]}]))
    window.location.reload()
    setfirst([])
    setprice(20)
  }
  console.log(cart);
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
            {hB.map((el,index)=><button key={index} onClick={()=> addUnit(el)} key={el.price}>{el.type}</button> )}
            <div className="app__card">
            <button onClick={()=>addToCard(first)}>Add to cart</button>
            <button><span className='material-icons'>shopping_cart</span></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
