import { Inject } from '@nestjs/common';
import { EventBus as EventBusPort } from '@core/app/common/ports/event-bus.port';
import { EventBus } from '@infrastructure/event-bus';
import { CreateUserDocumentOnUserCreatedEventHandler } from '@infrastructure/typesense/modules/user/event-handlers/create-user-document-on-user-created.event-handler';
import { UserCollection } from '@infrastructure/typesense/modules/user/user.collection';
import { UserUpdatedEvent } from '@core/app/common/events/user/user-updated.event';
import { CreateArtistDocumentOnArtistCreatedEventHandler } from '@infrastructure/typesense/modules/artist/event-handlers/create-artist-document-on-artist-created.event-handler';
import { ArtistUpdatedEvent } from '@core/app/common/events/artist/artist-updated.event';
import { ArtistCollection } from '@infrastructure/typesense/modules/artist/artist.collection';
import { DeleteUserDocumentOnUserDeletedEventHandler } from '@infrastructure/typesense/modules/user/event-handlers/delete-user-document-on-user-deleted.event-handler';
import { UserDeletedEvent } from '@core/app/common/events/user/user-deleted.event';
import { UserCreatedEvent } from '@core/app/common/events/user/user-created.event';
import { DeleteArtistDocumentOnArtistDeletedEventHandler } from '@infrastructure/typesense/modules/artist/event-handlers/delete-artist-document-on-artist-deleted.event-handler';
import { ArtistDeletedEvent } from '@core/app/common/events/artist/artist-deleted.event';
import { ArtistCreatedEvent } from '@core/app/common/events/artist/artist-created.event';
import { AlbumCollection } from '@infrastructure/typesense/modules/album/album.collection';
import { CreateAlbumDocumentOnAlbumCreatedEventHandler } from '@infrastructure/typesense/modules/album/event-handlers/create-album-document-on-album-created.event-handler';
import { DeleteAlbumDocumentOnAlbumDeletedEventHandler } from '@infrastructure/typesense/modules/album/event-handlers/delete-album-document-on-album-deleted.event-handler';
import { AlbumCreatedEvent } from '@core/app/common/events/album/album-created.event';
import { AlbumUpdatedEvent } from '@core/app/common/events/album/album-updated.event';
import { AlbumDeletedEvent } from '@core/app/common/events/album/album-deleted.event';
import { UpdateAlbumDocumentsOnArtistUpdatedEventHandler } from '@infrastructure/typesense/modules/album/event-handlers/update-album-documents-on-artist-updated.event-handler';
import { DeleteAlbumDocumentsOnArtistDeletedEventHandler } from '@infrastructure/typesense/modules/album/event-handlers/delete-album-documents-on-artist-deleted.event-handler';
import { CreateTrackDocumentOnTrackCreatedEventHandler } from '@infrastructure/typesense/modules/track/event-handlers/create-track-document-on-track-created.event-handler';
import { TrackCollection } from '@infrastructure/typesense/modules/track/track.collection';
import { TrackCreatedEvent } from '@core/app/common/events/track/track-created.event';
import { TrackUpdatedEvent } from '@core/app/common/events/track/track-updated.event';
import { DeleteTrackDocumentOnTrackDeletedEventHandler } from '@infrastructure/typesense/modules/track/event-handlers/delete-track-document-on-track-deleted.event-handler';
import { TrackDeletedEvent } from '@core/app/common/events/track/track-deleted.event';
import { UpdateTrackDocumentsOnAlbumUpdatedEventHandler } from '@infrastructure/typesense/modules/track/event-handlers/update-track-documents-on-album-updated.event-handler';
import { UpdateTrackDocumentsOnArtistUpdatedEventHandler } from '@infrastructure/typesense/modules/track/event-handlers/update-track-documents-on-artist-updated.event-handler';

