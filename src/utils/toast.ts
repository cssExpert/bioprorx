export type ToastVariant = 'success' | 'error';

export type ToastConfig = {
  variant: ToastVariant;
  title: string;
  message?: string;
  duration?: number;
};

type ShowFn = (config: ToastConfig) => void;

let _show: ShowFn | null = null;

export function _registerToast(fn: ShowFn) {
  _show = fn;
}

export const toast = {
  success(title: string, message?: string, duration = 4000) {
    _show?.({ variant: 'success', title, message, duration });
  },
  error(title: string, message?: string, duration = 4000) {
    _show?.({ variant: 'error', title, message, duration });
  },
};
