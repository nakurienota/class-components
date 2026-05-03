import {Component} from "react";
import type {ItemDisplay} from "../../types";
import Item from "../Item/Item.tsx";

class ItemList extends Component<{ items: ItemDisplay[] }> {
    render() {
        return (
            <div className="item-list">
                {this.props.items.map((el: ItemDisplay) => (
                    <Item key={el.name} item={el} />
                ))}
            </div>
        );
    }
}

export default ItemList;