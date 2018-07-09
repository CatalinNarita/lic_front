import {Component, OnInit, TemplateRef} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GalleriesService} from '../galleries/galleries.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Artifact, Gallery} from '../app.datamodel';
import {ArtifactsService} from './artifact.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';

@Component({
  selector: 'app-gallery-details',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css']
})
export class ArtifactsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private galleriesService: GalleriesService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private artifactsService: ArtifactsService,
              private modal: BsModalService) {
  }

  id: number;
  artifacts: Artifact[];
  showTable = false;
  modalRef: BsModalRef;
  selectedArtifact: Artifact;
  completed = false;
  newArtifactEn: Artifact = {
    name: undefined,
    locale: 'en',
    textBasic: undefined,
    textAdvanced: undefined,
    tagId: undefined
  };
  newArtifactRo: Artifact = {
    name: undefined,
    locale: 'ro',
    textBasic: undefined,
    textAdvanced: undefined,
    tagId: undefined
  };

  tagId: string;

  ngOnInit() {
    this.id = <number>this.route.snapshot.params['id'];
    this.spinner.show();
    this.getArtifactsByGalleryId(this.id);
  }

  async getArtifactsByGalleryId(galleryId: number) {
    this.completed = false;

    const artifacts1: Artifact[] = await this.galleriesService.getArtifactsByGalleryId(galleryId).toPromise();

    this.artifacts = [...artifacts1];
    this.spinner.hide();
    this.showTable = true;
    this.completed = true;
  }

  async deleteArtifact(artifactId: number) {
    this.spinner.show();
    const artifactIdOther = artifactId % 2 !== 0 ? artifactId + 1 : artifactId - 1;
    const dummy1 = await this.artifactsService.deleteArtifactById(artifactId).toPromise();
    //const dummy2 = await this.artifactsService.deleteArtifactById(artifactIdOther).toPromise();
    this.artifacts = this.artifacts.filter(artifact => artifact.id !== artifactId && artifact.id !== artifactId);
    this.spinner.hide();
  }

  openEditModal(editModalTemplate: TemplateRef<any>, artifact: Artifact) {
    const modalOptions: ModalOptions = {
      class: 'modal-lg'
    };

    this.selectedArtifact = artifact;
    this.modalRef = this.modal.show(editModalTemplate, modalOptions);
  }

  editArtifact() {
    const artifactToBeUpdated = {
      id: this.selectedArtifact.id,
      name: this.selectedArtifact.name,
      textBasic: this.selectedArtifact.textBasic,
      textAdvanced: this.selectedArtifact.textAdvanced,
      tagId: this.selectedArtifact.tagId
    };

    this.spinner.show();
    this.modalRef.hide();
    this.artifactsService.updateArtifact(artifactToBeUpdated)
      .subscribe(data => this.spinner.hide(),
        error => console.log(error));
  }

  cancelEdit() {
    this.modalRef.hide();
  }

  openAddArtifactModal(template: TemplateRef<any>) {
    const modalOptions: ModalOptions = {
      class: 'modal-lg'
    };

    this.modalRef = this.modal.show(template, modalOptions);
  }

  cancelSave() {
    this.modalRef.hide();
    this.resetArtifactData();
  }

  async addArtifact() {
    this.modalRef.hide();

    const artifactToSaveEn = {
      name: this.newArtifactEn.name,
      locale: 'en',
      textBasic: this.newArtifactEn.textBasic,
      textAdvanced: this.newArtifactEn.textAdvanced,
      tagId: this.tagId
    };
    const artifactToSaveRo = {
      name: this.newArtifactRo.name,
      locale: 'ro',
      textBasic: this.newArtifactRo.textBasic,
      textAdvanced: this.newArtifactRo.textAdvanced,
      tagId: this.tagId
    };

    this.spinner.show();

    const dummyId: number = +this.id;
    const galleryIdOther = dummyId % 2 !== 0 ? dummyId + 1 : dummyId - 1;
    console.log(dummyId, galleryIdOther);

    if (this.id % 2 !== 0) {
      const dummy1 = await this.artifactsService.addArtifact(artifactToSaveEn, dummyId).toPromise();
      const dummy2 = await this.artifactsService.addArtifact(artifactToSaveRo, galleryIdOther).toPromise();
    } else {
      const dummy1 = await this.artifactsService.addArtifact(artifactToSaveRo, dummyId).toPromise();
      const dummy2 = await this.artifactsService.addArtifact(artifactToSaveEn, galleryIdOther).toPromise();
    }

    this.resetArtifactData();
    this.getArtifactsByGalleryId(this.id);
  }

  isAddButtonDisabled() {
    return !(this.newArtifactEn.name && this.newArtifactEn.textBasic && this.newArtifactEn.textAdvanced
      && this.newArtifactRo.name && this.newArtifactRo.textBasic && this.newArtifactRo.textAdvanced && this.tagId);
  }

  resetArtifactData() {
    this.newArtifactEn = {
      name: undefined,
      locale: 'en',
      textBasic: undefined,
      textAdvanced: undefined,
      tagId: undefined
    };
    this.newArtifactRo = {
      name: undefined,
      locale: 'ro',
      textBasic: undefined,
      textAdvanced: undefined,
      tagId: undefined
    };
  }

}
