var objetivos = [
  "Macroprocessos",
  "Eficiência",
  "Probabilidade e Impacto",
  "Competente, transparente, funcional e participativa",
  "Gestão de leitos e segurança do paciente",
];

var questoes = [
  "Conjunto de processos estratégicos para o alcance dos objetivos da instituição?",
  "Princípio constitucional inserido por meio da Emenda Constitucional nº 19, de 04/06/1998?",
  "Duas variáveis que compõem a noção de risco?",
  "O princípio da eficiência vai além da questão da economicidade, sendo relacionado a conceitos como de justiça social, por ter como objetivo promover uma gestão pública como algumas características. Encontre quatro características da gestão pública que o princípio da eficiência pode contribuir.",
  "Dois desperdícios de diárias hospitalares com potencial de serem modificados, conforme Couto e Pedrosa (2020)?",
];

function printRows() {
  let obj_tds = [];
  let qst_tds = [];

  objetivos.forEach(function (v, i) {
    obj_tds.push(
      `
            <td>
                <div class="card card-1 card-obj" id="cardObj${i}" data-value="${i}">
                    <div class="card-body">
                        ${v}
                    </div>
                </div>
            </td>
            `
    );
  });

  obj_tds = obj_tds.sort(() => Math.random() - 0.5);

  questoes.forEach(function (v, i) {
    qst_tds.push(
      `
            <tr>
                ${obj_tds[i]}
                <td>
                    <div class="card card-2 qst-slot" data-value="" data-obj="">

                    </div>
                </td>
                <td>
                    <div class="card card-3" >
                        <div class="card-body">
                           ${v}
                        </div>
                    </div>
                </td>
            </tr>
            `
    );
  });

  $("tbody").html(qst_tds);

  $(".card-obj").draggable();

  $(".qst-slot").droppable({
    accept: ".card-obj",
    tolerance: "pointer",
    drop: function (event, ui) {
      if (!$(this).hasClass("qst-slot-filled")) {
        $(this).addClass("qst-slot-filled");
        ui.draggable.addClass("card-obj-filled");
      }

      let pos = $(this).offset();

      let wdt = $(this).width();

      ui.draggable.addClass("dragged");

      let id = ui.draggable.attr("id");
      $(this).attr("data-obj", "#" + id);
      $(this).attr("data-value", ui.draggable.data("value"));

      ui.draggable.css({
        top: pos.top + "px",
        left: pos.left + "px",
        width: wdt + "px",
      });
    },

    out: function (event, ui) {
      if ($(this).hasClass("qst-slot-filled")) {
        let drag_id = "#" + ui.draggable.attr("id");
        let btn_id = $(this).data("obj");

        if (drag_id == btn_id) {
          $(this).removeClass("qst-slot-filled");
          ui.draggable.removeClass("card-obj-filled");
          ui.draggable.removeClass("right");
          ui.draggable.removeClass("wrong");
        }
      }
    },
  });
}

printRows();

$("#verificar").click(function () {
  let isComplete = $(".qst-slot-filled").length == questoes.length;

  if (isComplete) {
    let acertos = 0;

    $(".qst-slot-filled").each(function (i) {
      console.log($(this), i);
      let r = $(this).data("value");

      let isCorrect = r == i;
      if (isCorrect) {
        $(this).addClass("right");
        $('#cardObj' + r).addClass("right");
        acertos += 1;
      } else {
        $(this).addClass("wrong");
        $('#cardObj' + r).addClass("wrong");
      }
    });

    if (acertos == questoes.length) {
      $("#rightModal").modal("show");
    } else {
      $("#wrongModal").modal("show");
    }
  }
});
