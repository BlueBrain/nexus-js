export class SparqlViewQueryException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toString(): string {
    return `Error executing Sparql query: ${this.message}`;
  }
}
