interface BaseButtonPropsType {
    text?: string;
    action?: () => void;
}

interface BaseInputPropsType {
    name?: string;
    value?: string;
    placeholder?: string;
}

interface ModalLayoutPropsType {
    body: React.ReactNode;
    title: string;
    closeAction?: () => void;
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
    testAction?: () => void;
    cards: FlashcardDataType[];
}

interface CreateTopicModaPropsType {
    closeAction: () => void;
}