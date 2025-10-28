// ===== VARIABLES GLOBALES =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const backToTopBtn = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');

// ===== NAVEGACIÓN RESPONSIVE =====
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
} else {
    // Si no existen elementos del nav, evitamos errores silenciosos
    // console.log('Nav elements not found');
}

// ===== NAVEGACIÓN SCROLL =====
window.addEventListener('scroll', () => {
    // Cambiar navbar al hacer scroll (solo si existe)
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }

    // Mostrar/ocultar botón back to top (solo si existe)
    if (backToTopBtn) {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

// ===== BACK TO TOP =====
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== FILTRO DE PROYECTOS =====
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Agregar clase active al botón clickeado
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.classList.add('fade-in-up');
                } else {
                    card.style.display = 'none';
                    card.classList.remove('fade-in-up');
                }
            });
        });
    });
}

// ===== MODAL DE PROYECTOS =====
const modalOverlay = document.getElementById('modalOverlay');
const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const projectModalBtns = document.querySelectorAll('.project-modal-btn');

// Datos de los proyectos
const projectData = {
    netflix: {
        title: 'Netflix Data Analyst',
        image: 'assets/images/project_netflix.jpeg',
        description: 'Este proyecto realiza un análisis exploratorio del catálogo global de contenido de Netflix. Se enfoca en identificar patrones de distribución, duración, clasificación, país de origen y géneros. El objetivo principal es entender la estrategia de contenido de Netflix y ofrecer insights clave sobre tendencias en el mercado global de streaming.',
        technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Tableau'],
        features: [
            'Análisis por tipo de contenido: Compara la proporción de películas y series en la plataforma.',
            'Evaluación temporal: Examina la evolución anual de estrenos desde 2008 hasta 2020.',
            'Clasificación por edades: Visualiza el enfoque del contenido hacia diferentes grupos etarios.',
            'Preferencias por género: Identifica los géneros más representados como dramas o comedias.',
            'Distribución geográfica: Muestra los países con mayor producción en el catálogo de Netflix.'
        ],
        results: 'El análisis revela que el catálogo de Netflix está dominado por películas (68.42%) y se concentra en producciones de Estados Unidos, India y Reino Unido. La mayoría de las películas tienen una duración óptima de entre 75 y 120 minutos, lo cual responde a las preferencias de los usuarios por contenido de consumo rápido. Los géneros más populares son dramas, comedias e internacionales, reflejando una estrategia orientada a satisfacer audiencias globales diversas. Estos insights permiten comprender mejor la dirección editorial de la plataforma y pueden guiar decisiones sobre adquisición de contenido, segmentación de mercado y expansión regional.',
        projectLink: 'https://isaacmtz.notion.site/An-lisis-Exploratorio-del-Cat-logo-de-Contenido-de-Netflix-1a7f24169c5780e3b701ceb466d2725d?pvs=4',
        codeLink: '#'
    },
    pizza: {
        title: 'Ventas Pizzería',
        image: 'assets/images/project_pizza.jpeg',
        description: 'Análisis integral de ventas de pizzería que proporciona insights valiosos para la optimización de operaciones. Incluye análisis de productos más vendidos, patrones de venta y métricas de rendimiento.',
        technologies: ['Excel', 'Tableau', 'Pandas', 'NumPy', 'SQL'],
        features: [
            'Dashboard ejecutivo en tiempo real',
            'Análisis de productos por categoría',
            'Métricas de rendimiento por ubicación',
            'Predicciones de demanda',
            'Optimización de inventario'
        ],
        results: 'Incremento del 15% en ventas, reducción del 20% en desperdicios y mejora en la satisfacción del cliente.',
        projectLink: 'https://isaacmtz.notion.site/Ventas-Pizzeria-1a7f24169c5780b2a971dc9383a228ac?pvs=4',
        codeLink: '#'
    },
    penguin: {
        title: 'EDA Datos de Pingüinos',
        image: 'assets/images/analisis_pinguinos2.png',
        description: 'Análisis exploratorio de datos del dataset de pingüinos usando Python y librerías de visualización. Este proyecto demuestra técnicas avanzadas de EDA y storytelling con datos.',
        technologies: ['Python', 'Pandas', 'Seaborn', 'Matplotlib'],
        features: [
            'Análisis exploratorio completo',
            'Visualizaciones estadísticas',
            'Análisis de correlaciones',
            'Storytelling con datos',
            'Documentación detallada'
        ],
        results: 'Descubrimiento de patrones interesantes en las características físicas de los pingüinos y su relación con el hábitat.',
        projectLink: '#',
        codeLink: 'https://github.com/isaacmartinez23/portafolio-Data-Analyst/blob/main/An%C3%A1lisis_Ping%C3%BCinos.ipynb'
    },
    'netflix-dashboard': {
        title: 'Netflix Dashboard',
        image: 'assets/images/Netflix_Dashboard.png',
        description: 'Dashboard interactivo de análisis de datos de Netflix con visualizaciones dinámicas y filtros avanzados. Permite explorar tendencias de contenido y comportamiento de usuarios.',
        technologies: ['Tableau', 'Figma', 'Python'],
        features: [
            'Visualizaciones interactivas',
            'Filtros dinámicos',
            'Análisis de tendencias',
            'Métricas de engagement',
            'Exportación de reportes'
        ],
        results: 'Dashboard utilizado por el equipo de contenido para tomar decisiones estratégicas sobre adquisición de contenido.',
        projectLink: 'https://public.tableau.com/views/Netflix_Dashboard_17405133855050/NetflixDashboard?:language=es-ES&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
        codeLink: '#'
    },
    'pizza-dashboard': {
        title: 'Dashboard de Ventas de Pizza',
        image: 'assets/images/pizza_Dashboard.png',
        description: 'Dashboard ejecutivo para análisis de ventas de pizzería con KPIs en tiempo real y análisis de tendencias. Proporciona insights accionables para la gestión del negocio.',
        technologies: ['Tableau', 'SQL', 'Dashboards'],
        features: [
            'KPIs en tiempo real',
            'Análisis de tendencias',
            'Comparativas temporales',
            'Alertas automáticas',
            'Reportes automáticos'
        ],
        results: 'Mejora en la toma de decisiones y optimización de operaciones diarias.',
        projectLink: 'https://public.tableau.com/views/VentasPizzas_17406214590730/Dashboard1?:language=es-ES&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
        codeLink: '#'
    },
    'chocolate-dashboard': {
        title: 'Chocolate Sales Dashboard',
        image: 'assets/images/chocolate_dashboard.png',
        description: 'Dashboard de ventas de chocolate con análisis de productos, tendencias temporales y métricas de rendimiento. Incluye análisis de estacionalidad y comportamiento del consumidor.',
        technologies: ['Tableau', 'Excel', 'SQL'],
        features: [
            'Análisis de estacionalidad',
            'Segmentación de productos',
            'Análisis de precios',
            'Predicciones de venta',
            'Análisis de competencia'
        ],
        results: 'Identificación de productos estrella y optimización de estrategias de precios.',
        projectLink: 'https://public.tableau.com/views/VentasdeChocolates/Dashboard1?:language=es-ES&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link',
        codeLink: '#'
    },
    'users-dashboard': {
        title: 'Users Profile Dashboard',
        image: 'assets/images/Web_chart.jpeg',
        description: 'Dashboard de perfil de usuarios con análisis demográfico, comportamiento y segmentación de clientes. Proporciona insights para personalización y marketing.',
        technologies: ['Power BI', 'Python', 'SQL'],
        features: [
            'Análisis demográfico',
            'Segmentación de usuarios',
            'Análisis de comportamiento',
            'Personalización de contenido',
            'Métricas de engagement'
        ],
        results: 'Mejora en la personalización de experiencias y aumento en la retención de usuarios.',
        projectLink: 'https://lookerstudio.google.com/s/jli7t4ha2Hg',
        codeLink: '#'
    },
    'freshmart-dashboard': {
        title: 'Freshmart Dashboard',
        image: 'assets/images/Freshmart.png',
        description: 'Dashboard completo para supermercado Freshmart con análisis de inventario, ventas y rendimiento por categoría. Incluye análisis de rotación de productos y optimización de estanterías.',
        technologies: ['Tableau', 'SQL', 'Excel'],
        features: [
            'Análisis de inventario',
            'Rotación de productos',
            'Optimización de estanterías',
            'Análisis de categorías',
            'Predicciones de demanda'
        ],
        results: 'Reducción del 25% en costos de inventario y mejora en la disponibilidad de productos.',
        projectLink: 'https://lookerstudio.google.com/s/uLwW-dFcgLo',
        codeLink: '#'
    }
};

