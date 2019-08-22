import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.less']
})
export class TransactionComponent implements OnInit {
  public properties;
  @ViewChild('grid', { static: false }) grid: ElementRef;

  constructor(private transactionServices: TransactionService, private snackBar: MatSnackBar) { }

  createTransactionGrid() {
    this.properties = {
      searchable: true,
      editable: {
        mode: 'popup'
      },
      pageable: {
        pageSize: 20,
        pageSizeOptions: [5, 10, 20]
      },
      dataSource: {
        transport: {
          service: this.transactionServices,
          create: 'insertTransaction',
          read: 'getTransactions',
          update: 'updateTransaction'
        }
      },
      toolbar: [
        {
          action: 'search',
        }
      ],
      fields: [
        {
          name: 'corporationId',
          editable: false,
          required: true,
          display: false
        },
        {
          title: 'İşlem Numarası',
          name: 'transactionId',
          editable: false,
          display: true,
          sticky: true
        },
        {
          title: 'İşlem Durumu',
          name: 'transactionStateName',
          type: 'string',
          editable: false,
          required: false,
          display: true
        },
        {
          title: 'İşlem Türü',
          name: 'transactionTypeId',
          type: 'enum',
          data: this.transactionServices.getTransactionTypes(),
          editable: false,
          required: true,
          display: true
        },
        {
          title: 'İşlem Tarihi',
          name: 'createDate',
          type: 'date',
          editable: false,
          required: false,
          display: true
        },
        {
          title: 'İşlem Tutarı (₺)',
          name: 'totalAmount',
          editable: true,
          required: true,
          display: true
        },
        {
          title: 'İşlem Tanımı',
          name: 'description',
          editable: true,
          required: true,
          display: true
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
          title: 'Hakediş Lisans Sayısı',
          name: 'progressPaymentLicenseCount',
          editable: true,
          required: true,
          display: false
        },
        {
          title: 'Yaklaşık Maliyet Lisans Sayısı',
          name: 'costEstimationLicenseCount',
          editable: true,
          required: true,
          display: false
        },
        {
          title: 'Birim Fiyatlar Lisans Sayısı',
          name: 'libraryLicenseCount',
          editable: true,
          required: true,
          display: false
        },
        {
          name: 'action',
          stickyEnd: true,
          editable: false,
          display: e => {
            return e.dataItem.transactionStateId === 2 || e.dataItem.transactionStateId === 5;
          },
          button: {
            name: 'more_vert',
            menuItems: [
              {
                name: 'edit',
                text: 'Düzenle',
                display: e => {
                  return e.dataItem.transactionStateId === 2;
                }
              },
              {
                name: 'done',
                text: 'Tamamlandı olarak işaretle',
                display: e => {
                  return e.dataItem.transactionStateId === 2;
                },
                onClick: (e, dataItem) => {
                  this.transactionServices.setTransactionStateToComplete(dataItem).subscribe(result => {
                    (this.grid as any).read();
                  },
                  error => {
                    this.snackBar.open('İşlem Başarısız!', 'HATA', { duration: 2000 });
                  });
                }
              },
              {
                name: 'cancel',
                text: 'İptal edildi olarak işaretle',
                display: e => {
                  return e.dataItem.transactionStateId === 2;
                },
                onClick: (e, dataItem) => {
                  this.transactionServices.setTransactionStateToCancelled(dataItem).subscribe(result => {
                    (this.grid as any).read();
                  },
                  error => {
                    this.snackBar.open('İşlem Başarısız!', 'HATA', { duration: 2000 });
                  });
                }
              },
              {
                name: 'arrow_back',
                text: 'İade edildi olarak işaretle',
                display: function (e) {
                  return e.dataItem.transactionStateId === 5;
                },
                onClick: (e, dataItem) => {
                  this.transactionServices.setTransactionStateToRefunded(dataItem).subscribe(result => {
                    (this.grid as any).read();
                  },
                  error => {
                    this.snackBar.open('İşlem Başarısız!', 'HATA', { duration: 2000 });
                  });
                }
              }
            ] // menuItems
          }
        }
      ]
    };
  }

  ngOnInit() {
    this.createTransactionGrid();
  }
}
