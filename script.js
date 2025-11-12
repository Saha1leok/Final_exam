// assets/js/script.js - IMPROVED VERSION (с отправкой в Google Sheets)

$(document).ready(function() {
    
    // ========================================
    // 1. FORM VALIDATION & SUBMISSION
    // ========================================
    const form = document.getElementById('enrollmentForm');
    
    if (form) {
        // Real-time validation
        const inputs = form.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (form.classList.contains('was-validated')) {
                    validateField(this);
                }
            });
            
            input.addEventListener('input', function() {
                if (form.classList.contains('was-validated')) {
                    validateField(this);
                }
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                const firstInvalid = form.querySelector(':invalid');
                if (firstInvalid) {
                    firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalid.focus();
                }
            } else {
                // ⭐️ ВЫЗЫВАЕМ НОВУЮ ФУНКЦИЮ ⭐️
                handleFormSubmissionWithGoogleSheets();
            }
        }, false);
    }
    
    function validateField(field) {
        if (field.checkValidity()) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }
    
    // ⭐️⭐️⭐️ НОВАЯ ФУНКЦИЯ ⭐️⭐️⭐️
    function handleFormSubmissionWithGoogleSheets() {
        
        
        const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzbePvuK3HwqXO6ZxlwjZPTDX5pxkLpj79Xcpi47GFcZjm0LD3GNBmdOtGT0wOrB9v9/exec';
       
        const $form = $('#enrollmentForm');
        const $submitButton = $form.find('button[type="submit"]');
        const $successMessage = $('#successMessage');
        
        // 1. Отключаем кнопку и показываем спиннер
        $submitButton.prop('disabled', true);
        $submitButton.html('<i class="fas fa-spinner fa-spin me-2"></i> Отправка...');

        // 2. Создаем FormData из формы
        const formData = new FormData(form);

        // 3. Отправляем данные на Google Script
        fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                // 4. ЕСЛИ УСПЕХ: Показываем анимацию
                $form.slideUp(800, function() {
                    $successMessage.fadeIn(1000);
                    
                    // Сбрасываем форму
                    form.reset();
                    form.classList.remove('was-validated');
                    form.querySelectorAll('.is-valid, .is-invalid').forEach(field => {
                        field.classList.remove('is-valid', 'is-invalid');
                    });
                    
                    // Возвращаем кнопку в исходное состояние
                    $submitButton.prop('disabled', false);
                    $submitButton.html('<i class="fas fa-paper-plane me-2"></i> Отправить Заявку');
                });
                
                // Авто-скрытие сообщения (как у вас и было)
                setTimeout(function() {
                    $successMessage.fadeOut(500, function() {
                        $form.slideDown(500);
                    });
                }, 10000);

            } else {
                // 5. ЕСЛИ ОШИБКА: Показываем alert
                throw new Error('Google Script returned an error');
            }
        })
        .catch(error => {
            // 6. ЕСЛИ ОШИБКА СЕТИ: Показываем alert
            console.error('Fetch Error:', error);
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.');
            
            // Возвращаем кнопку в исходное состояние
            $submitButton.prop('disabled', false);
            $submitButton.html('<i class="fas fa-paper-plane me-2"></i> Отправить Заявку');
        });
    }

    
    // ========================================
    // 2. ANIMATED STATISTICS (success.html)
    // ========================================
    if ($('.stat-card').length > 0) {
        // ... (ваш код анимации)
    }
    
    // ========================================
    // 3. SMOOTH SCROLL FOR ANCHOR LINKS
    // ========================================
    $('a[href^="#"]').on('click', function(event) {
        // ... (ваш код)
    });
    
    // ========================================
    // 4. NAVBAR SCROLL EFFECT
    // ========================================
    let lastScrollTop = 0;
    const navbar = $('.navbar');
    
    $(window).on('scroll', function() {
        // ... (ваш код)
    });
    
    // ========================================
    // 5. FEATURE CARDS ANIMATION (index.html)
    // ========================================
    if ($('.feature-card').length > 0) {
        // ... (ваш код)
    }
    
    // ========================================
    // 6. TEACHER CARDS PARALLAX EFFECT
    // ========================================
    if ($('.teacher-card').length > 0) {
        // ... (ваш код)
    }
    
    // ========================================
    // 7. ACCORDION SMOOTH ANIMATION
    // ========================================
    $('.accordion-button').on('click', function() {
        // ... (ваш код)
    });
    
    // ========================================
    // 8. LOADING ANIMATION FOR IMAGES
    // ========================================
    $('img').on('load', function() {
        // ... (ваш код)
    });
    
    // ========================================
    // 9. TOOLTIP INITIALIZATION (if needed)
    // ========================================
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    // ... (ваш код)
    
    // ========================================
    // 10. COUNTER ANIMATION FOR STATISTICS
    // ========================================
    function animateCounter($element, target) {
        // ... (ваш код)
    }
    
    if ($('.stat-box h3').length > 0) {
        // ... (ваш код)
    }
    
    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    function isInViewport(element) {
        // ... (ваш код)
    }
    
    // ========================================
    // CONSOLE MESSAGE
    // ========================================
    console.log('%c Bir Qadam Educational Center ', 'background: #0056b3; color: #ffffff; font-size: 16px; padding: 10px;');
    console.log('Website loaded successfully!');
});

// ========================================
// PRELOADER (Optional - add to HTML if needed)
// ========================================
window.addEventListener('load', function() {
    // ... (ваш код)
});
