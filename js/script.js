//form de contato
const formContato = document.getElementById("formContato");
if (formContato) {
  formContato.addEventListener("submit", async function (e) {
    e.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem").value.trim();
    if (nome.split(" ").length < 2) {
      Swal.fire({
      icon: "warning",
      title: "Nome inválido",
      text: "Informe seu nome completo."
      });
      return;
    }

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      Swal.fire({
      icon: "warning",
      title: "E-mail inválido",
      text: "Digite um e-mail válido."
      });
      return;
    }
    if (mensagem.length < 10) {
      Swal.fire({
      icon: "warning",
      title: "Mensagem muito curta",
      text: "Escreva uma mensagem com pelo menos 10 caracteres."
      });
      return;
    }

    const btn = document.getElementById("btnEnviar");
    btn.disabled = true;
    btn.innerHTML = `
    <span
      class="spinner-border spinner-border-sm me-2" 
      role="status" aria-hidden="true">
    </span>
    Enviando...
    `;
    try {
    const resposta = await fetch("https://formspree.io/f/mzdnrvyq", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
      body: JSON.stringify({
      nome,
      email,
      mensagem
      })
    });
    if (resposta.ok) {
      Swal.fire({
      icon: "success",
      title: "Mensagem enviada!",
      text: "Obrigado pelo contato. Em breve retornarei.😊"
      });
      formContato.reset();
      document.getElementById("nome").focus();
    } else {
      throw new Error("Erro ao enviar.");
    }
    } catch {
      Swal.fire({
      icon: "error",
      title: "Erro",
      text: "Não foi possível enviar sua mensagem."
    });
    } finally {
    btn.disabled = false;
    btn.innerHTML = `
    <i class="fa-solid fa-paper-plane me-2"></i>
    Enviar
      `;
    }
  });
}