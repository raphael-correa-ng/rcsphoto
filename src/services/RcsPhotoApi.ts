export interface Album {
  id: string;
  name: string;
  description: string;
  camera: string;
  images: Image[],
  coverImage: string;
  sortOrder: number;
}

export interface Image {
  thumb: string,
  small: string,
  medium: string,
  large: string,
  full: string
}

export interface ServiceConfig {
  imageBaseUrl: string,
  serviceBaseUrl: string,
}

export default class RcsPhotoApi {

  private cache: Album[];
  private config: ServiceConfig;

  constructor(config: ServiceConfig) {
    this.config = config;
  }

  public readonly getAlbums = async () : Promise<Album[]> => {
    if (this.cache) {
      return this.cache;
    }

    const response = await fetch(this.config.serviceBaseUrl + '/albums');

    this.cache = (await response.json())
      .body.data.rows
      .map(row => this.enrichAlbum(row.doc))
      .sort((a, b) => a.sortOrder - b.sortOrder);

    return this.cache;
  }

  public readonly getAlbum = async (albumId: string) : Promise<Album> => {
    return (await this.getAlbums()).find(album => album.id === albumId);
  }

  private readonly enrichAlbum = (album) : Album => {
    return {
      ...album,
      coverImage: this.createUrl(album.id, album.coverImage, 'thumb'),
      images: album.images.map(imageName => ({
        thumb: this.createUrl(album.id, imageName, 'thumb'),
        small: this.createUrl(album.id, imageName, 'small'),
        medium: this.createUrl(album.id, imageName, 'medium'),
        large: this.createUrl(album.id, imageName, 'large'),
        full: this.createUrl(album.id, imageName, 'full')
      }))
    };
  };

  private readonly createUrl = (albumId: string, imageName: string, size: string) => {
    return `${this.config.imageBaseUrl}/${albumId}/${size}/${imageName}`;
  };
}