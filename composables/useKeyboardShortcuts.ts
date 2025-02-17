import { onMounted, onUnmounted } from 'vue';

export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key.toLowerCase();
    if (shortcuts[key]) {
      event.preventDefault();
      shortcuts[key]();
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
}
