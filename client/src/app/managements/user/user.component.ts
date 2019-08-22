import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { CorporationService } from 'src/app/services/corporation.service';
import { UpdateModalComponent } from '../../components/update-modal/update-modal.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.less']
})
export class UserComponent implements OnInit {
  public properties;

  constructor(private userServices: UserService, private snackBar: MatSnackBar
    , public corporationService: CorporationService, public dialog: MatDialog) { }

  createUserGrid() {
    this.properties = {
      searchable: true,
      editable: {
        mode: 'multiple'
      },
      pageable: {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20]
      },
      dataSource: {
        transport: {
          service: this.userServices,
          read: 'getUsers',
          update: 'setUserUseLicense'
        }
      },
      toolbar: [
        {
          action: 'search',
        }
      ],
      fields: [
        {
          name: 'isCorporationLicense',
          display: false
        },
        {
          title: 'E-Posta',
          name: 'email',
          display: true
        },
        {
          title: 'Birim Adı',
          name: 'unitName',
          display: true
        },
        {
          title: 'Ad',
          name: 'firstName',
          display: true
        },
        {
          title: 'Soyad',
          name: 'lastName',
          display: true
        },
        {
          title: 'Telefon',
          name: 'phoneNumber',
          display: true
        },
        {
          title: 'MaliyetBulut',
          name: 'useCostEstimationLicense',
          type: 'boolean',
          editable: e => {
            return !e.isCorporationLicense;
          },
          display: true
        },
        {
          title: 'BirimFiyatlar',
          name: 'useLibraryLicense',
          type: 'boolean',
          editable: e => {
            return !e.isCorporationLicense;
          },
          display: true
        },
        {
          title: 'HakedişBulut',
          name: 'useProgressPaymentLicense',
          type: 'boolean',
          editable: e => {
            return !e.isCorporationLicense;
          },
          display: true
        },
        {
          title: 'Birim Rol Adı',
          name: 'unitRoleName',
          display: false
        },
        {
          title: 'Başarısız Giriş Sayısı',
          name: 'accessFailedCount',
          display: false
        },
        {
          title: 'E-Posta Onayı',
          name: 'emailConfirmed',
          type: 'boolean',
          display: false
        },
        {
          name: 'id',
          display: false
        },
        {
          name: 'passwordHash',
          display: false
        },
        {
          name: 'profilePicture',
          display: false
        },
        {
          name: 'unitId',
          display: false
        },
        {
          name: 'unitRoleId',
          display: false
        },
        {
          name: 'action',
          stickyEnd: true,
          display: true,
          button: {
            name: 'edit',
            onClick: (e, dataItem, fields) => {
              this.corporationService.getCorporation(dataItem).subscribe(result => {
                this.openDialog(result);
              }, error => {
                this.snackBar.open('İşlem Başarısız!', 'HATA', { duration: 2000 });
              });
            }
          }
        }
      ]
    };
  }

  openDialog(dataItem) {
    const fields = [
      {
        title: 'Geçerlilik Tarihi',
        name: 'licenseValidBy',
        type: 'date',
        editable: true,
        display: true
      },
      {
        title: 'HakedişBulut Lisans Sayısı',
        name: 'progressPaymentLicenseCount',
        type: 'number',
        editable: true,
        display: true
      },
      {
        title: 'MaliyetBulut Lisans Sayısı',
        name: 'costEstimationLicenseCount',
        type: 'number',
        editable: true,
        display: true
      },
      {
        title: 'BirimFiyatlar Lisans Sayısı',
        type: 'number',
        name: 'libraryLicenseCount',
        editable: true,
        display: true
      }
    ];

    const dialogRef = this.dialog.open(UpdateModalComponent, {
      width: '50%',
      height: '70%',
      data: {
        dataItem: dataItem,
        fields: fields,
        transport: {
          service: this.corporationService,
          update: 'setCorporationLicense'
        }
      }
    });
  }

  ngOnInit() {
    this.createUserGrid();
  }
}
