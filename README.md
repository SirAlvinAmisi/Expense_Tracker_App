# Expense Tracker App

**Expense Tracker App** is a simple, user-friendly web application that helps users manage their personal finances. Users can add expenses, categorize them, view a summary of their total expenses, and even convert amounts into different currencies using an external API.

---

## **Table of Contents**

1. [Project Description](#project-description)  
2. [MVP (Minimum Viable Product)](#mvp-minimum-viable-product)  
3. [Technologies Used](#technologies-used)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [Features](#features)  
7. [Stretch Goals](#stretch-goals)  
8. [Project Structure](#project-structure)  
9. [Contact Information](#contact-information)  
10. [Contributing](#contributing)  
11. [License](#license)  

---

## **Project Description**

The **Expense Tracker App** enables users to track their expenses effectively. It provides an easy-to-use interface for recording expenses, organizing them into categories, and viewing the total expenses in real time. Additionally, it includes a feature for converting expenses into different currencies using the **ExchangeRate API**.

---

## **MVP (Minimum Viable Product)**

### **What is an MVP?**  
An MVP is the simplest version of a product that includes the core features necessary to satisfy users and deliver value.

### **MVP Features**  
1. Users can add expenses with a name, amount, and category.  
2. Expenses are displayed in a list with their respective details.  
3. Users can view the total expenses in real time.  
4. Expenses are categorized into options like "Food," "Transport," "Utilities," etc.  
5. Integrates the ExchangeRate API to convert expenses into other currencies.

---

## **Technologies Used**

The project uses the following technologies:

- **HTML5** - Structure of the web app.  
- **CSS3** - Styling for the user interface.  
- **JavaScript (ES6+)** - Logic and DOM manipulation.  
- **ExchangeRate API** - For real-time currency conversion.  
- **Local Storage** - For saving expenses locally without a database.

---

## **Installation**

Follow these steps to set up the project locally:

1. **Clone the Repository**  
   Run the following command in your terminal:
   ```bash
   git clone https://github.com/SirAlvinAmisi/Expense_Tracker_App.git
   cd Expense_Tracker_App
   ```

2. **Open the Project**  
   Open the `index.html` file in your browser:
   ```bash
   open index.html
   ```
   Or, if you use VSCode, install the **Live Server** extension and run the project directly.

3. **Optional**: To access the currency conversion API, sign up for an API key at [ExchangeRate API](https://exchangerate.host).

---

## **Usage**

1. Enter the expense details (name, amount, and category) in the form.  
2. Click **"Add Expense"** to save the expense.  
3. View the expense list and the total amount.  
4. Use the currency conversion option to convert totals into different currencies.  

---

## **Features**

- **Add Expense**: Users can add an expense with a name, amount, and category.  
- **Real-Time Total**: Displays the total expense dynamically as expenses are added.  
- **Expense Categories**: Organizes expenses into categories (e.g., Food, Utilities, Transport).  
- **Currency Conversion**: Converts expenses to different currencies using the **ExchangeRate API**.  
- **User-Friendly UI**: Clean and responsive design for smooth user experience.  

---

## **Stretch Goals**

Once the MVP is complete, the following additional features can be added:

1. **Edit Expenses**: Allows users to update existing expenses.  
2. **Delete Expenses**: Users can remove expenses from the list.  
3. **Expense Filtering**: Filter expenses by category.  
4. **Expense Sorting**: Sort expenses by date, amount, or category.  
5. **Local Storage**: Save expenses locally to persist data across sessions.  
6. **Database Integration**: Consider integrating a database for more robust data management.  
6. **Responsive Design**: Ensure the app works seamlessly on all devices.  

---

## **Project Structure**

The project follows a clean and organized folder structure:

```
Expense_Tracker_App/
├── index.html        # Main HTML file
├── style.css         # CSS for styling
├── src/
│   └── app.js        # Main JavaScript file
├── assets/           # Images, icons, etc.
└── README.md         # Project documentation
```

---

## **Contact Information**

If you have any questions, feel free to reach out:

- **GitHub**: [SirAlvinAmisi](https://github.com/SirAlvinAmisi)  
- **Email**: alvin.amisi@example.com (Replace with your actual email)  
- **LinkedIn**: [LinkedIn Profile](#) _(Add your LinkedIn link if available)_

---

## **Contributing**

Contributions are welcome! To contribute:

1. Fork the repository.  
2. Create a new branch: `git checkout -b feature/your-feature`.  
3. Make your changes and commit them: `git commit -m "Add feature"`.  
4. Push the changes to your fork: `git push origin feature/your-feature`.  
5. Open a pull request.

---

## **License**

This project is open source and available under the **MIT License**. See the LICENSE file for more details.

---
