import { createContext, ReactNode, useContext, useMemo, useState } from "react"
import { Toast, ToastOptions } from "../components/toast/toast"


type ToastContextType = {
    open: (message: string, type: ToastOptions) => void,
    close: (id: number) => void,
}

export const ToastContext = createContext<(ToastContextType | undefined)>(undefined)

type ToastType = {
    message: string,
    id: number,
    type: ToastOptions
}
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [toasts, setToasts] = useState<ToastType[]>([]);

    const newToast = (message: string, type: ToastOptions): ToastType => {
        return {
            id: Date.now(),
            type: type,
            message: message

        }
    }

    function openToast(message: string, type: ToastOptions): void {
        const toast = newToast(message, type);
        setToasts((prevToasts) => [...prevToasts, toast]);
    
        setTimeout(() => closeToast(toast.id), 2000);
    }
    

    function closeToast(id: number): void {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        )
    }

    const contextValue = useMemo(() => ({
        open: openToast,
        close: closeToast
    }), [])
    return (
        <>
            <ToastContext.Provider value={contextValue}>
                {children}
                {toasts && toasts.map(
                    (toast) => {
                        return (
                            <Toast key={toast.id} message={toast.message} option={toast.type} close={()=>closeToast(toast.id)} />
                        )
                    }
                )}
            </ToastContext.Provider>
        </>
    );

};