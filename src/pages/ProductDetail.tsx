import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/ui/Button';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import { addOrUpdatedToCart } from '../api/firebase';

export default function ProductDetail() {
    const { uid } = useSelector((state: RootState) => state.user);

    const {
        state: {
            product: {
                id,
                image,
                title,
                description,
                category,
                price,
                options,
            },
        },
    } = useLocation();
    const [selected, setSelected] = useState(options && options[0]);
    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelected(e.target.value);
    };
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const prodcut = {
            id,
            image,
            title,
            price,
            option: selected,
            quantitiy: 1,
        };
        addOrUpdatedToCart(uid, prodcut);
    };
    return (
        <>
            <p className='mx-12 mt-4 text-gray-700'>{category}</p>
            <section className='flex flex-col md:flex-row p-4'>
                <img
                    className='w-full px-4 basis-7/12'
                    src={image}
                    alt={title}
                />
                <div className='w-full basis-5/12 flex flex-col p-4'>
                    <h2 className='text-3xl font-bold py-2 '>{title}</h2>
                    <p className='text-2xl font-bold py-2 border-b border-gray-400'>
                        ￦{price}
                    </p>
                    <p className='py-4 text-lg'>{description}</p>
                    <div className='flex items-center'>
                        <label
                            className='text-brand font-bold'
                            htmlFor='select'
                        >
                            옵션:
                        </label>
                        <select
                            id='select'
                            className='p-2 m-4 flex-1 border-2 border-dashed border-brand outline-none'
                            onChange={handleSelect}
                            value={selected}
                        >
                            {options &&
                                options.map((option: string, i: number) => (
                                    <option key={i}>{option}</option>
                                ))}
                        </select>
                    </div>
                    <Button text='장바구니에 추가' onClick={handleClick} />
                </div>
            </section>
        </>
    );
}
