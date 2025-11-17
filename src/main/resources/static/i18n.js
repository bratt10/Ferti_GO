
const translations = {
  es: {
    // Sidebar
    'sidebar.dashboard': '📊 Dashboard',
    'sidebar.fincas': '🏞️ Fincas',
    'sidebar.lotes': '📦 Lotes',
    'sidebar.cultivos': '🌾 Cultivos',
    'sidebar.fertilizantes': '🧪 Fertilizantes',
    'sidebar.usuarios': '👤 Usuarios',
    'sidebar.configuracion': '⚙️ Configuración',
    'sidebar.logout': '🚪 Cerrar Sesión',
    
    // Configuración
    'config.title': '⚙️ Configuración del Sistema',
    'config.subtitle': 'Configuración General',
    'config.description': 'Personaliza la información principal de tu plataforma Fertigo.',
    'config.current': '📋 Configuración Actual',
    
    // Cards
    'config.empresa.title': 'Nombre de la Empresa',
    'config.empresa.desc': 'Actualiza el nombre que se muestra en toda la plataforma',
    'config.empresa.btn': 'Cambiar Nombre',
    'config.idioma.title': 'Idioma del Sistema',
    'config.idioma.desc': 'Selecciona el idioma de la interfaz',
    'config.idioma.btn': 'Cambiar Idioma',
    'config.password.title': 'Contraseña de Admin',
    'config.password.desc': 'Actualiza tu contraseña de acceso',
    'config.password.btn': 'Cambiar Contraseña',
    
    // Info actual
    'config.info.empresa': 'Empresa:',
    'config.info.idioma': 'Idioma:',
    'config.info.updated': 'Última actualización:',
    
    // Modales
    'modal.empresa.title': '🏢 Cambiar Nombre de la Empresa',
    'modal.empresa.label': 'Nuevo nombre de la empresa:',
    'modal.empresa.placeholder': 'Ej: Fertigo S.A.S.',
    'modal.idioma.title': '🌍 Cambiar Idioma del Sistema',
    'modal.idioma.label': 'Seleccionar idioma:',
    'modal.password.title': '🔒 Cambiar Contraseña',
    'modal.password.current': 'Contraseña actual:',
    'modal.password.new': 'Nueva contraseña:',
    'modal.password.confirm': 'Confirmar nueva contraseña:',
    'modal.password.placeholder.current': 'Ingresa tu contraseña actual',
    'modal.password.placeholder.new': 'Ingresa la nueva contraseña',
    'modal.password.placeholder.confirm': 'Confirma la nueva contraseña',
    
    // Botones
    'btn.save': 'Guardar Cambios',
    'btn.change': 'Cambiar Contraseña',
    'btn.exit': 'Salir',
    'btn.loading': 'Cargando...',
    
    // Mensajes
    'msg.success.empresa': 'Nombre de empresa actualizado correctamente',
    'msg.success.idioma': 'Idioma actualizado correctamente',
    'msg.success.password': 'Contraseña actualizada correctamente',
    'msg.error.empresa': 'Error al actualizar el nombre de empresa',
    'msg.error.idioma': 'Error al actualizar el idioma',
    'msg.error.password': 'Error al cambiar la contraseña',
    'msg.error.invalid': 'Por favor ingrese un nombre válido',
    'msg.error.fields': 'Por favor complete todos los campos',
    'msg.error.length': 'La nueva contraseña debe tener al menos 6 caracteres',
    'msg.error.match': 'Las contraseñas no coinciden',
    'msg.error.current': 'Contraseña actual incorrecta',
    'msg.error.user': 'Error: Usuario no identificado',
    'msg.error.verify': 'Error al verificar usuario',
    'msg.confirm.logout': '¿Estás seguro de que deseas cerrar sesión?',
    
    // Estados
    'status.loading': 'Cargando...',
    'status.notConfigured': 'No configurado',
    'status.error': 'Error al cargar',
    'status.never': 'Nunca',
    
    // Idiomas
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.pt': 'Português'
  },
  
  en: {
    // Sidebar
    'sidebar.dashboard': '📊 Dashboard',
    'sidebar.fincas': '🏞️ Farms',
    'sidebar.lotes': '📦 Lots',
    'sidebar.cultivos': '🌾 Crops',
    'sidebar.fertilizantes': '🧪 Fertilizers',
    'sidebar.usuarios': '👤 Users',
    'sidebar.configuracion': '⚙️ Settings',
    'sidebar.logout': '🚪 Logout',
    
    // Configuración
    'config.title': '⚙️ System Settings',
    'config.subtitle': 'General Settings',
    'config.description': 'Customize the main information of your Fertigo platform.',
    'config.current': '📋 Current Settings',
    
    // Cards
    'config.empresa.title': 'Company Name',
    'config.empresa.desc': 'Update the name displayed across the platform',
    'config.empresa.btn': 'Change Name',
    'config.idioma.title': 'System Language',
    'config.idioma.desc': 'Select the interface language',
    'config.idioma.btn': 'Change Language',
    'config.password.title': 'Admin Password',
    'config.password.desc': 'Update your access password',
    'config.password.btn': 'Change Password',
    
    // Info actual
    'config.info.empresa': 'Company:',
    'config.info.idioma': 'Language:',
    'config.info.updated': 'Last updated:',
    
    // Modales
    'modal.empresa.title': '🏢 Change Company Name',
    'modal.empresa.label': 'New company name:',
    'modal.empresa.placeholder': 'Ex: Fertigo Inc.',
    'modal.idioma.title': '🌍 Change System Language',
    'modal.idioma.label': 'Select language:',
    'modal.password.title': '🔒 Change Password',
    'modal.password.current': 'Current password:',
    'modal.password.new': 'New password:',
    'modal.password.confirm': 'Confirm new password:',
    'modal.password.placeholder.current': 'Enter your current password',
    'modal.password.placeholder.new': 'Enter the new password',
    'modal.password.placeholder.confirm': 'Confirm the new password',
    
    // Botones
    'btn.save': 'Save Changes',
    'btn.change': 'Change Password',
    'btn.exit': 'Exit',
    'btn.loading': 'Loading...',
    
    // Mensajes
    'msg.success.empresa': 'Company name updated successfully',
    'msg.success.idioma': 'Language updated successfully',
    'msg.success.password': 'Password updated successfully',
    'msg.error.empresa': 'Error updating company name',
    'msg.error.idioma': 'Error updating language',
    'msg.error.password': 'Error changing password',
    'msg.error.invalid': 'Please enter a valid name',
    'msg.error.fields': 'Please complete all fields',
    'msg.error.length': 'New password must be at least 6 characters',
    'msg.error.match': 'Passwords do not match',
    'msg.error.current': 'Current password is incorrect',
    'msg.error.user': 'Error: User not identified',
    'msg.error.verify': 'Error verifying user',
    'msg.confirm.logout': 'Are you sure you want to log out?',
    
    // Estados
    'status.loading': 'Loading...',
    'status.notConfigured': 'Not configured',
    'status.error': 'Error loading',
    'status.never': 'Never',
    
    // Idiomas
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.pt': 'Português'
  },
  
  pt: {
    // Sidebar
    'sidebar.dashboard': '📊 Painel',
    'sidebar.fincas': '🏞️ Fazendas',
    'sidebar.lotes': '📦 Lotes',
    'sidebar.cultivos': '🌾 Cultivos',
    'sidebar.fertilizantes': '🧪 Fertilizantes',
    'sidebar.usuarios': '👤 Usuários',
    'sidebar.configuracion': '⚙️ Configurações',
    'sidebar.logout': '🚪 Sair',
    
    // Configuración
    'config.title': '⚙️ Configurações do Sistema',
    'config.subtitle': 'Configurações Gerais',
    'config.description': 'Personalize as informações principais da sua plataforma Fertigo.',
    'config.current': '📋 Configuração Atual',
    
    // Cards
    'config.empresa.title': 'Nome da Empresa',
    'config.empresa.desc': 'Atualize o nome exibido em toda a plataforma',
    'config.empresa.btn': 'Alterar Nome',
    'config.idioma.title': 'Idioma do Sistema',
    'config.idioma.desc': 'Selecione o idioma da interface',
    'config.idioma.btn': 'Alterar Idioma',
    'config.password.title': 'Senha do Admin',
    'config.password.desc': 'Atualize sua senha de acesso',
    'config.password.btn': 'Alterar Senha',
    
    // Info actual
    'config.info.empresa': 'Empresa:',
    'config.info.idioma': 'Idioma:',
    'config.info.updated': 'Última atualização:',
    
    // Modales
    'modal.empresa.title': '🏢 Alterar Nome da Empresa',
    'modal.empresa.label': 'Novo nome da empresa:',
    'modal.empresa.placeholder': 'Ex: Fertigo Ltda.',
    'modal.idioma.title': '🌍 Alterar Idioma do Sistema',
    'modal.idioma.label': 'Selecionar idioma:',
    'modal.password.title': '🔒 Alterar Senha',
    'modal.password.current': 'Senha atual:',
    'modal.password.new': 'Nova senha:',
    'modal.password.confirm': 'Confirmar nova senha:',
    'modal.password.placeholder.current': 'Digite sua senha atual',
    'modal.password.placeholder.new': 'Digite a nova senha',
    'modal.password.placeholder.confirm': 'Confirme a nova senha',
    
    // Botones
    'btn.save': 'Salvar Alterações',
    'btn.change': 'Alterar Senha',
    'btn.exit': 'Sair',
    'btn.loading': 'Carregando...',
    
    // Mensajes
    'msg.success.empresa': 'Nome da empresa atualizado com sucesso',
    'msg.success.idioma': 'Idioma atualizado com sucesso',
    'msg.success.password': 'Senha atualizada com sucesso',
    'msg.error.empresa': 'Erro ao atualizar nome da empresa',
    'msg.error.idioma': 'Erro ao atualizar idioma',
    'msg.error.password': 'Erro ao alterar senha',
    'msg.error.invalid': 'Por favor, insira um nome válido',
    'msg.error.fields': 'Por favor, complete todos os campos',
    'msg.error.length': 'A nova senha deve ter pelo menos 6 caracteres',
    'msg.error.match': 'As senhas não coincidem',
    'msg.error.current': 'Senha atual incorreta',
    'msg.error.user': 'Erro: Usuário não identificado',
    'msg.error.verify': 'Erro ao verificar usuário',
    'msg.confirm.logout': 'Tem certeza de que deseja sair?',
    
    // Estados
    'status.loading': 'Carregando...',
    'status.notConfigured': 'Não configurado',
    'status.error': 'Erro ao carregar',
    'status.never': 'Nunca',
    
    // Idiomas
    'lang.es': 'Español',
    'lang.en': 'English',
    'lang.pt': 'Português'
  }
};

