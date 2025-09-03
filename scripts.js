document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.getElementById('faq-container');
  const searchInput = document.getElementById('search-input');

  // Carregar o conteúdo do FAQ a partir do arquivo JSON
  fetch('./faq_glam.json')  // Garante que o caminho esteja correto
    .then(response => response.json()) 
    .then(data => renderFAQ(data))
    .catch(error => {
      console.error('Erro ao carregar FAQ:', error);
      faqContainer.innerHTML = '<p>Houve um erro ao carregar o conteúdo do FAQ.</p>';
    });

  function renderFAQ(data) {
    // Certifique-se de que temos dados válidos
    if (!data || data.length === 0) {
      faqContainer.innerHTML = '<p>Não há dados para exibir.</p>';
      return;
    }

    data.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('faq-category');

      const categoryTitle = document.createElement('h2');
      categoryTitle.textContent = category.title || 'Sem título';  // Usando title do JSON
      categoryDiv.appendChild(categoryTitle);

      // Verifique se a categoria tem subseções
      if (category.subsections && category.subsections.length > 0) {
        category.subsections.forEach(subsection => {
          const faqItem = document.createElement('div');
          faqItem.classList.add('faq-item');

          const questionElement = document.createElement('div');
          questionElement.textContent = subsection.title || 'Sem pergunta';  // Usando title de cada subseção
          faqItem.appendChild(questionElement);

          subsection.paragraphs.forEach(paragraph => {
            const paragraphElement = document.createElement('div');
            paragraphElement.textContent = paragraph || 'Sem resposta';  // Usando paragraphs para as respostas
            faqItem.appendChild(paragraphElement);
          });

          faqItem.addEventListener('click', () => {
            faqItem.classList.toggle('open');
          });

          categoryDiv.appendChild(faqItem);
        });
      } else {
        // Se não houver subseções, informe ao usuário
        const noSubsections = document.createElement('p');
        noSubsections.textContent = 'Não há perguntas nesta categoria.';
        categoryDiv.appendChild(noSubsections);
      }

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
