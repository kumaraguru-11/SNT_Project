'use client'
import React, { useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { toastState } from '../recoilstore/store';
import { Toast } from 'primereact/toast';

export default function GlobalToast() {
    const toast = useRef(null);
    const [toastMessage, setToastMessage] = useRecoilState(toastState);

    useEffect(() => {
        if (toastMessage) {
            toast.current.show(toastMessage);
            // Clear the toast message after showing it
            setToastMessage(null);
        }
    }, [toastMessage, setToastMessage]);

    return <Toast ref={toast} />;
<<<<<<< HEAD
}
=======
}
>>>>>>> a5f7dfd85be5eac9b269f2d6c414088a604ff1af
