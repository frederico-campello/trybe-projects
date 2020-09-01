window.onload = function () {
  const botaoEntrar = document.getElementById('button-login');
  const emailOuTelefone = document.getElementById('user-email-phone');
  function alertLogin() {
    alert(emailOuTelefone.value);
  }
  botaoEntrar.addEventListener('click', alertLogin);
  const dataDeNascimento = document.querySelector('.input-data-nascimento');
  dataDeNascimento.DatePickerX.init();
};
