export interface BaseButtonPropsType {
    text?: string;
    action?: () => void;
}

export interface BaseInputPropsType {
    name?: string;
    value?: string;
    placeholder?: string;
}

export interface ModalLayoutPropsType {
    body: React.ReactNode;
    title: string;
    closeAction?: () => void;
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
    cards: FlashcardDataType[];
}

export interface CreateTopicModalPropsType {
    closeAction: () => void;
}