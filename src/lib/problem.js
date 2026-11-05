/** An error with a code the pages turn into words: wrong | offline | notStudent | server. */
export const problem = (code, message) => Object.assign(new Error(message || code), { code })
