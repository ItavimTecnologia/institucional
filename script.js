const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
    }
  });
}, {threshold: 0.15});

document.querySelectorAll('.fade-up').forEach(el => {
  if (!el.classList.contains('visible')) observer.observe(el);
});

// ─── FORM VALIDATION FUNCTION ─── //
const createFormValidator = (formId, successMsgId) => {
  const form = document.getElementById(formId);
  if (!form) return;

  const successMsg = document.getElementById(successMsgId);

  // Validação em tempo real
  const validateField = (field) => {
    const value = field.value.trim();
    const fieldName = field.id;
    const errorElement = document.getElementById(`erro-${fieldName}`);
    let isValid = true;
    let errorMsg = '';

    // Validações comuns
    if (!value && field.type !== 'checkbox') {
      isValid = false;
      errorMsg = 'Este campo é obrigatório';
    } else {
      const baseName = fieldName.replace('-home', '').replace('-contato', '');
      
      switch (baseName) {
        case 'nome':
          if (value.length < 3) {
            isValid = false;
            errorMsg = 'Nome deve ter pelo menos 3 caracteres';
          } else if (!/^[a-záàâãéèêíïóôõöúçñ\s]+$/i.test(value)) {
            isValid = false;
            errorMsg = 'Nome deve conter apenas letras';
          }
          break;

        case 'empresa':
          if (value.length < 2) {
            isValid = false;
            errorMsg = 'Digite o nome da empresa';
          }
          break;

        case 'email':
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            isValid = false;
            errorMsg = 'Email inválido';
          }
          break;

        case 'telefone':
          const phoneRegex = /^[\(\)\-\s\d]+$/;
          if (!phoneRegex.test(value)) {
            isValid = false;
            errorMsg = 'Telefone inválido';
          } else if (value.replace(/\D/g, '').length < 10) {
            isValid = false;
            errorMsg = 'Telefone deve ter pelo menos 10 dígitos';
          }
          break;

        case 'assunto':
        case 'servico':
          if (value === '') {
            isValid = false;
            errorMsg = 'Selecione uma opção';
          }
          break;

        case 'mensagem':
          if (value.length < 10) {
            isValid = false;
            errorMsg = 'Mensagem deve ter pelo menos 10 caracteres';
          } else if (value.length > 1000) {
            isValid = false;
            errorMsg = 'Mensagem não pode exceder 1000 caracteres';
          }
          break;

        case 'consentimento':
          if (!field.checked) {
            isValid = false;
            errorMsg = 'Você deve concordar para continuar';
          }
          break;
      }
    }

    if (errorElement) {
      errorElement.textContent = errorMsg;
    }

    field.style.borderColor = isValid ? '' : '#e74c3c';
    return isValid;
  };

  // Event listeners para validação em tempo real
  const fields = form.querySelectorAll('input, select, textarea');
  fields.forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('change', () => validateField(field));
  });

  // Validação ao submeter
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isFormValid = true;
    const fieldsToValidate = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    fieldsToValidate.forEach(field => {
      if (!validateField(field)) {
        isFormValid = false;
      }
    });

    if (isFormValid) {
      // Simular envio do formulário
      form.style.display = 'none';
      successMsg.style.display = 'flex';

      // Reset após 3 segundos
      setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        successMsg.style.display = 'none';
        
        // Limpar estilos de borda e erros
        fields.forEach(field => {
          field.style.borderColor = '';
          const fieldName = field.id;
          const errorElement = document.getElementById(`erro-${fieldName}`);
          if (errorElement) {
            errorElement.textContent = '';
          }
        });
      }, 3000);
    }
  });
};

// Inicializar validadores para ambos os formulários
createFormValidator('contactForm', 'successMessage');
createFormValidator('contactFormHome', 'successMessageHome');