export interface ButtonProps {
    text?: string;
    action?: () => void;
    iconComponent?: React.ReactNode;
    type?: "submit" | "reset" | "button" | undefined;
}

export interface CustomInputProps {
    id?: string;
    name?: string;
    value?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (params: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface Modal {
    closeAction: () => void;
}

export interface TopicFormModal extends Modal {
    userId: string;
    updateAction: () => void;
}

export interface AddCardModalType extends Modal {
    topicId: string;
    topicName: string;
    updateAction: () => void;
}

export interface CardListModalType extends Modal {
    topicId: string;
    topicName: string;
    updateAction: () => void;
}

export interface TestModalType extends Modal {
    topicName: string;
    topicId: string;
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
    user_id: string;
}

export interface TopicCardType extends Topic{
    updateAction: () => void;
    cardCount: number;
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

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
  };

export interface TopicAndCardsCount {
    id: string;
    count: number;
}

export interface CardCount {
    count: number;
}