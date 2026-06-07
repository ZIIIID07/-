// ==================== ИНТЕРАКТИВНОСТЬ ДЛЯ ПОРТФОЛИО ====================
// Домашнее задание: тема 4 — создание сайтов с JS

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 JavaScript загружен! Портфолио оживает.');

    // ---------- 1. ТАЙМЕР ПРЕБЫВАНИЯ НА САЙТЕ ----------
    let seconds = 0;
    const counterElement = document.getElementById('sessionCounter');
    if (counterElement) {
        setInterval(() => {
            seconds++;
            counterElement.textContent = `⏱️ На сайте: ${seconds} сек.`;
        }, 1000);
    }

    // ---------- 2. ЖИВОЙ ИНДИКАТОР (обновление текста) ----------
    const indicator = document.getElementById('liveIndicator');
    if (indicator) {
        setInterval(() => {
            const now = new Date();
            const hours = now.getHours();
            let greeting = '';
            if (hours < 12) greeting = '🌅 утро';
            else if (hours < 18) greeting = '☀️ день';
            else greeting = '🌙 вечер';
            indicator.textContent = `🟢 ${greeting}`;
        }, 60000);
        indicator.textContent = `🟢 активен`;
    }

    // ---------- 3. КНОПКА "ПОЗДОРОВАТЬСЯ" (динамическое сообщение) ----------
    const greetBtn = document.getElementById('greetingBtn');
    const greetMsgDiv = document.getElementById('greetingMessage');
    if (greetBtn && greetMsgDiv) {
        greetBtn.addEventListener('click', () => {
            const now = new Date();
            const hour = now.getHours();
            let timePhrase = '';
            if (hour < 12) timePhrase = 'доброе утро';
            else if (hour < 18) timePhrase = 'добрый день';
            else timePhrase = 'добрый вечер';
            greetMsgDiv.innerHTML = `<div class="demo-message" style="background:#e0f0fa;">👋 Привет! ${timePhrase}, я Илья. Рад знакомству! 🚀</div>`;
            setTimeout(() => {
                if(greetMsgDiv.firstChild) greetMsgDiv.innerHTML = '';
            }, 4000);
        });
    }

    // ---------- 4. КЛИКАБЕЛЬНЫЕ СКИЛЛЫ (обратная связь) ----------
    const skillButtons = document.querySelectorAll('.skill-btn');
    const feedbackDiv = document.getElementById('skillFeedback');
    if (skillButtons.length && feedbackDiv) {
        skillButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const skillName = btn.getAttribute('data-skill') || btn.innerText.trim();
                feedbackDiv.innerHTML = `✨ Тыкнули навык «${skillName}» — Илья активно его изучает! 💪`;
                setTimeout(() => {
                    if (feedbackDiv.innerHTML.includes(skillName)) {
                        feedbackDiv.innerHTML = '';
                    }
                }, 2500);
            });
        });
    }

    // ---------- 5. КНОПКА "ПОСМОТРЕТЬ УЧЕБНЫЕ РАБОТЫ" (демо-уведомление + анимация) ----------
    const demoBtn = document.getElementById('demoProjectsBtn');
    if (demoBtn) {
        demoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showDemoNotification('📚 Открываю архив учебных работ: HTML/CSS макеты, задачи по JS... (демо-режим)');
            // Дополнительно: меняем текст кнопки временно
            const originalText = demoBtn.innerHTML;
            demoBtn.innerHTML = '✨ Открыто! ✨';
            setTimeout(() => {
                demoBtn.innerHTML = originalText;
            }, 1500);
        });
    }

    // ---------- 6. ОБЩАЯ ФУНКЦИЯ УВЕДОМЛЕНИЙ (для ссылок) ----------
    function showDemoNotification(message) {
        let notifBlock = document.getElementById('notificationDemo');
        if (!notifBlock) {
            const container = document.getElementById('projectsSection');
            if (container) {
                const div = document.createElement('div');
                div.id = 'notificationDemo';
                div.className = 'demo-message';
                container.appendChild(div);
                notifBlock = div;
            } else return;
        }
        notifBlock.style.display = 'block';
        notifBlock.innerHTML = `🔔 ${message}`;
        setTimeout(() => {
            if (notifBlock) notifBlock.style.opacity = '0';
            setTimeout(() => {
                if (notifBlock) {
                    notifBlock.style.display = 'none';
                    notifBlock.style.opacity = '1';
                }
            }, 500);
        }, 3000);
    }

    // Перехват всех демо-ссылок (учебный репозиторий, примеры вёрстки, другие проекты)
    const fakeLinks = [
        { id: 'repoDemoLink', msg: '📁 Переход в учебный репозиторий (демо: показывает задания академии)' },
        { id: 'downloadDemoLink', msg: '📄 Скачивание примера первой вёрстки: файл index_demo.html (учебный)' },
        { id: 'otherProjectsLink', msg: '📖 Открывается список других проектов: To-Do list, визитка, таблицы (ученические работы)' },
        { id: 'studyMaterialsLink', msg: '📚 Страница с учебными материалами: лекции, записи, полезные ссылки' },
        { id: 'githubDemoLink', msg: '🐙 GitHub профиль (демо-версия): репозитории с лабораторными работами' }
    ];
    
    fakeLinks.forEach(link => {
        const element = document.getElementById(link.id);
        if (element) {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                showDemoNotification(link.msg);
            });
        }
    });

    // ---------- 7. КНОПКА "ВВЕРХ" (плавный скролл) ----------
    const upLink = document.getElementById('goUpLink');
    if (upLink) {
        upLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showDemoNotification('⬆️ Возврат наверх выполнен');
        });
    }

    // ---------- 8. КНОПКА СОВЕТА (показать/скрыть) ----------
    const toggleBtn = document.getElementById('toggleAdviceBtn');
    const adviceDiv = document.getElementById('adviceMessage');
    if (toggleBtn && adviceDiv) {
        toggleBtn.addEventListener('click', () => {
            if (adviceDiv.style.display === 'none' || adviceDiv.style.display === '') {
                adviceDiv.style.display = 'block';
                toggleBtn.textContent = '🙈 Скрыть совет';
            } else {
                adviceDiv.style.display = 'none';
                toggleBtn.textContent = '💡 Полезный совет';
            }
        });
    }

    // ---------- 9. ЭФФЕКТ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ ----------
    const fadeElements = document.querySelectorAll('.hero-card, .visual-block, section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));

    // ---------- 10. ДИНАМИЧЕСКАЯ КАРТОЧКА ПРОЕКТА (демонстрация работы с DOM) ----------
    const projectContainer = document.getElementById('dynamicProjectContainer');
    if (projectContainer && !projectContainer.hasChildNodes()) {
        const card = document.createElement('div');
        card.className = 'visual-block project-card';
        card.style.padding = '1rem';
        card.style.margin = '1rem 0';
        card.innerHTML = `
            <h4 style="margin:0 0 0.5rem 0;">🎯 Интерактивный проект: счётчик кликов</h4>
            <p>Попробуй нажать на кнопку! Это мини-игра, которую я добавил с помощью JavaScript.</p>
            <button id="clickCounterBtn" style="background:#1f5679; color:white; border:none; padding:0.4rem 1rem; border-radius: 40px; cursor:pointer;">Нажми меня →</button>
            <span id="clickCountDisplay" style="margin-left: 1rem; font-weight: bold;">0 раз</span>
        `;
        projectContainer.appendChild(card);
        
        let clickCount = 0;
        const counterBtn = document.getElementById('clickCounterBtn');
        const displaySpan = document.getElementById('clickCountDisplay');
        if (counterBtn && displaySpan) {
            counterBtn.addEventListener('click', () => {
                clickCount++;
                displaySpan.textContent = `${clickCount} раз`;
                if (clickCount === 5) {
                    showDemoNotification('🎉 Ура! 5 кликов — ты активный пользователь!');
                } else if (clickCount === 10) {
                    showDemoNotification('🔥 Супер! 10 кликов! Илья гордится тобой :)');
                }
            });
        }
    }

    // ---------- 11. БЛОКИРОВКА ПОВТОРНЫХ КЛИКОВ НА КНОПКУ (ДЕМОНСТРАЦИЯ) + эффект временной блокировки----------
    const anyPrimaryLink = document.getElementById('demoProjectsBtn');
    if (anyPrimaryLink) {
        let isClicked = false;
        anyPrimaryLink.addEventListener('click', (e) => {
            if (isClicked) {
                e.preventDefault();
                showDemoNotification('Подожди немного, уже открываю архив... :)');
                return;
            }
            isClicked = true;
            anyPrimaryLink.classList.add('disabled-btn');
            setTimeout(() => {
                isClicked = false;
                anyPrimaryLink.classList.remove('disabled-btn');
            }, 2000);
        });
    }

    // ---------- 12. АДАПТИВНОЕ ПРИВЕТСТВИЕ ПОСЛЕ ЗАГРУЗКИ (маленький тост) ----------
    setTimeout(() => {
        const hero = document.querySelector('.hero-card');
        if (hero && !sessionStorage.getItem('welcomeShown')) {
            const toast = document.createElement('div');
            toast.innerText = '✨ Добро пожаловать! Сайт стал интерактивным ✨';
            toast.style.position = 'fixed';
            toast.style.bottom = '20px';
            toast.style.left = '20px';
            toast.style.backgroundColor = '#1f5679';
            toast.style.color = 'white';
            toast.style.padding = '8px 16px';
            toast.style.borderRadius = '40px';
            toast.style.fontSize = '0.8rem';
            toast.style.zIndex = '1000';
            toast.style.opacity = '0.9';
            document.body.appendChild(toast);
            setTimeout(() => toast.remove(), 3500);
            sessionStorage.setItem('welcomeShown', 'true');
        }
    }, 800);
});