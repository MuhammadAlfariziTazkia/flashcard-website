export interface BaseButtonPropsType {
    text?: string;
    action?: () => void;
}

export interface BaseInputPropsType {
    name?: string;
    value?: string;
    placeholder?: string;
}

export interface BaseModalPropsType {
    closeAction: () => void;
}

export interface ModalLayoutPropsType extends BaseModalPropsType {
    body: React.ReactNode;
    title: string;
}

export interface ButtonPropsType extends BaseButtonPropsType {
    iconType?: string;
    popup?: boolean;
}

export interface FlashcardDataType {
    id: string;
    value1: string;
    value2: string;
}

export interface TopicType {
    id: string;
    name: string;
    testAction?: () => void;
    cardListAction?: () => void;
    addCardAction?: () => void;
    cards: FlashcardDataType[];
}

export interface Topic {
    id: string;
    name: string;
}