document.addEventListener("DOMContentLoaded", () => {
    // Находим все select с классом select__cust
    const selects = document.querySelectorAll(".select__cust");

    selects.forEach((select) => {
        // Создаем обертку для кастомного списка
        const customSelect = document.createElement("div");
        customSelect.classList.add("custom-select");

        // Создаем элемент для отображения выбранного значения
        const valueContainer = document.createElement("div");
        valueContainer.classList.add("custom-select__value");

        // Создаем стрелочку
        const arrow = document.createElement("span");
        arrow.classList.add("custom-select__arrow");
        arrow.textContent = "▼";

        // Добавляем стрелочку в контейнер значения
        valueContainer.appendChild(document.createTextNode(select.options[select.selectedIndex].text));
        valueContainer.appendChild(arrow);

        // Создаем контейнер для опций
        const optionsContainer = document.createElement("div");
        optionsContainer.classList.add("custom-select__options");

        // Заполняем контейнер опциями
        Array.from(select.options).forEach((option) => {
            const optionElement = document.createElement("div");
            optionElement.classList.add("custom-select__option");
            optionElement.textContent = option.text;

            // Обработчик клика на опцию
            optionElement.addEventListener("click", () => {
                // Меняем значение нативного select
                select.value = option.value;

                // Обновляем текст выбранного значения
                valueContainer.firstChild.textContent = option.text;

                // Скрываем выпадающий список
                optionsContainer.classList.remove("open");
                arrow.classList.remove("open");
            });

            optionsContainer.appendChild(optionElement);
        });

        // Добавляем элементы в обертку
        customSelect.appendChild(valueContainer);
        customSelect.appendChild(optionsContainer);

        // Вставляем обертку перед нативным select
        select.parentNode.insertBefore(customSelect, select);

        // Скрываем нативный select
        select.style.display = "none";

        // Обработчик клика на контейнер значения
        valueContainer.addEventListener("click", () => {
            // Переключаем видимость выпадающего списка
            optionsContainer.classList.toggle("open");
            arrow.classList.toggle("open");
        });
    });
});