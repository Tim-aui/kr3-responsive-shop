// Получаем форму заявки на странице order.html.
const orderForm = document.getElementById('order-form');

// Обрабатываем отправку формы.
orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы,
  // потому что backend пока не подключён.
  event.preventDefault();

  // КР3: снимаем старые отметки об ошибках.
  const fields = Array.from(orderForm.elements).filter((el) => el.willValidate);
  fields.forEach((el) => el.removeAttribute('aria-invalid'));

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    // КР3: помечаем неверные поля через aria-invalid (озвучивается скринридером,
    // CSS подсвечивает красной рамкой) и ставим фокус на первое из них.
    const invalid = fields.filter((el) => !el.checkValidity());
    invalid.forEach((el) => el.setAttribute('aria-invalid', 'true'));
    invalid[0].focus();

    orderForm.reportValidity();
    return;
  }

  // Передаём имя на страницу успешной отправки.
  const name = document.getElementById('order-name').value;
  window.location.href = 'success.html?name=' + encodeURIComponent(name);
});

// КР3: если пришли со страницы товара (order.html?product=id),
// сразу выбираем этот товар в списке.
const preselected = new URLSearchParams(window.location.search).get('product');
const productSelect = document.getElementById('order-product');

if (preselected && productSelect.querySelector(`option[value="${CSS.escape(preselected)}"]`)) {
  productSelect.value = preselected;
}
