// ข้อความ ตัวแปร หรือ tag html
document.write("<h1>Basic Extenal Script</h>");

// ข้อความแจ้งเตือน
/*alert("Alert Script");*/

// สำหรับ Debus หรือ ตัวแปรต่างๆ จะไม่แสดงผลทีหน้าจอ
console.log("console.log สำหรับ Debug ดู"); 
console.error("console.error สำหรับ Debug ดู"); 
console.warn("console.warning สำหรับ Debug ดู"); 


// variable
let _name;
_name = " My Name";
document.write("<p>Name =",_name), "</p>"; 
console.log("Name = ",_name);

let _age = 20;
document.write("<br>Age = ",_age); 

let _salary = 25000;
let _bdate = new Date("2022-03-25");

new Date("2022-03-25");
const _vat = 0.07;

document.write("<br>Salary = ",_salary); 
document.write("<br>BirthDate = ",_bdate); 
document.write("<br>Vat = ",_vat); 

// You can create a constant array:
const cars = ["Saab", "Volvo", "BMW"];

// You can change an element:
cars[0] = "Toyota";

document.write("<br>car = ",cars[0]); 


// You can create a const object:
const car = {type:"Fiat", model:"500", color:"white"};

// You can change a property:
car.color = "red";

document.write("<br>car = ",car.color); 

let text = (_age < 18) ? "Junior" : "Senoir";
document.write("<br>Type = ",text); 

document.addEventListener('DOMContentLoaded', function() {
    const demo =   document.getElementById("demo");
    let day;
    let date = new Date().getDay();
    
    switch (date) {
    case 0:
        day = "Sunday";
        break;
    case 1:
        day = "Monday";
        break;
    case 2:
        day = "Tuesday";
        break;
    case 3:
        day = "Wednesday";
        break;
    case 4:
        day = "Thursday";
        break;
    case 5:
        day = "Friday";
        break;
    case  6:
        day = "Saturday";
    }
      
    // && || !
    if (day == "Saturday" || day == "Sunday") {
    day = "Holiday";
    } else {
    day = "Helle " + day ;
    }

     demo.innerHTML = "Today is " + day; 
     

 });

