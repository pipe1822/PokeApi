import  "../sass/Card.scss"
const Card = (props) => {
  return (
    <div className="card">
        <p className="card_name">{props.name}</p>
        <div className="card_circulo"></div>
        <img className="card_img" src={props.img} alt="pokemon img" />        
    </div>
  )
}

export {Card};