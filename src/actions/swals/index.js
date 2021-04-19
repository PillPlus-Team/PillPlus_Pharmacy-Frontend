import Swal from 'sweetalert2';

export const SwalDefault = Swal;

export const ConfirmDialog = Swal.mixin({
    customClass: {
        confirmButton: 'w-24',
        cancelButton: 'w-24',
    },
    confirmButtonText: 'ตกลง',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#3B82F6',
    cancelButtonColor: '#9CA3AF',
    showCancelButton: true,
    showConfirmButton: true,
    allowEnterKey: false,
});

export const DeleteAlertDialog = Swal.mixin({
    customClass: {
        confirmButton: 'w-24',
        cancelButton: 'w-24',
    },
    confirmButtonText: 'ลบ',
    cancelButtonText: 'ยกเลิก',
    confirmButtonColor: '#EF4444',
    cancelButtonColor: '#9CA3AF',
    showCancelButton: true,
    showConfirmButton: true,
    allowEnterKey: false,
});

export const ChaningModal = Swal.mixin({
    customClass: {
        confirmButton: 'w-24',
        cancelButton: 'w-24',
    },
    confirmButtonColor: '#3B82F6',
    cancelButtonColor: '#9CA3AF',
    showCancelButton: true,
    showConfirmButton: true,
    allowEnterKey: false,
});

export const Toast = Swal.mixin({
    toast: true,
    timer: 3000,
    timerProgressBar: true,
    showCancelButton: false,
    showConfirmButton: false,
    position: 'bottom-end',
    width: 400,
});
