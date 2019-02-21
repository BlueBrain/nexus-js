export class CreateOrganizationException extends Error {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  toString(): string {
    return `Error creating organization: ${this.message}`;
  }
}
