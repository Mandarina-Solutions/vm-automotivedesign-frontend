import './toast.css'

export type ToastOptions = 'success' | 'error' | 'info' | 'warning'

type ToastProperties = {
    message:string;
    option: ToastOptions;
    close: ()=>void,
} 

export function Toast({message, option}: ToastProperties){

    return (
        <div className={`toast ${option} show`} id="toast">
            <p>{message}</p>
        </div>
    )

}


