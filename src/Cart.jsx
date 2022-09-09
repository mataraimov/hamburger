import down from './images/down.png'
import up from './images/up.png'
export const Cart=({setactive})=>{
  const templates=/(order)/
  const localitems=Object.keys(localStorage).filter((key)=>{
    return key.match(templates)})
  console.log(localitems);
  const orders=localitems.map((order)=>JSON.parse(localStorage[order]))

  function countUnits(array, text) {
    let count = 0

    for (let i = 0; i < array.length; i++) {
        if (array[i].text === text) {
            count++
        }
    }
    console.log(count)
    return <span>{ count }</span>
  }

  function countTotal() {
    let total = 0

    for (let i = 0; i < orders.length; i++) {
        total += orders[i].total
    }

    return <span>{ total }</span>
}

  function deleteFrom(id){
    localStorage.removeItem(`order${id}`)
    window.location.reload()
  }

  const items=orders.map(({id,total,units})=>{
    return(
      <div key={id} className="cart__item">
        <div className="cart__image">
        <img width={300} src={up} alt="" />
            {units.map((unit,index)=><img key={index} width={300} src={unit.img}></img>)}
        <img width={300} src={down} alt="" />
        </div>
        <ul className="cart__list">
          <li>Cheese {countUnits(units,'cheese')}</li>
          <li>Tomato {countUnits(units,'tomato')}</li>
          <li>Meat {countUnits(units,'meat')}</li>
          <li>Salad {countUnits(units,'salad')}</li>
        </ul>
        <p className="cart__price">{total} som</p>
        <button onClick={()=>deleteFrom(id)} className='cart__delete'>
          <span className="material-icons">delete</span>
        </button>
      </div>
    )
  })
  return(
    <section className="cart">
      <div className="container">
      <div className="cart__block">
        <h2 >Cart
          <button onClick={()=>setactive(false)}><span className="material-icons">cancel</span></button>
        </h2>
        {
          orders.length===0?<h2>You have no orders</h2>:<div className="cart__orders">{items}</div>
        }
        {
          orders.length>0?
          <p className='cart_total'>total:{countTotal()}</p>:
          null
        }
      </div>
      </div>
    </section>
  )
}