// Abrir modal (solo si existen botones y overlay)
if (projectModalBtns.length > 0 && modalOverlay) {
    projectModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = btn.getAttribute('data-project');
            const project = projectData[projectId];

            if (project) {
                const titleEl = document.getElementById('modalTitle');
                const imageEl = document.getElementById('modalImage');
                const descEl = document.getElementById('modalDescription');
                const techEl = document.getElementById('modalTechnologies');
                const featuresEl = document.getElementById('modalFeatures');
                const resultsEl = document.getElementById('modalResults');
                const projectLinkBtn = document.getElementById('modalProjectLink');
                const codeLinkBtn = document.getElementById('modalCodeLink');

                if (titleEl) titleEl.textContent = project.title;
                if (imageEl) { imageEl.src = project.image; imageEl.alt = project.title; }
                if (descEl) descEl.innerHTML = `<p>${project.description}</p>`;
                if (techEl) techEl.innerHTML = project.technologies.map(tech => `<span class="tag">${tech}</span>`).join('');
                if (featuresEl) featuresEl.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
                if (resultsEl) resultsEl.innerHTML = `<p>${project.results}</p>`;

                if (projectLinkBtn) projectLinkBtn.href = project.projectLink || '#';
                if (codeLinkBtn) codeLinkBtn.href = project.codeLink || '#';

                if (projectLinkBtn) projectLinkBtn.style.display = (project.projectLink && project.projectLink !== '#') ? 'inline-block' : 'none';
                if (codeLinkBtn) codeLinkBtn.style.display = (project.codeLink && project.codeLink !== '#') ? 'inline-block' : 'none';

                modalOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Cerrar modal (si existe boton de cierre)
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Cerrar al hacer clic en overlay
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Cerrar modal con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            closeModal();
        }
    });
}

