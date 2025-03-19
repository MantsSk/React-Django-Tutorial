import './Advertisement.css';

function Advertisement(props) {
  return (
    <div className = {props.style}>
        <p>This is my company add! {props.productShout} </p>
    </div>
  );
}

export default Advertisement;