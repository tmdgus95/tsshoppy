type Props = {
    text: string;
    price: number;
};

export default function PriceCard({ text, price }: Props) {
    return <div>{text}</div>;
}
