import { ref } from '../core/ReactiveModel';
import { activateView } from '../core/ViewManager';
import { showAlert, showSimpleAlert } from '../core/AlertManager';
import axios from 'axios';

// ============================================
// MODELS - All reactive data
// ============================================

// Home Page Model
export const HomeModel = {
  heading: ref("Main Menu"),
  buttons: ref([
    { id: 'customerDetails', label: 'Customer Details' },
    { id: 'accountDetails', label: 'Account Details' }
  ])
};

// Customer List Page Model
export const CustomerListModel = {
  searchText: ref(""),
  customersList: ref([]),
  filteredCustomers: ref([]),
  selectedCustomer: ref(null),
  isLoading: ref(false),
  error: ref("")
};

// Customer Details Page Model
export const CustomerDetailsModel = {
  customerName: ref(""),
  customerEmail: ref(""),
  customerAge: ref(""),
  customerIdentity: ref(""),
  isLoading: ref(false),
  error: ref("")
};

// Account Details Page Model
export const AccountDetailsModel = {
  accountsList: ref([]),
  isLoading: ref(false),
  error: ref(""),
  columns: ref([
    { header: "Account Number", accessor: "accountNumber" },
    { header: "Account Type", accessor: "accountType" },
    { header: "Balance", accessor: "balance" },
    { header: "Branch", accessor: "branch" }
  ])
};

// ============================================
// CONFIGS - Component props mapping
// ============================================

export const HomeConfig = {
  componentProps: {
    heading: HomeModel.heading,
    buttons: HomeModel.buttons
  }
};

export const CustomerListConfig = {
  componentProps: {
    searchInput: {
      placeholderprop: "Search by customer name",
      valueprop: CustomerListModel.searchText,
      isVisibleprop: true
    },
    searchButton: {
      labelprop: "Search",
      isVisibleprop: true
    },
    listbox: {
      titleprop: "Available Customers",
      itemsprop: CustomerListModel.filteredCustomers,
      isLoadingprop: CustomerListModel.isLoading,
      errorprop: CustomerListModel.error,
      isVisibleprop: true
    },
    backButton: {
      labelprop: "Back",
      isVisibleprop: true
    },
    detailsButton: {
      labelprop: "Details",
      isVisibleprop: true
    }
  }
};

export const CustomerDetailsConfig = {
  componentProps: {
    title: ref("Customer Details"),
    customerName: {
      labelprop: "Customer Name",
      valueprop: CustomerDetailsModel.customerName,
      isVisibleprop: true
    },
    customerEmail: {
      labelprop: "Customer Email",
      valueprop: CustomerDetailsModel.customerEmail,
      isVisibleprop: true
    },
    customerAge: {
      labelprop: "Customer Age",
      valueprop: CustomerDetailsModel.customerAge,
      isVisibleprop: true
    },
    customerIdentity: {
      labelprop: "Identity Number",
      valueprop: CustomerDetailsModel.customerIdentity,
      isVisibleprop: true
    },
    backButton: {
      labelprop: "Back",
      isVisibleprop: true
    },
    accountDetailsButton: {
      labelprop: "Customer Account Details",
      isVisibleprop: true
    }
  }
};

export const AccountDetailsConfig = {
  componentProps: {
    title: ref("Account Details"),
    table: {
      columnsprop: AccountDetailsModel.columns,
      dataprop: AccountDetailsModel.accountsList,
      isLoadingprop: AccountDetailsModel.isLoading,
      errorprop: AccountDetailsModel.error
    },
    backButton: {
      labelprop: "Back",
      isVisibleprop: true
    }
  }
};

// ============================================
// MOCK API SERVICE (Replace with real axios calls)
// ============================================

const mockApi = {
  async getCustomers() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: 1, name: "John Doe", email: "john@example.com", age: 30, identity: "12345-6789012-3" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", age: 25, identity: "23456-7890123-4" },
      { id: 3, name: "Bob Johnson", email: "bob@example.com", age: 35, identity: "34567-8901234-5" },
      { id: 4, name: "Alice Brown", email: "alice@example.com", age: 28, identity: "45678-9012345-6" }
    ];
  },
  
  async getAccounts() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: 1, accountNumber: "PK36 1234 5678 9012 3456", accountType: "Savings", balance: "$5,000 USD", branch: "Main Branch" },
      { id: 2, accountNumber: "PK36 8765 4321 0987 6543", accountType: "Current", balance: "$12,500 USD", branch: "City Branch" },
      { id: 3, accountNumber: "PK36 5555 6666 7777 8888", accountType: "Business", balance: "$25,000 USD", branch: "Business Center" },
      { id: 4, accountNumber: "PK36 9999 0000 1111 2222", accountType: "Savings", balance: "$3,200 USD", branch: "Main Branch" }
    ];
  }
};

// ============================================
// HANDLERS (Controllers) - All business logic
// ============================================

// Home Page Handler
export const HomeHandler = {
  async onButtonClick(buttonId) {
    if (buttonId === 'customerDetails') {
      try {
        const response = await axios.get('http://services.bankapp.com:8080/core-api-customer/customerDetails', {
           params: {
                    response: 'All' // Adds ?response=All to the URL
                  }
        });
        console.log("Customer List Response",response.data); 
        activateView("CustomerList");
      } catch (error) {
        console.error('Error fetching data:', error);
        showAlert("Error",error);
      }
    } else if (buttonId === 'accountDetails') {
      activateView("AccountDetails");
    }
  }
};

