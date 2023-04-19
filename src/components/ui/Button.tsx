type Props = {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
};

export default function Button({ text, onClick, disabled }: Props) {
    return (
        <button
            className='bg-brand py-2 px-4 text-white rounded-sm hover:brightness-110'
            onClick={onClick}
        >
            {text}
        </button>
    );
}
