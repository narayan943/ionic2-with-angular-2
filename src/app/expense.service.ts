import uuidv4 from 'uuid/v4';
import {Expense} from './expense.model'

console.log("uuid",uuidv4());
export class ExpenseService{
    categories = ["Food" , "Travel" , "Other"];
    expenses = this.loadExpenses();

  getExpense(expenseId:string){
    const expense = this.expenses.find(it => it.id === expenseId);
    return Object.assign({},expense);
  }

  updateExpense(expense:Expense){
      const index = this.expenses.findIndex(it => it.id === expense.id);
      this.expenses[index] = expense;
      this.storeExpanses();
  }

  addExpense(expense:Expense){
      expense.id = uuidv4();
    this.expenses.push(expense);
    this.storeExpanses();
  }

  removeExpense(expenseId:string){
      const index = this.expenses.findIndex(it => it.id === expenseId);
      this.expenses.splice(index,1);
      this.storeExpanses();
  }

  private loadExpenses():Expense[]{
    const expenses = localStorage.getItem('expenses');
    if(expenses){
        return JSON.parse(expenses);
    } else {
        return [];
    }
  }

  private storeExpanses(){
      localStorage.setItem('expenses' , JSON.stringify(this.expenses));
  }
}