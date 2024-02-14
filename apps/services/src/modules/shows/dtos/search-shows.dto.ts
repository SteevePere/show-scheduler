import {
  SearchShowsRequest,
  SearchShowsResponse,
  UserObject,
} from '@scheduler/shared';

export class SearchShowsData extends SearchShowsRequest {
  currentUser: UserObject;
}

export class SearchShowsResult extends SearchShowsResponse {}
