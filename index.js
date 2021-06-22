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


let isNumber = function(n) {
    return isNaN(parseFloat(n)) && isFinite(n)
};

salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value !== '' ) {
        button.disabled = false;
    }else { 
        button.disabled = true;   
    }
});


let appData = {
    income: {},
    addIncome: [],
    incomeMonth: 0,
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    periodSelects: 0,
    start: function () { 
       
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
        
    },

    showResult: function () {
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

    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonTagTwo);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonTagTwo.style.display = 'none';
        }
    },
    addIncomeBlock: function () {
        let cloneItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneItem, buttonTagOne);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonTagOne.style.display = 'none';
        }
    }, 
    getAddExpenses: function () {
        const _this = this;
        const addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(function (item) {
            item = item.trim();
           if (item !== '') {
               _this.addExpenses.push(item);
           } 
        });
    },
    getAddIncome: function () {
        const _this = this;
        additionalIncomeItem.forEach(function (item) {
           const itemValue = item.value.trim();
           if (itemValue !== '') {
               _this.addIncome.push(itemValue);
           } 
        });
    },
    getExpenses: function () {
        const _this = this;
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title1').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
               _this.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    
    getIncome: function () {
        const _this = this;
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title1').value;
            let cashIncome = +item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
               _this.income[itemIncome] = cashIncome;
            }

            let result = 0;
            for (let key in _this.income) {
                result += +_this.income[key];
            }
            _this.incomeMonth = +result;
        });    
    },
    addPeriodSelect: function () {
        periodAmout.textContent = periodSelect.value;
        this.periodSelects = +periodSelect.value;
    },
    whyBudgetDay: function() {
        return Math.floor(appData.budgetMonth / 30);
    },
    expMonth: function () {
        let res = 0;
        for (let key in this.expenses) {
            res += this.expenses[key];
        }
        return this.expensesMonth = res;
    },

    getBudget: function() {
        this.budgetMonth = +(this.budget + this.incomeMonth) - this.expensesMonth;
    },

    getTargetMonth: function() {
        return Math.round(+targetAmount.value / +this.budgetMonth);    
    },


    getBudgetDay: function() {
        return Math.floor(appData.getBudget() / 30);
    },

    getInfoDeposit: function () {
        if (this.deposit) {
            do {
                this.percentDeposit = prompt('Какой годовой процент?');
            } while (isNaN(this.percentDeposit) || this.percentDeposit.trim() === '' || this.percentDeposit === null);
            do {
                appData.moneyDeposit = prompt('Какая сумма?');
            } while (isNaN(this.moneyDeposit) || this.moneyDeposit.trim() === '' || this.moneyDeposit === null);
        }
    }, 

    calcSavedMoney: function () {
        return this.budgetMonth * appData.periodSelects;
    },

    reset: function () {

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
        console.log(this);
    }
    
};
// 1) Привязать контекст вызова функции start к appData 
button.addEventListener('click', appData.start.bind(appData));
// Привязать контекст вызова функции reset к appData
buttonReset.addEventListener('click', appData.reset.bind(appData));

buttonTagTwo.addEventListener('click', appData.addExpensesBlock);
buttonTagOne.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.addPeriodSelect);