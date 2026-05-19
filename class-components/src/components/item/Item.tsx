import type { ItemDisplayProperties } from '../../types';
import './Item.scss';

function Item({ item, onClick }: Readonly<ItemDisplayProperties>) {
  const { name, description } = item;
  return (
    <button className="item" onClick={() => onClick?.(name)}>
      <p>{name}</p>
      <p>{description}</p>
    </button>
  );
}

export default Item;
