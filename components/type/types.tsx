interface Item {
    id: string;
    title: string;
    stock: string;
    price: string;
    bg: string;
    image: any;
}

interface FadeSlideProps {
    children: React.ReactNode;
    delay?: number;
}

interface QuantitySelectorProps {
    value: number;
}

interface PricePillProps {
    price: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

interface BottomBarProps {
    onConfirm: () => void;
}

export {
    BottomBarProps, FadeSlideProps, Item, PricePillProps, QuantitySelectorProps
};
