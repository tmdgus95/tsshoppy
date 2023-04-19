import {
    CartProduct,
    addOrUpdatedToCart,
    removeFromCart,
} from '../api/firebase';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { RiDeleteBin5Fill } from 'react-icons/ri';
type Props = {
    product: CartProduct;
    uid: string;
};
export default function CartItem({
    product,
    product: { id, image, title, option, quantitiy, price },
    uid,
}: Props) {
    const handleMinus = () => {
        if (quantitiy < 2) return;
        addOrUpdatedToCart(uid, { ...product, quantitiy: quantitiy - 1 });
    };
    const handlePlus = () =>
        addOrUpdatedToCart(uid, { ...product, quantitiy: quantitiy + 1 });
    const handleDelete = () => removeFromCart(uid, id);
    return (
        <li>
            <img src={image} alt={title} />
            <div>
                <p>{title}</p>
                <p>{option}</p>
                <div>
                    <AiOutlineMinusSquare onClick={handleMinus} />
                    <span>{quantitiy}</span>
                    <AiOutlinePlusSquare onClick={handlePlus} />
                    <RiDeleteBin5Fill onClick={handleDelete} />
                </div>
            </div>
        </li>
    );
}
