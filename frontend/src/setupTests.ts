/**
 * Adiciona matchers personalizados ao Jest para asserções em nós do DOM.
 *
 * Esta biblioteca fornece matchers que você pode usar para realizar
 * asserções sobre elementos do DOM em seus testes. Com `@testing-library/jest-dom`,
 * você pode fazer coisas como:
 * 
 * ```js
 * expect(element).toHaveTextContent(/react/i);
 * expect(element).toBeInTheDocument();
 * expect(element).toHaveAttribute('href', '/home');
 * ```
 *
 * Isso facilita a verificação de que o DOM está na condição esperada durante
 * os testes. Por exemplo, você pode verificar se um elemento contém um texto específico,
 * se está presente no documento, se possui um atributo com um valor específico, e mais.
 *
 * Para mais informações e para ver todos os matchers disponíveis, visite a documentação:
 * [jest-dom no GitHub](https://github.com/testing-library/jest-dom)
 *
 * @module @testing-library/jest-dom
 */
import '@testing-library/jest-dom';
