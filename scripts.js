body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f4f4;
}

header {
  background-color: #4b0082;
  color: white;
  padding: 20px;
  text-align: center;
}

#search-input {
  width: 50%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  border: none;
document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.getElementById('faq-container');
  const searchInput = document.getElementById('search-input');

  // Carregar o conteúdo do FAQ a partir do arquivo JSON
  fetch('faq_glam.json')
    .then(response => response.json())
    .then(data => renderFAQ(data))
    .catch(error => console.error('Erro ao carregar FAQ:', error));

  function renderFAQ(data) {
    data.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('faq-category');

      const categoryTitle = document.createElement('h2');
      categoryTitle.textContent = category.categoria;
      categoryDiv.appendChild(categoryTitle);

      category.perguntas.forEach(question => {
        const faqItem = document.createElement('div');
        faqItem.classList.add('faq-item');

        const questionElement = document.createElement('div');
        questionElement.textContent = question.pergunta;
        faqItem.appendChild(questionElement);

        const answerElement = document.createElement('div');
        answerElement.classList.add('answer');
        answerElement.textContent = question.resposta;
        faqItem.appendChild(answerElement);

        faqItem.addEventListener('click', () => {
          faqItem.classList.toggle('open');
        });

        categoryDiv.appendChild(faqItem);
      });

      faqContainer.appendChild(categoryDiv);
    });
  }

  // Função de busca
  searchInput.addEventListener('input', function () {
    const query = searchInput.value.toLowerCase();
    const items = document.querySelectorAll('.faq-item');

    items.forEach(item => {
      const question = item.querySelector('div').textContent.toLowerCase();
      if (question.includes(query)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});
