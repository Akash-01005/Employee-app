class Employee{
    constructor(name,salary,tax){
        this.salary = salary;
        this.name = name;
        this.tax = tax;
    }

    calculateSalary(){
        this.netSalary = Math.round(this.salary -((this.tax)/100) * this.salary);
        return this.netSalary;
    }

    generateId(){
        this.id = Math.floor(Math.random()*10000);
        return this.id;
    }
}

class EmployeeUI{
    addEmployee(employee){
         const empList =  document.querySelector('tbody');

         const markup = `<th scope="row">${employee.id}</th>
                <th>${employee.name}</th>
                <th>${employee.salary}</th>
                <th>${employee.tax}%</th>
                <th>${employee.netSalary}</th>
                <th><a href="#" class="btn btn-danger delete">Delete</a></th>`

        empList.insertAdjacentHTML('afterbegin',markup);
    }

    clearFeild(){
        document.getElementById('name').value = "";
        document.getElementById('salary').value = "";
        document.getElementById('tax').value = "";
    }

    alertMessage(msgType,msg){
        const markup = `<div class="alert alert-${msgType}" role="alert">
            ${
              msg
            }
         </div>`
        const form = document.querySelector('form');
        form.insertAdjacentHTML('beforebegin',markup);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },2000)
    }

    deleteEmployee(target){
            if(target.matches('.delete')){
                target.parentElement.parentElement.remove();
                return true;
            }
    }

}

const button = document.querySelector('#add_employee');
button.addEventListener('click', () =>{
    const name = document.getElementById('name').value;
    const salary = document.getElementById('salary').value;
    const tax = document.getElementById('tax').value;

    if(name ==='' || salary === '' || tax === ''){
        const employeeUI = new EmployeeUI();
        employeeUI.alertMessage('danger','Please Fill the Form!');
    }
    else{
        const emp = new Employee(name,salary,tax);

        emp.id = emp.generateId();
        emp.netSalary = emp.calculateSalary();

        const employeeUI = new EmployeeUI();
        employeeUI.addEmployee(emp);
        employeeUI.clearFeild();
        employeeUI.alertMessage('success','Successfully Added!');
        StoreEmployee.addEmployee(emp);
    }
});

document.querySelector('form').addEventListener('submit', e=>{
    e.preventDefault();
});

document.querySelector('tbody').addEventListener('click',e =>{
    const empLi = new EmployeeUI();
    const isDeleted = empLi.deleteEmployee(e.target);
    StoreEmployee.removeEmployee(e.target.parentElement.parentElement.firstElementChild.textContent)
    if(isDeleted){
        empLi.alertMessage('sucess','Employee deleted!');
    }
})

class StoreEmployee{
    static getEmployees(){
        let employees;
        if(localStorage.getItem('employees') === null){
            employees = [];
        }
        else{
            employees = JSON.parse(localStorage.getItem('employees'));
        }
        return employees;
    }

    static addEmployee(employee){
        const emp = StoreEmployee.getEmployees();
        emp.push(employee);
        localStorage.setItem('employees',JSON.stringify(emp))
    }

    static displayEmployee(){
        const employees = StoreEmployee.getEmployees();
        const empUI = new EmployeeUI();

        employees.forEach(element => {
            empUI.addEmployee(element);
        });
    }
    static removeEmployee(id){
        const employees = StoreEmployee.getEmployees();
        employees.forEach((element,index)=>{
            if(element.id === parseInt(id)){
                employees.splice(index,1);
            }
        })
        localStorage.setItem('employees',JSON.stringify(employees));
    }
}

StoreEmployee.displayEmployee();