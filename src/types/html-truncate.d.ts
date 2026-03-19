declare module 'html-truncate' {
  const truncate: (html: string, maxLength: number, options?: { keepImageTag?: boolean }) => string;
  export default truncate;
}
