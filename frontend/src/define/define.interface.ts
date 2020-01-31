import { AlertProps } from "react-bootstrap";

export interface IStoreAlert extends AlertProps {
    innerContent: string
}

export interface IStoreApp {
    user: {
        id: string
        name: string
        email: string
    }
    logged: boolean
}