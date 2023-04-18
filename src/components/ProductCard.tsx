import { Product } from './Products';

type Props = {
    product: Product;
};

export default function ProductCard({
    product: { image, title, price, category },
}: Props) {
    return (
        <li>
            <img src={image} alt={title} />
            <div>
                <h3>{title}</h3>
                <p>{`￦${price}`}</p>
            </div>
            <p>{category}</p>
        </li>
    );
}
