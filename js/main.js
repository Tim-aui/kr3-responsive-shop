// Получаем модальное окно по id.
const orderDialog = document.getElementById('order-dialog');

// Получаем все кнопки заказа в карточках товаров.
const orderButtons = document.querySelectorAll('.product-card__button');

// Получаем кнопку закрытия модального окна.
const closeDialogButton = document.getElementById('close-order-dialog');

// Получаем скрытое поле, в которое будет записан выбранный товар.
const selectedProductInput = document.getElementById('selected-product');

// КР3: подпись с названием товара внутри окна — пользователь видит, что заказывает.
const dialogProductName = document.getElementById('order-dialog-product');

// КР3: запоминаем кнопку, которая открыла окно, чтобы вернуть на неё фокус.
let lastTrigger = null;

// Перебираем все кнопки «Заказать».
orderButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // Получаем название товара из data-атрибута.
    const productName = button.dataset.product;

    // Записываем название товара в скрытое поле формы.
    selectedProductInput.value = productName;
    dialogProductName.textContent = productName;

    lastTrigger = button;

    // Открываем модальное окно. showModal() сам:
    // - переводит фокус внутрь окна,
    // - делает остальную страницу недоступной (inert),
    // - закрывает окно по Esc.
    orderDialog.showModal();
  });
});

// Закрываем модальное окно по кнопке «Закрыть».
closeDialogButton.addEventListener('click', () => {
  orderDialog.close();
});

// КР3: клик по затемнённому фону (вне окна) тоже закрывает его.
orderDialog.addEventListener('click', (event) => {
  if (event.target === orderDialog) {
    orderDialog.close();
  }
});

// КР3: после закрытия (кнопкой, Esc или кликом по фону)
// возвращаем фокус на кнопку «Заказать», с которой начали, —
// клавиатурный пользователь не теряет место на странице.
orderDialog.addEventListener('close', () => {
  if (lastTrigger) {
    lastTrigger.focus();
  }
});

// Получаем форму заявки.
const orderForm = document.getElementById('order-form');

// Обрабатываем отправку формы.
orderForm.addEventListener('submit', (event) => {
  // Отменяем стандартную отправку формы,
  // потому что backend пока не подключён.
  event.preventDefault();

  // Сбрасываем предыдущие признаки ошибок.
  const formElements = Array.from(orderForm.elements);

  formElements.forEach((element) => {
    if (element.willValidate) {
      element.removeAttribute('aria-invalid');
    }
  });

  // Проверяем встроенные HTML-ограничения формы.
  if (!orderForm.checkValidity()) {
    formElements.forEach((element) => {
      if (element.willValidate && !element.checkValidity()) {
        // aria-invalid: скринридер озвучит поле как «неверное»,
        // а CSS подсветит его красной рамкой.
        element.setAttribute('aria-invalid', 'true');
      }
    });

    // Показываем стандартные сообщения браузера.
    orderForm.reportValidity();
    return;
  }

  // Передаём имя на страницу успешной отправки.
  const name = document.getElementById('order-name').value;

  // Закрываем модальное окно и переходим на страницу успешной отправки.
  lastTrigger = null;
  orderDialog.close();
  window.location.href = 'success.html?name=' + encodeURIComponent(name);
});
