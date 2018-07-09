import {Component, OnInit, TemplateRef} from '@angular/core';
import {GalleriesService} from './galleries.service';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Gallery} from '../app.datamodel';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.css']
})
export class GalleriesComponent implements OnInit {

  galleries: Gallery[];
  showTable = false;
  completed = false;
  categories = ['SCIENCE', 'HISTORY', 'NATURE'];
  modalRef: BsModalRef;

  selectedGallery: Gallery;

  newGalleryEn: Gallery = {
    name: undefined,
    category: undefined,
    description: undefined
  };

  newGalleryRo: Gallery = {
    name: undefined,
    category: undefined,
    description: undefined
  };

  constructor(private galleriesService: GalleriesService,
              private router: Router,
              private spinner: NgxSpinnerService,
              private modal: BsModalService) {
  }

  ngOnInit() {
    this.spinner.show();
    this.getGalleries();
  }

  openAddGalleryModal(template: TemplateRef<any>) {
    const modalOptions: ModalOptions = {
      class: 'modal-lg'
    };

    this.modalRef = this.modal.show(template, modalOptions);
  }

  async addGallery() {
    this.modalRef.hide();

    const galleryToSaveEn = {
      name: this.newGalleryEn.name,
      category: this.newGalleryEn.category[0],
      description: this.newGalleryEn.description,
      locale: 'en'
    };

    const galleryToSaveRo = {
      name: this.newGalleryEn.name,
      category: this.newGalleryEn.category[0],
      description: this.newGalleryRo.description,
      locale: 'ro'
    };

    console.log(galleryToSaveEn);
    console.log(galleryToSaveRo);

    this.spinner.show();

    const resp1 = await this.galleriesService.addGallery(galleryToSaveEn).toPromise();
    const resp2 = await this.galleriesService.addGallery(galleryToSaveRo).toPromise();

    this.getGalleries();
  }

  cancelSave() {
    this.modalRef.hide();
    this.newGalleryEn = {
      name: undefined,
      category: undefined,
      description: undefined
    };
  }

  openEditModal(template: TemplateRef<any>, gallery) {
    const modalOptions: ModalOptions = {
      class: 'modal-lg'
    };

    this.selectedGallery = gallery;
    this.modalRef = this.modal.show(template, modalOptions);
  }

  editGallery() {
    const galleryToBeUpdated = {
      id: this.selectedGallery.id,
      name: this.selectedGallery.name,
      category: this.selectedGallery.category,
      description: this.selectedGallery.description
    };

    this.spinner.show();
    this.modalRef.hide();
    this.galleriesService.updateGallery(galleryToBeUpdated)
      .subscribe(data => this.spinner.hide(),
        error => console.log(error));
  }

  cancelEdit() {
    this.modalRef.hide();
  }

  async getGalleries() {
    this.completed = false;

    const galleriesEN: Gallery[] = await this.galleriesService.getGalleriesEn().toPromise();
    const galleriesRO: Gallery[] = await this.galleriesService.getGalleriesRo().toPromise();

    this.galleries = [...galleriesEN, ...galleriesRO];
    this.galleries = this.galleries.sort((gallery1, gallery2) => gallery1.id > gallery2.id ? 1 : -1);

    this.showTable = true;
    this.spinner.hide();
    this.completed = true;
  }

  goToGalleryDetails(id: number) {
    this.router.navigate(['galleries', id]);
  }

  async deleteGallery(galleryId: number) {
    this.spinner.show();

    const galleryIdOther = galleryId % 2 !== 0 ? galleryId + 1 : galleryId - 1;

    const test = await this.galleriesService.deleteGalleryById(galleryId).toPromise();
    const test1 = await this.galleriesService.deleteGalleryById(galleryIdOther).toPromise();

    this.galleries = this.galleries.filter(gallery => gallery.id !== galleryId && gallery.id !== galleryIdOther);

    this.spinner.hide();
  }

  isAddButtonDisabled() {
    return !(this.newGalleryEn.description && this.newGalleryEn.category && this.newGalleryEn.name);
  }

}
