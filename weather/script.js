// ดึง element จาก HTML
const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

// API Key - ใช้ OpenWeatherMap API (ฟรี)
const API_KEY = '1a2b3c4d5e6f7g8h9i0j'; // ลองเปลี่ยนเป็น API key จริงของคุณ

// URL ของ API
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

// ฟังก์ชันค้นหาอากาศ
async function searchWeather() {
    const city = cityInput.value.trim();
    
    // ตรวจสอบว่า input ว่างหรือไม่
    if (city === '') {
        showError('กรุณากรอกชื่อเมือง!');
        return;
    }
    
    try {
        // แสดงข้อความโหลด
        showLoading(true);
        hideError();
        weatherInfo.style.display = 'none';
        
        // เรียก API
        const response = await fetch(
            `${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=th`
        );
        
        // ตรวจสอบว่า response ถูกต้องหรือไม่
        if (!response.ok) {
            throw new Error('ไม่พบเมือง กรุณาลองใหม่!');
        }
        
        // แปลง response เป็น JSON
        const data = await response.json();
        
        // แสดงข้อมูลอากาศ
        displayWeather(data);
        
    } catch (err) {
        showError(err.message);
    } finally {
        showLoading(false);
    }
}

// ฟังก์ชันแสดงข้อมูลอากาศ
function displayWeather(data) {
    // ดึงข้อมูลจาก API
    const cityName = data.name + ', ' + data.sys.country;
    const temperature = Math.round(data.main.temp);
    const description = data.weather[0].main;
    const humidity = data.main.humidity;
    const windSpeed = Math.round(data.wind.speed * 3.6); // m/s -> km/h
    const pressure = data.main.pressure;
    const visibility = Math.round(data.visibility / 1000); // เมตร -> กิโลเมตร
    
    // อัปเดต HTML
    document.getElementById('cityName').textContent = cityName;
    document.getElementById('temperature').textContent = temperature + '°C';
    document.getElementById('weatherDescription').textContent = description;
    document.getElementById('humidity').textContent = humidity + '%';
    document.getElementById('windSpeed').textContent = windSpeed + ' km/h';
    document.getElementById('pressure').textContent = pressure + ' hPa';
    document.getElementById('visibility').textContent = visibility + ' km';
    
    // แสดง weatherInfo
    weatherInfo.style.display = 'block';
}

// ฟังก์ชันแสดงข้อความโหลด
function showLoading(isLoading) {
    loading.style.display = isLoading ? 'block' : 'none';
}

// ฟังก์ชันแสดงข้อผิดพลาด
function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
}

// ฟังก์ชันซ่อนข้อผิดพลาด
function hideError() {
    error.style.display = 'none';
}

// Event Listeners
searchBtn.addEventListener('click', searchWeather);

// ค้นหาเมื่อกดปุ่ม Enter
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});