// Función para cerrar modal de proyectos (definida aquí para seguridad)
function closeModal() {
    if (modalOverlay) {
        modalOverlay.style.display = 'none';
    }
    const modalImg = document.getElementById('modalImage');
    if (modalImg) modalImg.src = '';
    document.body.style.overflow = 'auto';
}

// ===== FORMULARIO DE CONTACTO =====
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Mostrar estado de carga
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;
        contactForm.classList.add('loading');
        
        try {
            // Simular envío (aquí iría la lógica real de envío)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
            contactForm.reset();
            
        } catch (error) {
            // Mostrar mensaje de error
            showNotification('Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo.', 'error');
        } finally {
            // Restaurar estado normal
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactForm.classList.remove('loading');
        }
    });
}

// ===== SISTEMA DE NOTIFICACIONES =====
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Cerrar notificación
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Cerrar todos los items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Abrir el item clickeado si no estaba activo
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== ANIMACIONES AL SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

// Observar elementos para animación
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.project-card, .skill-item, .contact-item, .faq-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// ===== SMOOTH SCROLL PARA ENLACES INTERNOS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Solo previene el default si el destino existe en la página y no es solo '#'
        if (href.length > 1 && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== VALIDACIÓN DE FORMULARIOS =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        const value = input.value.trim();
        
        if (!value) {
            showFieldError(input, 'Este campo es requerido');
            isValid = false;
        } else if (input.type === 'email' && !validateEmail(value)) {
            showFieldError(input, 'Por favor, ingresa un email válido');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    return isValid;
}

function showFieldError(input, message) {
    clearFieldError(input);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    `;
    
    input.parentNode.appendChild(errorDiv);
    input.style.borderColor = '#e74c3c';
}

function clearFieldError(input) {
    const existingError = input.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    input.style.borderColor = '';
}

// ===== PRELOADER (opcional) =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// ===== UTILIDADES ADICIONALES =====
// Copiar email al portapapeles
function copyEmail() {
    navigator.clipboard.writeText('isaac.amr15@gmail.com').then(() => {
        showNotification('Email copiado al portapapeles', 'success');
    }).catch(() => {
        showNotification('No se pudo copiar el email', 'error');
    });
}

// Descargar CV
function downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/files/isaac_martinez_cv.pdf';
    link.download = 'Isaac_Martinez_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sitio web de Isaac Martínez Ríos cargado correctamente');
    
    // Agregar eventos para utilidades
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            copyEmail();
        });
    });
    
    const cvLinks = document.querySelectorAll('a[href*="cv"]');
    cvLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            downloadCV();
        });
    });
}); 

/* ==================================================== */
/* ===== 10. LÓGICA DEL MODAL DE CERTIFICADOS ===== */
/* ==================================================== */
document.addEventListener('DOMContentLoaded', () => {
    
    // Seleccionamos los elementos del nuevo modal
    const certModalOverlay = document.getElementById('certModalOverlay');
    const certModalImage = document.getElementById('certModalImage');
    const certModalCloseBtn = document.getElementById('certModalClose');
    
    // Seleccionamos TODOS los enlaces que deben abrir este modal
    const openCertBtns = document.querySelectorAll('.open-cert-modal');

    // Función para cerrar el modal de certificados
    function closeCertModal() {
        if (certModalOverlay) {
            certModalOverlay.style.display = 'none';
            certModalImage.src = ""; // Limpia el 'src' para detener la carga
            document.body.style.overflow = 'auto'; // Restaura el scroll
        }
    }

    // Si existen los botones y el modal...
    if (openCertBtns.length > 0 && certModalOverlay) {
        
        // 1. Asignar evento a cada enlace de certificado
        openCertBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Previene que el enlace '#' mueva la página
                
                // Obtenemos la ruta de la imagen desde el atributo 'data'
                const imgSrc = btn.getAttribute('data-cert-image');
                
                if (imgSrc) {
                    // Asignamos la ruta a la imagen del modal
                    certModalImage.src = imgSrc;
                    
                    // Mostramos el modal
                    certModalOverlay.style.display = 'flex';
                    document.body.style.overflow = 'hidden'; // Bloquea el scroll
                }
            });
        });

        // 2. Asignar evento al botón de cerrar
        if (certModalCloseBtn) {
            certModalCloseBtn.addEventListener('click', closeCertModal);
        }

        // 3. Asignar evento para cerrar al hacer clic en el fondo
        certModalOverlay.addEventListener('click', (e) => {
            // Si el clic fue en el overlay (el fondo) y no en la imagen...
            if (e.target === certModalOverlay) {
                closeCertModal();
            }
        });
    }

    // 4. Asignar evento para cerrar con la tecla 'Escape'
    // (Añadimos este listener separado del que ya tenías para el modal de proyectos)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && certModalOverlay && certModalOverlay.style.display === 'flex') {
            closeCertModal();
        }
    });

});