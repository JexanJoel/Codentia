// Check authentication
function checkAuth() {
    const user = localStorage.getItem('cropkind_user');
    if (!user) {
        window.location.href = 'index.html';
        return;
    }
}

// Initialize
checkAuth();

// Budget data
let expenses = JSON.parse(localStorage.getItem('cropkind_expenses')) || [];
let incomes = JSON.parse(localStorage.getItem('cropkind_incomes')) || [];

// Initialize with sample data if empty
if (expenses.length === 0) {
    expenses = [
        { category: 'seeds', description: 'Tomato Seeds', amount: 2000, date: '2024-01-15' },
        { category: 'fertilizer', description: 'NPK Fertilizer', amount: 5000, date: '2024-01-16' },
        { category: 'labor', description: 'Planting Labor', amount: 3000, date: '2024-01-17' },
        { category: 'pesticide', description: 'Organic Pesticide', amount: 1500, date: '2024-01-18' }
    ];
}

if (incomes.length === 0) {
    incomes = [
        { crop: 'Tomatoes', quantity: 1000, price: 35, total: 35000 },
        { crop: 'Onions', quantity: 500, price: 30, total: 15000 }
    ];
}

// Form submissions
document.getElementById('expenseForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const category = document.getElementById('expenseCategory').value;
    const description = document.getElementById('expenseDescription').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    
    if (!category || !description || !amount) {
        alert('Please fill all fields');
        return;
    }
    
    const expense = {
        category,
        description,
        amount,
        date: new Date().toISOString().split('T')[0]
    };
    
    expenses.push(expense);
    localStorage.setItem('cropkind_expenses', JSON.stringify(expenses));
    
    // Clear form
    document.getElementById('expenseForm').reset();
    
    // Update displays
    loadExpenses();
    updateBudgetOverview();
});

document.getElementById('incomeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const crop = document.getElementById('incomeCrop').value;
    const quantity = parseFloat(document.getElementById('incomeQuantity').value);
    const price = parseFloat(document.getElementById('incomePrice').value);
    
    if (!crop || !quantity || !price) {
        alert('Please fill all fields');
        return;
    }
    
    const income = {
        crop,
        quantity,
        price,
        total: quantity * price
    };
    
    incomes.push(income);
    localStorage.setItem('cropkind_incomes', JSON.stringify(incomes));
    
    // Clear form
    document.getElementById('incomeForm').reset();
    
    // Update displays
    loadIncomes();
    updateBudgetOverview();
});

function loadExpenses() {
    const tableBody = document.getElementById('expenseTableBody');
    tableBody.innerHTML = '';
    
    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-100 hover:bg-light-green transition-colors';
        
        const categoryIcons = {
            'seeds': 'fas fa-seedling',
            'fertilizer': 'fas fa-flask',
            'pesticide': 'fas fa-spray-can',
            'labor': 'fas fa-users',
            'equipment': 'fas fa-tools',
            'irrigation': 'fas fa-tint',
            'transport': 'fas fa-truck',
            'other': 'fas fa-receipt'
        };
        
        row.innerHTML = `
            <td class="p-4">
                <div class="flex items-center space-x-3">
                    <i class="${categoryIcons[expense.category] || 'fas fa-receipt'} text-forest-green"></i>
                    <span class="font-medium capitalize">${expense.category}</span>
                </div>
            </td>
            <td class="p-4">${expense.description}</td>
            <td class="p-4">
                <span class="text-lg font-semibold text-red-600">₹${expense.amount}</span>
            </td>
            <td class="p-4">${expense.date}</td>
            <td class="p-4">
                <button onclick="deleteExpense(${index})" class="text-red-600 hover:text-red-800 transition-colors">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function loadIncomes() {
    const incomeList = document.getElementById('incomeList');
    incomeList.innerHTML = '';
    
    incomes.forEach((income, index) => {
        const incomeItem = document.createElement('div');
        incomeItem.className = 'bg-green-50 rounded-lg p-4 flex items-center justify-between';
        
        incomeItem.innerHTML = `
            <div>
                <h4 class="font-semibold text-forest-green">${income.crop}</h4>
                <p class="text-gray-600">${income.quantity} kg × ₹${income.price} = ₹${income.total}</p>
            </div>
            <button onclick="deleteIncome(${index})" class="text-red-600 hover:text-red-800 transition-colors">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        incomeList.appendChild(incomeItem);
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('cropkind_expenses', JSON.stringify(expenses));
    loadExpenses();
    updateBudgetOverview();
}

function deleteIncome(index) {
    incomes.splice(index, 1);
    localStorage.setItem('cropkind_incomes', JSON.stringify(incomes));
    loadIncomes();
    updateBudgetOverview();
}

function updateBudgetOverview() {
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const expectedIncome = incomes.reduce((total, income) => total + income.total, 0);
    const netProfit = expectedIncome - totalExpenses;
    const profitMargin = expectedIncome > 0 ? ((netProfit / expectedIncome) * 100).toFixed(1) : 0;
    
    document.getElementById('expectedIncome').textContent = `₹${expectedIncome.toLocaleString()}`;
    document.getElementById('totalExpenses').textContent = `₹${totalExpenses.toLocaleString()}`;
    document.getElementById('netProfit').textContent = `₹${netProfit.toLocaleString()}`;
    document.getElementById('profitMargin').textContent = `${profitMargin}%`;
    
    // Update colors based on profit/loss
    const netProfitElement = document.getElementById('netProfit');
    const profitMarginElement = document.getElementById('profitMargin');
    
    if (netProfit >= 0) {
        netProfitElement.className = 'text-2xl font-bold text-green-600';
        profitMarginElement.className = 'text-2xl font-bold text-green-600';
    } else {
        netProfitElement.className = 'text-2xl font-bold text-red-600';
        profitMarginElement.className = 'text-2xl font-bold text-red-600';
    }
}

function exportBudget() {
    const budgetData = {
        expenses,
        incomes,
        summary: {
            totalExpenses: expenses.reduce((total, expense) => total + expense.amount, 0),
            expectedIncome: incomes.reduce((total, income) => total + income.total, 0),
            netProfit: incomes.reduce((total, income) => total + income.total, 0) - expenses.reduce((total, expense) => total + expense.amount, 0)
        }
    };
    
    const dataStr = JSON.stringify(budgetData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'cropkind_budget.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Initialize page
loadExpenses();
loadIncomes();
updateBudgetOverview();