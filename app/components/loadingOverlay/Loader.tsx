import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className="fixed top-0 right-0 w-full h-full z-[9999999] bg-black filter brightness-[50%] flex justify-center items-center">
      <div>
        <div className={styles.loader}>
          <svg viewBox="0 0 80 80">
            <circle r="32" cy="40" cx="40" id="test" />
          </svg>
        </div>

        <div className={`${styles.loader} ${styles.triangle}`}>
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72" />
          </svg>
        </div>

        <div className={styles.loader}>
          <svg viewBox="0 0 80 80">
            <rect height="64" width="64" y="8" x="8" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Loader;