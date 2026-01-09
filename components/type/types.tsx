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

interface FadeUpProps {
    children: React.ReactNode;
    delay?: number;
  }
  
  interface ProductPreviewCardProps {
    title: string;
    weight: number;
    price: number;
    image: keyof typeof images; // Change this line to use the keys of images
  }
  
  interface InputFieldProps {
    value: string;
    placeholder?: string;
    suffix?: string;
    icon?: string;
    onChangeText: (text: string) => void;
  }
  
  interface BottomBarProps {
    onConfirm: () => void;
  }
  
  interface PaperSelectItem {
    _id: string;
    value: string;
    img: string;
  }

  interface SectionHeaderProps {
    data: {
      "id": string,
      "title": string,
      "stock": string,
      "price": string,
      "bg": string,
      "image": any,
    };
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
    setFilter: (filter: string | null) => void;
  }

  interface StatsCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    backgroundColor: string;
    textColor?: string;
  }

export { BottomBarProps, FadeSlideProps, FadeUpProps, InputFieldProps, Item, PaperSelectItem, PricePillProps, ProductPreviewCardProps, QuantitySelectorProps, SectionHeaderProps, StatsCardProps };

