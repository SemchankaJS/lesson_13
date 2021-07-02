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
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');



salaryAmount.addEventListener('input', () => {
    if (salaryAmount.value !== '' ) {
        button.disabled = false;
    }else { 
        button.disabled = true;   
    }
});

class AppData {
    constructor() {
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

    start  () {
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
        // РєРЅРѕРїРєР° СЃР±СЂРѕСЃ
        button.style.display = 'none';
        buttonReset.style.display = 'block';
        // Р‘Р»РѕРєРёСЂРѕРІРєР° input
        inputTypeText.forEach(item => {
            item.disabled = true;
        });
        
    }
    showResult  () {
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
    }
                   
    
    addExpensesBlock  () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, buttonTagTwo);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            buttonTagTwo.style.display = 'none';
        }
    }

    addIncomeBlock  () {
        let cloneItem = incomeItems[0].cloneNode(true);
        incomeItems[0].parentNode.insertBefore(cloneItem, buttonTagOne);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            buttonTagOne.style.display = 'none';
        }
    } 

    getAddExpenses  () {
        
        const addExpenses = additionalExpensesItem.value.split(', ');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            } 
        }, this);
    }

    getAddIncome  () {
        additionalIncomeItem.forEach(function (item) {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            } 
        }, this);
    }

    getExpenses () {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title1').value;
            let cashExpenses = +item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                this.expenses[itemExpenses] = cashExpenses;
            }
        }, this);
    }

    getIncome  () {
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
    }
    addPeriodSelect  () {
        periodAmout.textContent = periodSelect.value;
        this.periodSelects = +periodSelect.value;
    }
    whyBudgetDay () {
        return Math.floor(this.budgetMonth / 30);
    }
    expMonth  () {
        let res = 0;
        for (let key in this.expenses) {
            res += this.expenses[key];
        }
        return this.expensesMonth = res;
    }

    getBudget () {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = +(this.budget + this.incomeMonth) - this.expensesMonth + monthDeposit;
    }

    getTargetMonth () {
        return Math.round(+targetAmount.value / +this.budgetMonth);    
    }


    getBudgetDay () {
        return Math.floor(this.getBudget() / 30);
    }

    getInfoDeposit  () {
        if (this.deposit) {
        this.percentDeposit = +depositPercent.value;
        this.moneyDeposit = +depositAmount.value;
        }
        
    } 

    calcSavedMoney  () {
        return this.budgetMonth * this.periodSelects;
    }

    changePercent  () {
        const valueSelect = this.value;
        if(valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.value = '';
            // 3) РџСЂРё РїРѕРґСЃС‡РµС‚Рµ СѓС‡РёС‚С‹РІР°С‚СЊ РїСЂРѕС†РµРЅС‚ РєРѕС‚РѕСЂС‹Р№ РІРІРµР» РїРѕР»СЊР·РѕРІР°С‚РµР»СЊ.
            this.depositPercent = depositPercent.value;
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('input',() => {
                depositPercent.value = depositPercent.value.replace(/\D/g, '');
                if(depositPercent.value <= 0 || depositPercent.value > 100) {
                    alert('Р’РІРµРґРёС‚Рµ РєРѕСЂСЂРµРєС‚РЅРѕРµ Р·РЅР°С‡РµРЅРёРµ РІ РїРѕР»Рµ РїСЂРѕС†РµРЅС‚С‹');
                    button.disabled = true;
                } else {
                    button.disabled = false;
                }
            });      
            
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
        }
    }

    depositHandler  () {
        if (checkBox.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    reset () {
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
        
        // РЎР±СЂРѕСЃ РІСЃРµС… input
        inputTypeText.forEach(item => {
            item.value = ' ';
            periodSelect.value = '1';
            periodAmout.textContent = '1';
        });

        // РѕС‚С‡РёС‰Р°РµРј Рё СЃРєСЂС‹РІР°РµРј РІСЃРµ РґРѕР±Р°РІР»РµРЅРЅС‹Рµ РїРѕР»СЏ
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
        
    }
    eventsListeners () {
        button.addEventListener('click', this.start.bind(appData));
        buttonReset.addEventListener('click', this.reset.bind(appData));
        buttonTagTwo.addEventListener('click', this.addExpensesBlock);
        buttonTagOne.addEventListener('click', this.addIncomeBlock);
        periodSelect.addEventListener('input', this.addPeriodSelect);
        checkBox.addEventListener('change', this.depositHandler.bind(this));
    }
}    
const appData = new AppData();
appData.eventsListeners();
 