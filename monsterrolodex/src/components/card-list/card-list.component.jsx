import Card from "../card/card.component";
import "./card-list.styles.css";

const CardList = ({ monsters }) => {
  return (
    <div className="card-list">
      {monsters.map((monster) => {
        const { id } = monster;
        return <Card monster={monster} key={id} />;
      })}
    </div>
  );
};

export default CardList;
