'use client'
import { Toast } from "@/components/Toast";
import { useActionState } from "react";

export default function ToastClient(submit
    : any
) {
    const [state] = useActionState<{ error?: string, success?: string } | null>(submit, null)

    return (
        <>
            {
                state?.error &&
                <Toast message={state.error} type={'warning'}></Toast>
            }
            {
                state?.success &&
                <Toast message={state.success} type={'warning'}></Toast>
            }

        </>
    )
}