// ============================================
// UPDATED HANDLERS with New Alert System
// ============================================

// Customer List Page Handler
export const CustomerListHandler = {
  onSearchInputChange(value) {
    CustomerListModel.searchText.value = value;
    this.onSearchClick();
  },
  
  async onSearchClick() {
    const searchTerm = CustomerListModel.searchText.value.toLowerCase();
    const allCustomers = CustomerListModel.customersList.value;
    
    if (!searchTerm) {
      CustomerListModel.filteredCustomers.value = allCustomers;
      return;
    }
    
    const filtered = allCustomers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm)
    );
    
    if (filtered.length === 0) {
      // Show alert when no customers found
      showAlert("No Results", `No customers found with name "${searchTerm}"`);
    }
    
    CustomerListModel.filteredCustomers.value = filtered;
  },
  
  onSelectCustomer(customer) {
    CustomerListModel.selectedCustomer.value = customer;
    // showAlert("Customer Selected", `Selected customer: ${customer.name}`);
  },
  
  async onDetailsButtonClick() {
    const selectedCustomer = CustomerListModel.selectedCustomer.value;
    
    if (!selectedCustomer) {
      showAlert("Selection Required", "Please select a customer first");
      return;
    }
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Map selected customer to customer details model
      CustomerDetailsModel.customerName.value = selectedCustomer.name;
      CustomerDetailsModel.customerEmail.value = selectedCustomer.email;
      CustomerDetailsModel.customerAge.value = selectedCustomer.age;
      CustomerDetailsModel.customerIdentity.value = selectedCustomer.identity;
      
      // Show success alert and then navigate
      // showAlert("Success", "Customer loaded successfully!", () => {
      //   activateView("CustomerDetails");
      // });
      activateView("CustomerDetails");
    } catch (error) {
      // Show error alert and stay on same page
      showAlert("Error", "Internal server error - Could not fetch customer details");
      console.error(error);
    }
  },
  
  onBackButtonClick() {
    CustomerListModel.searchText.value = "";
    CustomerListModel.selectedCustomer.value = null;
    activateView("Home");
  },
  
  async loadCustomers() {
    CustomerListModel.isLoading.value = true;
    CustomerListModel.error.value = "";
    
    try {
      const customers = await mockApi.getCustomers();
      CustomerListModel.customersList.value = customers;
      CustomerListModel.filteredCustomers.value = customers;
      // showAlert("Success", "Customers loaded successfully!");
    } catch (error) {
      CustomerListModel.error.value = "Failed to load customers";
      showAlert("Error", "Failed to load customers. Please try again.");
      console.error(error);
    } finally {
      CustomerListModel.isLoading.value = false;
    }
  }
};

// Customer Details Page Handler
export const CustomerDetailsHandler = {
  onInputChange(field, value) {
    switch(field) {
      case 'name':
        CustomerDetailsModel.customerName.value = value;
        break;
      case 'email':
        CustomerDetailsModel.customerEmail.value = value;
        break;
      case 'age':
        CustomerDetailsModel.customerAge.value = value;
        break;
      case 'identity':
        CustomerDetailsModel.customerIdentity.value = value;
        break;
    }
  },
  
  async onAccountDetailsButtonClick() {
    // Validate required fields
    if (!CustomerDetailsModel.customerName.value) {
      showAlert("Validation Error", "Please enter customer name");
      return;
    }
    
    if (!CustomerDetailsModel.customerEmail.value) {
      showAlert("Validation Error", "Please enter customer email");
      return;
    }
    
    CustomerDetailsModel.isLoading.value = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // On success - show success message then navigate
      // showAlert("Success", "Customer account details fetched successfully!", () => {
      //   activateView("AccountDetails");
      // });
      activateView("AccountDetails");
    } catch (error) {
      // Show error alert and stay on same page
      showAlert("Error", "Internal server error - Could not fetch account details. Please try again.");
      console.error(error);
    } finally {
      CustomerDetailsModel.isLoading.value = false;
    }
  },
  
  onBackButtonClick() {
    activateView("CustomerList");
  },
  
  initPage() {
    console.log("Customer Details page loaded");
  }
};

// Account Details Page Handler
export const AccountDetailsHandler = {
  onRowClick(row) {
    console.log("Selected account:", row);
    showAlert("Account Selected", `Selected account: ${row.accountNumber}`);
  },
  
  onBackButtonClick() {
    activateView("CustomerDetails");
  },
  
  async loadAccounts() {
    AccountDetailsModel.isLoading.value = true;
    AccountDetailsModel.error.value = "";
    
    try {
      const accounts = await mockApi.getAccounts();
      AccountDetailsModel.accountsList.value = accounts;
      // showAlert("Success", "Accounts loaded successfully!");
    } catch (error) {
      AccountDetailsModel.error.value = "Failed to load accounts";
      showAlert("Error", "Failed to load accounts. Please try again.");
      console.error(error);
    } finally {
      AccountDetailsModel.isLoading.value = false;
    }
  }
};