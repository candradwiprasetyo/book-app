export type BookListResponse = {
  kind: string;
  totalItems: number;
  items: Book[];
};

export type Book = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
  accessInfo: AccessInfo;
  searchInfo?: SearchInfo;
};

export type VolumeInfo = {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  industryIdentifiers?: IndustryIdentifier[];
  readingModes?: ReadingModes;
  pageCount?: number;
  printType?: string;
  averageRating?: number;
  ratingsCount?: number;
  maturityRating?: string;
  allowAnonLogging?: boolean;
  contentVersion?: string;
  panelizationSummary?: PanelizationSummary;
  imageLinks?: ImageLinks;
  language?: string;
  previewLink?: string;
  infoLink?: string;
  canonicalVolumeLink?: string;
  publishedDate: string;
  description: string;
  categories: string[];
};

export type IndustryIdentifier = {
  type: string;
  identifier: string;
};

export type ReadingModes = {
  text: boolean;
  image: boolean;
};

export type PanelizationSummary = {
  containsEpubBubbles: boolean;
  containsImageBubbles: boolean;
};

export type ImageLinks = {
  smallThumbnail: string;
  thumbnail: string;
};

export type SaleInfo = {
  country: string;
  saleability: string;
  isEbook: boolean;
};

export type AccessInfo = {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
  epub: {
    isAvailable: boolean;
  };
  pdf: {
    isAvailable: boolean;
    acsTokenLink?: string;
  };
  webReaderLink?: string;
  accessViewStatus?: string;
  quoteSharingAllowed?: boolean;
};

export type SearchInfo = {
  textSnippet: string;
};
