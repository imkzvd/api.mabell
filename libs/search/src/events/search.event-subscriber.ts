import { Inject } from '@nestjs/common';
import { EventBus } from '@api.mabell/event-bus';
import { App } from '@api.mabell/core';
import { CreateUserDocumentOnUserCreatedEventHandler } from '../modules/user/event-handlers/create-user-document-on-user-created.event-handler';
import { UserCollection } from '../modules/user/user.collection';
import { CreateArtistDocumentOnArtistCreatedEventHandler } from '../modules/artist/event-handlers/create-artist-document-on-artist-created.event-handler';
import { ArtistCollection } from '../modules/artist/artist.collection';
import { DeleteUserDocumentOnUserDeletedEventHandler } from '../modules/user/event-handlers/delete-user-document-on-user-deleted.event-handler';
import { DeleteArtistDocumentOnArtistDeletedEventHandler } from '../modules/artist/event-handlers/delete-artist-document-on-artist-deleted.event-handler';
import { AlbumCollection } from '../modules/album/album.collection';
import { CreateAlbumDocumentOnAlbumCreatedEventHandler } from '../modules/album/event-handlers/create-album-document-on-album-created.event-handler';
import { DeleteAlbumDocumentOnAlbumDeletedEventHandler } from '../modules/album/event-handlers/delete-album-document-on-album-deleted.event-handler';
import { UpdateAlbumDocumentsOnArtistUpdatedEventHandler } from '../modules/album/event-handlers/update-album-documents-on-artist-updated.event-handler';
import { DeleteAlbumDocumentsOnArtistDeletedEventHandler } from '../modules/album/event-handlers/delete-album-documents-on-artist-deleted.event-handler';
import { CreateTrackDocumentOnTrackCreatedEventHandler } from '../modules/track/event-handlers/create-track-document-on-track-created.event-handler';
import { TrackCollection } from '../modules/track/track.collection';
import { DeleteTrackDocumentOnTrackDeletedEventHandler } from '../modules/track/event-handlers/delete-track-document-on-track-deleted.event-handler';
import { UpdateTrackDocumentsOnAlbumUpdatedEventHandler } from '../modules/track/event-handlers/update-track-documents-on-album-updated.event-handler';
import { UpdateTrackDocumentsOnArtistUpdatedEventHandler } from '../modules/track/event-handlers/update-track-documents-on-artist-updated.event-handler';
import { CreatePlaylistDocumentOnPlaylistCreatedEventHandler } from '../modules/playlist/event-handlers/create-playlist-document-on-playlist-created.event-handler';
import { PlaylistCollection } from '../modules/playlist/playlist.collection';
import { DeletePlaylistDocumentOnPlaylistDeletedEventHandler } from '../modules/playlist/event-handlers/delete-playlist-document-on-playlist-deleted.event-handler';
import { DeleteTrackDocumentsOnArtistDeletedEventHandler } from '../modules/track/event-handlers/delete-track-documents-on-artist-deleted.event-handler';
import { DeleteTrackDocumentsOnAlbumDeletedEventHandler } from '../modules/track/event-handlers/delete-track-documents-on-album-deleted.event-handler';
import { DeletePlaylistDocumentsOnUserDeletedEventHandler } from '../modules/playlist/event-handlers/delete-playlist-documents-on-user-deleted.event-handler';
import { UpdatePlaylistDocumentsOnUserUpdatedEventHandler } from '../modules/playlist/event-handlers/update-playlist-documents-on-user-updated.event-handler';

