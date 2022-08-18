import styles from './Typography.module.css';

interface TitleProps {
  tag?: 'h1' | 'h2' | 'span' | 'div';
  variant?: 'title' | 'sub-title' | 'title-regular';
  children: React.ReactNode;
}

export const Typography: React.FC<TitleProps> = ({ children, tag = 'div', variant = 'title' }) => {
  const Component = tag;

  return <Component className={styles[variant]}>{children}</Component>;
};
