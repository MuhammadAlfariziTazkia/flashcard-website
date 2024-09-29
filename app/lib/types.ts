export interface ButtonProps {
    text?: string;
    action?: () => void;
    iconComponent?: React.ReactNode;
}

export interface BaseInputPropsType {
    name?: string;
    value?: string;
    placeholder?: string;
    onChange?: (params: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Modal {
    closeAction: () => void;
}

export interface FormModal extends Modal {
    updateAction: () => void;
}

export interface AddCardModalType extends Modal {
    topicId: string;
}

export interface CardListModalType extends Modal {
    cards: Card[];
}

export interface TestModalType extends Modal {
    cards: Card[];
}

export interface ModalLayoutPropsType extends Modal {
    body: React.ReactNode;
    title: string;
}

export interface FlashcardDataType {
    id: string;
    value1: string;
    value2: string;
}

export interface Topic {
    id: string;
    name: string;
}

export interface TopicCardType extends Topic{
    updateAction: () => void;
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

export interface Message {
    message: string;
}