export class SearchEventSubscriber {
  constructor(
    @Inject(EventBus) private readonly _EB: EventBus,
    @Inject(UserCollection) private readonly _userCollection: UserCollection,
    @Inject(ArtistCollection) private readonly _artistCollection: ArtistCollection,
    @Inject(AlbumCollection) private readonly _albumCollection: AlbumCollection,
    @Inject(TrackCollection) private readonly _trackCollection: TrackCollection,
    @Inject(PlaylistCollection) private readonly _playlistCollection: PlaylistCollection,
  ) {
    const saveUserDocumentOnUserUpdatedEventHandler =
      new CreateUserDocumentOnUserCreatedEventHandler(this._userCollection);
    const deleteUserDocumentOnUserDeletedEventHandler =
      new DeleteUserDocumentOnUserDeletedEventHandler(this._userCollection);

    this._EB.subscribe(App.Events.UserCreatedEvent, saveUserDocumentOnUserUpdatedEventHandler);
    this._EB.subscribe(App.Events.UserUpdatedEvent, saveUserDocumentOnUserUpdatedEventHandler);
    this._EB.subscribe(App.Events.UserDeletedEvent, deleteUserDocumentOnUserDeletedEventHandler);

    const saveArtistDocumentOnArtistUpdatedEventHandler =
      new CreateArtistDocumentOnArtistCreatedEventHandler(this._artistCollection);
    const deleteArtistDocumentOnArtistDeletedEventHandler =
      new DeleteArtistDocumentOnArtistDeletedEventHandler(this._artistCollection);

    this._EB.subscribe(
      App.Events.ArtistCreatedEvent,
      saveArtistDocumentOnArtistUpdatedEventHandler,
    );
    this._EB.subscribe(
      App.Events.ArtistUpdatedEvent,
      saveArtistDocumentOnArtistUpdatedEventHandler,
    );
    this._EB.subscribe(
      App.Events.ArtistDeletedEvent,
      deleteArtistDocumentOnArtistDeletedEventHandler,
    );

    const createAlbumDocumentOnAlbumCreatedEventHandler =
      new CreateAlbumDocumentOnAlbumCreatedEventHandler(this._albumCollection);
    const deleteAlbumDocumentOnAlbumDeletedEventHandler =
      new DeleteAlbumDocumentOnAlbumDeletedEventHandler(this._albumCollection);
    const saveAlbumDocumentOnArtistUpdatedEventHandler =
      new UpdateAlbumDocumentsOnArtistUpdatedEventHandler(this._albumCollection);
    const deleteAlbumDocumentsOnArtistDeletedEventHandler =
      new DeleteAlbumDocumentsOnArtistDeletedEventHandler(this._albumCollection);

    this._EB.subscribe(App.Events.AlbumCreatedEvent, createAlbumDocumentOnAlbumCreatedEventHandler);
    this._EB.subscribe(App.Events.AlbumUpdatedEvent, createAlbumDocumentOnAlbumCreatedEventHandler);
    this._EB.subscribe(App.Events.AlbumDeletedEvent, deleteAlbumDocumentOnAlbumDeletedEventHandler);
    this._EB.subscribe(App.Events.ArtistUpdatedEvent, saveAlbumDocumentOnArtistUpdatedEventHandler);
    this._EB.subscribe(
      App.Events.ArtistDeletedEvent,
      deleteAlbumDocumentsOnArtistDeletedEventHandler,
    );

    const saveTrackDocumentOnTrackUpdatedEventHandler =
      new CreateTrackDocumentOnTrackCreatedEventHandler(this._trackCollection);
    const deleteTrackDocumentOnTrackDeletedEventHandler =
      new DeleteTrackDocumentOnTrackDeletedEventHandler(this._trackCollection);
    const saveTrackDocumentsOnAlbumUpdatedEventHandler =
      new UpdateTrackDocumentsOnAlbumUpdatedEventHandler(this._trackCollection);
    const saveTrackDocumentsOnArtistUpdatedEventHandler =
      new UpdateTrackDocumentsOnArtistUpdatedEventHandler(this._trackCollection);
    const deleteTrackDocumentsOnArtistDeletedEventHandler =
      new DeleteTrackDocumentsOnArtistDeletedEventHandler(this._trackCollection);
    const deleteTrackDocumentsOnAlbumDeletedEventHandler =
      new DeleteTrackDocumentsOnAlbumDeletedEventHandler(this._trackCollection);

    this._EB.subscribe(App.Events.TrackCreatedEvent, saveTrackDocumentOnTrackUpdatedEventHandler);
    this._EB.subscribe(App.Events.TrackUpdatedEvent, saveTrackDocumentOnTrackUpdatedEventHandler);
    this._EB.subscribe(App.Events.TrackDeletedEvent, deleteTrackDocumentOnTrackDeletedEventHandler);
    this._EB.subscribe(App.Events.AlbumUpdatedEvent, saveTrackDocumentsOnAlbumUpdatedEventHandler);
    this._EB.subscribe(
      App.Events.ArtistUpdatedEvent,
      saveTrackDocumentsOnArtistUpdatedEventHandler,
    );
    this._EB.subscribe(
      App.Events.ArtistDeletedEvent,
      deleteTrackDocumentsOnArtistDeletedEventHandler,
    );
    this._EB.subscribe(
      App.Events.AlbumDeletedEvent,
      deleteTrackDocumentsOnAlbumDeletedEventHandler,
    );

    const createPlaylistDocumentOnPlaylistCreatedEventHandler =
      new CreatePlaylistDocumentOnPlaylistCreatedEventHandler(this._playlistCollection);
    const deletePlaylistDocumentOnPlaylistDeletedEventHandler =
      new DeletePlaylistDocumentOnPlaylistDeletedEventHandler(this._playlistCollection);
    const deletePlaylistDocumentsOnUserDeletedEventHandler =
      new DeletePlaylistDocumentsOnUserDeletedEventHandler(this._playlistCollection);
    const updatePlaylistDocumentsOnUserUpdatedEventHandler =
      new UpdatePlaylistDocumentsOnUserUpdatedEventHandler(this._playlistCollection);

    this._EB.subscribe(
      App.Events.PlaylistCreatedEvent,
      createPlaylistDocumentOnPlaylistCreatedEventHandler,
    );
    this._EB.subscribe(
      App.Events.PlaylistUpdatedEvent,
      createPlaylistDocumentOnPlaylistCreatedEventHandler,
    );
    this._EB.subscribe(
      App.Events.PlaylistDeletedEvent,
      deletePlaylistDocumentOnPlaylistDeletedEventHandler,
    );
    this._EB.subscribe(
      App.Events.UserDeletedEvent,
      deletePlaylistDocumentsOnUserDeletedEventHandler,
    );
    this._EB.subscribe(
      App.Events.UserUpdatedEvent,
      updatePlaylistDocumentsOnUserUpdatedEventHandler,
    );
  }
}
