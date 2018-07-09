import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BASE_URL} from '../app.component';
import {BearerTokenService} from '../bearer-token.service';
import {Artifact} from '../app.datamodel';

const ADD_ARTIFACT_URL = BASE_URL + '/secure/gallery/addArtifact/';
const DELETE_ARTIFACT_BY_ID_URL = BASE_URL + '/secure/artifact/delete/';
const UPDATE_ARTIFACT_URL = BASE_URL + '/secure/artifact/update';

@Injectable()
export class ArtifactsService {
  constructor(private http: HttpClient,
              private tokenService: BearerTokenService) {
  }

  addArtifact(artifact: Artifact, galleryId: number) {
    return this.http.post(ADD_ARTIFACT_URL + galleryId, artifact, {headers: this.tokenService.getBearerTokenAuthorizationHeader()});
  }

  deleteArtifactById(artifactId: number) {
    return this.http.delete(DELETE_ARTIFACT_BY_ID_URL + artifactId, {headers: this.tokenService.getBearerTokenAuthorizationHeader()});
  }

  updateArtifact(artifact: Artifact) {
    return this.http.put(UPDATE_ARTIFACT_URL, artifact, {headers: this.tokenService.getBearerTokenAuthorizationHeader()});
  }

}

