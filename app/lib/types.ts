interface ButtonPropsType {
    iconType?: string;
    text?: string;
    popup?: boolean;
}

interface FlashcardDataType {
    id: string;
    value1: string;
    value2: string;
}

interface TopicType {
    id: string;
    name: string;
    cards: FlashcardDataType[];
}
