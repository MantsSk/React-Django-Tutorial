import Advertisement from "./Advertisement";

function AdvertisementList() {
  return (
    <div className = "advertisement-list">
        <Advertisement productShout = "The best shampoo you can buy" style="up" />
        <Advertisement productShout = "Buy my products please!" style="down" />
    </div>
  );
}

export default AdvertisementList;