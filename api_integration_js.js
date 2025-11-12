// assets/js/api-integration.js
// API Integration for Weather, Quotes, and News

// ========================================
// 1. WEATHER API INTEGRATION
// ========================================
async function fetchWeather() {
    const weatherContainer = document.getElementById('weatherInfo');
    
    try {
        // Using OpenWeatherMap API for Astana
        const API_KEY = '7d3f87faa1a7a1f2f5c3b8e9d4c6a2b1'; // Demo key - replace with real one
        const city = 'Astana';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Weather API failed');
        }
        
        const data = await response.json();
        
        // Display weather information
        weatherContainer.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" 
                     alt="Weather" 
                     style="width: 60px; height: 60px;">
                <div class="ms-3">
                    <h5 class="mb-1 fw-bold">${Math.round(data.main.temp)}°C</h5>
                    <p class="mb-0 text-muted">${data.weather[0].description}</p>
                </div>
                <div class="ms-4">
                    <small class="text-muted d-block">
                        <i class="fas fa-wind me-1"></i>Ветер: ${data.wind.speed} м/с
                    </small>
                    <small class="text-muted d-block">
                        <i class="fas fa-tint me-1"></i>Влажность: ${data.main.humidity}%
                    </small>
                </div>
            </div>
        `;
        
        console.log('Weather data loaded successfully');
        
    } catch (error) {
        console.error('Weather API Error:', error);
        
        // Fallback display using localStorage for demo
        const mockWeather = {
            temp: -5,
            description: 'облачно',
            wind: 3.2,
            humidity: 78
        };
        
        weatherContainer.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="fas fa-cloud fa-3x text-primary me-3"></i>
                <div>
                    <h5 class="mb-1 fw-bold">${mockWeather.temp}°C</h5>
                    <p class="mb-0 text-muted">${mockWeather.description}</p>
                </div>
                <div class="ms-4">
                    <small class="text-muted d-block">
                        <i class="fas fa-wind me-1"></i>Ветер: ${mockWeather.wind} м/с
                    </small>
                    <small class="text-muted d-block">
                        <i class="fas fa-tint me-1"></i>Влажность: ${mockWeather.humidity}%
                    </small>
                </div>
            </div>
        `;
    }
}

// ========================================
// 2. MOTIVATIONAL QUOTES API
// ========================================
async function fetchQuote() {
    const quoteContainer = document.getElementById('quoteContent');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    
    try {
        // Using API Ninjas Quotes API
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=education', {
            headers: {
                'X-Api-Key': 'YOUR_API_KEY_HERE' // Demo mode
            }
        });
        
        if (!response.ok) {
            throw new Error('Quote API failed');
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            displayQuote(data[0].quote, data[0].author);
        } else {
            throw new Error('No quote data');
        }
        
    } catch (error) {
        console.error('Quote API Error:', error);
        
        // Fallback to pre-defined quotes
        const fallbackQuotes = [
            {
                text: "Образование - это самое мощное оружие, которым можно изменить мир.",
                author: "Нельсон Мандела"
            },
            {
                text: "Инвестиции в знания приносят наибольший доход.",
                author: "Бенджамин Франклин"
            },
            {
                text: "Образование - это ключ к золотым воротам свободы.",
                author: "Джордж Вашингтон Карвер"
            },
            {
                text: "Чем больше вы читаете, тем больше вещей вы будете знать. Чем больше вы узнаете, тем больше мест вы посетите.",
                author: "Доктор Сьюз"
            },
            {
                text: "Единственный способ совершать великие дела - это любить то, что ты делаешь.",
                author: "Стив Джобс"
            }
        ];
        
        const randomQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        displayQuote(randomQuote.text, randomQuote.author);
    }
    
    newQuoteBtn.style.display = 'inline-block';
}

function displayQuote(text, author) {
    const quoteContainer = document.getElementById('quoteContent');
    quoteContainer.innerHTML = `
        <blockquote class="blockquote mb-0">
            <p class="fs-5 fst-italic mb-3">"${text}"</p>
            <footer class="blockquote-footer mt-2">
                <cite title="Source">${author}</cite>
            </footer>
        </blockquote>
    `;
}

// ========================================
// 3. EDUCATION NEWS API
// ========================================
async function fetchEducationNews() {
    const newsContainer = document.getElementById('newsContainer');
    
    try {
        // Using NewsAPI for education-related news
        const API_KEY = 'YOUR_NEWS_API_KEY'; // Demo mode
        const url = `https://newsapi.org/v2/everything?q=education+Kazakhstan&sortBy=publishedAt&language=ru&pageSize=3&apiKey=${API_KEY}`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('News API failed');
        }
        
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
            displayNews(data.articles);
        } else {
            throw new Error('No news data');
        }
        
    } catch (error) {
        console.error('News API Error:', error);
        
        // Fallback to pre-defined news
        const fallbackNews = [
            {
                title: "Новые стандарты образования в Казахстане на 2025 год",
                description: "Министерство образования объявило о внедрении обновленных образовательных стандартов, направленных на улучшение качества обучения.",
                url: "#",
                urlToImage: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
                publishedAt: "2025-01-15T10:00:00Z"
            },
            {
                title: "ЕНТ 2025: Что нужно знать выпускникам",
                description: "Эксперты делятся рекомендациями по подготовке к Единому Национальному Тестированию и важными изменениями в формате экзамена.",
                url: "#",
                urlToImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
                publishedAt: "2025-01-14T15:30:00Z"
            },
            {
                title: "НИШ открывает новые филиалы в регионах",
                description: "Сеть Назарбаев Интеллектуальных Школ продолжает расширяться, предоставляя больше возможностей для талантливых школьников.",
                url: "#",
                urlToImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400",
                publishedAt: "2025-01-13T09:00:00Z"
            }
        ];
        
        displayNews(fallbackNews);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    
    let newsHTML = '';
    articles.slice(0, 3).forEach((article, index) => {
        const date = new Date(article.publishedAt);
        const formattedDate = date.toLocaleDateString('ru-RU', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        newsHTML += `
            <div class="col-md-4">
                <div class="card news-card h-100 shadow-sm border-0 card-hover">
                    <img src="${article.urlToImage || 'https://via.placeholder.com/400x250'}" 
                         class="card-img-top" 
                         alt="${article.title}"
                         style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column">
                        <small class="text-muted mb-2">
                            <i class="fas fa-calendar-alt me-1"></i>${formattedDate}
                        </small>
                        <h5 class="card-title fw-bold">${article.title}</h5>
                        <p class="card-text flex-grow-1">${article.description || 'Нет описания'}</p>
                        <a href="${article.url}" target="_blank" class="btn btn-outline-primary mt-auto">
                            Читать далее <i class="fas fa-arrow-right ms-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    });
    
    newsContainer.innerHTML = newsHTML;
}

// ========================================
// 4. INITIALIZE ALL APIs
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('API Integration initialized');
    
    // Load all APIs on page load
    if (document.getElementById('weatherInfo')) {
        fetchWeather();
    }
    
    if (document.getElementById('quoteContent')) {
        fetchQuote();
    }
    
    if (document.getElementById('newsContainer')) {
        fetchEducationNews();
    }
    
    // Event listener for new quote button
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Загрузка...';
            fetchQuote();
        });
    }
    
    // Refresh weather every 10 minutes
    if (document.getElementById('weatherInfo')) {
        setInterval(fetchWeather, 600000); // 10 minutes
    }
});

// ========================================
// 5. EXPORT FUNCTIONS (for use in other files)
// ========================================
window.apiIntegration = {
    fetchWeather,
    fetchQuote,
    fetchEducationNews
};