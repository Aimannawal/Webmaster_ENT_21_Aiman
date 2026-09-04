export type ToastType = 'success' | 'error' | 'info'

interface ToastMessage { id: number; message: string; type: ToastType }

export const useToast = () => {
  const messages = useState<ToastMessage[]>('toast-messages', () => [])
  const validMessages = computed(() => (Array.isArray(messages.value) ? messages.value : []).filter((item): item is ToastMessage => Boolean(item && item.id && item.type && item.message)))
  function show(message: string, type: ToastType = 'info') {
    const id = Date.now() + Math.random()
    if (!Array.isArray(messages.value)) messages.value = []
    messages.value.push({ id, message, type })
    setTimeout(() => { messages.value = (Array.isArray(messages.value) ? messages.value : []).filter((item) => item?.id !== id) }, 3600)
  }
  return { messages: validMessages, show }
}
