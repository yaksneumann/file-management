import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesUploadNotificationComponent } from './files-upload-notification.component';

describe('FilesUploadNotificationComponent', () => {
  let component: FilesUploadNotificationComponent;
  let fixture: ComponentFixture<FilesUploadNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesUploadNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesUploadNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
