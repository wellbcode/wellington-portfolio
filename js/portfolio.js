document.addEventListener("DOMContentLoaded", () => {
    /* =================== AOS ===================*/
    if (window.AOS) {
        AOS.init({
            duration: 800,
            once: true
        });
    }

    /* =========== Rolagem da Navbar ============*/
    const navbar = document.querySelector(".navbar");

    function updateNavbar() {
        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.padding = "10px 0";
        } else {
            navbar.style.padding = "";
        }
    }

    updateNavbar();
    window.addEventListener("scroll", updateNavbar);

    /* ========= Link ativo da Navbar destacado em laranaja ==========*/
    const links = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    function activeLink() {
        const pos = window.scrollY + 120;

        sections.forEach(sec => {
            const top = sec.offsetTop;
            const bottom = top + sec.offsetHeight;
            const id = sec.getAttribute("id");

            if (pos >= top && pos < bottom) {
                links.forEach(link =>
                    link.classList.remove("active")
                );
                const current =
                    document.querySelector(
                        `.nav-link[href="#${id}"]`
                    );
                if (current) {
                    current.classList.add("active");
                }
            }
        });
    }

    activeLink();
    window.addEventListener("scroll", activeLink);

    /* =========== Menu Hamburguer ============*/
    const menu = document.getElementById("menu");

    document.querySelectorAll("#menu .nav-link")
    .forEach(link => {
        link.addEventListener("click", () => {
            if(menu){
                const collapse =
                bootstrap.Collapse.getOrCreateInstance(menu);
                collapse.hide();
            }
        });
    });

    /* =========== Modo Dark ============*/
    const btnDark =
    document.getElementById("darkMode");
    if(btnDark){
        const iconDark =
            btnDark.querySelector("i");

        function atualizarIcone(){
            if(document.body.classList.contains("dark-mode")){
                iconDark.classList.remove("bi-moon");
                iconDark.classList.add("bi-sun");
            } else {
                iconDark.classList.remove("bi-sun");
                iconDark.classList.add("bi-moon");
            }
        }

        /* =========== Carregar tema salvo ============*/
        if(localStorage.getItem("tema") === "dark"){
            document.body.classList.add("dark-mode");
        }

        atualizarIcone();

        btnDark.addEventListener("click", ()=>{
            document.body.classList.toggle("dark-mode");
            if(document.body.classList.contains("dark-mode")){
                localStorage.setItem("tema","dark");
            } else {
                localStorage.setItem("tema","light");
            }
            atualizarIcone();
        });
    }

    /* =========== Galeria dos Projetos ============*/ 
    const projetos = {
        gerenciador:[
            {
                imagem: "img/galeria/gerenciador/tela01-saudacao.png",
                titulo: "Tela inicial Mensagem de Boas vindas!"
            },
            {
                imagem: "img/galeria/gerenciador/tela02-login-e-cadastro.png",
                titulo: "Tela de Login e Cadastro..."
            },
            {
                imagem: "img/galeria/gerenciador/tela03-cadastro.png",
                titulo: "Efetuando cadastro..."
            },
            {
                imagem: "img/galeria/gerenciador/tela04-login.png",
                titulo: "Efetuando login..."
            },
            {
                imagem: "img/galeria/gerenciador/tela05-logado.png",
                titulo: "Logado..."
            },
            {
                imagem: "img/galeria/gerenciador/tela06-add-tarefas.png",
                titulo: "Adcionando tarefas..."
            },
            {
                imagem: "img/galeria/gerenciador/tela07-limpar-tarefas.png",
                titulo: "Botão limpar tarefas..."
            },
             {
                imagem: "img/galeria/gerenciador/tela08-exportar-tarefas.png",
                titulo: "Botão exportar tarefas em PDF/Excel..."
            }
            // {
            //     imagem: "img/galeria/gerenciador/tela07-limpar-perfil.png",
            //     titulo: "Formulário de atualizar o perfil..."
            // }
        ],
        //  ong: [
        //     {
        //         imagem: "img/galeria/ong/01-home.png",
        //         titulo: "Página Inicial"
        //     },
        //     {
        //         imagem: "img/galeria/ong/02-projetos.png",
        //         titulo: "Projetos"
        //     },
        //     {
        //         imagem: "img/galeria/ong/03-blog.png",
        //         titulo: "Blog"
        //     }
        // ]
            // portfolio:[
        //     {
        //         imagem: "img/galeria/ong/01-home.png",
        //         titulo: "Página Inicial"
        //     },
        //     {
        //         imagem: "img/galeria/ong/02-projetos.png",
        //         titulo: "Projetos"
        //     },
        //     {
        //         imagem: "img/galeria/ong/03-blog.png",
        //         titulo: "Blog"
        //     }
            // ]
    };

    const cards = document.querySelectorAll(".gallery-card");
    const carouselInner = document.getElementById("carouselInner");
    const tituloProjeto = document.getElementById("tituloProjeto");
    const modalGaleria = document.getElementById("modalGaleria");

    const tituloSlide = document.getElementById("tituloSlide");
    const contadorSlide = document.getElementById("contadorSlide");
    
    const carouselGaleria = document.getElementById("carouselGaleria");
    const carouselIndicators = document.getElementById("carouselIndicators");

    let modal;
    if(modalGaleria){
        modal = new bootstrap.Modal(modalGaleria);

    }

        if (carouselGaleria) {
        carouselGaleria.addEventListener("slid.bs.carousel", () => {
            const ativo = carouselGaleria.querySelector(".carousel-item.active");
            if (!ativo) return;
            const indice = [...carouselGaleria.querySelectorAll(".carousel-item")]
                .indexOf(ativo);
            const total = carouselGaleria.querySelectorAll(".carousel-item").length;
            tituloSlide.textContent = ativo.dataset.titulo;
            contadorSlide.textContent = `${indice + 1} / ${total}`;
        });

    }

    cards.forEach(card => {
        card.addEventListener("click",()=>{
            const nomeProjeto = card.dataset.projeto;
            const imagens = projetos[nomeProjeto];
            if(!imagens){
                console.warn(
                    "Galeria não cadastrada:",
                    nomeProjeto
                );
                return;
            }

            tituloProjeto.textContent =
                card.querySelector("h5")?.textContent || "Projeto";
            carouselInner.innerHTML = ""; // 1º Cria as imagens
            carouselIndicators.innerHTML = ""; // 2º Cria as bolinhas

            carouselInner.innerHTML = "";
            carouselIndicators.innerHTML = "";

            //Essa abordagem, porque ela percorre o array apenas uma vez e mantém tudo relacionado à criação da galeria concentrado no mesmo lugar. É uma pequena otimização e deixa o código mais enxuto, sem perder a legibilidade.
            imagens.forEach((slide, index) => {

                // Cria a imagem
                carouselInner.innerHTML += `
                    <div
                        class="carousel-item ${index === 0 ? "active" : ""}"
                        data-titulo="${slide.titulo}">
                        <img
                            src="${slide.imagem}"
                            class="d-block w-100"
                            alt="${slide.titulo}">
                    </div>
                `;

                // Cria a bolinha correspondente
                carouselIndicators.innerHTML += `
                    <button
                        type="button"
                        data-bs-target="#carouselGaleria"
                        data-bs-slide-to="${index}"
                        class="${index === 0 ? "active" : ""}"
                        aria-current="${index === 0 ? "true" : "false"}"
                        aria-label="Ir para imagem ${index + 1}">
                    </button>
                `;

            });

            // Atualiza título e contador
            tituloSlide.textContent = imagens[0].titulo;
            contadorSlide.textContent = `1 / ${imagens.length}`;


            // Inicializa o carrossel
            const carousel = bootstrap.Carousel.getOrCreateInstance(
                carouselGaleria,
                {
                    interval: 3000,
                    ride: "carousel",
                    pause: "hover",
                    wrap: true
                }
            );
            carousel.to(0);
            carousel.cycle();

            modal.show();   
        });
    });

    /* =========== Limpar Modal ao fechar ============*/ 
    if(modalGaleria){
        modalGaleria.addEventListener("hidden.bs.modal",()=>{
            const carousel = bootstrap.Carousel.getInstance(carouselGaleria);

            if (carousel) {
                carousel.pause();
            }
            carouselInner.innerHTML = "";
        });
    }
});

// ======================================================
// TODO - Navegação entre projetos (implementação futura)
//
// Ideia:
//
// - Refatorar a lógica do clique do card para uma função:
//      abrirProjeto(nomeProjeto);
//
// - Controlar o projeto aberto através de:
//
//      const ordemProjetos = [...];
//      let projetoAtual = "";
//
// - Os botões "Próximo projeto" e "Projeto anterior"
//   chamarão abrirProjeto() para navegar entre os projetos,
//   reutilizando toda a lógica já existente.
//
// ======================================================

// ======================================================
// MELHORIAS FUTURAS
// ======================================================

// [ ] Refatorar abertura da galeria para abrirProjeto()
// [ ] Navegação entre projetos (Anterior/Próximo)
// [ ] Teclas ← → para navegar pelos projetos
// [ ] Exibir nome do projeto no modal
// [ ] Animação de transição entre projetos