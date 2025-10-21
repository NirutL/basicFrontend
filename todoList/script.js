// ดึง element จาก HTML
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const editModal = document.getElementById('editModal');
const editInput = document.getElementById('editInput');
const saveEditBtn = document.getElementById('saveEditBtn');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const closeBtn = document.querySelector('.close');

// ตัวแปรเก็บ todos
let todos = [];
let editingIndex = -1;

// โหลด todos จาก Local Storage เวลาเปิดหน้า
function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        displayTodos();
    }
}

// บันทึก todos ลงใน Local Storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

// แสดง todos ทั้งหมด
function displayTodos() {
    todoList.innerHTML = ''; // ลบ todos เก่า
    
    todos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        
        // ตรวจสอบว่า done หรือไม่
        if (todo.done) {
            li.classList.add('done');
        }
        
        li.innerHTML = `
            <input 
                type="checkbox" 
                class="todo-checkbox" 
                ${todo.done ? 'checked' : ''}
                onchange="toggleDone(${index})"
            >
            <span class="todo-text">${todo.text}</span>
            <div class="todo-buttons">
                <button class="edit-btn" onclick="openEditModal(${index})">แก้ไข</button>
                <button class="delete-btn" onclick="deleteTodo(${index})">ลบ</button>
            </div>
        `;
        
        todoList.appendChild(li);
    });
}

// เพิ่ม todo ใหม่
function addTodo() {
    const todoText = todoInput.value.trim();
    
    // ตรวจสอบว่า input ว่างหรือไม่
    if (todoText === '') {
        alert('กรุณาเพิ่มงาน!');
        return;
    }
    
    // ตรวจสอบว่า todo ซ้ำหรือไม่
    const isDuplicate = todos.some(todo => todo.text === todoText);
    if (isDuplicate) {
        alert('งานนี้มีอยู่แล้ว!');
        return;
    }
    
    // เพิ่ม todo ใหม่เข้า array (เป็น object ที่มี text และ done)
    todos.push({ text: todoText, done: false });
    
    // บันทึกลง Local Storage
    saveTodos();
    
    // แสดง todos ทั้งหมด
    displayTodos();
    
    // ลบค่าใน input
    todoInput.value = '';
    
    // โฟกัส input เพื่อพิมพ์ todo ถัดไป
    todoInput.focus();
}

// toggle done/undone
function toggleDone(index) {
    todos[index].done = !todos[index].done;
    saveTodos();
    displayTodos();
}

// เปิด modal เพื่อแก้ไข
function openEditModal(index) {
    editingIndex = index;
    editInput.value = todos[index].text;
    editModal.classList.add('show');
    editInput.focus();
    editInput.select(); // เลือกข้อความทั้งหมด
}

// ปิด modal
function closeEditModal() {
    editModal.classList.remove('show');
    editingIndex = -1;
    editInput.value = '';
}

// บันทึกการแก้ไข
function saveEdit() {
    const newText = editInput.value.trim();
    
    if (newText === '') {
        alert('กรุณากรอกข้อมูล!');
        return;
    }
    
    // ตรวจสอบว่า todo ซ้ำหรือไม่ (ยกเว้นตัวเอง)
    const isDuplicate = todos.some((todo, index) => 
        todo.text === newText && index !== editingIndex
    );
    
    if (isDuplicate) {
        alert('งานนี้มีอยู่แล้ว!');
        return;
    }
    
    // บันทึกการแก้ไข
    todos[editingIndex].text = newText;
    saveTodos();
    displayTodos();
    closeEditModal();
}

// ลบ todo
function deleteTodo(index) {
    const confirmDelete = confirm('คุณแน่ใจว่าต้องการลบ?');
    
    if (confirmDelete) {
        todos.splice(index, 1);
        saveTodos();
        displayTodos();
    }
}

// Event listeners
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

addBtn.addEventListener('click', addTodo);

saveEditBtn.addEventListener('click', saveEdit);

cancelEditBtn.addEventListener('click', closeEditModal);

closeBtn.addEventListener('click', closeEditModal);

editInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveEdit();
    }
});

// ปิด modal เมื่อคลิกนอก modal
editModal.addEventListener('click', (e) => {
    if (e.target === editModal) {
        closeEditModal();
    }
});

// โหลด todos เวลาเปิดหน้า 
// กรณีที่ต้องให้การเปิด Browser ทุกครั้งไม่ต้องดึงค่าเดิมมา ให้ Comment ออก
loadTodos();