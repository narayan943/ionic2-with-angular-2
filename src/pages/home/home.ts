import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {DetailPage} from '../detail/detail';
import { ExpenseService } from '../../app/expense.service';
import { Expense } from '../../app/expense.model';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  expenses:Expense[] ;
    
  constructor(private navCtrl: NavController , private expenseService:ExpenseService) {
    this.expenses = expenseService.expenses;
  }

   onItemClick(item:Expense){
    console.log(item);
    this.navCtrl.push(DetailPage,{
      expenseId:item.id
    });
  }

  onAddClick(){
    this.navCtrl.push(DetailPage);
  }

}
