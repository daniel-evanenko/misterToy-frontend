import React from "react"
const confirmationMessage = 'You have unsaved changes. Continue?'

export function useConfirmTabClose(isUnsafeTabClose) {
    React.useEffect(() => {
        function handleBeforeUnload(ev) {
            if (isUnsafeTabClose) {
                ev.returnValue = confirmationMessage
                return confirmationMessage
            }  
        }
        
        window.addEventListener('beforeunload', handleBeforeUnload)
        return () => {
            console.log('removeEventListener')
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [isUnsafeTabClose])
}