export class TypesenseEventSubscriber {
  constructor(
    @Inject(EventBus) private readonly _EB: EventBusPort,
    @Inject(UserCollection) private readonly _userCollection: UserCollection,
    @Inject(ArtistCollection) private readonly _artistCollection: ArtistCollection,
    @Inject(AlbumCollection) private readonly _albumCollection: AlbumCollection,
    @Inject(TrackCollection) private readonly _trackCollection: TrackCollection,
  ) {
    const saveUserDocumentOnUserUpdatedEventHandler =
      new CreateUserDocumentOnUserCreatedEventHandler(this._userCollection);
    const deleteUserDocumentOnUserDeletedEventHandler =
      new DeleteUserDocumentOnUserDeletedEventHandler(this._userCollection);

    this._EB.subscribe(UserCreatedEvent, saveUserDocumentOnUserUpdatedEventHandler);
    this._EB.subscribe(UserUpdatedEvent, saveUserDocumentOnUserUpdatedEventHandler);
    this._EB.subscribe(UserDeletedEvent, deleteUserDocumentOnUserDeletedEventHandler);

    const saveArtistDocumentOnArtistUpdatedEventHandler =
      new CreateArtistDocumentOnArtistCreatedEventHandler(this._artistCollection);
    const deleteArtistDocumentOnArtistDeletedEventHandler =
      new DeleteArtistDocumentOnArtistDeletedEventHandler(this._artistCollection);

    this._EB.subscribe(ArtistCreatedEvent, saveArtistDocumentOnArtistUpdatedEventHandler);
    this._EB.subscribe(ArtistUpdatedEvent, saveArtistDocumentOnArtistUpdatedEventHandler);
    this._EB.subscribe(ArtistDeletedEvent, deleteArtistDocumentOnArtistDeletedEventHandler);

    const createAlbumDocumentOnAlbumCreatedEventHandler =
      new CreateAlbumDocumentOnAlbumCreatedEventHandler(this._albumCollection);
    const deleteAlbumDocumentOnAlbumDeletedEventHandler =
      new DeleteAlbumDocumentOnAlbumDeletedEventHandler(this._albumCollection);
    const saveAlbumDocumentOnArtistUpdatedEventHandler =
      new UpdateAlbumDocumentsOnArtistUpdatedEventHandler(this._albumCollection);
    const deleteAlbumDocumentsOnArtistDeletedEventHandler =
      new DeleteAlbumDocumentsOnArtistDeletedEventHandler(this._albumCollection);

    this._EB.subscribe(AlbumCreatedEvent, createAlbumDocumentOnAlbumCreatedEventHandler);
    this._EB.subscribe(AlbumUpdatedEvent, createAlbumDocumentOnAlbumCreatedEventHandler);
    this._EB.subscribe(AlbumDeletedEvent, deleteAlbumDocumentOnAlbumDeletedEventHandler);
    this._EB.subscribe(ArtistUpdatedEvent, saveAlbumDocumentOnArtistUpdatedEventHandler);
    this._EB.subscribe(ArtistDeletedEvent, deleteAlbumDocumentsOnArtistDeletedEventHandler);

    const saveTrackDocumentOnTrackUpdatedEventHandler =
      new CreateTrackDocumentOnTrackCreatedEventHandler(this._trackCollection);
    const deleteTrackDocumentOnTrackDeletedEventHandler =
      new DeleteTrackDocumentOnTrackDeletedEventHandler(this._trackCollection);
    const saveTrackDocumentsOnAlbumUpdatedEventHandler =
      new UpdateTrackDocumentsOnAlbumUpdatedEventHandler(this._trackCollection);
    const saveTrackDocumentsOnArtistUpdatedEventHandler =
      new UpdateTrackDocumentsOnArtistUpdatedEventHandler(this._trackCollection);

    this._EB.subscribe(TrackCreatedEvent, saveTrackDocumentOnTrackUpdatedEventHandler);
    this._EB.subscribe(TrackUpdatedEvent, saveTrackDocumentOnTrackUpdatedEventHandler);
    this._EB.subscribe(TrackDeletedEvent, deleteTrackDocumentOnTrackDeletedEventHandler);
    this._EB.subscribe(AlbumUpdatedEvent, saveTrackDocumentsOnAlbumUpdatedEventHandler);
    this._EB.subscribe(ArtistUpdatedEvent, saveTrackDocumentsOnArtistUpdatedEventHandler);
  }
}
