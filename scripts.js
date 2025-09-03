document.addEventListener("DOMContentLoaded", () => {
  const faqContainer = document.getElementById('faq-container');
  const searchInput = document.getElementById('search-input');

  // Carregar o conteúdo do FAQ a partir do arquivo JSON
  fetch('./faq_glam.json')  // Garante que o caminho esteja correto
    .then(response => response.json())
    .then(data => {
      // Verificar se o JSON foi carregado corretamente
      if (!data || !Array.isArray(data)) {
        throw new Error('Dados JSON inválidos ou não carregados corretamente');
      }
      renderFAQ(data);
    })
    .catch(error => {
      console.error('Erro ao carregar FAQ:', error);
      faqContainer.innerHTML = `<p>Erro ao carregar FAQ: ${error.message}</p>`;
    });

  function renderFAQ(data) {
    // Verifica se os dados não estão vazios
    if (data.length === 0) {
      faqContainer.innerHTML = '<p>Não há dados para exibir.</p>';
      return;
    }

    // Itera sobre os dados
    data.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('faq-category');

      const categoryTitle = document.createElement('h2');
      categoryTitle.textContent = category.title || 'Sem título';  // Usando title do JSON
      categoryDiv.appendChild(categoryTitle);

      // Verifica se a categoria tem subseções
      if (category.subsections && Array.isArray(category.subsections) && category.subsections.length > 0) {
        category.subsections.forEach(subsection => {
          const faqItem = document.createElement('div');
          faqItem.classList.add('faq-item');

          const questionElement = document.createElement('div');
          questionElement.textContent = subsection.title || 'Sem pergunta';  // Usando title de cada subseção
          faqItem.appendChild(questionElement);

          if (Array.isArray(subsection.paragraphs) && subsection.paragraphs.length > 0) {
            subsection.paragraphs.forEach(paragraph => {
              const paragraphElement = document.createElement('div');
              paragraphElement.textContent = paragraph || 'Sem resposta';  // Usando paragraphs para as respostas
              faqItem.appendChild(paragraphElement);
            });
          } else {
            const noParagraphs = document.createElement('p');
            noParagraphs.textContent = 'Sem resposta disponível.';
            faqItem.appendChild(noParagraphs);
          }

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
