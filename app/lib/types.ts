export interface BaseButtonPropsType {
    text?: string;
    action?: () => void;
}

export interface BaseInputPropsType {
    name?: string;
    value?: string;
    placeholder?: string;
    onChange?: (params: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface BaseModalPropsType {
    closeAction: () => void;
}

export interface AddCardModalType extends BaseModalPropsType {
    topicId: string;
}

export interface CardListModalType extends BaseModalPropsType {
    cards: Card[];
}

export interface TestModalType extends BaseModalPropsType {
    cards: Card[];
}

export interface ModalLayoutPropsType extends BaseModalPropsType {
    body: React.ReactNode;
    title: string;
}

export interface ButtonPropsType extends BaseButtonPropsType {
    iconType?: string;
    popup?: boolean;
    isDisabled?: boolean;
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
}

export interface Topic {
    id: string;
    name: string;
}

export interface Card {
    id: string;
    value_1: string;
    value_2: string;
    topic_id: string;
}

export interface TopicTest extends Topic {
    test: string;
}

export interface Alert {
    message: string;
}