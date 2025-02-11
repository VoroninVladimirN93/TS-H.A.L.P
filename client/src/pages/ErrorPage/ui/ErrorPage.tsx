import React from 'react';
import styles from './ErrorPage.module.css';

export  function ErrorPage() {
  return (
    <div className={styles.errorPageContainer}>
      <div className={styles.errorText}>
        <h1>404</h1>
        <p>Мы весьма озадачены вашим запросом. Страница не найдена.</p>
      </div>
      <a href="/" className={styles.goHome}>Вернуться на главную</a>
    </div>
  );
}
