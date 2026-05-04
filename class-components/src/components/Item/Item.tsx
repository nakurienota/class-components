import { Component } from 'react';
import type {ItemDisplay} from "../../types";
import './Item.scss';

class Item extends Component<{item: ItemDisplay}> {
    render() {
        const { name, description } = this.props.item;
        return (
            <div className="item">
                <p>{name}</p>
                <p>{description}</p>
            </div>
        );
    }
}

export default Item;