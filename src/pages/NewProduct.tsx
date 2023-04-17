import { ChangeEvent, useState } from 'react';
import Button from '../components/ui/Button';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';

export default function NewProduct() {
    const [product, setProduct] = useState({
        title: '',
        price: '',
        category: '',
        description: '',
        options: '',
    });
    const [file, setFile] = useState<File | undefined>();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === 'file' && files && files.length > 0) {
            setFile(files[0]);
            return;
        }
        setProduct((product) => ({ ...product, [name]: value }));
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        uploadImage(file) //
            .then((url) => {
                console.log(url);
                addNewProduct(product, url);
            });
    };
    return (
        <section>
            {file && <img src={URL.createObjectURL(file)} alt='local file' />}
            <form onSubmit={handleSubmit}>
                <input
                    type='file'
                    accept='image/*'
                    name='file'
                    required
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='title'
                    value={product.title ?? ''}
                    placeholder='제품명'
                    required
                    onChange={handleChange}
                />
                <input
                    type='number'
                    name='price'
                    value={product.price ?? ''}
                    placeholder='가격'
                    required
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='category'
                    value={product.category ?? ''}
                    placeholder='카테고리'
                    required
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='description'
                    value={product.description ?? ''}
                    placeholder='제품 설명'
                    required
                    onChange={handleChange}
                />
                <input
                    type='text'
                    name='options'
                    value={product.options ?? ''}
                    placeholder='옵션들(콤마(,)로 구분)'
                    required
                    onChange={handleChange}
                />
                <Button text='제품 등록하기' />
            </form>
        </section>
    );
}
