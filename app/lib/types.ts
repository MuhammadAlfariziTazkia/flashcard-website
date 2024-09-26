interface BaseButtonPropsType {
    text?: string;
    action?: () => void;
}

interface BaseInputPropsType {
    name?: string;
    placeholder?: string;
}

interface ButtonPropsType extends BaseButtonPropsType {
    iconType?: string;
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

interface CreateTopicModaPropsType {
    closeAction: () => void;
}