'use strict';

const button = document.getElementById('start');
button.disabled = true;
const buttonReset = document.getElementById('cancel');

const buttonTagOne = document.querySelector('.income_add');

const buttonTagTwo = document.querySelector('.expenses_add');

const checkBox = document.querySelector('#deposit-check');

const additionalIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];

const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];

const additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0];

const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];

const incomePeriodValue = document.getElementsByClassName('income_period-value')[0];

const targetMonthValue = document.getElementsByClassName('target_month-value')[0];

const salaryAmount = document.querySelector('.salary-amount');

const incomeTitle = document.querySelector('.income-title1');

const expensesTitle = document.querySelector('.expenses-title1');

const expensesAmount = document.querySelector('.expenses-amount');
let expensesItems = document.querySelectorAll('.expenses-items');

const additionalExpensesItem = document.querySelector('.additional_expenses-item');

const depositCheck = document.querySelector('#deposit-check');

const periodSelect = document.querySelector('.period-select');
 
const budgetMonthValue = document.querySelector('.budget_month-value');
const targetAmount = document.querySelector('.target-amount');
let incomeItems = document.querySelectorAll('.income-items');
const periodAmout = document.querySelector('.period-amount');
const inputTypeText = document.querySelectorAll('input[type=text]');


salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value !== '' ) {
        button.disabled = false;
    }else { 
        button.disabled = true;   
    }
});


const AppData = function () {
    this.income = {};
    this.addIncome = [];
    this.incomeMonth = 0;
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.periodSelects = 0;
}
AppData.prototype.start = function () {
    this.budget = +salaryAmount.value;

    this.getExpenses();

    this.getIncome();

    this.getInfoDeposit();

    this.expMonth();

    this.whyBudgetDay();

    this.getAddExpenses();

    this.getAddIncome();
    
    this.addPeriodSelect();

    this.getTargetMonth();

    this.getBudget();

    this.showResult();
    // кнопка сброс
    button.style.display = 'none';
    buttonReset.style.display = 'block';
    // Блокировка input
    inputTypeText.forEach(item => {
        item.disabled = false;
    });
};
AppData.prototype.showResult = function () {
    budgetMonthValue.value = +this.budgetMonth;
    budgetDayValue.value = this.whyBudgetDay();
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = this.calcSavedMoney();
    });
    targetMonthValue.value = this.getTargetMonth(); //Math.round(targetAmount.value / appData.budgetMonth); 
    incomePeriodValue.value = this.calcSavedMoney();
};
                   
    
AppData.prototype.addExpensesBlock = function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonTagTwo);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
        buttonTagTwo.style.display = 'none';
    }
};
AppData.prototype.addIncomeBlock = function () {
    let cloneItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneItem, buttonTagOne);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3) {
        buttonTagOne.style.display = 'none';
    }
}; 
AppData.prototype.getAddExpenses = function () {
    
    const addExpenses = additionalExpensesItem.value.split(', ');
    addExpenses.forEach(function (item) {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        } 
    }, this);
};
AppData.prototype.getAddIncome = function () {
    
    additionalIncomeItem.forEach(function (item) {
        const itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        } 
    }, this);
};
AppData.prototype.getExpenses = function () {
    
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title1').value;
        let cashExpenses = +item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = cashExpenses;
        }
    }, this);
};

AppData.prototype.getIncome = function () {
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title1').value;
        let cashIncome = +item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = cashIncome;
        }

        let result = 0;
        for (let key in this.income) {
            result += +this.income[key];
        }
        this.incomeMonth = +result;
    }, this);    
};
AppData.prototype.addPeriodSelect = function () {
    periodAmout.textContent = periodSelect.value;
    this.periodSelects = +periodSelect.value;
};
AppData.prototype.whyBudgetDay = function() {
    return Math.floor(this.budgetMonth / 30);
};
AppData.prototype.expMonth = function () {
    let res = 0;
    for (let key in this.expenses) {
        res += this.expenses[key];
    }
    return this.expensesMonth = res;
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = +(this.budget + this.incomeMonth) - this.expensesMonth;
};

AppData.prototype.getTargetMonth = function() {
    return Math.round(+targetAmount.value / +this.budgetMonth);    
};


AppData.prototype.getBudgetDay = function() {
    return Math.floor(this.getBudget() / 30);
};

AppData.prototype.getInfoDeposit = function () {
    if (this.deposit) {
        do {
            this.percentDeposit = prompt('Какой годовой процент?');
        } while (isNaN(this.percentDeposit) || this.percentDeposit.trim() === '' || this.percentDeposit === null);
        do {
            this.moneyDeposit = prompt('Какая сумма?');
        } while (isNaN(this.moneyDeposit) || this.moneyDeposit.trim() === '' || this.moneyDeposit === null);
    }
}; 

AppData.prototype.calcSavedMoney = function () {
    return this.budgetMonth * this.periodSelects;
};

AppData.prototype.reset = function () {

    this.income = {},
    this.addIncome = [],
    this.incomeMonth = 0,
    this.expenses = {},
    this.addExpenses = [],
    this.deposit = false,
    this.percentDeposit = 0,
    this.moneyDeposit = 0,
    this.budget = 0,
    this.budgetMonth = 0,
    this.expensesMonth = 0,
    this.periodSelects = 0;
    
    // Сброс всех input
    inputTypeText.forEach(item => {
        item.value = ' ';
        periodSelect.value = '1';
        periodAmout.textContent = '1';
    });

    // отчищаем и скрываем все добавленные поля
    for (let i = expensesItems.length - 1; i > 0; i--) {
        expensesItems[0].parentNode.removeChild(expensesItems[i]);
    }
    for (let i = incomeItems.length - 1; i > 0; i--) {
        incomeItems[0].parentNode.removeChild(incomeItems[i]);
    }
    
    document.querySelectorAll('input[type=text]').forEach(item => {
        item.value = '';
    });
    buttonTagOne.style.display = '';
    buttonTagTwo.style.display = '';
    this.budget = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.deposit = false;
    this.persentDeposite = 0;
    this.moneyDeposite = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    
};
    
AppData.prototype.addEventListeners = function () {
    button.addEventListener('click', this.start.bind(appData));
    buttonReset.addEventListener('click', this.reset.bind(appData));
    buttonTagTwo.addEventListener('click', this.addExpensesBlock);
    buttonTagOne.addEventListener('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', this.addPeriodSelect);
};
const appData = new AppData();
AppData.prototype.addEventListeners();
 
