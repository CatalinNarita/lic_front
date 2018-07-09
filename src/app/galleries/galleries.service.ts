import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL} from '../app.component';
import {BearerTokenService} from '../bearer-token.service';
import {Artifact, Gallery} from '../app.datamodel';

const GET_GALLERIES_URL_EN = BASE_URL + '/secure/gallery/get/all/en';
const GET_GALLERIES_URL_RO = BASE_URL + '/secure/gallery/get/all/ro';
const GET_GALLERY_BY_ID_URL = BASE_URL + '/gallery/getById/';

const ADD_GALLERY_URL = BASE_URL + '/secure/gallery/add';

const GET_ARTIFACTS_BY_GALLERY_ID = BASE_URL + '/secure/artifact/getByGalleryId/';
const UPDATE_GALLERY_URL = BASE_URL + '/secure/gallery/update';
const DELETE_GALLERY_URL = BASE_URL + '/secure/gallery/delete/';

@Injectable({
  providedIn: 'root'
})
export class GalleriesService {

  constructor(private http: HttpClient,
              private tokenService: BearerTokenService) { }

  getGalleriesEn(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(GET_GALLERIES_URL_EN, {headers: this.tokenService.getBearerTokenAuthorizationHeader()});
  }

  getGalleriesRo(): Observable<Gallery[]> {
    return this.http.get<Gallery[]>(GET_GALLERIES_URL_RO, {headers: this.tokenService.getBearerTokenAuthorizationHeader()});
  }

  addGallery(newGallery) {
    return this.http.post(ADD_GALLERY_URL, newGallery, {headers: this.tokenService.getBearerTokenAuthorizationHeader()});
  }

  getGalleryById(id: number): Observable<any> {
    return this.http.get(GET_GALLERY_BY_ID_URL + id, {headers: this.tokenService.getBearerTokenAuthorizationHeader()});
  }

  getArtifactsByGalleryId(id: number): Observable<Artifact[]> {
    return this.http.get<Artifact[]>(GET_ARTIFACTS_BY_GALLERY_ID + id, {headers: this.tokenService.getBearerTokenAuthorizationHeader()});
  }

  updateGallery(gallery): Observable<any> {
    return this.http.put(UPDATE_GALLERY_URL, gallery, {headers: this.tokenService.getBearerTokenAuthorizationHeader()});
  }

  deleteGalleryById(galleryId: number): Observable<any> {
    return this.http.delete(DELETE_GALLERY_URL + galleryId, {headers: this.tokenService.getBearerTokenAuthorizationHeader()});
  }
}
