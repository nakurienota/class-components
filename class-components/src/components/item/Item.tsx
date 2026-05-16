import type { ItemDisplay } from '../../types';
import './Item.scss';

function Item({ item }: Readonly<{ item: ItemDisplay }>) {
  const { name, description } = item;
  return (
    <div className="item">
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
}

export default Item;
