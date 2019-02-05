
export default class File<T = {}> {
  readonly orgLabel: string;
  readonly projectLabel: string;

  constructor(
    orgLabel: string,
    projectLabel: string,
    fileResponse: FileResponse,
  ) {
    this.raw = resourceResponse;
    this.orgLabel = orgLabel;
    this.projectLabel = projectLabel;
    this.id = resourceResponse['@id'];
    this.context = resourceResponse['@context'];
    this.self = resourceResponse._self;
    this.constrainedBy = resourceResponse._constrainedBy;
    this.project = resourceResponse._project;
    this.createdAt = resourceResponse._createdAt;
    this.createdBy = resourceResponse._createdBy;
    this.updatedAt = resourceResponse._updatedAt;
    this.updatedBy = resourceResponse._updatedBy;
    this.rev = resourceResponse._rev;
    this.deprecated = resourceResponse._deprecated;
    // make type an array of sting, even if we only get a single string
    if (resourceResponse['@type']) {
      if (Array.isArray(resourceResponse['@type'])) {
        this.type = resourceResponse['@type'] as string[];
      } else {
        this.type = [resourceResponse['@type']] as string[];
      }
    }
    // Put user custom fields in "data" key
    this.data = Object.keys(resourceResponse).reduce(
      (memo: any, key: string) => {
        if (!RESOURCE_METADATA_KEYS.includes(key)) {
          memo[key] = resourceResponse[key];
        }
        return memo;
      },
      {},
    );
    this.resourceURL = `/resources/${this.orgLabel}/${
      this.projectLabel
    }/resource/${this.id}`;
  }
}