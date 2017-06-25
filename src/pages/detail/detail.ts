import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ExpenseService } from '../../app/expense.service';
import { Expense } from '../../app/expense.model';

/**
 * Generated class for the DetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  categories: string[];
  expense: Expense;
  constructor(public navCtrl: NavController,public alertCtrl:AlertController, public navParams: NavParams, private expenseService: ExpenseService) {
    this.categories = expenseService.categories;
    const expenseId = this.navParams.get('expenseId');
    if (expenseId) {
      this.expense = expenseService.getExpense(expenseId);
    } else {
      this.expense = {
        date: '',
        amount: 0,
        category: '',
        description: ''
      };
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  onSave() {
    if (this.expense.id) {
      this.expenseService.updateExpense(this.expense);
    } else {
      this.expenseService.addExpense(this.expense);
    }
    this.navCtrl.pop();
  }

  onTrash() {
    let confirm = this.alertCtrl.create({
      title: 'Delete',
      message: 'Are you sure you want to delete this expense:"${this.expense.description}"',
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Confirm',
          handler: () => {
            this.expenseService.removeExpense(this.expense.id);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
