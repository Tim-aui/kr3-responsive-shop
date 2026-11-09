// Получаем форму заявки на странице order.html.
const orderForm = document.getElementById('order-form');

// Обрабатываем отправку формы.
orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы,
  // потому что backend пока не подключён.
  event.preventDefault();

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    orderForm.reportValidity();
    return;
  }

  // Передаём имя на страницу успешной отправки.
  const name = document.getElementById('order-name').value;
  window.location.href = 'success.html?name=' + encodeURIComponent(name);
});
