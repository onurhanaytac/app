import { Component, OnInit } from '@angular/core';
import { CorporationService } from '../../services/corporation.service';
import { TransactionService } from '../../services/transaction.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UpdateModalComponent } from '../../components/update-modal/update-modal.component';

@Component({
  selector: 'app-corporation',
  templateUrl: './corporation.component.html',
  styleUrls: ['./corporation.component.less']
})
export class CorporationComponent implements OnInit {
  public properties;

  constructor(private corporationServices: CorporationService, private snackBar: MatSnackBar,
    private transactionServices: TransactionService, public dialog: MatDialog) { }

  createCorporationGrid() {
    this.properties = {
      editable: {
        mode: 'popup'
      },
      toolbar: [
        {
          action: 'search'
        }
      ],
      pageable: {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20]
      },
      dataSource: {
        transport: {
          service: this.corporationServices,
          read: 'getCorporations',
          update: 'setCorporationLicense'
        }
      },
      fields: [
        {
          title: 'Birim Adı',
          name: 'rootUnitName',
          type: 'string',
          editable: false,
          display: true
        },
        {
          title: 'Şehir',
          name: 'provinceName',
          type: 'string',
          editable: false,
          display: true
        },
        {
          title: 'Kayıt Tarihi',
          name: 'registerDate',
          type: 'date',
          editable: false,
          display: true
        },
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
        },
        {
          title: 'Kurum Numarası',
          name: 'corporationId',
          type: 'string',
          editable: false,
          display: false
        },
        {
          title: 'Şehir Numarası',
          name: 'provinceId',
          type: 'string',
          editable: false,
          display: false
        },
        {
          title: 'Deneme Sürümü',
          name: 'isTrial',
          type: 'boolean',
          editable: false,
          display: true
        },
        {
          name: 'action',
          stickyEnd: true,
          display: e => {
            return true;
          },
          button: {
            name: 'more_vert',
            menuItems: [
              {
                name: 'edit',
                text: 'Düzenle',
                display: e => {
                  return true;
                }
              },
              {
                name: 'add',
                text: 'Yeni sipariş ekle',
                display: e => {
                  return true;
                },
                onClick: (e, dataItem) => {
                  this.onClickButtonAddNewtransaction(dataItem);
                }
              }
            ] // menuItems
          }
        }
      ]
    };
  }

  onClickButtonAddNewtransaction(dataItem) {
    const fields = [
      {
        title: 'İşlem Türü',
        name: 'transactionTypeId',
        type: 'enum',
        data: this.transactionServices.getTransactionTypes(),
        editable: true,
        required: true,
        display: true
      },
      {
        name: 'corporationId',
        editable: false,
        required: true,
        display: false
      },
      {
        title: 'Fatura Adı',
        name: 'billingFirstName',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Fatura Soyadı',
        name: 'billingLastName',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Tc Kimlik No',
        name: 'identityNumber',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Fatura Firma Adı',
        name: 'billingCompanyName',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Vergi Numarası',
        name: 'taxNumber',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Vergi Dairesi',
        name: 'taxOffice',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Fatura Şehir',
        name: 'billingProvinceName',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Fatura İlçe',
        name: 'billingDistrictName',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Fatura Posta Kodu',
        name: 'billingPostcode',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Fatura Adresi',
        name: 'billingAddress',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Teslimat Adı',
        name: 'deliveryFirstName',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Teslimat Soyadı',
        name: 'deliveryLastName',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Teslimat Firma Adı',
        name: 'deliveryCompanyName',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Teslimat Şehir Adı',
        name: 'deliveryProvinceName',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Teslimat ilçesi',
        name: 'deliveryDistrictName',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Teslimat Posta Kodu',
        name: 'deliveryPostcode',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Teslimat Adresi',
        name: 'deliveryAddress',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Toplam Tutar',
        name: 'totalAmount',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Tanım',
        name: 'description',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Hakediş Lisans Sayısı',
        name: 'progressPaymentLicenseCount',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Yaklaşık Maliyet Lisans Sayısı',
        name: 'costEstimationLicenseCount',
        editable: true,
        required: true,
        display: true
      },
      {
        title: 'Birim Fiyatlar Lisans Sayısı',
        name: 'libraryLicenseCount',
        editable: true,
        required: true,
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
          service: this.transactionServices,
          update: 'insertTransaction'
        }
      }
    });
  }

  ngOnInit() {
    this.createCorporationGrid();
  }
}
