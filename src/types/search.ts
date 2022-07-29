import { AlbumDocument } from 'src/album/schemas/album.schema';
import { FolderDocument } from 'src/folder/schemas/folder.schema';
import { TrackDocument } from 'src/track/schemas/track.schema';

export type ChildrenDocuments = (FolderDocument | TrackDocument | AlbumDocument)[];
