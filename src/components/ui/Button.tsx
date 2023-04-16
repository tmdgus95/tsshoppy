type Props = {
    text: string;
    onClick: () => void;
};

export default function Button({ text, onClick }: Props) {
    return (
        <button
            className='bg-brand py-2 px-4 text-white rounded-sm hover:brightness-110'
            onClick={onClick}
        >
            {text}
        </button>
    );
}
