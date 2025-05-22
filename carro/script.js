const ip = "http://192.168.4.1"; // IP do ESP32-CAM

function enviar(cmd) {
  fetch(`${ip}/${cmd}`).catch(err => console.error("Erro:", err));
}

    function configurarBotao(id, cmdPressionar, cmdSoltar) {
      const botao = document.getElementById(id);
      botao.addEventListener('pointerdown', () => {
        enviar(cmdPressionar);
        botao.classList.add("ativa");
      });
      botao.addEventListener('pointerup', () => {
        enviar(cmdSoltar);
        botao.classList.remove("ativa");
      });
      botao.addEventListener('pointerleave', () => {
        enviar(cmdSoltar);
        botao.classList.remove("ativa");
      });
      botao.addEventListener('pointercancel', () => {
        enviar(cmdSoltar);
        botao.classList.remove("ativa");
      });
    }

    configurarBotao("esquerda", "esquerda", "centro");
    configurarBotao("direita", "direita", "centro");
    configurarBotao("frente", "frente", "parar");
    configurarBotao("tras", "tras", "parar");

    function alternarMarcha(tipo) {
      ["P", "N", "R"].forEach(id => {
        document.getElementById("modo" + id).classList.remove("ativo");
      });
      document.getElementById("modo" + tipo).classList.add("ativo");
      enviar("modo" + tipo);
    }

    let gravando = false;
    let tempo = 0;
    let intervalo;

    function alternarGravacao() {
      const btn = document.getElementById("gravar");
      const tempoDiv = document.getElementById("temporizador");
      gravando = !gravando;

      if (gravando) {
        btn.classList.add("ativo");
        tempo = 0;
        tempoDiv.style.display = "block";
        intervalo = setInterval(() => {
          tempo++;
          const min = String(Math.floor(tempo / 60)).padStart(2, '0');
          const sec = String(tempo % 60).padStart(2, '0');
          tempoDiv.innerText = `${min}:${sec}`;
        }, 1000);
      } else {
        btn.classList.remove("ativo");
        tempoDiv.style.display = "none";
        clearInterval(intervalo);
      }
      enviar("gravar");
    }

    // Aqui você deve atualizar dinamicamente a velocidade real usando dados do ESP32
    // Exemplo: document.getElementById("velocidade").innerText = ${valorRecebido} km/h;
