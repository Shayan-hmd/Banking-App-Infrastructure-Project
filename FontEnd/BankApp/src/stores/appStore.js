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
  customerListValue: ref([]),
  selectedCustomer: ref(null),
  isLoading: ref(false),
  error: ref(""),
  SetCustomerList(data) {
  console.log("Customer list data :", data);
  
  // Safe navigation: fallback to an empty array if data is null/undefined/empty
  CustomerListModel.customerListValue.value = data?.length ? data.map((d, idx) => ({
        id: d.customerId || idx, // Uses customerId for the ID, falls back to index if missing
        customerId: d.customerId,
        name: d.customerName,
        email: d.customerPhone ?? '', // Cleaner fallback if email is missing
        age: d.customerAge,
        identity: d.customerNic
      }))
    : []; // Ensures the list clears out if data is empty
  console.log("List Value after mapping : ",CustomerListModel.customerListValue.value)
  CustomerListModel.customersList.value = CustomerListModel.customerListValue.value
}

};

// Customer Details Page Model
export const CustomerDetailsModel = {
  customerName: ref(""),
  customerPhone: ref(""),
  customerAge: ref(""),
  customerIdentity: ref(""),
  isLoading: ref(false),
  error: ref(""),
  SetCustomerDetailsData(data){
    CustomerDetailsModel.customerName.value = data.name
    CustomerDetailsModel.customerAge.value = data.age
    CustomerDetailsModel.customerPhone.value = data.email
    CustomerDetailsModel.customerIdentity.value = data.identity
  }
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
  ]),
  SetAccountDetailsData(data){
    console.log("Account list data :", data);
  
    // Safe navigation: fallback to an empty array if data is null/undefined/empty
    AccountDetailsModel.accountsList.value = data?.length ? data.map((d, idx) => ({
          id:idx, // Uses customerId for the ID, falls back to index if missing
          accountId: d.accountId,
          accountNumber: String(d.branchCode).padStart(4, '0')+"-"+String(d.accountType).padStart(4, '0')+"-"+String(d.customerNumber).padStart(6, '0')+"-"+String(d.runNumber).padStart(2, '0')+"-"+d.checkDigit,
          accountType: d.accountTypeDescription ?? 'Current', // Cleaner fallback if email is missing
          balance: d.balance ?? '100000.00',
          branch: d.branch ?? 'KARACHI MAIN'
        }))
      : []; // Ensures the list clears out if data is empty
    console.log("Account List Value after mapping : ",AccountDetailsModel.accountsList.value)
  }
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
      itemsprop: CustomerListModel.customerListValue,
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
      disabledprop: ref(true),
      isVisibleprop: true
    },
    customerEmail: {
      labelprop: "Customer Phone",
      valueprop: CustomerDetailsModel.customerPhone,
      disabledprop: ref(true),
      isVisibleprop: true
    },
    customerAge: {
      labelprop: "Customer Age",
      valueprop: CustomerDetailsModel.customerAge,
      disabledprop: ref(true),
      isVisibleprop: true
    },
    customerIdentity: {
      labelprop: "Identity Number",
      valueprop: CustomerDetailsModel.customerIdentity,
      disabledprop: ref(true),
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
// HANDLERS (Controllers) - All business logic
// ============================================

// Home Page Handler
export const HomeHandler = {
  async onButtonClick(buttonId) {
    if (buttonId === 'customerDetails') {
      activateView("CustomerList");
    } else if (buttonId === 'accountDetails') {
      let params = {
      response: 'All' // Adds ?response=All to the URL
    }
    console.log("Query params = ",params)
    try {
        const response = await axios.get('http://services.bankapp.com:8080/core-api-account/accountDetails', {params});
        console.log("Customer List Response",response.data); 
        AccountDetailsModel.SetAccountDetailsData(response.data.data)
        activateView("AccountDetails")
      } catch (error) {
        console.error('Error fetching data:', error);
        showAlert("Error",error);
      }
    }
  }
};

// ============================================
// UPDATED HANDLERS with New Alert System
// ============================================

// Customer List Page Handler
export const CustomerListHandler = {
  onSearchInputChange(value) {
    console.log("search on change input :",value)
    CustomerListModel.searchText.value = value;
  },
  
  async onSearchClick() {
    console.log("CustomerListModel.searchText.value on search button :",CustomerListModel.searchText.value)
    let params = {
      response: 'All' // Adds ?response=All to the URL
    }
    if(CustomerListModel.searchText.value){
      params.customerName = CustomerListModel.searchText.value
    }
    console.log("Query params = ",params)
    try {
        const response = await axios.get('http://services.bankapp.com:8080/core-api-customer/customerDetails', {params});
        console.log("Customer List Response",response.data); 
        CustomerListModel.SetCustomerList(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
        showAlert("Error",error);
      }
  },
  
  onSelectCustomer(customer) {
    console.log("Select Row from list : ",customer)
    CustomerListModel.selectedCustomer.value = customer;
    // showAlert("Customer Selected", `Selected customer: ${customer.name}`);
  },
  
  async onDetailsButtonClick() {
    const selectedCustomer = CustomerListModel.selectedCustomer.value;
    if (!selectedCustomer) {
      showAlert("Message", "Please select a customer first");
      return;
    }
    try {
      CustomerDetailsModel.SetCustomerDetailsData(selectedCustomer)
      activateView("CustomerDetails");
    } catch (error) {
      showAlert("Error", error);
      console.error(error);
    }
  },
  
  onBackButtonClick() {
    CustomerListModel.searchText.value = "";
    CustomerListModel.selectedCustomer.value = null;
    CustomerListModel.customerListValue.value = []
    activateView("Home");
  },
};

// Customer Details Page Handler
export const CustomerDetailsHandler = {
  onInputChange(field, value) {
    switch(field) {
      case 'name':
        CustomerDetailsModel.customerName.value = value;
        break;
      case 'email':
        CustomerDetailsModel.customerPhone.value = value;
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
      showAlert("Message", "Please enter customer name");
      return;
    }
    
    if (!CustomerDetailsModel.customerPhone.value) {
      showAlert("Message", "Please enter phone");
      return;
    }
    
    CustomerDetailsModel.isLoading.value = true;
    let params = {
      customerId: CustomerListModel.selectedCustomer.value.customerId,
      response: 'All' // Adds ?response=All to the URL
    }
    console.log("Query params = ",params)
    try {
        const response = await axios.get('http://services.bankapp.com:8080/core-api-account/accountDetails', {params});
        console.log("Customer List Response",response.data); 
        AccountDetailsModel.SetAccountDetailsData(response.data.data)
        activateView("AccountDetails")
      } catch (error) {
        console.error('Error fetching data:', error);
        showAlert("Error",error);
      }
  },
  
  onBackButtonClick() {
    activateView("CustomerList");
  }
};

// Account Details Page Handler
export const AccountDetailsHandler = {
  onRowClick(row) {
    console.log("Selected account:", row);
    // showAlert("Account Selected", `Selected account: ${row.accountNumber}`);
  },
  
  onBackButtonClick() {
    AccountDetailsModel.accountsList.value = []
    console.log("CustomerListModel.searchText.value in act back : ",CustomerListModel.selectedCustomer.value)
    if(CustomerListModel.selectedCustomer.value){
      activateView("CustomerDetails");
    }else{
      activateView("Home");
    }
  },
};