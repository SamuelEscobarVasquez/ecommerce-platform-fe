import styles from './LoadingOverlay.module.scss';

export interface LoadingOverlayProps {
  isLoading: boolean;
}

export function LoadingOverlay({ isLoading }: LoadingOverlayProps) {
  if (!isLoading) return null;
  return (
    <div className={styles.backdrop}>
      <div className={styles.spinner} />
    </div>
  );
}