// ==========================================
// FUNCIONES DE TRADUCCIÓN
// ==========================================
function getCurrentLanguage() {
  return localStorage.getItem('idioma') || 'es';
}

/**
 * Traducir un texto según la clave
 */
function t(key) {
  const lang = getCurrentLanguage();
  return translations[lang][key] || translations['es'][key] || key;
}

/**
 * Aplicar traducciones a todos los elementos con data-i18n
 */
function applyTranslations() {
  const lang = getCurrentLanguage();
  
  // Traducir elementos con data-i18n
  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const translation = translations[lang][key];
    
    if (translation) {
      element.textContent = translation;
    }
  });
  
  // Traducir placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const translation = translations[lang][key];
    
    if (translation) {
      element.placeholder = translation;
    }
  });
  
  // Actualizar el atributo lang del HTML
  document.documentElement.lang = lang;
  
  console.log(`✅ Idioma aplicado: ${lang}`);
}

/**
 * Cambiar el idioma del sistema
 */
function changeLanguage(newLang) {
  if (!translations[newLang]) {
    console.error(`Idioma no soportado: ${newLang}`);
    return;
  }
  
  localStorage.setItem('idioma', newLang);
  applyTranslations();
}


document.addEventListener('DOMContentLoaded', function() {
  applyTranslations();
});

window.t = t;
window.changeLanguage = changeLanguage;
window.applyTranslations = applyTranslations;